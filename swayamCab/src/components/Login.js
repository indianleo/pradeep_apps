import React from 'react';
import commonStyle from '../css/commonStyle';
import { 
    View, 
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import MyContext from '../context/MyContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTableRef } from '../config/myConfig';
import Loader from '../libs/Loader';
import { notifyByTime } from '../config/theme';
import MyButton from '../libs/MyButton';

const Login = (props)=> {
    const contextOptions = React.useContext(MyContext);
    const [phone, updatePhone] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [isLoading, setLoading] = React.useState(false);

    const setPhone = (phoneNo)=> {
        updatePhone(phoneNo);
    }

    const handleInput = (name, value) => {
        if (name == "email") {
            setPhone(value);
        } else if (name == "pass") {
            setOtp(value);
        }
    }

    const getOtp = () => {
        console.log("getOtp");
        //notifyByTime("Test");
    }
    
    const handleBtnAction = (type)=> {
        if (type == 'reg') {
            props.handleAction(type, '');
        } else {
            if (phone.length < 9) {
                showInfoModal("Please fill Phone no.");
            } else if (otp.length < 2) {
                showInfoModal("Please fill password");
            } else {
                setLoading(true);
                getTableRef(`/users/${phone}`).once("value").then((res)=> {
                    let _data = res.val();
                    if (UI.isValid(_data) && _data.pass == otp) {
                        contextOptions.handleLogin({userId: phone, ..._data});
                        props.handleAction(type, '');
                    } else {
                        if (_data.phone != phone) {
                            showInfoModal("Incorrect UserID");
                        } else {
                            showInfoModal("Incorrect Password");
                        }
                        setLoading(false);
                    }
                }).catch((err)=> {
                    console.log(err);
                    showInfoModal("Please check your internet");
                })
            }
        }
    }

    return (
        <MyContext.Consumer>
            {context =>
                <ScrollView style={[commonStyle.bgWhite, UI.setHeight(98, '%')]}>
                    <View style={[ commonStyle.row]}>
                        <Image
                            source={require('../images/bgBook3.jpeg')}
                            style={[
                                UI.setWidth(100, '%'), 
                                UI.setHeight(250),
                                commonStyle.imgStretch,
                            ]}
                        />
                    </View>
                    <Loader loading={isLoading} />
                    <View style={[UI.setPadding(5,8,5,8, '%')]}>
                        <Text style={[commonStyle.vPadMd, styles.label, commonStyle.textOffSky]}>
                            {Lang("login.ins")}
                        </Text>
                        <View style={[commonStyle.textBoxBorderColor, commonStyle.row]}>
                            <View style={[commonStyle.center, UI.setScreen(50,40), UI.setBorderRight(1, "#ccc")]}>
                                <Icon 
                                    name="phone-portrait"
                                    size={20}
                                    color="#79a6d2"
                                />
                            </View>
                            <TextInput
                                style={styles.TextInput}
                                placeholder={Lang("home.phone")}
                                placeholderTextColor="#003f5c"
                                onChangeText={handleInput.bind(this, 'email')}
                            />
                        </View>
                        <View style={[commonStyle.textBoxBorderColor, commonStyle.mtmd, commonStyle.row]}>
                            <View style={[commonStyle.center, UI.setScreen(50,40), UI.setBorderRight(1, "#ccc")]}>
                                <Icon 
                                    name="barcode"
                                    size={20}
                                    color="#79a6d2"
                                />
                            </View>
                            <TextInput
                                style={styles.TextInput}
                                placeholder={Lang("login.pass")}
                                placeholderTextColor="#003f5c"
                                secureTextEntry={true}
                                onChangeText={handleInput.bind(this, "pass")}
                            />
                        </View>
                        <MyButton
                            title={Lang("login.forgot")}
                            style={[commonStyle.ptMd]}
                            textStyle={[commonStyle.themeNormalText, commonStyle.textOffSky, commonStyle.textRight]}
                            onPress={getOtp}
                        />
                        <View style={commonStyle.vCenter}>
                            <MyButton
                                theme="heading"
                                title={Lang("login.title")}
                                arg={'login'}
                                onPress={handleBtnAction} 
                                style={[UI.setHeight(50), UI.setWidth(100, '%'), commonStyle.mtmd ]}
                            />
                        </View>
                    </View>
                    <MyButton
                        title={Lang("login.new")}
                        nestedTitle={" " + Lang("login.reg")}
                        style={[UI.setWidth(100, '%'), commonStyle.center]}
                        textStyle={[UI.setFont(20)]}
                        nestedStyle={[commonStyle.textOffSky]}
                        onPress={handleBtnAction} 
                        arg={'reg'}
                    />
                </ScrollView>
            }
        </MyContext.Consumer>
    )
}

const styles = StyleSheet.create({
    label: {
        fontWeight: '500',
        fontSize: 20,
        fontFamily: 'Roboto',
    },
    btnContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingBottom:100
    },
    inputView: {
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        width: "100%",
        height: 45,
        marginBottom: 20,
      },
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 5,
        fontFamily: 'Roboto',
        fontSize: 18,
      },
})

export default Login;