import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
// import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { apiCall, getStoreData, storeData } from '../api/apiAction';
import MyButton from './libs/MyButton';
import MyText from './libs/MyText';
import Select from './libs/Select';

const Location = (props)=> {
    const [_address, setAddress] = React.useState("");
    const [selectedAddres, setSelectedAddres] = React.useState("");
    const [locationRegion, updateLocationRegion] = React.useState(null);
    const [locationMarkers, updateMarkers] = React.useState([]);
    const [facilityId, setFacility] =  React.useState();
    const [facilityName, setFacilityName] = React.useState("");
    const [clinic, setClinic] = React.useState([]);
    const[lastLoc, setLastLoc] = React.useState({});
    const [selectedFacility, setSelected] = React.useState();
    const mapRef = React.useRef();
    const scrollRef = React.useRef();
    const _param = props.route.params;


    React.useEffect(()=> {
        apiCall("/clinic-locations").then((_res)=> {
            if (_res) {
                filterClinic(_res);
            }
        }).catch((err)=> {
            console.log(err);
            showInfoModal();
        })
        Geolocation.getCurrentPosition((position) => {
                let userCoor = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                updateLocationRegion({
                    ...{
                        latitude: userCoor.latitude, //29.1821696,
                        longitude:  userCoor.longitude, //-95.40927459999999,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                });
                getStoreData("lastFacility").then((lastMark)=> {
                    if (UI.isValid(lastMark)) {
                        mapRef.current.animateToRegion({
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                            latitude: lastMark.co.lat, 
                            longitude: lastMark.co.lng
                        });
                        onMarkerTouch(lastMark, "", true);
                    }
                })
                UI.geoFrom(userCoor).then((addJson)=> {
                    setAddress(addJson.results[0].formatted_address);
                }).catch((err)=> {
                    console.log({geoErr: err});
                });
            },
            (error) => {
                // See error code charts below.
                console.log({currentLocationErr: error});
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        ); 
    }, [])                                                

    const handleAddress = (text)=> {
        setAddress(text);
    }

    const sortClinic = (res) => {
        let arr = [];
        res.sort((pre, post)=> pre.id - post.id);
        res.map((item)=> {
            arr.push({label: item.title, value: item.id, "color": "black"});
        });
       setClinic(arr);
        return res;
    }

    const filterClinic = (res) => {
        let tempMarker = locationMarkers;
        res.map((item)=> {
            let add = item.name + "," + item.street + "," + item.city + "," + item.state + "," +  item.postal_code;
            if (item.latitude && item.longitude) {
                tempMarker.push({
                    id: item.id,
                    title: item.name,
                    co: {lat: +item.latitude, lng: +item.longitude},
                    description: add
                });
            } else {
                // Geocoder.from(add).then((addJson)=> {
                //     tempMarker.push({
                //         id: item.id,
                //         title: item.name,
                //         co: addJson.results[0].geometry.location,
                //         description: add
                //     });
                //     updateMarkers([...sortClinic(tempMarker)]);
                // }).catch((err)=> {
                //     console.log(err);
                // })
               // console.log(res);
            }
        });
        updateMarkers([...sortClinic(tempMarker)]);
    }

    const goNext = () => {
        if (facilityId) {
            let obj = {
                ..._param,
                facilityId,
                facility: facilityName
            }
            props.navigation.navigate(_param.visitInfo == "new" ? "PersonProvider" : "ProviderBio", obj);
        } else {
            showInfoModal("Please select Facility");
        }
    }

    const onRegionChange = (newRegion)=> {
        //console.log(newRegion);
        updateLocationRegion(newRegion);
    }

    const onMarkerTouch = (_currMark, event, noStore) => {
        setFacility(_currMark.id);
        setFacilityName(_currMark.title);
        setSelectedAddres(_currMark.description);
        setSelected(_currMark.id);
        if(!noStore) {
            storeData("lastFacility", _currMark);
            scrollRef.current?.scrollToEnd({animated: true})
            
        }
    }

    const onMapTouch = (event)=> {
        //let tempMarker = locationMarkers;
        storeData("facility", locationMarkers);
        console.log("marker saved in store");
    }

    const onSelectFacilty = (value)=> {
        if (value) {
            let res = locationMarkers.find((item)=> item.id == value);
            if (UI.ios) {
                setLastLoc({...res});
            } else {
                setTimeout(()=> {
                    mapRef.current.animateToRegion({
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        latitude: res.co.lat, 
                        longitude: res.co.lng
                    });
                }, 500)
            }
            onMarkerTouch(res);
            setSelected(res.id);
        }
    }

    const onDoneTouch = () => {
        mapRef.current.animateToRegion({
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            latitude: lastLoc.co.lat, 
            longitude: lastLoc.co.lng
        });
    }

    return(
        <ChnContext.Consumer>
            {context => (
                <ScrollView ref={scrollRef} style={[commonStyle.themeBg]}>
                    <View style={[UI.setPadding(5,5,5,5, '%')]}>
                        <View>
                            <View style={[UI.setWidth(70, '%')]}>
                                <MyText
                                    theme="heading"
                                    title={Lang('location.pageTitle')}
                                />
                            </View>
                        </View>
                        <View style={commonStyle.mtmd}>
                            <MyText
                                theme="orange"
                                title={Lang("location.address")}
                                style={[commonStyle.pb]}
                            />
                        </View>
                        <View>
                            <TextInput
                                placeholder={Lang("app 212.address")}
                                onChangeText={handleAddress}
                                style={[
                                    commonStyle.themeTextBox,
                                    commonStyle.bgWhite,
                                    UI.setHeight(50)
                                ]}
                                value={_address}
                            />
                        </View>
                        <View style={commonStyle.mtmd}>
                            <MyText
                                theme="orange"
                                title={Lang("location.locate")}
                                style={[commonStyle.pb]}
                            />
                        </View>
                        <View>
                            <View 
                                style={[
                                    commonStyle.row, 
                                    commonStyle.textBoxBorderColor,
                                    commonStyle.bgWhite,
                                    commonStyle.center,
                                    commonStyle.pLg,
                                    UI.setHeight(80),
                                ]}
                            >
                                <View style={commonStyle.pLg}>
                                    <Image
                                        source={require('../images/location.png')}
                                        style={[UI.setHeight(40), UI.setWidth(30)]}
                                    />
                                </View>
                                <Text 
                                    style={[
                                        UI.setWidth(80, '%'), 
                                        commonStyle.placeHolderFont, 
                                        commonStyle.textLightBold, 
                                        commonStyle.textStyle,
                                        commonStyle.textDark
                                    ]}
                                >
                                    {selectedAddres}
                                </Text>
                            </View>
                        </View>
                        <View style={commonStyle.mtmd}>
                            <MyText
                                theme={"orange"}
                                title={"Select Facility:"}
                            />
                        </View>
                        {clinic.length > 0 
                            ? 
                                <Select
                                    onChange={onSelectFacilty}
                                    onDone={onDoneTouch}
                                    style={[UI.ios ? null : commonStyle.mb]}
                                    list={clinic}
                                    selectProps={{
                                        value: selectedFacility
                                    }}
                                />
                            :
                                <MyText style={[commonStyle.textBlue]} title={"Unable to load facility from server"} />
                        }
                        <View style={[UI.setWidth(100, '%'), UI.setHeight(UI.height()/2.5)]}>
                            <MapView
                                ref={mapRef}
                                provider={UI.ios ? null : PROVIDER_GOOGLE}
                                initialRegion={locationRegion}
                                onRegionChange={onRegionChange}
                                onLongPress={onMapTouch}
                                style={css.map}
                                loadingEnabled = {true}
                                loadingIndicatorColor="#666666"
                                loadingBackgroundColor="#eeeeee"
                                //showsUserLocation={true}
                                //followsUserLocation={true}
                            >
                                {locationMarkers.map((_marker, index) => (
                                    <Marker
                                        key={index}
                                        coordinate={{latitude: _marker.co.lat, longitude: _marker.co.lng}}
                                        title={_marker.title}
                                        description={_marker.description}
                                        onPress={onMarkerTouch.bind(this, _marker)}
                                    />
                                ))} 
                            </MapView>
                        </View>
                        <View style={[commonStyle.ptMd]}>
                            <MyButton
                                theme={true}
                                title={Lang("app 212.next")}
                                onPress={goNext}
                                style={[UI.setWidth(100, '%'), UI.setHeight(40)]}
                                textStyle={[commonStyle.orangeFontSize]}
                            />
                        </View>
                    </View>
                </ScrollView>
            )}
        </ChnContext.Consumer>
    )
}

const css = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
      },
})

export default Location;