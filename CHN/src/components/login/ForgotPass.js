import React from "react";
import { View, TextInput } from "react-native";
import commonStyle from "../../css/commonStyle";
import MyButton from "../libs/MyButton";
import MyText from "../libs/MyText";
import ShowError from "../ShowError";

const ForgotPass = (props)=> {

    return (
        <View style={[UI.setPaddingBottom(45)]}>
            <MyText title={Lang("login.forgotIns")} style={[commonStyle.vPadMd, props.css.label]} />
            <View style={[commonStyle.textBoxBorderColor]}>
                <TextInput
                    style={props.css.TextInput}
                    placeholder={Lang("login.username")}
                    placeholderTextColor="#003f5c"
                    onChangeText={(userName) => props.handleInput({"username": userName})}
                />
            </View>
            <ShowError data={props.errObj} type="username" />
            <View style={[commonStyle.textBoxBorderColor, commonStyle.mtmd]}>
                <TextInput
                    style={props.css.TextInput}
                    placeholder={Lang("login.email")}
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => props.handleInput({"email": email})}
                />
            </View>
            <ShowError data={props.errObj} type="email" />
            <View style={[commonStyle.pLg, commonStyle.row, commonStyle.center]}>
                <MyButton
                    theme={true}
                    title={Lang("app 212.submit")}
                    onPress={props.onSubmit} 
                    style={[UI.setScreen(100, 40)]}
                    textStyle={[commonStyle.fs5]}
                />
                <MyButton
                    theme={true}
                    title={Lang("app 212.back")}
                    onPress={props.onBack} 
                    style={[UI.setScreen(100, 40), commonStyle.bgDark, commonStyle.ml]}
                    textStyle={[commonStyle.fs5]}
                />
            </View>
            <ShowError data={props.errObj} type="reqInfo" />
        </View>
    )
}

export default ForgotPass;