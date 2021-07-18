import React from  'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import commonStyle from '../css/commonStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const InfoModal = React.forwardRef((props, ref) => {
    const [modalVisible, updateModal] = React.useState(false);
    const [infoData, updateInfoStr] = React.useState()

    React.useImperativeHandle(ref, ()=> ({
        showInfoModal: (data)=> {
            console.log(data);
            updateInfoStr(data || "");
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

    return (
        <Modal
            animationType={props.viewStyle || "slide"}
            transparent={true}
            visible={modalVisible}
            statusBarTranslucent={true}
            onRequestClose={() => {
                updateModal(false);
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
                        onPress={() => updateModal(false)}
                    >
                        <Icon
                            name={"chevron-down"}
                            size={35}
                        />
                    </TouchableOpacity>
                    <View style={[UI.setMinHeight(100)]}>
                        <Text 
                            style={[
                                commonStyle.textStyle, 
                                commonStyle.fs3, 
                                commonStyle.textBlue,
                                commonStyle.textLightBold
                            ]}
                        >
                            {infoData || "Please check your Internet."}
                        </Text>
                        <Text 
                            style={[
                                commonStyle.mt,
                                commonStyle.textStyle, 
                                commonStyle.fs6, 
                                commonStyle.textOrange,
                                commonStyle.textLightBold
                            ]}
                        >
                            Current action need Internet to proceed.
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
});

export default InfoModal;