import React from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import commonStyle from '../css/commonStyle';
import { UI } from '../config/theme';

const ErrorZone = (props) => {

    const tryAgain = () => {
        props.tryAgain?.();
        props.onClose?.();
    }

    return (
        <ScrollView>
            <View style={[commonStyle.center]}>
                <Image
                    source={require("../images/internet.png")}
                />
            </View>
            <View style={[commonStyle.center, commonStyle.vPadLg]}>
                <Text style={[commonStyle.themeHeadingText]}>
                    Oops!
                </Text>
                <Text style={[commonStyle.themeOrangeText, commonStyle.textCenter]}>
                    There seems to be a problem with your Network Connection.
                </Text>
            </View>
            <View style={[commonStyle.center, commonStyle.vPadLg]}>
                <TouchableOpacity
                    style={[commonStyle.btnOrange, UI.setHeight(40), UI.setBg("green")]}
                    onPress={tryAgain}
                >
                    <Text style={[commonStyle.themeBtnText, commonStyle.fs5]}>
                        {props.label || "Try Again"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default ErrorZone;