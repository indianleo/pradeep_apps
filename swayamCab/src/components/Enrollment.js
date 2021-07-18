import React from 'react';
import {View, Text, TextInput, ScrollView, Image, TouchableOpacity} from 'react-native';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
const Enrollment = (props)=> {

    const handleInput = () => {

    }

    const onSubmit = () => {
        props.handleLoginAction("login");
    }

    return(
        <MyContext.Consumer>
            {context =>
                <ScrollView style={[commonStyle.themeBg, UI.setPadding(20,30,20,30), UI.setScreen()]} >
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
                            Registration
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
                            commonStyle.orangeFontSize, 
                            commonStyle.textOrange, 
                            commonStyle.textLightBold
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
                            commonStyle.textBoxBorderColor,
                            commonStyle.p,
                            commonStyle.bgWhite,
                            UI.setHeight(50),
                            commonStyle.textStyle,
                            commonStyle.placeHolderFont
                        ]}
                    />
                </View>
                <View style={[commonStyle.ptLg, commonStyle.pb,]}>
                    <Text 
                        style={[
                            commonStyle.orangeFontSize, 
                            commonStyle.textOrange, 
                            commonStyle.textLightBold, 
                            commonStyle.textStyle
                        ]}
                    >
                        Email
                    </Text>
                </View>
                <View>
                    <TextInput
                        onChangeText={handleInput.bind(this, 'email')}
                        style={[
                            commonStyle.textBoxBorderColor,
                            commonStyle.bgWhite,
                            UI.setHeight(50),
                            commonStyle.p,
                            commonStyle.textStyle,
                            commonStyle.placeHolderFont
                        ]}
                    />
                </View>
                <View style={[commonStyle.ptLg, commonStyle.pb,]}>
                    <Text 
                        style={[
                            commonStyle.orangeFontSize, 
                            commonStyle.textOrange, 
                            commonStyle.textLightBold, 
                            commonStyle.textStyle
                        ]}>
                        Password
                    </Text>
                </View>
                <View>
                    <TextInput
                        onChangeText={handleInput.bind(this, 'pass')}
                        style={[
                            commonStyle.textBoxBorderColor,
                            commonStyle.bgWhite,
                            UI.setHeight(50),
                            commonStyle.p,
                            commonStyle.textStyle,
                            commonStyle.placeHolderFont
                        ]}
                    />
                </View>
                <View style={[commonStyle.center, commonStyle.ptLg]}>
                    <TouchableOpacity 
                        style={[
                            UI.setHeight(40),
                            commonStyle.bgOrange,
                            commonStyle.center,
                            commonStyle.pMd,
                            commonStyle.br
                        ]} 
                        onPress={onSubmit}
                    >
                        <Text 
                            style={[
                                commonStyle.backFontSize, 
                                commonStyle.textWhite, 
                                commonStyle.textLightBold,
                                commonStyle.textStyle
                            ]}
                        >
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            }
        </MyContext.Consumer>
    )
}

export default Enrollment;