import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyle from '../css/commonStyle';
const HeaderRight = (props) => {
    const [modalVisible, updateModal] = React.useState(false);
    const handleNotification = ()=> {
        updateModal(!modalVisible);
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
            <TouchableOpacity onPress={handleNotification}>
                <Icon name="refresh" style={[style.bell]} size={18} />
            </TouchableOpacity>
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