import React from 'react';
import {View, Text, TextInput, ScrollView, Image, TouchableOpacity} from 'react-native';
import { addDb, checkBlank, getTableRef } from '../config/myConfig';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import Icons from '../libs/Icons';

const Enrollment = (props)=> {
    const [formObj, setForm] = React.useState({});

    const handleInput = (type, value) => {
        setForm({ ...formObj, ...{[type]: value} });
    }

    const onSubmit = () => {
        let warn = checkBlank(formObj, ["name", "email", "phone", "pass"]);
        if (warn) { 
            showInfoModal(Lang(warn));
            return;
        }
        let extraProps = {
            currentStatus: "free",
            currentBooking: "free",
            driver: "selectNew",
            role: "rider"
        }
        getTableRef(`/users/${formObj.phone}`).once('value').then((res)=> {
            if(res.exists()) {
                showInfoModal("User Already exist. Please use another phone number.")
            } else {
                addDb(`/users/${formObj.phone}`, { ...formObj, ...extraProps}).then(()=> {
                    //props.handleLoginAction("back");
                    showInfoModal("Registration is successfull.")
                })
            }
        }).catch((err)=> {
            console.log(err);
        })
    }

    const onBack = () => {
        props.handleLoginAction("back");
    }

    return(
        <MyContext.Consumer>
            {context =>
                <ScrollView 
                    style={[
                        commonStyle.themeBg, 
                        UI.setPadding(20,30,20,30), 
                        UI.setScreen()
                    ]} 
                >
                <View 
                    style={[
                        commonStyle.vCenter, 
                        commonStyle.row, 
                        commonStyle.alignCorner,
                    ]}
                >
                    <View style={[UI.setWidth(70, '%')]}>
                        <Text 
                            style={[
                                commonStyle.introHeadingSize, 
                                commonStyle.textBold, 
                                commonStyle.textBlue, 
                                commonStyle.textStyle
                            ]}
                        >
                            {Lang("enroll.signUp")}
                        </Text>
                    </View>
                    <Image
                        source={require('../images/logo-icon.png')}
                        style={[UI.setScreen(80,80)]}
                    />
                </View>
                <View style={[commonStyle.row, commonStyle.vCenter]}>
                    <Text 
                        style={[
                            commonStyle.pb, 
                            commonStyle.themeSkyText
                        ]}
                    >
                        {Lang("enroll.name")}
                    </Text>
                    <Icons
                        name="star"
                        size={12}
                        style={[commonStyle.pl, commonStyle.pb, UI.setColor("red")]}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder={"Name"}
                        onChangeText={handleInput.bind(this, 'name')}
                        style={[
                            commonStyle.themeTextBox,
                            commonStyle.bgWhite,
                            UI.setHeight(50),
                        ]}
                    />
                </View>
                <View style={[commonStyle.ptLg, commonStyle.pb, commonStyle.row, commonStyle.vCenter]}>
                    <Text 
                        style={[
                            commonStyle.pb, 
                            commonStyle.themeSkyText
                        ]}
                    >
                        {Lang("enroll.email")}
                    </Text>
                    <Icons
                        name="star"
                        size={12}
                        style={[commonStyle.pl, commonStyle.pb, UI.setColor("red")]}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder={"Email"}
                        onChangeText={handleInput.bind(this, 'email')}
                        style={[
                            commonStyle.themeTextBox,
                            commonStyle.bgWhite,
                            UI.setHeight(50),
                        ]}
                    />
                </View>
                <View style={[commonStyle.ptLg, commonStyle.pb, commonStyle.row, commonStyle.vCenter]}>
                    <Text 
                        style={[
                            commonStyle.themeSkyText
                        ]}
                    >
                        {Lang("enroll.phone")}
                    </Text>
                    <Icons
                        name="star"
                        size={12}
                        style={[commonStyle.pl, commonStyle.pb, UI.setColor("red")]}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder="+91"
                        onChangeText={handleInput.bind(this, 'phone')}
                        style={[
                            commonStyle.themeTextBox,
                            commonStyle.bgWhite,
                            UI.setHeight(50),
                        ]}
                    />
                </View>
                <View style={[commonStyle.ptLg, commonStyle.pb, commonStyle.row, commonStyle.vCenter]}>
                    <Text 
                        style={[
                            commonStyle.themeSkyText
                        ]}
                    >
                        {Lang("enroll.pass")}
                    </Text>
                    <Icons
                        name="star"
                        size={12}
                        style={[commonStyle.pl, commonStyle.pb, UI.setColor("red")]}
                    />
                </View>
                <View>
                    <TextInput
                        onChangeText={handleInput.bind(this, 'pass')}
                        secureTextEntry={true}
                        style={[
                            commonStyle.themeTextBox,
                            commonStyle.bgWhite,
                            UI.setHeight(50),
                        ]}
                    />
                </View>
                <View style={[commonStyle.ptLg, commonStyle.pb,]}>
                    <Text 
                        style={[
                            commonStyle.themeSkyText,
                        ]}
                    >
                        {Lang("enroll.attach")}
                    </Text>
                </View>
                <View>
                    <Text
                        style={[
                            commonStyle.themeTextBox,
                            commonStyle.bgWhite,
                            UI.setHeight(50),
                        ]}
                    >...</Text>
                </View>
                <View style={[commonStyle.center, commonStyle.ptLg, commonStyle.row]}>
                    <TouchableOpacity 
                        style={[
                            UI.setHeight(40),
                            commonStyle.btnSky,
                        ]} 
                        onPress={onSubmit}
                    >
                        <Text 
                            style={[
                                commonStyle.themeBtnText
                            ]}
                        >
                            {Lang("enroll.submit")}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[
                            UI.setHeight(40),
                            commonStyle.btnSky,
                            commonStyle.bgDark,
                            commonStyle.ml
                        ]} 
                        onPress={onBack}
                    >
                        <Text 
                            style={[
                                commonStyle.themeBtnText
                            ]}
                        >
                            {Lang("enroll.back")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            }
        </MyContext.Consumer>
    )
}

export default Enrollment;