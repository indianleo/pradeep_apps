import React from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import { useUI } from '../config/theme';
import css from '../css';

const ErrorZone = (props) => {
    const UI = useUI();
    const tryAgain = () => {
        props.tryAgain?.();
        props.onClose?.();
    }

    return (
        <ScrollView>
            <View style={[css.center]}>
                <Image
                    source={require("../../images/internet.png")}
                />
            </View>
            <View style={[css.center, css.vPadLg]}>
                <Text style={[css.themeHeadingText]}>
                    Oops!
                </Text>
                <Text style={[css.themeOrangeText, css.textCenter]}>
                    There seems to be a problem with your Network Connection.
                </Text>
            </View>
            <View style={[css.center, css.vPadLg]}>
                <TouchableOpacity
                    style={[css.themeBtn, css.setHeight(40), css.setBg("green")]}
                    onPress={tryAgain}
                >
                    <Text style={[css.themeBtnText, css.fs5]}>
                        {props.label || "Try Again"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default ErrorZone;