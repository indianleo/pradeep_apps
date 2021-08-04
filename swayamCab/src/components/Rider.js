import React from  'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import Geolocation from "react-native-geolocation-service";
import { dbOff, gAPiKey, getTableRef, pushDb, requestLocation, updatDb } from '../config/myConfig';
import { getDistance } from 'geolib';
import MapViewDirections from 'react-native-maps-directions';
import Icons from '../libs/Icons';
import InfoModal from '../libs/InfoModal';
// getDistance return in meter

const Rider = (props)=> {
    const [currentLayout, setLayout] = React.useState("initial");
    const [locationRegion, updateLocationRegion] = React.useState(null);
    const [locationMarkers, updateMarkers] = React.useState([]);
    const [driverMarker, updateDriverMarker] = React.useState([]);
    const [distance, setDistance] = React.useState(0);
    const [fare, setFare] = React.useState(250);
    const [route, updateRoute] = React.useState([]);
    const [query, setQuery] = React.useState({pickup: "", destination: ""});
    const [userData, setUserData] = React.useState({});
    //const [drivers, setDrivers] =  React.useState(null);
    const [currentDriver, setCurrentDriver] =  React.useState({});
    const contextOption = React.useContext(MyContext);
    const [layoutModal, setModalLayout] = React.useState(null);
    const [isModal, showModal] = React.useState(false);

    React.useEffect(()=> {
        const tableRef = getTableRef(`/users/${contextOption.userId}`).on('value', snapshot => {
            let _td = snapshot.val();
            setUserData({..._td});
            if (_td.driver == "selectNew" && _td.currentBooking != "free") {
                setLayout("detailRide")
            } else if (_td.currentBooking != "free") {
                loadCurrentRide(_td);
            }
        });
        getTableRef("drivers").once("value").then((res)=> {
            setDriverMarker(res.val());
        })
        if (!UI.ios) requestLocation();
        Geolocation.getCurrentPosition((position) => {
                let tempMarker = [];
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
                updateRoute([...userCo]);
                UI.geoFrom(userCo[0]).then((addJson)=> {
                    handleAddress('pickup', addJson.results[0].formatted_address);
                    tempMarker.push({
                        title: "Pickup Location",
                        co: userCo[0],
                        description: addJson.results[0].formatted_address
                    });
                    updateMarkers([...tempMarker]);
                }).catch((err)=> {
                    console.log(err);
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
        updateLocationRegion(newRegion);
    }

    const loadCurrentRide = (_ud) => {
        getTableRef(`/booking/${_ud.currentBooking}`).once('value').then((res)=> {
            let bookingData = res.val();
            if (_ud.currentStatus == "onGoing") {
                setDistance(bookingData.distance);
                setFare(bookingData.fare);
                let tempMarker = locationMarkers;
                let _route = route;
                tempMarker.push(bookingData.from);
                tempMarker.push(bookingData.to);
                _route.push(bookingData.from.co);
                _route.push(bookingData.to.co);
                updateRoute([..._route]);
                updateMarkers([...tempMarker]);

                setLayout("status");
            } 
        });
    }

    const caluclteDetails = (desti) => {
        let dis = getDistance(locationMarkers[0].co, desti)/1000;
        setDistance(dis);
        if (dis < 4) {
            setFare(250)
        } else {
            let extraDis = dis - 4;
            let totalFare = extraDis * 30 + 250;
            setFare(totalFare);
        }   
    }

    const onMapTouch = (event)=> {
        if (currentLayout == "selectArea") {
            event.persist();
            let tempMarker = locationMarkers;
            if (tempMarker.length == 1) {
                updateRoute([...route, ...[event.nativeEvent.coordinate] ]);
                caluclteDetails(event.nativeEvent.coordinate);
                
                UI.geoFrom(event.nativeEvent.coordinate).then((addJson)=> {
                    handleAddress('destination', addJson.results[0].formatted_address);
                    tempMarker.push({
                        title: "Destination",
                        co: event.nativeEvent.coordinate,
                        description: addJson.results[0].formatted_address,
                    })
                    updateMarkers([...tempMarker]);
                }).catch((err)=> {
                    console.log(err);
                });
            }
        }
    }

    const setDriverMarker = (_driverLocation) => {
        let tempMarker = driverMarker;
        for (let key in _driverLocation) {
            if (_driverLocation[key].isOnline == 1) {
                tempMarker.push({
                    title: _driverLocation[key].name,
                    co: {latitude: _driverLocation[key].latitude, longitude: _driverLocation[key].longitude},
                    description: key,
                    driverId: key,
                    role:  "driver",
                })
            }
        }
        updateDriverMarker([...tempMarker]);
    }

    const onSelectDriver = (_marker) => {
        setCurrentDriver(_marker.driverId);
    }

    const handleAddress = (type, value)=> {
        console.log({type, value});
        let temp = query;
        temp[type] = value;
        setQuery({...temp});
    }

    const setLocationFor = (event) => {
        if (event) {
            console.log(event.nativeEvent.coordinate);
            updatDb(`/drivers/7800794003`, event.nativeEvent.coordinate).then(()=> {
                console.log("location fro driver set");
            })
        } else {
            console.log(driverMarker);
        }
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

    const createRequest = () => {
        if (!locationMarkers[0] && !locationMarkers[1]) {
            showInfoModal("Select Destination First");
            return false;
        }
        if (!contextOption.userId && !currentDriver) {
            showInfoModal("Select Driver First");
            return false;
        }
        let _dd = new Date();
        updatDb(`/users/${contextOption.userId}`, {
            ...route[0],
        });
        pushDb("/booking", 
            {
                id: 1, 
                driver: currentDriver, 
                rider: contextOption.userId,
                fare: fare,
                distance: distance,
                onDate: _dd.toDateString(),
                from: locationMarkers[0], 
                to: locationMarkers[1], 
                status: "pending"
            }
        ).then((key)=> {
            pushDb(`/users/${contextOption.userId}/history`, {bookingId: key});
            updatDb(`/users/${contextOption.userId}`, {currentBooking: key, currentStatus: "pending", driver: currentDriver});
            updatDb(`users/${currentDriver}`, {currentBooking: key, currentStatus: "pending"});
        });
        setLayout("status");
    }

    const selectLayout = (type)=> {
        switch(type || currentLayout) {
            case 'detailRide': 
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
                                    <Text style={[commonStyle.textDark]}>Hello pickup</Text>
                                </Text>
                                <Text style={[commonStyle.themeNormalText, commonStyle.textBold, commonStyle.textOffSky]}> 
                                    {"Distance: "} <Text style={[commonStyle.textDark]}>{distance} K.M</Text>
                                </Text>
                                <Text style={[commonStyle.themeNormalText, commonStyle.textBold,commonStyle.textOffSky]}>
                                    {"Fare: "}<Text style={[commonStyle.textDark]}>{fare} Rs.</Text>
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={[
                                    commonStyle.bgOffSky,
                                    UI.setHeight(50),
                                    UI.setWidth(50, '%'),
                                    commonStyle.center,
                                    commonStyle.br,
                                    commonStyle.shadow
                                ]}
                                onPress={createRequest}
                            >
                                <Text 
                                    style={[
                                        commonStyle.textStyle, 
                                        commonStyle.fs5, 
                                        commonStyle.textWhite
                                    ]}
                                >
                                    Send Request
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
            case 'selectArea':
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
                        <View 
                            style={[
                                commonStyle.textBoxBorderColor, 
                                commonStyle.mbmd,
                                commonStyle.row,
                                commonStyle.vCenter
                            ]}
                        >
                            <TextInput
                                style={commonStyle.inputBox}
                                placeholder={"Pickup Location"}
                                placeholderTextColor="#003f5c"
                                onChangeText={handleAddress.bind(this, 'pickup')}
                                value={query.pickup}
                            />
                            <TouchableOpacity 
                                style={[
                                    commonStyle.pMd, 
                                    UI.setBorderLeft(1, '#ccc'),
                                ]}
                                onPress={setLocationFor}
                            >
                                <Icons
                                    iconSet="materialIcons"
                                    name="my-location"
                                    size={25}
                                    style={[commonStyle.textWhite]}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                commonStyle.textBoxBorderColor, 
                                commonStyle.mbmd,
                                commonStyle.row,
                                commonStyle.vCenter
                            ]}
                        >
                            <TextInput
                                style={commonStyle.inputBox}
                                placeholder={"Destination"}
                                placeholderTextColor="#003f5c"
                                onChangeText={handleAddress.bind(this, "destination")}
                                value={query.destination}
                            />
                            <TouchableOpacity 
                                style={[commonStyle.pMd, UI.setBorderLeft(1, '#ccc')]}
                                onPress={setLocationFor}
                            >
                                <Icons
                                    iconSet="materialIcons"
                                    name="my-location"
                                    size={25}
                                    style={[commonStyle.textWhite]}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={[
                                commonStyle.bgOffSky,
                                UI.setHeight(50),
                                UI.setWidth(50, '%'),
                                commonStyle.center,
                                commonStyle.br,
                                commonStyle.shadow
                            ]}
                            onPress={()=> setLayout("detailRide")}
                        >
                            <Text 
                                style={[
                                    commonStyle.textStyle, 
                                    commonStyle.fs5, 
                                    commonStyle.textWhite
                                ]}
                            >
                                Confirm
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            case 'status': 
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
                        onPress={()=> alert("status")}
                    >
                        <Text 
                            style={[
                                commonStyle.textStyle, 
                                commonStyle.fs5, 
                                commonStyle.textWhite,
                                commonStyle.textBold
                            ]}
                        >
                            {"Status: "}
                            <Text style={[commonStyle.textLight]}>
                                {userData.currentStatus}
                            </Text>
                        </Text>
                    </TouchableOpacity>
                );
            default:
                return (
                    <TouchableOpacity
                        style={[
                            commonStyle.bgOffSky,
                            UI.setHeight(50),
                            UI.setWidth(50, '%'),
                            commonStyle.center,
                            commonStyle.br,
                            commonStyle.shadow,
                            commonStyle.mbmd
                        ]}
                        onPress={()=> setLayout("selectArea")}
                    >
                        <Text style={[commonStyle.textStyle, commonStyle.fs5, commonStyle.textWhite]}>
                            Book Your Ride
                        </Text>
                    </TouchableOpacity>
                );
        }
    }

    return (
        <MyContext.Consumer>
            {context=>
                <View style={[UI.setScreen()]}>
                    <View style={[UI.setWidth(), UI.setHeight(UI.height()/1.5)]}>
                        <MapView
                            provider={UI.ios ? null : PROVIDER_GOOGLE}
                            initialRegion={locationRegion}
                            onRegionChange={onRegionChange}
                            onPress={onMapTouch}
                            onLongPress={setLocationFor}
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
                            {driverMarker.map((_marker, index) => (
                                <Marker
                                    key={index}
                                    coordinate={_marker.co}
                                    title={_marker.title}
                                    description={_marker.description}
                                    onPress={onSelectDriver.bind(this, _marker)}
                                    image={null}
                                >
                                    <Image
                                        source={require("../images/icons/car.png")}
                                        style={[commonStyle.imgContain, UI.setScreen(40,40)]}
                                    />
                                </Marker>
                            ))}
                            {getMapRoute()}
                        </MapView>
                    </View>
                    <View 
                        style={[
                            UI.setWidth(),
                            commonStyle.bgWhite
                        ]}
                    >
                        {selectLayout()}
                    </View>
                    <InfoModal 
                        isVisible={isModal}
                        extranal={layoutModal}
                        onClose={()=> showModal(false)}
                    />
                </View>
            }
        </MyContext.Consumer>
    )
}

const css = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
      },
})

export default Rider;