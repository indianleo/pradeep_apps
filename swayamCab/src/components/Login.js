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

const Login = (props)=> {
    const contextOptions = React.useContext(MyContext);
    const [phone, updatePhone] = React.useState("");
    const [isLoading, setLoading] = React.useState(false);

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
            setLoading(true);
            getTableRef(`/users/${phone}`).once("value").then((res)=> {
                let _data = res.val();
                if (UI.isValid(_data)) {
                    contextOptions.handleLogin({userId: phone, ..._data});
                    props.handleAction(type, '');
                } else {
                    showInfoModal("Incorrect UserID or Password");
                    setLoading(false);
                }
            }).catch((err)=> {
                console.log(err);
                showInfoModal("Please check your internet");
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
                                    style={[
                                        UI.setColor("#79a6d2")
                                    ]}
                                />
                            </View>
                            <TextInput
                                style={styles.TextInput}
                                keyboardType="number-pad"
                                placeholder={Lang("home.phone")}
                                defaultValue={"7800794002"}
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
                                placeholder={Lang("login.otp")}
                                placeholderTextColor="#003f5c"
                                keyboardType="number-pad"
                                secureTextEntry={true}
                                onChangeText={(password) => setOtp(password)}
                            />
                        </View>
                        <TouchableOpacity 
                            onPress={()=> alert("Underprocess. Please Wait")} 
                            style={[commonStyle.ptMd]}
                        >
                            <Text 
                                style={[
                                    commonStyle.themeNormalText, 
                                    commonStyle.textOffSky,
                                    commonStyle.textRight
                                ]}
                            >
                                {Lang("login.getOtp")}
                            </Text>
                        </TouchableOpacity>
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
                                    {Lang("login.title")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity 
                        onPress={handleBtnAction.bind(this, 'reg')} 
                        style={[UI.setWidth(100, '%'), commonStyle.center]}
                    >
                        <Text style={[styles.label]}>
                            {Lang("login.new")} 
                            <Text style={[commonStyle.textOffSky]}>
                                {Lang("login.reg")}
                            </Text>
                        </Text>
                    </TouchableOpacity>
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