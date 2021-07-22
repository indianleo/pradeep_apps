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
        contextOptions.handleLogin({userName: "Pradeep Yadav", role: phone});
        props.handleAction(type, '');
    }

    return (
        <MyContext.Consumer>
            {context =>
                <ScrollView style={[commonStyle.bgWhite, UI.setHeight(98, '%')]}>
                    <View 
                        style={[
                            commonStyle.vCenter, 
                            commonStyle.row, 
                            commonStyle.center,
                        ]}
                    >
                        <Image
                            source={require('../images/banner.png')}
                            style={[UI.setWidth(100, '%'), UI.setHeight(250), commonStyle.imgCover]}
                        />
                    </View>
                    <View style={[UI.setPadding(5,8,5,8, '%')]}>
                        <Text style={[commonStyle.vPadMd, styles.label]}>
                            Please Login To Continue
                        </Text>
                        <View style={[commonStyle.textBoxBorderColor]}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder={"Phone"}
                                placeholderTextColor="#003f5c"
                                onChangeText={(email) => setPhone(email)}
                            />
                        </View>
                        <View style={[commonStyle.textBoxBorderColor, commonStyle.mtmd]}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder={"OTP"}
                                placeholderTextColor="#003f5c"
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
                                    commonStyle.bgOrange,
                                    commonStyle.brSm
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
                                <Text style={[styles.label, commonStyle.textLeft]}>
                                    Registration
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
        marginLeft: 20,
        fontFamily: 'Roboto',
        fontSize: 18,
      },
})

export default Login;