import React from  'react';
import { Modal, View, ActivityIndicator } from 'react-native';
import commonStyle from '../css/commonStyle';
import MyText from './libs/MyText';
import MyButton from './libs/MyButton';
const InfoModal = React.forwardRef((props, ref) => {
    const [modalVisible, updateModal] = React.useState(false);
    const [infoData, updateInfoStr] = React.useState();
    const [_data, setData] = React.useState({});

    React.useImperativeHandle(ref, ()=> ({
        showInfoModal: (data)=> {
            if (typeof data == "object") {
                setData({...data});
                updateInfoStr(data.title || "");
            } else {
                setData({});
                updateInfoStr(data || "");
            }
            updateModal(true);
        },
        close: ()=> {
            updateModal(false);
        }
    }) );

    const onTouch = () => {
        updateModal(false);
        props.onClose?.();
        _data.onOk?.();
    }

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
        } else if (_data.isLoading) {
            return (
                <View style={[UI.setMinHeight(100)]}>
                    <ActivityIndicator size={"large"} color={"#0000ff"} />
                </View>
            )
        } else {
            return (
                <View style={[UI.setMinHeight(100)]}>
                    <MyText
                        title={infoData || Lang("app 212.infoModalData")}
                        theme="heading"
                        style={[commonStyle.fs3]}
                    />
                    <MyButton
                        theme={"orange"}
                        title={Lang("app 212.ok")}
                        style={[UI.setHeight(40), UI.setWidth(80), commonStyle.mtmd]}
                        textStyle={[commonStyle.fs5]}
                        onPress={onTouch}
                        hide={_data.onOk ? false : true}
                    />
                </View>
            )
        }
    }

    return (
        <Modal
            animationType={props.viewStyle || "slide"}
            transparent={true}
            visible={props.isVisble || props.isVisible  || modalVisible}
            statusBarTranslucent={true}
            onRequestClose={() => {
                updateModal(false);
                props.onClose?.();
            }}
        >
            <View style={[commonStyle.centeredView, UI.setWidth()]}>
                {getBackdrop()}
                <View style={[commonStyle.modalView, UI.setWidth(100, '%')]}>
                    <MyButton
                        type="icon"
                        iconName={"chevron-down"}
                        iconSize={20}
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
                    />
                    {getLayout()}
                </View>
            </View>
        </Modal>
    )
});

export default InfoModal;