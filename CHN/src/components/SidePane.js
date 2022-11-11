import React from 'react';
import {
    View, 
    Text, 
    VirtualizedList,
    TouchableOpacity, 
    Image, 
    StyleSheet
} from 'react-native';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
import { storeData, getStoreData } from '../api/apiAction';
import Icon from "react-native-vector-icons/Ionicons";
import { getItem, getItemCount } from '../config/chnConfig';
export default class SidePane extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            query: '',
            data: [
                {
                    "id": 1,
                    "img": require("../images/1024x/logo.png"),
                    "text": "welcome.dash",
                    "page": "Home",
                    "visbility": 2
                },
                {
                    "id": 2,
                    "img": require("../images/1024x/acount.png"),
                    "text": "app 212.profile",
                    "page": "Profile",
                    "visbility": 2
                },
                {
                    "id": 3,
                    "img": require("../images/1024x/live.png"),
                    "text": "welcome.portAcc",
                    "page": "Portal",
                    "visbility": 1
                },
                // {
                //     "id": 4,
                //     "img": require("../images/1024x/enrollment.png"),
                //     "text": "welcome.patientEnroll",
                //     "page": "Enrollment",
                //     "visbility": 2
                // },
                {
                    "id": 5,
                    "img": require("../images/1024x/care-managment.png"),
                    "text": "welcome.myAppo",
                    "page": "MyAppointments",
                    "visbility": 1
                },
                {
                    "id": 6,
                    "img": require("../images/1024x/services.png"),
                    "text": "welcome.services",
                    "page": "Services",
                    "visbility": 2
                },
                {
                    "id": 7,
                    "img": require("../images/1024x/my-health.png"),
                    "text": "welcome.healthManage",
                    "page": "Vitals",
                    "visbility": 1
                },
                {
                    "id": 8,
                    "img": require("../images/1024x/mental-health.png"),
                    "text": "welcome.edu",
                    "page": "Education",
                    "visbility": 2
                },
                {
                    "id": 9,
                    "img": require("../images/1024x/virtual-service.png"),
                    "text": "msg.sidePaneTitle",
                    "page": "Messages",
                    "visbility": 1
                },
                {
                    "id": 10,
                    "img": require("../images/1024x/contact.png"),
                    "text": "contact.title",
                    "page": "Contact",
                    "visbility": 1
                },
            ],
        };
    }
    static contextType = ChnContext;

    componentDidMount() {
        this.setState({
            isLoading: false,
        });
    }

    logOut = ()=> {
        storeData("_user", null);
        storeData("enrollData", null);
        this.props.navRef.reset({
            index: 0,
            routes: [{name: 'Home'}]
        });
        this.props.handleLoginAction("logout");
    }

    renderHeader = () => (
        <View 
            style={[
                commonStyle.pbMd, 
                commonStyle.row, 
                commonStyle.vCenter, 
                commonStyle.alignCorner,
            ]}
        >
            <View>
                <Text style={[commonStyle.themeHeadingText]}>
                    MyChn
                </Text>
            </View>
            <TouchableOpacity onPress={this.logOut}>
                <Icon name="md-power-sharp" style={[commonStyle.themeHeadingText]} />
            </TouchableOpacity>
        </View>
    );

    handlePageAction (item) {
        if (item.visbility > 1 || this.context.isLogined) {
            if (item.page == "Home") {
                this.props.navRef.reset({
                    index: 0,
                    routes: [{name: 'Home'}]
                });
            } else {
                this.props.navRef.navigate(item.page, {data: 'Hello pradeep'});   
            }
        } else {
            showInfoModal(Lang("welcome.enrollWarn"));
        }
        this.props.closeDrawer();
    }

    renderListItem = ({ item }) => {
        return(
            <TouchableOpacity 
                style={styles.listItem} 
                onPress={this.handlePageAction.bind(this, item)}
            >
                <Image
                    source={item.img}
                    style={[UI.setScreen(70,70)]}
                />
                <Text 
                    style={[
                        commonStyle.pl, 
                        commonStyle.themeOrangeText,
                        UI.setWidth(70, '%'),
                    ]}
                >
                    {Lang(item.text)}
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <ChnContext.Consumer>
                {context => (
                    <View style={[commonStyle.themeBg, UI.setPadding(context.portrait ? 20 : 3, 5, 5, 5, '%')]}>
                        <VirtualizedList
                            ListHeaderComponent={this.renderHeader}
                            data={this.state.data}
                            keyExtractor={item => item.id}
                            renderItem={this.renderListItem}
                            style={[UI.setMarginTop(10), UI.setHeight(96.5, '%')]}
                            showsVerticalScrollIndicator={false}
                            getItem={getItem}
                            getItemCount={getItemCount}
                        />
                    </View>
                )}
            </ChnContext.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    listItem: {
        padding:10, 
        backgroundColor: '#fff', 
        marginBottom:20, 
        flexDirection:'row', 
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1
    },
    listImg: {
        width: 80, 
        height: 80
    },
    searchBar: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
    inputBox: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius:5,
        borderColor: '#333',
        backgroundColor: '#fff',
        color: '#000',
        width: '90%',
        height: 50,
        paddingLeft: 10,
        fontSize: 18,
    },
})