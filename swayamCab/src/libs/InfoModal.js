import React from  'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import commonStyle from '../css/commonStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const InfoModal = React.forwardRef((props, ref) => {
    const [modalVisible, updateModal] = React.useState(false);
    const [infoData, updateInfoStr] = React.useState();
    const [subText, setSubText] = React.useState(false);

    React.useImperativeHandle(ref, ()=> ({
        showInfoModal: (data, showSubText)=> {
            updateInfoStr(data || "");
            setSubText(showSubText ? true : false);
            updateModal(true);
        }
    }) );

    const getBackdrop = () => {
        return (
            <View 
                style={[
                    commonStyle.absolute, 
                    commonStyle.bgDark, 
                    UI.setScreen(), 
                    UI.setPosition(0,0,0,0),
                    UI.setOpacity(.6)
                ]}
            ></View>
        )
    }

    const getLayout = () => {
        if (props.external) {
            return props.children || props.external;
        } else {
            return (
                <View style={[UI.setMinHeight(100)]}>
                    <Text 
                        style={[
                            commonStyle.textStyle, 
                            commonStyle.fs3, 
                            commonStyle.textBlue,
                            commonStyle.textLightBold
                        ]}
                    >
                        {infoData || Lang("home.infoModalData")}
                    </Text>
                    {subText 
                        ? 
                            <Text 
                                style={[
                                    commonStyle.mt,
                                    commonStyle.textStyle, 
                                    commonStyle.fs6, 
                                    commonStyle.textOrange,
                                    commonStyle.textLightBold
                                ]}
                            >
                                {Lang("home.infoModalSubText")}
                            </Text>
                        : null
                    }
                </View>
            )
        }
    }

    return (
        <Modal
            animationType={props.viewStyle || "slide"}
            transparent={true}
            visible={props.isVisible  || modalVisible}
            statusBarTranslucent={true}
            onRequestClose={() => {
                updateModal(false);
                props.onClose?.();
            }}
        >
            <View style={[commonStyle.centeredView, UI.setWidth()]}>
                {getBackdrop()}
                <View style={[commonStyle.modalView, UI.setWidth(100, '%')]}>
                    <TouchableOpacity
                        style={[
                            UI.setHeight(40), 
                            UI.setWidth(100, '%'),
                            commonStyle.center,
                            commonStyle.br,
                            commonStyle.mbmd,
                            UI.setMarginTop(-25),
                            UI.setBorderBottom(1, '#ccc')
                        ]}
                        onPress={() => {
                            updateModal(false);
                            props.onClose?.();
                        }}
                    >
                        <Icon
                            name={"chevron-down"}
                            size={35}
                        />
                    </TouchableOpacity>
                    {getLayout()}
                </View>
            </View>
        </Modal>
    )
});

export default InfoModal;