import React from 'react';
import {View, Text, TextInput, ScrollView, Image, TouchableOpacity} from 'react-native';
import { addDb } from '../config/myConfig';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';

const Enrollment = (props)=> {
    const [formObj, setForm] = React.useState({});

    const handleInput = (type, value) => {
        setForm({ ...formObj, ...{[type]: value} });
    }

    const onSubmit = () => {
        let extraProps = {
            currentStatus: "free",
            currentBooking: "free",
            driver: "selectNew",
            role: "rider"
        }
        addDb(`/users/${formObj.phone}`, { ...formObj, ...extraProps}).then(()=> {
            props.handleLoginAction("back");
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
                            Sign-up
                        </Text>
                    </View>
                    <Image
                        source={require('../images/logo-icon.png')}
                        style={[UI.setScreen(80,80)]}
                    />
                </View>
                <View>
                    <Text 
                        style={[
                            commonStyle.pb, 
                            commonStyle.themeSkyText
                        ]}
                    >
                        Name
                    </Text>
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
                <View style={[commonStyle.ptLg, commonStyle.pb,]}>
                    <Text 
                        style={[
                            commonStyle.themeSkyText
                        ]}
                    >
                        Phone
                    </Text>
                </View>
                <View>
                    <TextInput
                        onChangeText={handleInput.bind(this, 'phone')}
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
                        Attachment
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
                            Submit
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
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            }
        </MyContext.Consumer>
    )
}

export default Enrollment;