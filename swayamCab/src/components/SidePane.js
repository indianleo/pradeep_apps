import React from 'react';
import { View , Text, FlatList, TouchableOpacity, Image} from 'react-native';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import Icons from '../libs/Icons';

const SidePane = (props) => {
    const contextOption = React.useContext(MyContext);
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
                    pageName: "ShareLocation",
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
                    pageName: "",
                    iconName: "online-prediction",
                    iconSet: "materialIcons"
                },
                {
                    id: 3,
                    title: "Pending Request",
                    pageName: "",
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
                // {
                //     id: 5,
                //     title: "Canceled Ride",
                //     pageName: "Canceled",
                //     iconName: "cancel-schedule-send",
                //     iconSet: "materialIcons"
                // }
            ]
        }
    }

    const handlePageAction = (item) => {
        //alert(item.pageName);
        props.navRef.navigate(item.pageName);
        props.closeDrawer()
    }

    const logOut = () => {
        props.navRef.reset({
            index: 0,
            routes: [{name: 'Home'}]
        });
        props.handleLoginAction("logout");
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
        </View>
    )
}

export default SidePane;