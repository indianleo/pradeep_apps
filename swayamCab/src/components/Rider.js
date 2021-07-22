import React from  'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { gAPiKey } from '../config/myConfig';

const Rider = (props)=> {
    const [currentLayout, setLayout] = React.useState("");
    const [locationRegion, updateLocationRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [locationMarkers, updateMarkers] = React.useState([]);
    const [query, setQuery] = React.useState({pickup: "", destination: ""});

    React.useEffect(()=> {
        Geocoder.init(gAPiKey)
    }, []);                                     

    const onRegionChange = (newRegion)=> {
        console.log(newRegion);
        updateLocationRegion(newRegion);
    }

    const onMapTouch = (event)=> {
        let tempMarker = locationMarkers;
        Geocoder.from(event.nativeEvent.coordinate).then((addJson)=> {
            console.log(addJson);
        }).catch((err)=> {
            console.log(err);
        })
        if (tempMarker.length < 2) {
            tempMarker.push({
                title: tempMarker.length == 1 ? "Destination" : "Pickup Location",
                co: event.nativeEvent.coordinate,
                description: tempMarker.length == 1 ? "Driver will be drop you here." : "Driver will pickup you from here."
            })
            updateMarkers([...tempMarker]);
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

    const selectLayout = ()=> {
        switch(currentLayout) {
            case 'status': 
                return (
                    <View>
                        <Text>Status</Text>
                    </View>
                );
            case 'selectArea':
                return (
                    <View style={[commonStyle.pLg]}>
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
                                style={[commonStyle.pMd, UI.setBorderLeft(1, '#ccc')]}
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
                                commonStyle.bgOrange,
                                UI.setHeight(50),
                                UI.setWidth(50, '%'),
                                commonStyle.center,
                                commonStyle.br
                            ]}
                        >
                            <Text style={[commonStyle.textStyle, commonStyle.fs5, commonStyle.textWhite]}>
                                Confirm
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            default:
                return (
                    <TouchableOpacity
                        style={[
                            commonStyle.bgOrange,
                            UI.setHeight(50),
                            UI.setWidth(50, '%'),
                            commonStyle.center,
                            commonStyle.br
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
                    <View style={[UI.setWidth(), UI.setHeight(UI.height()/2)]}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            initialRegion={locationRegion}
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
                        </MapView>
                    </View>
                    <View style={[commonStyle.ptLg]}>
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