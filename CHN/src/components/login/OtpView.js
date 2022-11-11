import React from "react";
import { View, TextInput } from "react-native";
import commonStyle from "../../css/commonStyle";
import MyButton from "../libs/MyButton";
import MyText from "../libs/MyText";
import ShowError from "../ShowError";

const OtpView = (props)=> {
    return (
        <View style={[UI.setPaddingTop(props.portrait ? 15 : 0, '%')]}>
            <MyText title={Lang("login.otpIns")} style={[commonStyle.vPadMd, props.css.label]} />
            <View style={[commonStyle.textBoxBorderColor, commonStyle.mb]}>
                <TextInput
                    style={props.css.TextInput}
                    placeholder={Lang("login.username")}
                    placeholderTextColor="#003f5c"
                    onChangeText={(userName) => props.handleInput({"username": userName})}
                />
            </View>
            <View style={[commonStyle.textBoxBorderColor]}>
                <TextInput
                    style={props.css.TextInput}
                    placeholder={Lang("login.otpPlaceholder")}
                    placeholderTextColor="#003f5c"
                    keyboardType="number-pad"
                    onChangeText={(otpStr) => props.handleInput({"otp": otpStr})}
                    maxLength={6}
                />
            </View>
            <ShowError data={props.errObj} type="otp" />
            <View style={[commonStyle.pLg, commonStyle.row, commonStyle.center]}>
                <MyButton
                    theme={true}
                    title={Lang("app 212.submit")}
                    onPress={props.onSubmit} 
                    style={[UI.setWidth(50, '%'), UI.setHeight(40), commonStyle.mr]}
                    textStyle={[commonStyle.fs5]}
                    disabled={!props.formObj.username}
                />
                <MyButton
                    theme={true}
                    title={Lang("login.resendOtp")}
                    onPress={props.onResendOtp} 
                    style={[UI.setWidth(50, '%'), UI.setHeight(40)]}
                    textStyle={[commonStyle.fs5]}
                    disabled={!props.formObj.username}
                />
            </View>
        </View>
    )
}

export default OtpView;