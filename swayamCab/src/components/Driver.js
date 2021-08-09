import React from  'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import Geolocation from "react-native-geolocation-service";
import { dbOff, gAPiKey, getTableRef, pushDb, updatDb } from '../config/myConfig';
import MapViewDirections from 'react-native-maps-directions';

const Driver = (props)=> {
    const contextOption = React.useContext(MyContext);
    const [currentLayout, setLayout] = React.useState("");
    const [locationRegion, updateLocationRegion] = React.useState(null);
    const [locationMarkers, updateMarkers] = React.useState([]);
    const [userData, setUserData] = React.useState({});
    const [bookingData, setBooking] = React.useState({});
    const [route, updateRoute] = React.useState([]);
    const [showFetch, setFetch] = React.useState(true);

    React.useEffect(()=> {
        const tableRef = getTableRef(`/users/${contextOption.userId}`).on('value', snapshot => {
            let tempData = snapshot.val();
            setUserData({...tempData});
            if (tempData.currentBooking == "free") {
                setLayout("noBooking");
            } else {
                getTableRef(`/booking/${tempData.currentBooking}`).once('value').then((res)=> {
                    setBooking({...res.val()});
                    console.log(showFetch);
                    if (tempData.currentStatus == "onGoing" && showFetch) {
                        setLayout("status");
                    } else {
                        setLayout(tempData.currentStatus);
                    }
                });
            }
        });
        Geolocation.getCurrentPosition((position) => {
            let userCo = [{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }];
            updateLocationRegion({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

        return ()=> {
            dbOff(`/users/${contextOption.userId}`, tableRef);
        }
    }, []);                                     

    const onRegionChange = (newRegion)=> {
        console.log(newRegion);
        updateLocationRegion(newRegion);
    }

    const onConfirmRequest = (fromBack)=> {
        let tempMarker = locationMarkers;
        let _route = route;
        tempMarker.push(bookingData.from);
        tempMarker.push(bookingData.to);
        _route.push(bookingData.from.co);
        _route.push(bookingData.to.co);
        updateRoute([..._route]);
        updateMarkers([...tempMarker]);
        setFetch(false);

        //driver
        updatDb(`/users/${contextOption.userId}`, {currentStatus: "onGoing"});
        pushDb(`/users/${contextOption.userId}/history`, {bookingId: userData.currentBooking});

        //Rider
        updatDb(`users/${bookingData.rider}`, {currentStatus: "onGoing"});
        //booking
        updatDb(`/booking/${bookingData.id}`, {status: "onGoing"});
        setLayout("onGoing")
    }

    const onCancelReq = () => {
        setLayout("free");
        //Rider
        updatDb(`users/${bookingData.rider}`, {driver: "selectNew"});
        
        // Driver
        updatDb(`/users/${contextOption.userId}`, {currentStatus: "free", currentBooking: "free"});
    }

    const onComplete = () => {
        //Rider
        updatDb(`users/${bookingData.rider}`, {currentStatus: "free", driver: "selectNew", currentBooking: "free"});
        
        // Driver
        updatDb(`/users/${contextOption.userId}`, {currentStatus: "free", currentBooking: "free"});

        //booking
        updatDb(`/booking/${bookingData.id}`, {status: "Completed"});
        updateRoute([]);
        updateMarkers([]);
        setLayout("completed");
    }

    const getMapRoute = () => {
        if (route.length == 2) {
            return(
                <MapViewDirections
                    origin={route[0]}
                    destination={route[1]}
                    apikey={gAPiKey}
                    mode="DRIVING"
                    strokeWidth={2}
                />
            )
        } 
        return null;
    }

    const selectLayout = ()=> {
        switch(currentLayout) {
            case 'noBooking': 
                return (
                    <TouchableOpacity
                        style={[
                            commonStyle.btnSky,
                            UI.setHeight(50),
                            commonStyle.mtmd
                        ]}
                    >
                        <Text 
                            style={[
                                commonStyle.textStyle, 
                                commonStyle.fs5, 
                                commonStyle.textWhite,
                                commonStyle.textBold
                            ]}
                        >
                            No Pending Rides
                        </Text>
                    </TouchableOpacity>
                );
            case 'status': 
                return (
                    <TouchableOpacity
                        style={[
                            commonStyle.btnSky,
                            UI.setHeight(50),
                            commonStyle.mtmd
                        ]}
                        onPress={onConfirmRequest}
                    >
                        <Text 
                            style={[
                                commonStyle.textStyle, 
                                commonStyle.fs5, 
                                commonStyle.textWhite,
                                commonStyle.textBold
                            ]}
                        >
                            Fetch Ongoing Ride
                        </Text>
                    </TouchableOpacity>
                );
            case 'pending': 
                    return (
                        <View 
                            style={[
                                commonStyle.bgWhite,
                                UI.setPadding(20,20,20,20),
                                commonStyle.shadow,
                                UI.setBorder(1, '#ccc'),
                                UI.setRadiusOn(20, "bottomStart"),
                                UI.setRadiusOn(20, "bottomEnd")
                            ]}
                        >
                            <View style={[commonStyle.pbLg]}>
                                <Text style={[commonStyle.themeNormalText, commonStyle.textBold,commonStyle.textOffSky]}>
                                    {"Details: "}
                                    <Text style={[commonStyle.textDark]}>{bookingData.rider}</Text>
                                </Text>
                                <Text style={[commonStyle.themeNormalText, commonStyle.textBold, commonStyle.textOffSky]}> 
                                    {"Distance: "} <Text style={[commonStyle.textDark]}>{bookingData.distance} K.M</Text>
                                </Text>
                                <Text style={[commonStyle.themeNormalText, commonStyle.textBold,commonStyle.textOffSky]}>
                                    {"Fare: "}<Text style={[commonStyle.textDark]}>{bookingData.fare} Rs.</Text>
                                </Text>
                            </View>
                            <View style={[commonStyle.row, commonStyle.center]}>
                                <TouchableOpacity
                                    style={[
                                        commonStyle.btnSky,
                                        UI.setHeight(40),
                                    ]}
                                    onPress={onConfirmRequest}
                                >
                                    <Text 
                                        style={[
                                            commonStyle.textStyle, 
                                            commonStyle.fs5, 
                                            commonStyle.textWhite
                                        ]}
                                    >
                                        Accept
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        commonStyle.btnSky,
                                        commonStyle.bgDarkRed,
                                        UI.setHeight(40),
                                        commonStyle.mlmd
                                    ]}
                                    onPress={onCancelReq}
                                >
                                    <Text 
                                        style={[
                                            commonStyle.textStyle, 
                                            commonStyle.fs5, 
                                            commonStyle.textWhite
                                        ]}
                                    >
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
            case 'onGoing': 
                return (
                    <TouchableOpacity
                        style={[
                            commonStyle.bgOffSky,
                            UI.setHeight(50),
                            commonStyle.hPadLg,
                            commonStyle.center,
                            commonStyle.br,
                            commonStyle.shadow,
                            commonStyle.mbmd
                        ]}
                        onPress={onComplete}
                    >
                        <Text 
                            style={[
                                commonStyle.textStyle, 
                                commonStyle.fs5, 
                                commonStyle.textWhite,
                                commonStyle.textBold
                            ]}
                        >
                            Complete
                        </Text>
                    </TouchableOpacity>
                );
            default:
                return null;
        }
    }

    return (
        <MyContext.Consumer>
            {context=>
                <ScrollView style={[UI.setScreen()]}>
                    <View style={[UI.setWidth(), UI.setHeight(UI.height())]}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            initialRegion={locationRegion}
                            onRegionChange={onRegionChange}
                            //onLongPress={onMapTouch}
                            style={css.map}
                            loadingEnabled = {true}
                            loadingIndicatorColor="#666666"
                            loadingBackgroundColor="#eeeeee"
                            showsUserLocation={true}
                            followsUserLocation={true}
                        >
                            {locationMarkers.map((_marker, index) => (
                                <Marker
                                    key={index}
                                    coordinate={_marker.co}
                                    title={_marker.title}
                                    description={_marker.description}
                                />
                            ))} 
                            {getMapRoute()}
                        </MapView>
                    </View>
                    <View 
                        style={[
                            UI.setWidth(),
                            currentLayout == "onGoing" ? commonStyle.pLg : commonStyle.hPadLg,
                            commonStyle.absolute, 
                            currentLayout == "onGoing" ? UI.setBottom(10, '%') : UI.setTop(0, '%'),
                        ]}
                    >
                        {selectLayout()}
                    </View>
                </ScrollView>
            }
        </MyContext.Consumer>
    )
}

const css = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
      },
    mapBox: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
})

export default Driver;