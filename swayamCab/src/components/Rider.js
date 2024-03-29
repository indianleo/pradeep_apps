import React from  'react';
import { 
    View, 
    Text,
    StyleSheet, 
    TouchableOpacity,  
    Image,
    KeyboardAvoidingView
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import Geolocation from "react-native-geolocation-service";
import { checkBlank, dbOff, gAPiKey, getTableRef, pushDb, updatDb } from '../config/myConfig';
import { getDistance } from 'geolib';
import MapViewDirections from 'react-native-maps-directions';
import MyButton from '../libs/MyButton';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icons from '../libs/Icons';
import Loader from '../libs/Loader';
import { notify, notifyByTime } from '../config/theme';
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
    const [driverData, setDriverData] =  React.useState({});
    const [currentDriver, setCurrentDriver] =  React.useState({});
    const [currentBooking, setCurrentBooking] = React.useState("");
    const [rejectList, setReject] = React.useState({});
    const contextOption = React.useContext(MyContext);
    let destRef = React.useRef();
    let pickRef = React.useRef();
    const mapRef = React.useRef();
    const bookingFlags = ["onGoing", "onWait", "pending"];
    const buffer = {};
    const constextOption = React.useContext(MyContext);

    React.useEffect(()=> {
        const userRef = getTableRef(`/users/${contextOption.userId}`).on('value', snapshot => {
            let _td = snapshot.val();
            setUserData({..._td});
            
            if (_td.driver == "selectNew" && _td.currentBooking != "free") {
                notifyByTime("Driver is not free and canceled your ride request.", 5);
                setLayout("onCancelFromDriver");
            } else if (_td.currentBooking != "free") {
                loadCurrentRide(_td);
            } else {
                setLayout(_td.currentStatus);
            }
        });
        const driverRef = getTableRef("drivers").orderByChild('isOnline').equalTo(1).on("value", (res)=> {
            setDriverMarker(res.val());
        })
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
                        description: addJson.results[0].formatted_address,
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

        return ()=> onUnmount(driverRef, userRef);
    
    }, []);  
    
    const onUnmount = (driverRef, userRef) => {
        userRef && dbOff(`/users/${contextOption.userId}`, userRef);
        (driverRef) && dbOff(`/drivers/${currentDriver}`, driverRef);
    }

    const onRegionChange = (newRegion)=> {
        updateLocationRegion(newRegion);
    }

    const fetchLive = () => {
        if (userData.currentBooking) {
            loadCurrentRide(userData);
            setTimeout(()=> {
                mapRef.current.animateToRegion({
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    ...locationMarkers[0].co,
                });
            }, 500);
        }
    }

    const loadCurrentRide = (_ud) => {
        getTableRef(`/booking/${_ud.currentBooking}`).once('value').then((res)=> {
            let bookingData = res.val();
            if ( bookingFlags.includes(_ud.currentStatus) ) {
                setDistance(bookingData.distance);
                setFare(bookingData.fare);
                let tempMarker = [];
                let _route = [];
                tempMarker.push(bookingData.from);
                tempMarker.push(bookingData.to);
                _route.push(bookingData.from.co);
                _route.push(bookingData.to.co);
                updateRoute([..._route]);
                updateMarkers([...tempMarker]);
                setCurrentBooking(_ud.currentBooking);
                setLayout("currentRide");
            } 
        });
    }

    const caluclteDetails = (desti) => {
        if (locationMarkers[0]) {
            let dis = getDistance(locationMarkers[0].co, desti)/1000;
            setDistance(dis);
            if (dis < 4) {
                setFare(250)
            } else {
                let extraDis = dis - 4;
                let totalFare = Math.round(extraDis * 30 + 250);
                setFare(totalFare);
            } 
        } else {
            showInfoModal(Lang("rider.pickupLocWarn"));
        }
    }

    const onMapTouch = (event)=> {
        console.log("mapTouch");
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
        let tempMarker = [];
        for (let key in _driverLocation) {
            if (_driverLocation[key].isOnline == 1) {
                if (!rejectList[key]) {
                    tempMarker.push({
                        title: _driverLocation[key].name,
                        co: {latitude: _driverLocation[key].latitude, longitude: _driverLocation[key].longitude},
                        description: key,
                        driverId: key,
                        role:  "driver",
                        ..._driverLocation[key]
                    })
                }
            }
        }
        if (tempMarker.length > 0) {
            setCurrentDriver(tempMarker[0].driverId);
            setDriverData(tempMarker[0]);
        }
        updateDriverMarker([...tempMarker]);
    }

    const onSelectDriver = (_marker) => {
        setCurrentDriver(_marker.driverId);
    }

    const handleAddress = (type, value, fromSearch)=> {
        console.log({type, value});
        let temp = query;
        temp[type] = value;
        setQuery({...temp});
        if (!fromSearch) {
            if (type == "pickup" && pickRef?.current) pickRef.current.setAddressText(value);
            if (type == "destination" && destRef?.current) destRef.current.setAddressText(value);
        }
    }

    const onGoogleSearch = (type, details) => {
        let tempMarker = locationMarkers;
        let tempRoute = route;
        let loc = details.geometry.location;
        if (type == "destination") {
            if (locationMarkers.length == 0) {
                showInfoModal(Lang("rider.confirmPickup"));
                return;
            }
            let destiObj = {
                    title: "Destination",
                    co: {latitude: loc.lat, longitude: loc.lng},
                    description: details.formatted_address,
                };
            if (locationMarkers.length == 1) {
                tempMarker.push(destiObj);
            } else {
                tempMarker[1] = destiObj;
            }
            updateMarkers([...tempMarker]);
            if (route.length == 1) {
                tempRoute.push({latitude: loc.lat, longitude: loc.lng});
            } else {
                tempRoute[1] = {latitude: loc.lat, longitude: loc.lng};
            }
            updateRoute([...tempRoute]);
            caluclteDetails({latitude: loc.lat, longitude: loc.lng});
        } else if (type == "pickup") {
            let pickObj = {
                title: "Ride from here",
                co: {latitude: loc.lat, longitude: loc.lng},
                description: details.formatted_address,
            };
            mapRef.current.animateToRegion({
                latitude: loc.lat,
                longitude: loc.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            setTimeout(()=> {
                if (locationMarkers.length == 0) {
                    tempMarker.push(pickObj);
                } else {
                    tempMarker[0] = pickObj;
                }
                
                tempRoute[0] = {latitude: loc.lat, longitude: loc.lng};
                updateMarkers([...tempMarker]);
                updateRoute([...tempRoute]);
            }, 300);
        }
    }

    const setLocationFor = (event) => {
        console.log({query});
        if (event == "destination" && query.destination) {
            if (locationMarkers.length == 1) {
                let tempMarker = locationMarkers;
                UI.geoFrom(query.destination).then((addJson)=> {
                    let loc = addJson.results[0].geometry.location;
                    tempMarker.push({
                        title: "Destination",
                        co: {latitude: loc.lat, longitude: loc.lng},
                        description: query.destination,
                    })
                    updateMarkers([...tempMarker]);
                    updateRoute([...route, ...[{latitude: loc.lat, longitude: loc.lng}] ]);
                    caluclteDetails({latitude: loc.lat, longitude: loc.lng});
                }).catch((err)=> {
                    console.log(err);
                });
            } else {
                showInfoModal(Lang("rider.confirmPickup"));
            }
        } else if (event == "pickup" && query.pickup) {
            let tempMarker = locationMarkers;
            let tempRoute = route;
            UI.geoFrom(query.pickup).then((addJson)=> {
                let loc = addJson.results[0].geometry.location;
                mapRef.current.animateToRegion({
                    latitude: loc.lat,
                    longitude: loc.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
                setTimeout(()=> {
                    tempMarker[0] = {
                        title: "Ride from here",
                        co: {latitude: loc.lat, longitude: loc.lng},
                        description: query.destination,
                    };
                    tempRoute[0] = {latitude: loc.lat, longitude: loc.lng};
                    updateMarkers([...tempMarker]);
                    updateRoute([...tempRoute]);
                }, 500);
            }).catch((err)=> {
                console.log(err);
            });

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

    const createRequest = (action) => {
        let checkObj = {
            "from": locationMarkers[0],
            "to": locationMarkers[1],
            "userId": contextOption.userId,
            "driver": currentDriver,

        }
        let warn = checkBlank(checkObj, ["from","to","driver", "userId"]);
        if (warn) {
            showInfoModal(Lang(warn));
            return false;
        }

        let _dd = new Date();
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
            setCurrentBooking(key);

            //rider
            updatDb(`/users/${contextOption.userId}`, {...route[0]});
            pushDb(`/users/${contextOption.userId}/history`, {bookingId: key});
            updatDb(`/users/${contextOption.userId}`, {currentBooking: key, currentStatus: "pending", driver: currentDriver});
            
            //Driver
            pushDb(`/users/${currentDriver}/history`, {bookingId: key});
            getTableRef(`/users/${currentDriver}`).once('value').then((res)=> {
                let checkDriver = res.val();
                if (checkDriver.currentBooking == "free") {
                    updatDb(`/users/${currentDriver}`, {currentBooking: key, currentStatus: "pending"});
                } else {
                    let currPending = +(checkDriver.pendingBooking);
                    updatDb(`/users/${currentDriver}`, {pendingBooking: currPending + 1});
                }
            })
        });
        setReject({ ...rejectList, ...{[currentDriver]: "used"}});
        setLayout("currentRide");
    }

    const onBook = () => {
        setLayout("selectArea");
    }

    const cancelRide = () => {
        if (!currentBooking) {
            alert("No found");
            return;
        }
        //booking
        updatDb(`/booking/${currentBooking}`, {status: "CanceledByRider"});

        //Rider
        updatDb(`users/${contextOption.userId}`, {currentStatus: "free", driver: "selectNew", currentBooking: "free"});
        
        // Driver
        updatDb(`/users/${currentDriver}`, {currentStatus: "free", currentBooking: "free"});

        resetSelect();
    }

    const sendMsg = (str) => {
        if (!str || str.length < 5) return false;
        if (buffer['notify']) clearTimeout(buffer['notify']);
        buffer['notify'] = setTimeout(()=> {
            notify(str);
        }, 2000);
    }

    const resetSelect = () => {
        console.log("Reset", locationMarkers);
        //if (locationMarkers.length > 1) {
            updateMarkers([]);
            updateRoute([]);
            //setCurrentDriver("");
            handleAddress('destination', "");
            handleAddress('pickup', "");
            setCurrentBooking("");
        //} 
        (currentLayout != "selectArea") && setLayout("selectArea");
    }

    const getStatus = (textStyle) => {
        let text = "";
        let details = null;
        if (userData.currentStatus == "Completed" && userData.currentBooking == "free") {
            details = (
                <View style={[commonStyle.pbMd, commonStyle.center]}>
                    <Icons
                        iconSet="ionicons"
                        name="md-checkmark-done-circle-sharp"
                        size={50}
                        style={[UI.setColor("green")]}
                    />
                </View>
            )
        } else {
            details = (
                <View style={[commonStyle.pbMd]}>
                    <Text style={textStyle}>
                        {"Driver Name: "}
                        <Text style={[commonStyle.textDark]}>{driverData.name}</Text>
                    </Text>
                    <Text style={textStyle}>
                        {"Driver Phone: "}
                        <Text style={[commonStyle.textDark]}>{currentDriver}</Text>
                    </Text>
                    <Text style={textStyle}> 
                        {"Distance: "} <Text style={[commonStyle.textDark]}>{distance} K.M</Text>
                    </Text>
                    <Text style={textStyle}>
                        {"Fare: "}<Text style={[commonStyle.textDark]}>{fare} Rs.</Text>
                    </Text>
                    <Text style={textStyle}>
                        {"Booking ID: "}<Text style={[commonStyle.textDark]}>{userData.currentBooking}</Text>
                    </Text>
                </View>
            )
        }
        switch (userData.currentStatus) {
            case 'pending': text = Lang("rider.pendingSt");
            break;
            case 'onWait': text = Lang("rider.waitSt");
            break;
            case 'onGoing': text = Lang("rider.goingSt");
            break;
            case 'Completed': text = Lang("rider.completed");
            break;
        }

        sendMsg(text);

        return (
            <View>
                {
                    userData.currentStatus == "pending" || userData.currentStatus == "onWait" 
                        ? null
                        : details
                            
                }
                <View style={[commonStyle.bgLightSky, commonStyle.pMd, commonStyle.br]}>
                    <Text style={[commonStyle.themeSkyText, commonStyle.vPadMd]}>
                        {text}
                    </Text>
                </View>
            </View>
        )
    }

    const selectLayout = (type)=> {
        const textStyle = [commonStyle.themeNormalText, commonStyle.textBold,commonStyle.textOffSky];
        switch(type || currentLayout) {
            case 'onCancelFromDriver': 
                return (
                    <View>
                        <View style={[commonStyle.pbLg, commonStyle.bgLightSky]}>
                            <Text style={textStyle}>
                                {Lang("rider.cancelByDriver")}
                            </Text>
                        </View>
                        <View style={[commonStyle.row, commonStyle.center]}>
                            <MyButton
                                theme={"sky"}
                                title={Lang("rider.sendNew")}
                                style={[UI.setHeight(50)]}
                                onPress={createRequest}
                            />
                            <MyButton
                                theme={"sky"}
                                title={Lang("rider.cancel")}
                                style={[UI.setHeight(50), commonStyle.mlmd]}
                                onPress={resetSelect}
                            />
                        </View>
                    </View>
                )
            case 'detailRide': 
                    return (
                        <View>
                            <View style={[commonStyle.pbLg]}>
                                <Text style={textStyle}>
                                    {Lang("rider.desti") + ": "}
                                    <Text style={[commonStyle.textDark]}>{query.destination}</Text>
                                </Text>
                                <Text style={textStyle}> 
                                    {Lang("rider.distance") + ": "} 
                                    <Text style={[commonStyle.textDark]}>{distance} K.M</Text>
                                </Text>
                                <Text style={textStyle}>
                                    {Lang("rider.fare") + ": "}
                                    <Text style={[commonStyle.textDark]}>{fare} Rs.</Text>
                                </Text>
                            </View>
                            <View style={[commonStyle.row, commonStyle.center]}>
                                <MyButton
                                    theme={"sky"}
                                    title={Lang("rider.sendReq")}
                                    style={[UI.setHeight(50)]}
                                    onPress={createRequest}
                                />
                                <MyButton
                                    theme={"sky"}
                                    title={Lang("rider.cancel")}
                                    style={[UI.setHeight(50), commonStyle.mlmd]}
                                    onPress={resetSelect}
                                />
                            </View>
                        </View>
                    )
            case 'selectArea':
                return (
                    <View>
                        <Text style={[commonStyle.themeSkyTextSm, commonStyle.pb]}>
                            {Lang("rider.selPick")}:
                        </Text>
                        <GooglePlacesAutocomplete
                            ref={pickRef}
                            placeholder='Pickup'
                            enableHighAccuracyLocation={true}
                            minLength={3}
                            fetchDetails={true}
                            listUnderlayColor="lightgrey"
                            textInputProps={{
                                onChange: (event) => {
                                    handleAddress("pickup", event.nativeEvent.text, true);
                                },
                                value: query.pickup,
                            }}
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                handleAddress("pickup", details.formatted_address, true);
                                onGoogleSearch("pickup", details);
                            }}
                            enablePoweredByContainer={false}
                            query={{
                                key: gAPiKey,
                                language: 'en',
                            }}
                            renderRightButton={()=> 
                                <MyButton
                                    type={"icon"}
                                    style={[commonStyle.pMd, UI.setBorderLeft(1, '#ccc')]}
                                    iconSet="materialIcons"
                                    iconName="my-location"
                                    iconSize={25}
                                    iconStyle={[UI.setColor("green")]}
                                    arg={"pickup"}
                                    onPress={setLocationFor}
                                />
                            }
                            styles={searchStyle}
                        />
                        
                        <Text style={[commonStyle.themeSkyTextSm, commonStyle.pb, commonStyle.ptMd]}>
                            {Lang("rider.selDesti")}:
                        </Text>
                        <GooglePlacesAutocomplete
                            ref={destRef}
                            placeholder='Destination'
                            enableHighAccuracyLocation={false}
                            minLength={3}
                            fetchDetails={true}
                            listUnderlayColor="lightgrey"
                            textInputProps={{
                                onChange: (event) => {
                                    handleAddress("destination", event.nativeEvent.text, true);
                                },
                                value: query.destination,
                            }}
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                handleAddress("destination", details.formatted_address, true);
                                onGoogleSearch("destination", details);
                            }}
                            query={{
                                key: gAPiKey,
                                language: 'en',
                            }}
                            renderRightButton={()=> 
                                    <MyButton
                                    type={"icon"}
                                    style={[commonStyle.pMd, UI.setBorderLeft(1, '#ccc')]}
                                    onPress={setLocationFor}
                                    arg={"destination"}
                                    iconSet="materialIcons"
                                    iconName="my-location"
                                    iconSize={25}
                                    iconStyle={[UI.setColor("red")]}
                                />
                            }
                            styles={searchStyle}
                            
                        />
                        <View style={[commonStyle.row, commonStyle.center, commonStyle.ptMd]}>
                            <MyButton
                                theme={"sky"}
                                title={Lang("rider.confirm")}
                                style={[UI.setHeight(40)]}
                                onPress={()=> setLayout("detailRide")}
                            />
                            <MyButton
                                theme={"sky"}
                                title={Lang("rider.reset")}
                                style={[UI.setHeight(40), commonStyle.mlmd]}
                                onPress={resetSelect}
                            />
                        </View>
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
            case 'Completed':
                return (
                    <View>
                        <View style={[commonStyle.pbLg]}>
                            {getStatus(textStyle)}
                        </View>
                        <View style={[commonStyle.pbLg]}>
                            <Text style={textStyle}>
                                {Lang("rider.desti") + ": "}
                                <Text style={[commonStyle.textDark]}>{query.destination}</Text>
                            </Text>
                            <Text style={textStyle}> 
                                {Lang("rider.distance") + ": "} 
                                <Text style={[commonStyle.textDark]}>{distance} K.M</Text>
                            </Text>
                            <Text style={textStyle}>
                                {Lang("rider.fare") + ": "}
                                <Text style={[commonStyle.textDark]}>{fare} Rs.</Text>
                            </Text>
                        </View>
                        <View style={[commonStyle.center, commonStyle.pMd]}>
                            <MyButton
                                theme={"sky"}
                                title={Lang("rider.ok")}
                                style={[UI.setHeight(45),UI.setWidth(80), commonStyle.ml]}
                                onPress={resetSelect}
                            />
                        </View>
                    </View>
                )
            case "currentRide":
                return (
                    <View>
                        <View style={[commonStyle.pbLg]}>
                            {getStatus(textStyle)}
                        </View>
                        <View style={[commonStyle.row, commonStyle.center, commonStyle.pMd]}>
                            {/* <MyButton
                                theme={"sky"}
                                title={Lang("rider.fetch")}
                                style={[UI.setHeight(50)]}
                                onPress={fetchLive}
                            /> */}
                            <MyButton
                                theme={"sky"}
                                title={Lang("rider.cancel")}
                                style={[UI.setHeight(50), commonStyle.bgDarkRed, commonStyle.ml]}
                                onPress={cancelRide}
                            />
                        </View>
                    </View>
                )
            default:
                return (
                    <View style={[UI.setHeight(100, '%'), UI.setPadding(10,5,5,5, '%')]}>
                        <Text 
                            style={[commonStyle.themeText, commonStyle.textDark, commonStyle.pbLg]}
                        >
                            {Lang("rider.bookRide")}
                        </Text>
                        <MyButton
                            theme={"sky"}
                            title={Lang("rider.btnBook")}
                            style={[UI.setHeight(50)]}
                            textStyle={[commonStyle.fs2]}
                            onPress={onBook}
                        />
                    </View>
                );
        }
    }

    return (
        <MyContext.Consumer>
            {context=>
                <KeyboardAvoidingView style={[UI.setScreen()]} behavior={"height"}>
                    <View style={[UI.setWidth(), UI.setHeight(UI.height()/1.58)]}>
                        <MapView
                            ref={mapRef}
                            provider={UI.ios ? null : PROVIDER_GOOGLE}
                            initialRegion={locationRegion}
                            onRegionChange={onRegionChange}
                            //onPress={onMapTouch}
                            onLongPress={onMapTouch}
                            style={css.map}
                            loadingEnabled = {true}
                            loadingIndicatorColor="#666666"
                            loadingBackgroundColor="#eeeeee"
                            showsUserLocation={true}
                            //followsUserLocation={true}
                        >
                            {locationMarkers.map((_marker, index) => (
                                <Marker
                                    key={index}
                                    coordinate={_marker.co}
                                    title={_marker.title}
                                    description={_marker.description}
                                    onPress={()=> console.log(_marker)}
                                    pinColor= {index == 0 ? "#23cf51" : "red"}
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
                            commonStyle.absolute, 
                            commonStyle.bgWhite,
                            commonStyle.center,
                            UI.setBottom(7.9, '%'),
                            UI.setLeft(3),
                            UI.setBorder(1, '#ccc'),
                            UI.setRadiusOn(20, 'topStart'),
                            UI.setRadiusOn(20, 'topEnd'),
                            UI.setPadding(20,0,10,0)
                        ]}
                    >
                        <View 
                            style={[ 
                                UI.setWidth(),
                                UI.setPadding(20,20,20,20),
                            ]}
                        >
                            {selectLayout()}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            }
        </MyContext.Consumer>
    )
}

const css = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
      },
})
const searchStyle = StyleSheet.create({
    textInputContainer: {
        borderColor: '#b3cce6',
        borderWidth: 1
    },
    textInput: {
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
    },
});

export default Rider;