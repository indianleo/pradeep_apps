import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { dbOff, getTableRef } from '../config/myConfig';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import MyButton from '../libs/MyButton';
const HeaderRight = (props) => {
    const [modalVisible, updateModal] = React.useState(false);
    const [pendingReq, setPending] = React.useState(0);
    const contextOption = React.useContext(MyContext);
    let tableRef = null;

    React.useEffect(()=> {
        if (!contextOption.isRider) {
            tableRef = getTableRef(`/users/${contextOption.userId}`).on('value', res=> {
                let dd = res.val();
                setPending(dd.pendingBooking || 0);
            });
        }
        return ()=> tableRef && dbOff(`/users/${contextOption.userId}`, tableRef);
    },[])
    const handleAction= ()=> {
        //updateModal(!modalVisible);
        props.navigation.reset({
            index: 0,
            routes: [{name: 'Home'}]
        });
        props.handleLoginAction("logout");
    }

    const loadModal = ()=> {
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    updateModal(!modalVisible);
                }}
            >
                <View style={[style.centeredView]}>
                    <View style={style.modalView}>
                        <Text>Warnings</Text>
                        <TouchableOpacity
                            onPress={() => updateModal(!modalVisible)}
                        >
                            <Icon name="close" size={30} color="#900" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    return(
        <View style={[style.row]}>
            {pendingReq > 0 
                ? <MyButton
                    title={pendingReq}
                    style={[
                        commonStyle.bgWhite,
                        commonStyle.center,
                        UI.setRadius(25),
                        UI.setScreen(30,30),
                        commonStyle.mr,
                        UI.setBorder(1,'#ccc')
                    ]}
                    textStyle={[
                        commonStyle.textOffSky
                    ]}
                />
                : null
            }
                
            {loadModal()}
        </View>
    )
}

const style = StyleSheet.create({
    bell: {
        paddingRight: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})
export default HeaderRight;