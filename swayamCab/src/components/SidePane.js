import React from 'react';
import { View , Text, FlatList, TouchableOpacity, Image, TextInput} from 'react-native';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import Icons from '../libs/Icons';
import InfoModal from '../libs/InfoModal';
import MyButton from '../libs/MyButton';
import Geolocation from "react-native-geolocation-service";
import { updatDb } from '../config/myConfig';

const SidePane = (props) => {
    const contextOption = React.useContext(MyContext);
    const [modalVisible, showModal] = React.useState(false);
    const [modalLayout, setModal] = React.useState(null);
    const getMenuList = () => {
        if (contextOption.isRider) {
            return [
                {
                    id: 1,
                    title: "Profile",
                    pageName: "Profile",
                    iconName: "user",
                    iconSet: "fontAwesome"
                },
                {
                    id: 2,
                    title: "Ongoing",
                    pageName: "Ongoing",
                    iconName: "direction",
                    iconSet: "entypo"
                },
                {
                    id: 3,
                    title: "Finished",
                    pageName: "Finished",
                    iconName: "clock-end",
                    iconSet: "materialComIcons"
                },
                {
                    id: 4,
                    title: "Canceled",
                    pageName: "Canceled",
                    iconName: "account-cancel",
                    iconSet: "materialComIcons"
                },
                {
                    id: 5,
                    title: "Feedback",
                    pageName: "Feedback",
                    iconName: "feedback",
                    iconSet: "materialIcons"
                },
                {
                    id: 6,
                    title: "Share My Location",
                    actionType: "ShareLocation",
                    iconName: "location",
                    iconSet: "entypo"
                },
                {
                    id: 7,
                    title: "About",
                    pageName: "About",
                    iconName: "car-info",
                    iconSet: "materialComIcons"
                }
            ]
        } else {
            return [
                {
                    id: 1,
                    title: "Basic Info",
                    pageName: "Profile",
                    iconName: "user",
                    iconSet: "fontAwesome"
                },
                {
                    id: 2,
                    title: "Online/Offline",
                    actionType: "LiveStatus",
                    iconName: "online-prediction",
                    iconSet: "materialIcons"
                },
                {
                    id: 3,
                    title: "Pending Request",
                    pageName: "PendingReq",
                    iconName: "pending-actions",
                    iconSet: "materialIcons"
                },
                {
                    id: 4,
                    title: "Completed Ride",
                    pageName: "Finished",
                    iconName: "tachometer",
                    iconSet: "fontAwesome"
                },
                {
                    id: 5,
                    title: "Canceled Ride",
                    pageName: "Canceled",
                    iconName: "cancel-schedule-send",
                    iconSet: "materialIcons"
                }
            ]
        }
    }

    const handlePageAction = (item) => {
        if (item.actionType) {
            setModal(item.actionType);
            showModal(true);
        } else {
            props.navRef.navigate(item.pageName);
        }
        props.closeDrawer();
    }

    const logOut = () => {
        props.navRef.reset({
            index: 0,
            routes: [{name: 'Home'}]
        });
        props.handleLoginAction("logout");
    }

    const manageStatus = (status) => {
        updatDb(`/users/${contextOption.userId}`, {isOnline: status}).then(()=> {
            showModal(false);
        });
    }

    const updateLocation = () => {
        showModal(false);
        Geolocation.getCurrentPosition((position) => {
            updatDb(`/users/${contextOption.userId}`, {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }).then(()=> {
                showInfoModal("Location Updated");
            });
            
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    const getLayout = () => {
        switch(modalLayout) {
            case 'ShareLocation':
                return (
                    <View>
                        <MyButton
                            title="Update Your Current Location"
                            theme={true}
                            style={[UI.setHeight(40)]}
                            onPress={updateLocation}
                        />
                    </View>
                );
            case 'LiveStatus': 
                return (
                    <View style={[commonStyle.center]}>
                        <Text style={[commonStyle.themeHeadingText]}>
                            Select your Availbility
                        </Text>
                        <View style={[commonStyle.row, commonStyle.pMd]}>
                            <MyButton
                                theme={true}
                                title="Online"
                                style={[UI.setHeight(40)]}
                                onPress={manageStatus}
                                arg={1}
                            />
                            <MyButton
                                theme={true}
                                title="Offline"
                                style={[UI.setHeight(40), commonStyle.mlmd]}
                                onPress={manageStatus}
                                arg={2}
                            />
                        </View>
                    </View>
                );
            default: return null;
        }
    }

    const renderHeader = () => {
        return (
            <View 
                style={[
                    commonStyle.pbMd, 
                    commonStyle.row, 
                    commonStyle.vCenter, 
                    commonStyle.alignCorner,
                ]}
            >
                <View style={[UI.setPadding(0, 5, 2, 0, '%')]}>
                    <Text style={[commonStyle.themeHeadingText]}>
                        Svayam App
                    </Text>
                </View>
                <TouchableOpacity onPress={logOut}>
                    <Icons name="md-power-sharp" iconSet={"ionicons"} style={[commonStyle.themeHeadingText]} />
                </TouchableOpacity>
        </View>
        )
    }

    const renderListItem = ({item}) => {
        return(
            <TouchableOpacity 
                style={[
                    commonStyle.row, 
                    commonStyle.center, 
                    commonStyle.bgWhite, 
                    commonStyle.pMd,
                    commonStyle.mbmd,
                    UI.setRadiusOn(30, 'topEnd'),
                    UI.setRadiusOn(30, 'bottomEnd')
                ]} 
                onPress={handlePageAction.bind(this, item)}
            >
                <View 
                    style={[
                        UI.setScreen(50,50),
                        UI.setRadius(25), 
                        commonStyle.center, 
                        commonStyle.bgOffSky
                    ]}
                >
                    <Icons
                        iconSet={item.iconSet}
                        name={item.iconName}
                        size={30}
                        style={[commonStyle.textWhite]}
                    />
                </View>
                <Text 
                    style={[
                        UI.setPaddingLeft(15), 
                        commonStyle.themeOrangeText,
                        UI.setWidth(70, '%'),
                    ]}
                >
                    {item.title}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[commonStyle.themeBg, UI.setPadding(20,2,5,5, '%')]}>
            <FlatList
                ListHeaderComponent={renderHeader}
                data={getMenuList()}
                keyExtractor={item => item.id}
                renderItem={renderListItem}
                style={[UI.setMarginTop(10), UI.setHeight()]}
                showsVerticalScrollIndicator={false}
            />
            <InfoModal external={true} isVisible={modalVisible} onClose={()=> showModal(false)}>
                {getLayout()}
            </InfoModal>
        </View>
    )
}

export default SidePane;