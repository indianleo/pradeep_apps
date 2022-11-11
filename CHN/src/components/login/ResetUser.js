import React from "react";
import { View, TextInput } from "react-native";
import commonStyle from "../../css/commonStyle";
import InfoModal from "../InfoModal";
import DatePicker from "../libs/DatePicker";
import MyButton from "../libs/MyButton";
import MyText from "../libs/MyText";
import ShowError from "../ShowError";

const ResetUser = (props) => {
    const [dateModal, showDate] = React.useState(false);

    const onDayPress = (itemValue)=> {
        props.handleInput({"dob": itemValue.dateString})
    }

    const handleDateOpen = ()=> {
        showDate(true);
    }

    const datWarning = ()=> {
        setTimeout(()=> { 
            showInfoModal("Please use calendar to select date.");
        }, 500)
    }

    return (
        <View>
            <View style={[UI.setPaddingBottom(45)]}>
                <MyText 
                    theme="heading"
                    title={Lang("login.forgotIns")} 
                    style={[commonStyle.vPadMd]} 
                />
                <View style={[]}>
                    <View 
                        style={[
                            commonStyle.textBoxBorderColor, 
                            commonStyle.row,
                            commonStyle.vCenter,
                        ]}
                    >
                        <MyButton
                            type="icon"
                            iconName="calendar"
                            iconSize={30}
                            iconStyle={[commonStyle.textBlue]}
                            style={[UI.setPadding(3,8,3,8)]}
                            onPress={handleDateOpen}
                        />
                        <TextInput
                            placeholder={Lang("app 212.dob")}
                            onPressIn={datWarning}
                            value={props.formObj.dob}
                            pointerEvents={"none"}
                            style={[
                                commonStyle.bgWhite, 
                                UI.setHeight(50), 
                                UI.setWidth(86, '%'),
                                commonStyle.p,
                                commonStyle.textStyle,
                                commonStyle.placeHolderFont,
                            ]}
                        />
                    </View>
                    <ShowError data={props.errObj} type="dob" />
                </View>
                <View style={[commonStyle.textBoxBorderColor, commonStyle.mtmd]}>
                    <TextInput
                        style={props.css.TextInput}
                        placeholder={Lang("login.email")}
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => props.handleInput({"email": email})}
                        value={props.formObj.email}
                    />
                </View>
                <ShowError data={props.errObj} type="email" />
                <View style={[commonStyle.pLg, commonStyle.row, commonStyle.center]}>
                    <MyButton
                        theme={true}
                        title={Lang("app 212.submit")}
                        onPress={props.onSubmit} 
                        style={[UI.setWidth(50, '%'), UI.setHeight(40)]}
                        textStyle={[commonStyle.fs5]}
                        disabled={(!props.formObj.dob && !props.formObj.email)}
                    />
                    <MyButton
                        theme={true}
                        title={Lang("app 212.back")}
                        onPress={props.onBack} 
                        style={[UI.setWidth(50, '%'), UI.setHeight(40), commonStyle.bgDark, commonStyle.ml]}
                        textStyle={[commonStyle.fs5]}
                    />
                </View>
                <ShowError data={props.errObj} type="reqInfo" />
            </View>
            <InfoModal external={true} isVisible={dateModal} onClose={()=> showDate(false)}>
                <DatePicker 
                    onTouch={onDayPress} 
                    list={true} 
                    style={[UI.setMaxHeight(UI.height()/1.2), UI.setWidth()]}
                    currentDate={props.formObj.dob}
                />
            </InfoModal>
        </View>
    )
}

export default ResetUser;