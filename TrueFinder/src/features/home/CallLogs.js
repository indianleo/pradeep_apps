import React from "react";
import { FlatList, Text, View } from "react-native";
import css from "../../css";
import MyText from "../../libs/MyText";
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';

const CallLogs = (props) => {
    const [list, setList] = React.useState([]);

    React.useEffect(()=> {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
        })
            .then((res) => {
                console.log('Permission: ', res);
                Contacts?.getAll()
                    .then((contacts) => {
                        // work with contacts
                        console.log(contacts);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            })
            .catch((error) => {
                console.error('Permission error: ', error);
            });
    }, [])

    const renderHeader = () => {
        return (
            <View>
                <View style={[css.themeBg, css.setHeight(48), css.middle]}>
                    <MyText title="Recent Contacts" />
                </View>
            </View>
        )
    }

    const renderRow = ({item}) => {
        return (
            <View>
                <Text>jdsnjns</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={list}
            renderItem={renderRow}
            ListHeaderComponent={renderHeader}
        />
    )
}

export default CallLogs;