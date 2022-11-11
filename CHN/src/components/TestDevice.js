import React from 'react';
import { 
    View, 
    ScrollView,
    DeviceEventEmitter,
    NativeEventEmitter,
    NativeModules,
} from 'react-native';
import MyText from './libs/MyText';
import { iHealthDeviceManagerModule } from '@ihealth/ihealthlibrary-react-native';
import { iHelathDevices, iHealthCertificate } from '../config/iHealthConfig';
import MyButton from './libs/MyButton';
import commonStyle from '../css/commonStyle';
import Loader from './Loader';
import { vitalsIgnoreList } from '../config/chnConfig';

const eventList = {};
const buffer = {};
let timer = "";

export default class TestDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLog: [],
            found: [], // {mac: "80F5B57CBCA6", type: "KN550"}
            deviceApi: iHelathDevices[props.deviceType],
            reading: [],
            manualData: {},
            bodyHeight: 'auto',
            contentHeight: 0,
            isValid: false,
            isConnecting: false
        }
        this.eventList = {};
        this.iHealthEvents = UI.ios ? DeviceEventEmitter : new NativeEventEmitter(NativeModules.iHealthDeviceManagerModule);
    }

    componentDidMount() {
        this.eventList['auth'] = this.iHealthEvents.addListener(iHealthDeviceManagerModule.Event_Authenticate_Result, (e)=> {
            console.log(e);
            if (e.access) {
                this.setState({isValid: true}, ()=> {
                    console.log("Checking connected for " + this.props.deviceType);
                    iHealthDeviceManagerModule.startDiscovery(this.props.deviceType);
                });
            } else {
                alert("Authenication Failed");
            }
        });

        this.eventList['scan'] = this.iHealthEvents.addListener(iHealthDeviceManagerModule.Event_Scan_Device, (e)=> {
            let temp = [];
            // handle event.
            console.log("onScan event", e);
            temp.push(e);
            this.setState({found: temp});
        });

        this.eventList['connect'] = this.iHealthEvents.addListener(iHealthDeviceManagerModule.Event_Device_Connected, (e)=> {
            // handle event.
            console.log("onConnect event", e);
            this.setState({isConnecting: true});
            switch(e.type) {
                case 'HS2S': this.log(Lang("vitals.weightConn"), true); 
                break;
                default: this.log(Lang("vitals.deviceConnected"), true); 
                break;
            }
            this.readFromDevice(e);
        });

        this.eventList['failed'] = this.iHealthEvents.addListener(iHealthDeviceManagerModule.Event_Device_Connect_Failed, (e)=> {
            // handle event.
            console.log("on connect failed = ",e) 
            this.log(Lang("vitals.deviceRefused"), true);
            this.setState({isConnecting: false});
        });
        if (this.props.deviceType) {
            this.eventList['deviceNotify'] = this.iHealthEvents.addListener(iHelathDevices[this.props.deviceType].Event_Notify, (e)=> {
                // handle event.
                this.onNotify(e);
            });
        }
        iHealthDeviceManagerModule.sdkAuthWithLicense(iHealthCertificate);
    }

    componentWillUnmount() {
        console.log("Unmount");
        for (let key in this.eventList) {
            this.eventList[key].remove();
        }
        this.state.deviceApi.mac && this.state.deviceApi.disconnect(this.state.deviceApi.mac);
    }

    onSelect = (model) => {
        if (iHelathDevices[model.type]?.Event_Notify) {
            this.setState({deviceApi: iHelathDevices[model.type]});
            // Add listener for event
            if (!UI.ios) {
                iHelathDevices[model.type].getAllConnected();
            } else {
                console.log("Discover - ",this.state.deviceApi.type);
                iHealthDeviceManagerModule.startDiscovery(this.state.deviceApi.type);
            }
        } else {
            this.log("Device is not registered", true);
        }
    }

    onDeviceLayout = (event) => {
        let layout = event.nativeEvent.layout;
        this.setState({contentHeight: layout.height});
    }

    log = (msg, isClear) => {
        let temp = isClear ? [] : this.state.pageLog;
        temp.push(msg);
        this.setState({pageLog: temp});
    }

    onNotify(e) {
        console.log("onNotify event = ", e); 
        switch (e.action) {
            case "ACTION_GET_ALL_CONNECTED_DEVICES": {
                if (e.devices.length == 0) {
                    this.log("discovery start for = " + this.state.deviceApi.type);
                    iHealthDeviceManagerModule.startDiscovery(this.state.deviceApi.type);
                } else {
                    this.setState({found: e.devices});
                }
            }
            break;
            case 'online_result_bp': {
                this.setState({reading: e});
            }
            break;
            case 'historicaldata_bp': {
                if (e.data) {
                    this.setState({reading: e.data});
                } else {
                    this.log(Lang("vitals.noDeviceRecord"), true)
                }
            }
            break;
            case 'error_bp': {
                if (e.description == "device is disconnected.") {
                    console.log("Retry to connect", this.state.deviceApi.mac, this.state.deviceApi.type);
                    iHealthDeviceManagerModule.connectDevice(this.state.deviceApi.mac, this.state.deviceApi.type);
                }
            }
            break;
            case 'ready_measure_po': {
                this.log(Lang("vitals.pressCircle"), true);
                this.forceUpdate();
            }
            break;
            case 'ACTION_RESULTDATA_PO':
            case 'resultData_po': {
                this.setState({reading: e });
            }
            break;
            case 'action_anonymous_data': {
                if (e.history_data) {
                    (e.history_data.length > 0) && this.log(Lang("vitals.noDeviceRecord"), true);
                    let tempWeight = e.history_data.pop(); // * 2.2; // 1kg = 2.2lbs
                    tempWeight.weight = (tempWeight.weight * 2.20462).toFixed(2);
                    this.setState({reading: tempWeight}, ()=> {
                        // Need to clean memory
                        this.state.deviceApi.cleanData(this.state.deviceApi.mac);
                    });
                }
            } 
            break;
            case 'action_start_measure': 
            case 'ACTION_START_MEASURE': {
                this.log(Lang("vitals.connectStrips"), true);
                this.forceUpdate();
            }
            break;
            case 'action_strip_in':
            case 'ACTION_STRIP_IN': {
                this.log(Lang("vitals.dropBlood"), true);
                this.forceUpdate();
            }
            break;
            case "action_result":
            case 'ACTION_RESULT': {
                this.log(Lang("vitals.saveResult"), true);
                this.setState({reading: {mg: e.RESULT_VALUE || e.result_value} });
            }
            break;
            case 'action_error': {
                this.log(e.error_description, true);
                this.forceUpdate();
            }
            break;
            // default: this.log("Action not matched on notify");
            // break;
        }
    }

    onConnect = (data) => {
       // this.setState({isConnecting: true}, ()=> {
            if (this.state.deviceApi.mac) {
                this.log(Lang("vitals.connecting"), true)
                this.readFromDevice();
            } else {
                //Call the api 
                iHealthDeviceManagerModule.connectDevice(data.mac, data.type);
                this.setState({deviceApi:  {...this.state.deviceApi, ...data} });
            }
       // });
    }

    readFromDevice (event) {
        //console.log(event, this.state.deviceApi.mac);
        if (this.state.deviceApi.readData) {
            this.state.deviceApi.readData(this.state.deviceApi.mac);
        } else {
            console.log("No read method avialabel try start measure");
            this.state.deviceApi.resultType 
                ? this.state.deviceApi.startMeasure(this.state.deviceApi.mac, this.state.deviceApi.resultType)
                : this.state.deviceApi.startMeasure(this.state.deviceApi.mac);
        }   
    }

    storeData = ()=> {
        this.props.setDeviceData( this.state.reading );
    }

    checkData = (data) => {
        if (Array.isArray(data)) {
            return data.toString();
        } else if (typeof data == "object") {
            return JSON.stringify(data);
        } else {
            return data;
        }
    }

    vitalsBundle(readData) {
        const body = [];
        for (let key in readData) {
            if (!vitalsIgnoreList.includes(key)) {
                body.push(
                    <View 
                        key={key} 
                        style={[commonStyle.row, commonStyle.mb, commonStyle.orangeBorder, commonStyle.p]}
                    >
                        <MyText title={key} style={[commonStyle.textBlue, UI.setWidth(30, '%')]} />
                        <MyText title={this.checkData(readData[key])} style={[commonStyle.textDark, UI.setWidth(70, '%')]} />
                    </View>
                )
            }
        }
        return body;
    }

    readLayout = () => {
        const isArradyReading = Array.isArray(this.state.reading) ? this.state.reading : Object.keys(this.state.reading || {});
        if (this.state.reading && isArradyReading.length > 0) {
            return (
                <View>
                    { Array.isArray(this.state.reading)
                        ?  this.state.reading.map((readData, index)=>
                                <View key={index}>
                                    {this.vitalsBundle(readData)}
                                </View>
                            )
                        : 
                            <View>
                                {this.vitalsBundle(this.state.reading)}
                            </View>
                    }
                    <View style={[commonStyle.ptMd]}>
                        <MyButton
                            theme={true}
                            title={Lang("vitals.saveVitals")}
                            style={[UI.setHeight(40), UI.setWidth(100, '%')]}
                            onPress={this.storeData}
                        />
                    </View>
                </View>
            );
        }
        return (
            <View>
                {
                    this.state.found.map((item, index)=>
                        <MyButton
                            key={index}
                            theme={true}
                            title={item.mac}
                            arg={item}
                            onPress={this.onConnect}
                            style={[commonStyle.pLg]}
                            disabled={this.state.isConnecting}
                        />
                    )
                }
            </View>
        )
    }

    useDevice = () => {
        if (this.state.found.length == 0) {
            return (
                <View>
                    <Loader visible={true} />
                    <MyText
                        title={Lang("vitals.discovering")}
                    />
                </View>
            )
        }

        return (
            <View>
                {this.readLayout()}
                {this.state.pageLog.map((item, index)=> <MyText key={index} title={item} />)}
            </View>
        )
    }

    render() {
        return (
            <ScrollView>
                {this.useDevice()}
            </ScrollView>
        )
    }
}