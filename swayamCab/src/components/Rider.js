import React from  'react';
import { 
    View, 
    Text, 
    ScrollView, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    Image,
    KeyboardAvoidingView
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import Geolocation from "react-native-geolocation-service";
import { checkBlank, dbOff, gAPiKey, getTableRef, pushDb, updatDb } from '../config/myConfig';
import { getDistance } from 'geolib';
import MapViewDirections from 'react-native-maps-directions';
import Icons from '../libs/Icons';
import MyButton from '../libs/MyButton';
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

    React.useEffect(()=> {
        const userRef = getTableRef(`/users/${contextOption.userId}`).on('value', snapshot => {
            let _td = snapshot.val();
            setUserData({..._td});
            
            if (_td.driver == "selectNew" && _td.currentBooking != "free") {
                setLayout("onCancelFromDriver");
            } else if (_td.currentBooking != "free") {
                loadCurrentRide(_td);
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

        return ()=> onUnmount(driverRef, userRef);
    
    }, []);  
    
    const onUnmount = (driverRef, userRef) => {
        userRef && dbOff(`/users/${contextOption.userId}`, userRef);
        driverRef && dbOff(`/drivers/${currentDriver}`, driverRef);
    }

    const onRegionChange = (newRegion)=> {
        updateLocationRegion(newRegion);
    }

    const loadCurrentRide = (_ud) => {
        getTableRef(`/booking/${_ud.currentBooking}`).once('value').then((res)=> {
            let bookingData = res.val();
            console.log(_ud.currentStatus);
            if (_ud.currentStatus == "onGoing" || _ud.currentStatus == "pending") {
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
                
                setLayout("currentRide");
            } 
        });
    }

    const caluclteDetails = (desti) => {
        console.log(desti);
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

    const handleAddress = (type, value)=> {
        console.log({type, value});
        let temp = query;
        temp[type] = value;
        setQuery({...temp});
    }

    const setLocationFor = (event) => {
        if (typeof  event != "string") {
            console.log(event.nativeEvent.coordinate);
            updatDb(`/drivers/${currentDriver}`, event.nativeEvent.coordinate).then(()=> {
                console.log("location fro driver set");
            })
        } else if (query.destination && locationMarkers.length == 1) {
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
            console.log(query.destination);
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
            showInfoModal(warn);
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
            updatDb(`users/${currentDriver}`, {currentBooking: key, currentStatus: "pending"});
        });
        setReject({ ...rejectList, ...{[currentDriver]: "used"}});
        setLayout("currentRide");
    }

    const onBook = () => {
        setLayout("selectArea");
    }

    const cancelRide = () => {
        //booking
        updatDb(`/booking/${currentBooking}`, {status: "CanceledByRider"});

        //Rider
        updatDb(`users/${contextOption.userId}`, {currentStatus: "free", driver: "selectNew", currentBooking: "free"});
        
        // Driver
        updatDb(`/users/${currentDriver}`, {currentStatus: "free", currentBooking: "free"});

        resetSelect();
    }

    const resetSelect = () => {
        console.log("Reset", locationMarkers.length);
        if (locationMarkers.length > 1) {
            let temp = locationMarkers;
            let rou = route;
            temp.pop();
            rou.pop()
            updateMarkers(temp);
            updateRoute(rou);
            handleAddress('destination', "");
            setCurrentBooking("");
        } 
        (currentLayout != "selectArea") && setLayout("selectArea");
    }

    const getStatus = () => {
        switch (userData.currentStatus) {
            case 'pending': return "Driver did not accepted your request yet.";
            case 'onWait': return "Please wait driver requested to Wait for few minutes";
            case 'onGoing': return "You are in a ride and you will reach in sometimes";
        }
    }

    const selectLayout = (type)=> {
        const textStyle = [commonStyle.themeNormalText, commonStyle.textBold,commonStyle.textOffSky];
        switch(type || currentLayout) {
            case 'onCancelFromDriver': 
                return (
                    <View>
                        <View style={[commonStyle.pbLg]}>
                            <Text style={textStyle}>
                                Driver will unable to reach on time so please request again to another driver.
                            </Text>
                        </View>
                        <View style={[commonStyle.row, commonStyle.center]}>
                            <MyButton
                                theme={"sky"}
                                title={"Send New Request"}
                                style={[UI.setHeight(50)]}
                                onPress={createRequest}
                            />
                            <MyButton
                                theme={"sky"}
                                title={"Cancel"}
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
                                    {"Details: "}
                                    <Text style={[commonStyle.textDark]}>Hello pickup</Text>
                                </Text>
                                <Text style={textStyle}> 
                                    {"Distance: "} <Text style={[commonStyle.textDark]}>{distance} K.M</Text>
                                </Text>
                                <Text style={textStyle}>
                                    {"Fare: "}<Text style={[commonStyle.textDark]}>{fare} Rs.</Text>
                                </Text>
                            </View>
                            <View style={[commonStyle.row, commonStyle.center]}>
                                <MyButton
                                    theme={"sky"}
                                    title={"Send Request"}
                                    style={[UI.setHeight(50)]}
                                    onPress={createRequest}
                                />
                                <MyButton
                                    theme={"sky"}
                                    title={"Cancel"}
                                    style={[UI.setHeight(50), commonStyle.mlmd]}
                                    onPress={resetSelect}
                                />
                            </View>
                        </View>
                    )
            case 'selectArea':
                return (
                    <View>
                        <View 
                            style={[
                                commonStyle.textBoxBorderColor, 
                                commonStyle.mbmd,
                                commonStyle.row,
                                commonStyle.vCenter
                            ]}
                        >
                            <TextInput
                                style={[commonStyle.inputBox]}
                                placeholder={"Pickup Location"}
                                placeholderTextColor="#003f5c"
                                onChangeText={handleAddress.bind(this, 'pickup')}
                                value={query.pickup}
                            />
                            <MyButton
                                type={"icon"}
                                style={[commonStyle.pMd, UI.setBorderLeft(1, '#ccc')]}
                                iconSet="materialIcons"
                                iconName="my-location"
                                iconSize={25}
                                iconStyle={[commonStyle.textOffSky]}
                                arg={"pickup"}
                                onPress={setLocationFor}
                            />
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
                            <MyButton
                                type={"icon"}
                                style={[commonStyle.pMd, UI.setBorderLeft(1, '#ccc')]}
                                onPress={setLocationFor}
                                arg={"destination"}
                                iconSet="materialIcons"
                                iconName="my-location"
                                iconSize={25}
                                iconStyle={[commonStyle.textOffSky]}
                            />
                        </View>
                        <View style={[commonStyle.row, commonStyle.center]}>
                            <MyButton
                                theme={"sky"}
                                title={"Confirm"}
                                style={[UI.setHeight(50)]}
                                onPress={()=> setLayout("detailRide")}
                            />
                            <MyButton
                                theme={"sky"}
                                title={"Reset"}
                                style={[UI.setHeight(50), commonStyle.mlmd]}
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
            case "currentRide":
                return (
                    <View>
                        <View style={[commonStyle.pbLg]}>
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
                                {"Status: "}
                                <Text style={[commonStyle.textDark]}>
                                    {getStatus()}
                                </Text>
                            </Text>
                        </View>
                        <MyButton
                            theme={"sky"}
                            title={"Cancel"}
                            style={[UI.setHeight(50)]}
                            onPress={cancelRide}
                        />
                    </View>
                )
            default:
                return (
                    <View style={[UI.setHeight(100, '%'), UI.setPadding(10,5,5,5, '%')]}>
                        <Text 
                            style={[commonStyle.themeText, commonStyle.textDark, commonStyle.pbLg]}
                        >
                            Lets start ride by doing few steps. Just select your destination and driver to take a ride.
                        </Text>
                        <MyButton
                            theme={"sky"}
                            title={"Book Your Ride"}
                            style={[UI.setHeight(50)]}
                            onPress={onBook}
                        />
                    </View>
                );
        }
    }

    return (
        <MyContext.Consumer>
            {context=>
                <KeyboardAvoidingView style={[UI.setScreen()]} behavior={UI.ios ? "padding" : "height"}>
                    <View style={[UI.setWidth(), UI.setHeight(UI.height()/1.4)]}>
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
                            commonStyle.absolute, 
                            UI.setBottom(7.9, '%'),
                            UI.setLeft(3),
                            UI.setBorder(1, '#ccc'),
                            commonStyle.bgWhite,
                            commonStyle.center,
                            UI.setRadiusOn(20, 'topStart'),
                            UI.setRadiusOn(20, 'topEnd'),
                            UI.setPadding(20,0,10,0)
                        ]}
                    >
                        <ScrollView>
                            <View 
                                style={[ 
                                    UI.setWidth(),
                                    UI.setPadding(20,20,20,20)
                                ]}
                            >
                                {selectLayout()}
                            </View>
                        </ScrollView>
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

export default Rider;