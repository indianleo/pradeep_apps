import React from  'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from "react-native-geolocation-service";
import { requestLocation } from '../config/myConfig';

const Rider = (props)=> {
    const [currentLayout, setLayout] = React.useState("initial");
    const [locationRegion, updateLocationRegion] = React.useState(null);
    const [locationMarkers, updateMarkers] = React.useState([]);
    const [query, setQuery] = React.useState({pickup: "", destination: ""});

    React.useEffect(()=> {
        if (!UI.ios) requestLocation();
        Geolocation.getCurrentPosition((position) => {
                let tempMarker = [];
                updateLocationRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
                tempMarker.push({
                    title: "Pickup Location",
                    co: {latitude: position.coords.latitude,longitude: position.coords.longitude},
                    description: "Driver will pickup you from here."
                });
                updateMarkers([...tempMarker]);
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    
    }, []);                                     

    const onRegionChange = (newRegion)=> {
        updateLocationRegion(newRegion);
    }

    const onMapTouch = (event)=> {
        if (currentLayout == "selectArea") {
            let tempMarker = locationMarkers;
            // UI.geoFrom(event.nativeEvent.coordinate).then((addJson)=> {
            //     console.log({addJson});
            // }).catch((err)=> {
            //     console.log(err);
            // });
            if (tempMarker.length == 1) {
                tempMarker.push({
                    title: tempMarker.length == 1 ? "Destination" : "Pickup Location",
                    co: event.nativeEvent.coordinate,
                    description: tempMarker.length == 1 ? "Driver will be drop you here." : "Driver will pickup you from here."
                })
                updateMarkers([...tempMarker]);
            }
        }
    }

    const handleAddress = (type, value)=> {
        console.log(value);
        let temp = query;
        temp[type] = value;
        setQuery({...temp});
    }

    const getLocationFor = (type) => {
        let temp = query;
        temp[type] = type == "pickup" ? JSON.stringify(locationMarkers[0].co) : JSON.stringify(locationMarkers[1].co);
        setQuery({...temp});
    }

    const getMapRoute = () => {
        if (locationMarkers.length == 2) {
            return(
                <Polyline
                    coordinates={locationMarkers}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={['#7F0000']}
                    strokeWidth={6}
                />
            )
        } 
        return null;
    }

    const selectLayout = ()=> {
        switch(currentLayout) {
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
                                    {"Distance: "} <Text style={[commonStyle.textDark]}>20 K.M</Text>
                                </Text>
                                <Text style={[commonStyle.themeNormalText, commonStyle.textBold,commonStyle.textOffSky]}>
                                    {"Fare: "}<Text style={[commonStyle.textDark]}>100 Rs.</Text>
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
                                onPress={()=> setLayout("status")}
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
                                onPress={getLocationFor.bind(this, "pickup")}
                            >
                                <Icon name="my-location" size={25} />
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
                                onPress={getLocationFor.bind(this, "destination")}
                            >
                                <Icon name="my-location" size={25} />
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
                                Pending from Driver
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
                <ScrollView style={[UI.setScreen()]}>
                    <View style={[UI.setWidth(), UI.setHeight()]}>
                        <MapView
                            provider={UI.ios ? null : PROVIDER_GOOGLE}
                            initialRegion={null}
                            onRegionChange={onRegionChange}
                            onLongPress={onMapTouch}
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
                            currentLayout == "initial" ||  currentLayout == "status" ? commonStyle.pLg : commonStyle.hPadLg,
                            commonStyle.absolute, 
                            currentLayout == "initial" ||  currentLayout == "status" ? UI.setBottom(UI.ios ? 10 : 5, '%') : UI.setTop(0, '%'),
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
})

export default Rider;