import React from "react";
import { FlatList, Text, View } from "react-native";
import css from "../../css";
import MyText from "../../libs/MyText";
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import { cssConfig } from "../../css/cssConfig";

const CallLogs = (props) => {
    const [list, setList] = React.useState([]);

    React.useEffect(()=> {
        if (cssConfig.ios) {
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
                            if (contacts) {
                                setList(contacts);
                            }
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                })
                .catch((error) => {
                    console.error('Permission error: ', error);
                });
        }
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
    //     { jobTitle: '',
    // emailAddresses: [],
    // urlAddresses: [],
    // phoneNumbers: [ { label: 'mobile', number: '+917800816551' } ],
    // recordID: '73D5ADB6-B133-4EFD-A470-D95BAB57AB9C',
    // postalAddresses: [],
    // thumbnailPath: '',
    // company: '',
    // middleName: '',
    // imAddresses: [],
    // givenName: 'Asheesh',
    // hasThumbnail: false,
    // familyName: 'Ucertify' }
        return (
            <View style={[css.setPadding(2,5,2,5, '%')]}>
                <View style={[]}>
                    <MyText title={item?.givenName} style={[css.fs16, css.themeText]} />
                </View>
                <View>
                    {item.phoneNumbers?.map((phone, index)=> (
                        <View key={index} style={[css.row]}>
                            <MyText title={phone.label} style={[]}/>
                            <MyText title={phone.number} style={[css.pl]}/>
                        </View>
                    ))}
                </View>
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