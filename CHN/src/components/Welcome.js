import React from 'react';
import {
    View, 
    Text,
    TouchableOpacity, 
    Image, 
    StyleSheet,
    ScrollView
} from 'react-native';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
import {LineChart} from "react-native-chart-kit";
import PersonProvider from './PersonProvider';
import { apiCall, getStoreData } from '../api/apiAction';
import MyButton from './libs/MyButton';
import MyText from './libs/MyText';
import MyAppointments from './MyAppointments';
export default class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            appointmentList: [],
            query: '',
            medication: false,
            testResult: false,
            data: [
                {
                    "id": 1,
                    "img": require("../images/my-portal.png"),
                    "text": "welcome.portAcc",
                    "page": "Portal",
                    "visbility": 1
                },
                {
                    "id": 2,
                    "img": require("../images/care-management.png"),
                    "text": "welcome.patientEnroll",
                    "page": "Enrollment",
                    "visbility": 2
                },
                {
                    "id": 3,
                    "img": require("../images/app-serve.png"),
                    "text": "welcome.services",
                    "page": "Services",
                    "visbility": 2
                },
                {
                    "id": 4,
                    "img": require("../images/vitals.png"),
                    "text": "welcome.healthManage",
                    "page": "Vitals",
                    "visbility": 1
                },
                {
                    "id": 5,
                    "img": require("../images/mental-health.png"),
                    "text": "welcome.edu",
                    "page": "Education",
                    "visbility": 2
                },
                {
                    "id": 6,
                    "img": require("../images/contact.png"),
                    "text": "contact.title",
                    "page": "Contact",
                    "visbility": 2
                }
            ],
        };
        this.appointmentId = {
            "PersonProvider": 1,
            "Location": 2,
        }
    }
    static contextType = ChnContext;

    componentDidMount() {
        getStoreData("accessKey").then((res)=> {
            console.log({accessKey: res});
        }).catch((err)=> {
            console.log(err);
        });
        if (this.context.isLogined) {
            this.context.fetchAppointmentList("/current-appointments").then((res)=> {
                //console.log(res);
            }).catch((err)=> {
                console.log({appoi: err});
            });
            apiCall("/medications").then((res)=> {
                //console.log(res);
                this.setState({medication: res[0]})
            }).catch((err)=> {
                console.log({medications: err});
            });
            apiCall("/labresults").then((res)=> {
                //console.log(res);
                this.setState({testResult: res[0]});
            }).catch((err)=> {
                console.log({"medications": err});
                showInfoModal();
            });
        }
    }

    handlePage = (item)=> {
        if (item.visbility > 1 || this.context.isLogined) {
            if (!item.direct && (item.page == "Location" || item.page == "PersonProvider")) {
                this.props.navigation.navigate("MakeAppointment", {appoId: this.appointmentId[item.page], ...item});
            } else {
                this.props.navigation.navigate(item.page, item);
            }
        } else {
            showInfoModal(Lang("welcome.enrollWarn"));
        }
    }

    guestText = (str) => {
        return (
            <Text 
                style={[
                    commonStyle.themeNormalText, 
                    commonStyle.textDark
                ]}
            >
                {str}
            </Text>
        )
    }

    genTestResult() {
        if (this.state.testResult) {
            return (
                <View>
                    <View>
                        <MyText
                            title={this.state.testResult.Flag + " - " + this.state.testResult.Value}
                            style={[commonStyle.flex1]}
                        />
                    </View>
                    <View style={[]}>
                        <MyText
                            title={this.state.testResult.Date}
                            nestedTitle={" ...More"}
                            nestedStyle={[commonStyle.textBlue, commonStyle.textBold]}
                            arg={{page: "HealthRecordInfo", visbility: 1, apiName: "/labresults", prefix: 'labResult_', text: "healthRecords.labResult"}}
                            onPress={this.handlePage.bind(this)}
                        />
                    </View>
                </View>
            )
        }
        return null;
    }

    getGraph = () => {
        return (
            <LineChart
                data={{
                    labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }
                    ]
                }}
                width={UI.width()- (this.context.portrait ? 70 : 100)} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 10
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 10
                }}
            />
        )
    }

    render() {
        return(
            <ChnContext.Consumer>
                {context => (
                    <ScrollView style={[UI.setScreen()-100]}> 
                        <View>
                            <View>
                                <MyText
                                    theme="heading"
                                    title = {Lang('welcome.title', {appName: Lang('app 212.appName')})}
                                    style={[
                                        commonStyle.ptLg,
                                        commonStyle.textCenter
                                    ]}
                                />
                                <MyText
                                    theme="heading"
                                    title = {context.user.name || Lang("app 212.name")}
                                    style={[
                                        commonStyle.ptLg,
                                        commonStyle.textCenter
                                    ]}
                                />
                            </View>
                            <View 
                                style={[
                                    UI.setPadding(0,5,0,5, '%'),
                                    UI.setHeight(490),
                                    commonStyle.alignEnd
                                ]}
                            >
                                <Image
                                    source={require('../images/bgHome.png')}
                                    style={[
                                        commonStyle.absolute,
                                        UI.setTop(-10, '%'),
                                        UI.setWidth(),
                                        UI.setHeight(450),
                                        commonStyle.imgStretch
                                    ]}
                                />
                                <View 
                                    style={[
                                        commonStyle.textBoxBorderColor,
                                        UI.setHeight(185),
                                        UI.setRadius(20),
                                        UI.setPadding(15,15,15,15),
                                        commonStyle.bgWhite,
                                        commonStyle.shadow
                                    ]}
                                >
                                    <View style={[commonStyle.center]}>
                                        {this.context.isLogined 
                                            ?   <MyButton
                                                    type="imageText"
                                                    title={Lang("welcome.schAppo")}
                                                    onPress={this.handlePage}
                                                    arg={{page: "ScheduleAppo", visbility: 1}}
                                                    style={[
                                                        commonStyle.center,
                                                        //UI.setWidth(50, '%'),
                                                    ]}
                                                    textStyle={[
                                                        commonStyle.orangeFontSize, 
                                                        commonStyle.textOrange,
                                                        commonStyle.ptLg
                                                    ]}
                                                    source={require('../images/1024x/live.png')}
                                                    imgStyle={[UI.setScreen(90,90)]}
                                                />
                                            :
                                                <MyButton
                                                    type="imageText"
                                                    title={Lang("welcome.regPat")}
                                                    style={[commonStyle.pLg]}
                                                    textStyle={[
                                                        commonStyle.textCenter, 
                                                        commonStyle.orangeFontSize, 
                                                        commonStyle.textOrange,
                                                        commonStyle.ptLg
                                                    ]}
                                                    source={require("../images/1024x/enrollment.png")}
                                                    imgStyle={[UI.setScreen(90,90)]}
                                                    onPress={this.handlePage}
                                                    arg={{page: "Enrollment", visbility: 2}}
                                                />
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={[UI.setPadding(10,5,0,5, '%')]}>
                                <View 
                                    style={[
                                        commonStyle.textBoxBorderColor,
                                        UI.setRadius(20),
                                        UI.setHeight(185),
                                        UI.setPadding(15,15,15,15),
                                        commonStyle.pLg,
                                        commonStyle.bgWhite,
                                        commonStyle.shadow
                                    ]}
                                >   
                                    <MyText title={Lang("welcome.titleAppo")} theme="orange" />
                                    <MyAppointments inline={true} />
                                </View>
                            </View>
                            <View style={[UI.setPadding(10,5,0,5, '%')]}>
                                <View 
                                    style={[
                                        commonStyle.textBoxBorderColor,
                                        UI.setRadius(20),
                                        commonStyle.pLg,
                                        commonStyle.bgWhite,
                                        commonStyle.shadow
                                    ]}
                                >
                                    <View style={[commonStyle.row, commonStyle.vCenter]}>
                                        <Image 
                                            source={require("../images/pharma.png")}
                                            style={[UI.setScreen(50,50)]}
                                        />
                                        <MyText title={Lang("welcome.myMedi")} style={commonStyle.pl} theme="orange" />
                                    </View>
                                    <View style={[commonStyle.vPadLg]}>
                                        <MyText
                                            style={[commonStyle.textLineMd, commonStyle.textOrange, commonStyle.textLightBold ]}
                                            title={Lang("welcome.titleMedi") + " "}
                                            nestedTitle={this.state.medication ? this.state.medication.drug : Lang("welcome.noMedi")}
                                            nestedStyle={[commonStyle.textDark]}
                                        />
                                        
                                        {this.state.medication 
                                            ?
                                                <MyText
                                                    title={`${this.state.medication.sig} ${this.state.medication.dosage}`}
                                                    nestedTitle={" ...More"}
                                                    nestedStyle={[commonStyle.textBlue, commonStyle.textBold]}
                                                    onPress={this.handlePage.bind(this, {page: "HealthRecordInfo", visbility: 1, apiName: "/medications", prefix: 'med_', text: "healthRecords.med"})}
                                                />
                                            : null
                                        }
                                    </View>
                                    <TouchableOpacity
                                        style={[
                                            commonStyle.btnOrange, 
                                            UI.setHeight(40),
                                            UI.setRadius(20),
                                            UI.setWidth(100, '%')
                                        ]}
                                        disabled={!this.context.isLogined}
                                        onPress={this.handlePage.bind(this, {page: "RefillReq", visbility: 1})}
                                    >
                                        <Text 
                                            style={[
                                                commonStyle.themeNormalText, 
                                                commonStyle.textWhite
                                            ]}
                                        >
                                            {Lang("welcome.reqRefill")}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[UI.setPadding(10,0,0,0, '%')]}>
                                <View 
                                    style={[
                                        commonStyle.textBoxBorderColor,
                                        commonStyle.pLg,
                                        commonStyle.bgWhite,
                                        commonStyle.shadow
                                    ]}
                                >
                                    <MyText theme="orange" title={Lang("welcome.myPro")} />
                                    <View style={commonStyle.vPadLg}>
                                        {this.context.isLogined 
                                            ? <PersonProvider inline={true} />
                                            : this.guestText(Lang("welcome.noProvider"))
                                        }
                                    </View>
                                    <MyButton
                                        theme={"orange"}
                                        title={Lang("welcome.viewAll")}
                                        style={[
                                            UI.setHeight(40), 
                                            UI.setRadius(20),
                                            UI.setWidth(100, '%')
                                        ]}
                                        arg={{
                                            page: "PersonProvider", 
                                            visbility: 1, 
                                            direct: true, 
                                            notAllow: true, 
                                            providerDisable: true
                                        }}
                                        onPress={this.handlePage}
                                    />
                                </View>
                            </View>
                            <View style={[UI.setPadding(10,5,0,5, '%')]}>
                                <View 
                                    style={[
                                        commonStyle.textBoxBorderColor,
                                        UI.setRadius(20),
                                        commonStyle.pLg,
                                        commonStyle.bgWhite,
                                        commonStyle.shadow
                                    ]}
                                >
                                    <View style={[commonStyle.row, commonStyle.vCenter]}>
                                        <Image 
                                            source={require("../images/records.png")}
                                            style={[UI.setScreen(50,50)]}
                                        />
                                        <Text style={[commonStyle.themeOrangeText, commonStyle.pl]}>
                                            {Lang("welcome.myHealthRecords")}
                                        </Text>
                                    </View>
                                    <View style={[commonStyle.vPadLg]}>
                                        <Text 
                                            style={[
                                                commonStyle.textOrange, 
                                                commonStyle.textLightBold,
                                                commonStyle.textLineMd
                                            ]}
                                        >
                                            {Lang("welcome.testResult") + " "}
                                            <Text style={[commonStyle.textDark]}>
                                                {this.state.testResult 
                                                    ? this.state.testResult["Result Name"]
                                                    : Lang("welcome.noTestResult")
                                                }
                                            </Text>
                                        </Text>
                                        {this.genTestResult()}
                                    </View>
                                    <TouchableOpacity
                                        style={[
                                            commonStyle.btnOrange, 
                                            UI.setHeight(40),
                                            UI.setRadius(20),
                                            UI.setWidth(100, '%')
                                        ]}
                                        disabled={!this.context.isLogined}
                                        onPress={this.handlePage.bind(this, {page: "HealthRecords", visbility: 1})}
                                    >
                                        <Text 
                                            style={[
                                                commonStyle.themeNormalText, 
                                                commonStyle.textWhite
                                            ]}
                                        >
                                            {Lang("welcome.viewInPortal")}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[UI.setPadding(10,5,5,5, '%')]}>
                                <View 
                                    style={[
                                        commonStyle.textBoxBorderColor,
                                        UI.setRadius(20),
                                        commonStyle.pLg,
                                        commonStyle.bgWhite,
                                        commonStyle.shadow
                                    ]}
                                >
                                    <View style={[commonStyle.row, commonStyle.vCenter]}>
                                        <Image 
                                            source={require("../images/vitals.png")}
                                            style={[UI.setScreen(50,50)]}
                                        />
                                        <Text style={[commonStyle.themeOrangeText, commonStyle.pl]}>
                                            {Lang("welcome.healthManage")}
                                        </Text>
                                    </View>
                                    <View style={[commonStyle.vPadLg]}>
                                        {this.context.isLogined ? this.getGraph() : this.guestText(Lang("welcome.noHealthInf"))}
                                    </View>
                                    <TouchableOpacity
                                        style={[
                                            commonStyle.btnOrange, 
                                            UI.setHeight(40),
                                            UI.setRadius(20),
                                            UI.setWidth(100, '%')
                                        ]}
                                        disabled={!this.context.isLogined}
                                        onPress={this.handlePage.bind(this, {page: "Vitals", visbility: 1})}
                                    >
                                        <Text 
                                            style={[
                                                commonStyle.themeNormalText, 
                                                commonStyle.textWhite
                                            ]}
                                        >
                                            {Lang("welcome.viewInPortal")}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
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
        alignItems: 'center'
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