import React from 'react';
import { ActivityIndicator, View, Modal } from 'react-native';
import commonStyle from '../css/commonStyle';
import MyText from './libs/MyText';

const Loader = (props) => {
    if (props.fullScreen) {
        return (
            <Modal
                animationType={props.animation || "slide"}
                transparent={true}
                visible={props.loading}
                statusBarTranslucent={true}
                onRequestClose={() => {
                    props.onClose?.();
                }}
            >
                <View style={[commonStyle.centeredView, {justifyContent: "center",}]}>
                    <View 
                        style={[
                            commonStyle.absolute, 
                            commonStyle.bgDark, 
                            UI.setScreen(), 
                            UI.setPosition(0,0,0,0),
                            UI.setOpacity(.6)
                        ]}
                    />
                    <View style={[commonStyle.modalView]}>
                        <ActivityIndicator size={props.size || "small"} color={props.color || "#0000ff"} />
                        {props.title ? <MyText title={props.title} style={props.textStyle} /> : null}
                    </View>
                </View>
            </Modal>
        )
    } else {
        if (props.loading) {
            return (
                <View style={[props.style]}>
                    <ActivityIndicator size={props.size || "small"} color={props.color || "#0000ff"} />
                    {props.title ? <MyText title={props.title} style={props.textStyle} /> : null}
                </View>
            )
        }
    }

    return null;
}

export default Loader;