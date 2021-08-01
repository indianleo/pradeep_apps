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

const Login = (props)=> {
    const contextOptions = React.useContext(MyContext);
    const [phone, updatePhone] = React.useState("");
    const setOtp = (pass)=> {
        console.log({pass})
    }

    const setPhone = (phoneNo)=> {
        updatePhone(phoneNo);
    }
    
    const handleBtnAction = (type)=> {
        if (type == 'reg') {
            props.handleAction(type, '');
        } else {
            getTableRef(`/users/${phone}`).once("value").then((res)=> {
                let _data = res.val();
                if (UI.isValid(_data)) {
                    contextOptions.handleLogin({userName: "Pradeep Yadav", userId: phone, ..._data});
                    props.handleAction(type, '');
                } else {
                    showInfoModal("Incorrect UserID or Password");
                }
            })
        }
    }

    return (
        <MyContext.Consumer>
            {context =>
                <ScrollView style={[commonStyle.bgWhite, UI.setHeight(98, '%')]}>
                    <View 
                        style={[ 
                            commonStyle.row, 
                        ]}
                    >
                        <Image
                            source={require('../images/bgBook3.jpeg')}
                            style={[
                                UI.setWidth(100, '%'), 
                                UI.setHeight(250),
                                commonStyle.imgStretch,
                            ]}
                        />
                    </View>
                    <View style={[UI.setPadding(5,8,5,8, '%')]}>
                        <Text style={[commonStyle.vPadMd, styles.label, commonStyle.textOffSky]}>
                            Please Login To Continue:
                        </Text>
                        <View style={[commonStyle.textBoxBorderColor, commonStyle.row]}>
                            <View style={[commonStyle.center, UI.setScreen(50,40), UI.setBorderRight(1, "#ccc")]}>
                                <Icon 
                                    name="phone-portrait"
                                    size={20}
                                    style={[
                                        UI.setColor("#79a6d2")
                                    ]}
                                />
                            </View>
                            <TextInput
                                style={styles.TextInput}
                                placeholder={"Phone"}
                                placeholderTextColor="#003f5c"
                                onChangeText={(email) => setPhone(email)}
                            />
                        </View>
                        <View style={[commonStyle.textBoxBorderColor, commonStyle.mtmd, commonStyle.row]}>
                            <View style={[commonStyle.center, UI.setScreen(50,40), UI.setBorderRight(1, "#ccc")]}>
                                <Icon 
                                    name="barcode"
                                    size={20}
                                    style={[
                                        UI.setColor("#79a6d2")
                                    ]}
                                />
                            </View>
                            <TextInput
                                style={styles.TextInput}
                                placeholder={"OTP"}
                                placeholderTextColor="#003f5c"
                                keyboardType="number-pad"
                                secureTextEntry={true}
                                onChangeText={(password) => setOtp(password)}
                            />
                        </View>
                        <View style={commonStyle.vCenter}>
                            <TouchableOpacity 
                                onPress={handleBtnAction.bind(this, 'login')} 
                                style={[
                                    UI.setHeight(50), 
                                    UI.setWidth(100, '%'), 
                                    commonStyle.mtmd, 
                                    commonStyle.middle,
                                    commonStyle.bgOffSky,
                                    commonStyle.brSm,
                                    commonStyle.shadow
                                ]}
                            >
                                <Text 
                                    style={[
                                        commonStyle.backFontSize, 
                                        styles.label, 
                                        commonStyle.textCenter, 
                                        commonStyle.textWhite
                                    ]}
                                >
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.btnContainer, commonStyle.mt]}>
                            <TouchableOpacity 
                                onPress={handleBtnAction.bind(this, 'reg')} 
                                style={[UI.setWidth(50, '%')]}
                            >
                                <Text style={[styles.label, commonStyle.textOffSky,commonStyle.textLeft]}>
                                    Sign-up
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=> alert("Wait")} 
                                style={[UI.setWidth(50, '%')]}
                            >
                                <Text style={[styles.label, commonStyle.textOffSky,commonStyle.textRight]}>
                                    Forgot Password
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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