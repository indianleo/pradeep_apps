import React from 'react';
import { 
    View, 
    ScrollView,
    TextInput,
    Keyboard
} from 'react-native';
import MyText from './libs/MyText';
import { iHelathDevices, manualVitalConfig } from '../config/iHealthConfig';
import MyButton from './libs/MyButton';
import commonStyle from '../css/commonStyle';

const eventList = {};
let timer = "";

export default class SelectDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manualData: {},
            bodyHeight: 'auto',
            contentHeight: 0,
            isValid: false,
            modeName: false,
            checkManual: true,
        }
        this.eventList = {};
    }

    componentDidMount() {
        this.eventList['showKeyboard'] = Keyboard.addListener("keyboardDidShow", (e) => {
            //console.log(e);
            let keyboardHeight = (e.startCoordinates?.height || e.endCoordinates.height) + 100;
            //console.log(e, keyboardHeight)
            this.setState({bodyHeight: keyboardHeight + this.state.contentHeight});
          });
        this.eventList['hideKeyboard'] = Keyboard.addListener("keyboardDidHide", (e) => {
            this.setState({bodyHeight: 'auto'});
        });
    }

    componentWillUnmount() {
        for (let key in this.eventList) {
            this.eventList[key].remove();
        }
    }

    onSelect = (model) => {
        if (iHelathDevices[model.type]?.Event_Notify) {
            this.props.setType(model.type);
        } else {
            alert("Device is not registered");
        }
    }

    onDeviceLayout = (event) => {
        let layout = event.nativeEvent.layout;
        this.setState({contentHeight: layout.height});
    }

    storeData = ()=> {
        this.props.setDeviceData(this.state.manualData);
    }

    saveManual(name, value) {
        let newObj = {[name]: value};
        this.setState({ manualData: {...this.state.manualData, ...newObj} });
    }

    getManualBox() {
        return (
            <View style={[commonStyle.vPadMd]}>
                {
                    manualVitalConfig[this.props.cat].map((item, index)=> 
                        <View 
                            key={index} 
                            style={[
                                commonStyle.row, 
                                commonStyle.mb, 
                                commonStyle.orangeBorder, 
                                commonStyle.p,
                                commonStyle.vCenter
                            ]}
                        >
                            <MyText title={item.label} style={[UI.setWidth(25, '%')]}/>
                            <TextInput
                                onChangeText={this.saveManual.bind(this, item.name)}
                                style={[UI.setBorderLeft(1, '#ccc'), UI.setWidth(75, '%'), commonStyle.plMd]}
                            />
                        </View>
                    )
                }
            </View>
        )
    }

    getDevice = ()=> {
        if (this.state.isManual) {
            return (
                <View style={[UI.setHeight(this.state.bodyHeight)]} onLayout={this.onDeviceLayout}>
                    <MyText theme="heading" title="Enter your Vitals" />
                    {this.getManualBox()}
                    <MyButton
                        theme={true}
                        title={"Save Vitals"}
                        style={[UI.setHeight(40), UI.setWidth(100, '%')]}
                        onPress={this.storeData}
                    />
                </View>
            )
        }
        const layout = [];
        for (let model in iHelathDevices) {
            if (iHelathDevices[model].cat == this.props.cat) {
                console.log(iHelathDevices[model]);
                layout.push(
                    <View key={model} style={[commonStyle.pSm]}>
                        <MyButton
                            title={iHelathDevices[model].label}
                            arg={iHelathDevices[model]}
                            onPress={this.onSelect}
                            theme={"orange"}
                            style={[commonStyle.pLg]}
                        />
                    </View>
                )
            }
        }
        return (
            <View style={[commonStyle.row, commonStyle.wrap, commonStyle.center]}>
                {layout}
            </View>
        )
    }
    onMode = (mode) => {
        this.setState({isManual: mode, checkManual: false});
    }

    render() {
        return (
            <ScrollView>
                {this.state.checkManual
                    ? 
                        <View style={[commonStyle.row, commonStyle.pLg]}>
                            <MyButton
                                theme={true}
                                title="Manually"
                                arg={true}
                                onPress={this.onMode}
                                style={[UI.setHeight(40)]}
                            />
                            <MyButton
                                theme={true}
                                title="Automatic (Bluetooth)"
                                arg={false}
                                onPress={this.onMode}
                                style={[UI.setHeight(40), commonStyle.ml]}
                            />
                        </View>
                    :   this.getDevice()
                }
            </ScrollView>
        )
    }
}