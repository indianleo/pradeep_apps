import React from  'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';

const Driver = (props)=> {
    const [locationRegion, updateLocationRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [locationMarkers, updateMarkers] = React.useState([
        {
            title: "Marker 1",
            co: { latitude : 178.33334350585938 , longitude : 119.33332824707031 },
            description: "It testing marker"
        }
    ]);

    React.useEffect(()=> {
        Geocoder.init("AIzaSyDq53moPWDh_Fhi4O7k-iYoZFo5E7OBSy4")
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
        tempMarker.push({
            title: "Marker Current",
            co: event.nativeEvent.coordinate,
            description: "It testing marker"
        })
        updateMarkers([...tempMarker]);
    }

    return (
        <MyContext.Consumer>
            {context=>
                <ScrollView style={[UI.setScreen()]}>
                    <View style={[UI.setWidth(), UI.setHeight(UI.height()/2.5)]}>
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