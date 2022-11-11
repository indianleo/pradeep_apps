import React from 'react';
import commonStyle from '../../css/commonStyle';
import { 
    View, 
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import { apiCall, getStoreData, storeData } from '../../api/apiAction';
import ShowError from '../ShowError';
import Loader from '../Loader';
import InfoModal from '../InfoModal';
import MyText from '../libs/MyText';
import MyButton from '../libs/MyButton';
import ChnContext from '../../context/ChnContext';
import OtpView from './OtpView';
import ForgotPass from './ForgotPass';
import ResetUser from './ResetUser';

const Login = (props)=> {
    const infoModalRef = React.useRef();
    const contextOptions = React.useContext(ChnContext);
    const [formObj, updateForm] = React.useState({});
    const [isLoading, setLoading] = React.useState(false);
    const [errObj, setError] = React.useState({});
    const [isForgot, setForgot] = React.useState(false);
    const [apn, setApn] = React.useState({});
    const [isOtp, setOtpView] = React.useState(false);
    const [isUserReset, setUserReset] = React.useState(false);


    React.useEffect(()=> {
        getStoreData("otpView").then((res)=> {
            if (res && res.status == "get") {
                setOtpView(true);
            }
        }).catch((err)=> {
            console.log("otp get error",err)
        })
        getStoreData("deviceToken").then((res)=> {
            setApn({...{device_id: res.token, os: res.os} });
           //setApn({device_id: "12361237612", os: "ios"})
            updateForm({...formObj, ...{device_id: res.token, os: res.os}})
        }).catch((err)=> {
            console.log("Error in device token", err);
            updateForm({...formObj, ...{device_id: "res.token", os: "ios"}})
        }) 
        getStoreData("_user").then((res)=> {
            console.log({savedLogin: res});
            if (res && res.access_token && res.patient_id) {
                contextOptions.handleLogin({userName: res.name || "User", role: "Patient", ...res});
                props.handleAction("login", '');
                props.closeSplash();
            }
        }).catch((err)=> {
            console.log(err);
            props.closeSplash();
        })
    }, []);

    const handleInput = (data)=> {
        console.log(data);
        updateForm({...formObj, ...data})
    }

    const showForgot = () => {
        updateForm({...apn, username: "", password: ""})
        setForgot(!isForgot);
    }

    const showResetUser = () => {
        //updateForm({...apn, username: "", password: ""})
        setUserReset(!isUserReset);
    }

    const reqPassword = () => {
        setLoading(true);
        apiCall(
            "/request-password", 
            {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                }
            },
            formObj
        ).then((res)=> {
            if (res?.status) {
                infoModalRef.current.showInfoModal({title: res.success, onOk: ()=> showForgot()})
            } else {
                console.log(res);
                setError(UI.createError(res));
            }
            setLoading(false);
        }).catch((err)=> {
            console.log(err, formObj);
            setLoading(false);
            showInfoModal();
        })
    }

    const reqUserId = ()=> {
        setLoading(true);
        apiCall(
            "/request-username", 
            {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                }
            },
            formObj
        ).then((res)=> {
            if (res?.status) {
                infoModalRef.current.showInfoModal({title: res.success, onOk: ()=> showResetUser()})
            } else {
                console.log(res);
                setError(UI.createError(res));
            }
            setLoading(false);
        }).catch((err)=> {
            console.log(err, formObj);
            setLoading(false);
            showInfoModal();
        })
    }
    
    const handleBtnAction = (type)=> {
        if (type == "reg") {
            props.handleAction(type, '');
        } else {
            setLoading(true);
            apiCall("/login", 
                {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                    }
                }, 
                formObj
            ).then((res)=> {
                console.log(res);
                if (res?.status) {
                    contextOptions.handleLogin({userName: res.name || "User", role: type, ...res});
                    setLoading(false);
                    props.handleAction("login", '');
                } else if (res.message == "otp_not_verified") {
                    setLoading(false);
                    setOtpView(true);
                } else {
                    setError(UI.createError(res, res.message ? "username" : "reqInfo"));
                    setLoading(false);
                } 
            }).catch((err)=> {
                console.log({login: err});
                setLoading(false);
                showInfoModal()
            })
        }
    }

    const onResendOtp= ()=> {
        setLoading(true)
        apiCall("/resend-verification-code", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            }
        },
        formObj).then((res)=> {
            console.log(res);
            if (res.status) {
                infoModalRef.current.showInfoModal("OTP sent. Please check your mail.");
            }
        }).catch((err)=> {
            console.log(err);

        }).finally(()=> {
            setLoading(false);
        })
    }

    const submitOtp = ()=> {
        setLoading(true)
        apiCall("/verify-email", 
            {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                }
            }, formObj)
        .then((res)=> {
            console.log(res);
            if (res.status) {
                storeData("otpView", {status: "set"});
                showInfoModal({title: "Email Verified. Please login now", onOk: ()=> setOtpView(false)})
            } else {
                setError(UI.createError(res, "otp"));
            }
        }).catch((err)=> {
            console.log("verify email error", err);
        }).finally(()=> {
            setLoading(false)
        })
    }

    const getLayout = React.useCallback((context) => {
        if (isOtp) {
            return (
                <OtpView
                    errObj={errObj}
                    css={styles}
                    handleInput={handleInput}
                    onSubmit={submitOtp}
                    onResendOtp={onResendOtp}
                    formObj={formObj}
                    portrait={context.portrait}
                />
            )
        }
        if (isForgot) {
            return (
                <ForgotPass
                    errObj={errObj}
                    css={styles}
                    handleInput={handleInput}
                    onSubmit={reqPassword}
                    onBack={showForgot}
                    formObj={formObj}
                    portrait={context.portrait}
                />
            )
        }
        if (isUserReset) {
            return (
               <ResetUser
                    errObj={errObj}
                    css={styles}
                    handleInput={handleInput}
                    onSubmit={reqUserId}
                    onBack={showResetUser}
                    formObj={formObj}
                    portrait={context.portrait}
               />
            )
        }

        return (
            <View style={[UI.setPaddingTop(context.portrait ? 15 : 0, '%')]}>
                <Text style={[commonStyle.vPadMd, styles.label]}>
                    {Lang("login.ins1")}
                </Text>
                <View style={[commonStyle.textBoxBorderColor]}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder={Lang("login.username")}
                        placeholderTextColor="#003f5c"
                        value={formObj.username}
                        onChangeText={(userName) => handleInput({"username": userName})}
                    />
                </View>
                <ShowError data={errObj} type="username" />
                <View style={[commonStyle.textBoxBorderColor, commonStyle.mtmd]}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder={Lang("login.pass")}
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        value={formObj.password}
                        onChangeText={(password) => handleInput({"password": password})}
                    />
                </View>
                <ShowError data={errObj} type="password" />
                <ShowError data={errObj} type="reqInfo" textStyle={[commonStyle.textDark]} />
                <View style={commonStyle.vCenter}>
                    <TouchableOpacity 
                        onPress={handleBtnAction.bind(this, 'appUser')} 
                        style={[
                            UI.setHeight(50), 
                            UI.setWidth(100, '%'), 
                            commonStyle.mtmd, 
                            commonStyle.btnOrange
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
                <View 
                    style={[
                        styles.vm, 
                        commonStyle.center, 
                        UI.setBorderBottom(1, '#7575a3'), 
                        commonStyle.pbMd,
                        UI.setWidth(100, '%')
                    ]}
                >
                    <MyText
                        title={Lang("login.reg")}
                        onPress={handleBtnAction.bind(this, 'reg')} 
                        style={[styles.label]}
                    />
                </View>
                <View style={[styles.btnContainer, commonStyle.mt]}>
                    <MyText
                        title={Lang("login.resetUser")}
                        onPress={showResetUser} 
                        style={[UI.setWidth(50, '%'), styles.label]}
                    />
                    <MyText
                        title={Lang("login.forgot")}
                        onPress={showForgot} 
                        style={[UI.setWidth(50, '%'), styles.label, commonStyle.textRight]}
                    />
                </View>
            </View>
        )
    }, [isForgot, isOtp, formObj, errObj, isUserReset])

    return (
        <ChnContext.Consumer>
            {context =>
                <ScrollView style={[commonStyle.bgWhite, UI.setHeight(98, '%'), UI.setPadding(5,8,5,8, '%')]}>
                    <View 
                        style={[
                            commonStyle.vCenter, 
                            commonStyle.row, 
                            commonStyle.center,
                        ]}
                    >
                        <Image
                            source={require('../../images/banner.png')}
                            style={[UI.setWidth(90, '%'), commonStyle.imgContain]}
                        />
                    </View>
                    <Loader loading={isLoading} style={[commonStyle.pLg]} />
                    {getLayout(context)}
                    <InfoModal ref={infoModalRef} key="intorModal" />
                </ScrollView>
            }
        </ChnContext.Consumer>
    )
}

const styles = StyleSheet.create({
    vm: {
        marginVertical: 5
    },
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
        //backgroundColor: "#ddd",
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
        color: "#4d4d4d"
      },
})

export default Login;