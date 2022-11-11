import React from  'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import Geolocation from "react-native-geolocation-service";
import { dbOff, gAPiKey, getTableRef, pushDb, updatDb } from '../config/myConfig';
import MapViewDirections from 'react-native-maps-directions';
import MyButton from '../libs/MyButton';
import { notify } from '../config/theme';

const Driver = (props)=> {
    const contextOption = React.useContext(MyContext);
    const [currentLayout, setLayout] = React.useState("");
    const [locationRegion, updateLocationRegion] = React.useState(null);
    const [locationMarkers, updateMarkers] = React.useState([]);
    const [yourLocation, setYourLocation] = React.useState([]);
    const [userData, setUserData] = React.useState({});
    const [bookingData, setBooking] = React.useState({});
    const [route, updateRoute] = React.useState([]);
    const mapRef = React.useRef();

    React.useEffect(()=> {
        const watchId = initLocationWatch();
        const tableRef = getTableRef(`/users/${contextOption.userId}`).on('value', snapshot => {
            let tempData = snapshot.val();
            setUserData({...tempData});
            console.log(tempData.currentBooking);
            if (tempData.currentBooking == "free") {
                setLayout("noBooking");
                //clearRoutes();
            } else {
                getTableRef(`/booking/${tempData.currentBooking}`).once('value').then((res)=> {
                    let bookings = res.val();
                    setBooking({...bookings});
                    if (tempData.currentStatus == "onGoing" && checkActiveRide()) {
                        initLocationWatch(bookings);
                    }
                    setLayout(tempData.currentStatus);
                }).catch((err)=> {
                    console.log(err);
                });
            }
        });

        return ()=> {
            dbOff(`/users/${contextOption.userId}`, tableRef);
            watchId && Geolocation.clearWatch(watchId);
        }
    }, []); 
    
    const checkActiveRide = (booking) => {
        console.log({activeRoute: route.length})
        return (route.length == 0);
    }
    
    const initLocationWatch = (booking) => {
        if (booking) {
            return Geolocation.getCurrentPosition((position) => {
                    let tempDriverLoc = [];
                    updateLocationRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                    //Driver current Location
                    tempDriverLoc.push({latitude: position.coords.latitude, longitude: position.coords.longitude});
                    // User's pickup  location
                    tempDriverLoc.push(booking.from.co);
                    
                    setYourLocation([...tempDriverLoc ]);
                    onConfirmRequest(booking);
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
        
        return Geolocation.watchPosition((position)=> {
                let tempYourLoc = yourLocation;
                updateLocationRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
                if (yourLocation.length > 0) {
                    tempYourLoc[0] = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                } else {
                    tempYourLoc.push({latitude: position.coords.latitude, longitude: position.coords.longitude})
                }
                setYourLocation([ ...tempYourLoc ]); 
                updatDb(`/users/${contextOption.userId}`, {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
                updatDb(`/drivers/${contextOption.userId}`, {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            }, 
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    const onRegionChange = (newRegion)=> {
        console.log("region change", currentLayout);
        //updateLocationRegion(newRegion);
        //setLayout("onGoing");
    }

    const onWait = () => {
        let dd = new Date();
        //Rider
        updatDb(`users/${bookingData.rider}`, {currentStatus: "onWait", waitingTime: dd.toDateString() });

        //booking
        updatDb(`/booking/${bookingData.id}`, {status: "onWait", waitingTime: dd.toDateString() });
    }

    const onConfirmRequest = (booking)=> {
        let tempMarker = locationMarkers;
        let _route = route;
        mapRef.current.animateToRegion({
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            ...booking.from.co,
        });
        tempMarker.push(booking.from);
        tempMarker.push(booking.to);
        _route.push(booking.from.co);
        _route.push(booking.to.co);

        //--Update states
        updateRoute([..._route]);
        updateMarkers([...tempMarker]);

        //driver
        updatDb(`/users/${contextOption.userId}`, {currentStatus: "onGoing"});
        pushDb(`/users/${contextOption.userId}/history`, {bookingId: userData.currentBooking});

        //Rider
        updatDb(`users/${booking.rider}`, {currentStatus: "onGoing"});

        //booking
        updatDb(`/booking/${booking.id}`, {status: "onGoing"});
    }

    const onCancelReq = () => {
        //Rider
        updatDb(`/users/${bookingData.rider}`, {driver: "selectNew"});
        
        // Driver
        updatDb(`/users/${contextOption.userId}`, {currentStatus: "free", currentBooking: "free"});

         //booking
         updatDb(`/booking/${userData.currentBooking}`, {status: "CanceledByDriver"});

         setLayout("free");
    }

    const onComplete = () => {
        if (!bookingData && bookingData.rider) {
            return false;
        }
        let lastBooking = bookingData;

        //Rider
        updatDb(`/users/${lastBooking.rider}`, {currentStatus: "Completed", driver: "selectNew", currentBooking: "free"});
        
        // Driver
        updatDb(`/users/${contextOption.userId}`, {currentStatus: "free", currentBooking: "free"});

        //booking
        updatDb(`/booking/${lastBooking.id}`, {status: "Completed"});
        clearRoutes();
        setLayout("completed");
    }

    const clearRoutes = (fromRider) => {
        if (yourLocation.length == 2) {
            yourLocation.pop();
            setYourLocation([...yourLocation]);
        }
        updateRoute([]);
        updateMarkers([]);
    }

    const setDriverLocation = (event) => {
        updatDb(`/drivers/${contextOption.userId}`, event.nativeEvent.coordinate).then(()=> {
            console.log("location set for driver");
        })
    }

    const getMapRoute = () => {
        const ll = [];
        if (route.length == 2) {
            ll.push(
                <MapViewDirections
                    key={"riderWay"}
                    origin={route[0]}
                    destination={route[1]}
                    apikey={gAPiKey}
                    mode="DRIVING"
                    strokeWidth={2}
                />
            )
        } 
        console.log({youLocLen: yourLocation.length });
        if (yourLocation.length == 2) {
            ll.push(
                <MapViewDirections
                    key={"driverWay"}
                    origin={yourLocation[0]}
                    destination={yourLocation[1]}
                    apikey={gAPiKey}
                    mode="DRIVING"
                    strokeWidth={1}
                    strokeColor="red"
                />
            )
        }
        return ll;
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
                    <MyButton
                        theme={true}
                        title={Lang("driver.fetch")}
                        style={[UI.setHeight(50), commonStyle.mtmd]}
                        onPress={onConfirmRequest}
                    />
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
                                    {Lang("driver.phone") + ": "}
                                    <Text style={[commonStyle.textDark]}>{bookingData.rider}</Text>
                                </Text>
                                <Text style={[commonStyle.themeNormalText, commonStyle.textBold, commonStyle.textOffSky]}> 
                                    {Lang("driver.distance") + ": "}<Text style={[commonStyle.textDark]}>{bookingData.distance} K.M</Text>
                                </Text>
                                <Text style={[commonStyle.themeNormalText, commonStyle.textBold,commonStyle.textOffSky]}>
                                    {Lang("driver.fare") + ": "}<Text style={[commonStyle.textDark]}>{bookingData.fare} Rs.</Text>
                                </Text>
                            </View>
                            <View style={[commonStyle.row, commonStyle.center]}>
                                <MyButton
                                    theme={true}
                                    title={Lang("driver.accept")}
                                    style={[UI.setHeight(40)]}
                                    arg={bookingData}
                                    onPress={onConfirmRequest}
                                />
                                <MyButton
                                    theme={true}
                                    title={Lang("driver.wait")}
                                    disabled={bookingData.status == "onWait"}
                                    style={[UI.setHeight(40),commonStyle.bgOrange, commonStyle.mlmd]}
                                    onPress={onWait}
                                />
                                <MyButton
                                    theme={true}
                                    title={Lang("driver.cancel")}
                                    onPress={onCancelReq}
                                    style={[UI.setHeight(40),commonStyle.bgDarkRed, commonStyle.mlmd]}
                                />
                            </View>
                        </View>
                    )
            case 'onGoing': 
                return (
                    <MyButton
                        theme={true}
                        title={Lang("driver.complete")}
                        style={[UI.setHeight(50), commonStyle.hPadLg, commonStyle.mbmd]}
                        onPress={onComplete}
                    />
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
                            ref={mapRef}
                            provider={UI.ios ? null : PROVIDER_GOOGLE}
                            initialRegion={locationRegion}
                            onRegionChange={onRegionChange}
                            onLongPress={setDriverLocation}
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
                                    pinColor= {index == 0 ? "#23cf51" : "red"}
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