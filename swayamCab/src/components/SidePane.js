import React from 'react';
import { View , Text, FlatList, TouchableOpacity, Image} from 'react-native';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';

const SidePane = (props) => {
    const contextOption = React.useContext(MyContext);
    const getMenuList = () => {
        if (contextOption.isRider) {
            return [
                {
                    id: 1,
                    title: "Profile",
                    pageName: "",
                    img: require('../images/logo2.png')
                },
                {
                    id: 2,
                    title: "Ongoing",
                    pageName: "",
                    img: require('../images/logo2.png')
                },
                {
                    id: 3,
                    title: "Finished",
                    pageName: "",
                    img: require('../images/logo2.png')
                },
                {
                    id: 4,
                    title: "Canceled",
                    pageName: "",
                    img: require('../images/logo2.png')
                },
                {
                    id: 5,
                    title: "Feedback",
                    pageName: "",
                    img: require('../images/logo2.png')
                },
                {
                    id: 6,
                    title: "Share My Location",
                    pageName: "",
                    img: require('../images/logo2.png')
                },
                {
                    id: 7,
                    title: "About",
                    pageName: "",
                    img: require('../images/logo2.png')
                }
            ]
        } else {
            return [
                {
                    id: 1,
                    title: "Basic Info",
                    pageName: "",
                    img: require('../images/logo2.png')
                },
                {
                    id: 2,
                    title: "Online/Offline",
                    pageName: "",
                    img: require('../images/logo2.png')
                },
                {
                    id: 3,
                    title: "Pending Request",
                    pageName: "",
                    img: require('../images/logo2.png')
                },
                {
                    id: 4,
                    title: "Completed Ride",
                    pageName: "",
                    img: require('../images/logo2.png')
                },
                {
                    id: 5,
                    title: "Canceled Ride",
                    pageName: "",
                    img: require('../images/logo2.png')
                }
            ]
        }
    }

    const handlePageAction = (item) => {
        alert(item.pageName);
        //props.navRef.navigate(item.pageName);
    }

    const renderHeader = () => {
        return (
            <View>
                <Text style={[commonStyle.themeHeadingText]}>
                    Svayam App
                </Text>
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
                    commonStyle.p,
                    commonStyle.mbmd
                ]} 
                onPress={handlePageAction.bind(this, item)}
            >
                <Image
                    source={item.img}
                    style={[UI.setScreen(60,60)]}
                />
                <Text 
                    style={[
                        commonStyle.plMd, 
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
        <View style={[commonStyle.themeBg, UI.setPadding(20,5,5,5, '%'), UI.setHeight()]}>
            <FlatList
                ListHeaderComponent={renderHeader}
                data={getMenuList()}
                keyExtractor={item => item.id}
                renderItem={renderListItem}
                style={[UI.setMarginTop(10), UI.setHeight(96.5, '%')]}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default SidePane;