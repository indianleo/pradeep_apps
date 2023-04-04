import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, View } from "react-native";
import css from "../../css";
import { colors } from "../../css/cssConfig";
import MyButton from "../../libs/MyButton";
import MyText from "../../libs/MyText";
const list = [
    {
        id: '01',
        title: 'Search',
        options: [
            {
                iconName: 'mobile1',
                iconSet: 'AntDesign',
                label: 'Mobile',
                action: 'page',
                page: '',
                arg: {}
            },
            {
                iconName: 'idcard',
                iconSet: 'AntDesign',
                label: 'UID',
                action: 'page',
                page: '',
                arg: {}
            },
            {
                iconName: 'image',
                iconSet: 'Entypo',
                label: 'Image',
                action: 'page',
                page: '',
                arg: {}
            },
            {
                iconName: 'card-account-details-star',
                iconSet: 'MaterialCommunityIcons',
                label: 'Image',
                action: 'page',
                page: '',
                arg: {}
            }
        ]
    },
    {
        id: '02',
        title: 'Edit',
        options: [
            {
                iconName: 'image',
                iconSet: 'Entypo',
                label: 'Image',
                action: 'page',
                page: 'EditImage',
                arg: {}
            },
            {
                iconName: 'images',
                iconSet: 'Entypo',
                label: 'Collage',
                action: 'page',
                page: '',
                arg: {}
            }
        ]
    },
]
const Dashboard = () => {
    const nav = useNavigation();

    const handleAction = (data) => {
        console.log(data);
        if (data.action == 'page' && data.page) {
            nav.navigate(data.page, data.arg);
        }
    }
    return (
        <ScrollView>
            {list.map((item)=> (
                <View key={item.id} style={[css.pLg]}>
                    <MyText title={item.title} style={[css.fs14, css.textBold]} />
                    <View style={[css.row, css.alignAround, css.pt, css.wrap]}>
                        {item.options.map((opt, index)=> (
                            <View 
                                key={item.id + index} 
                                style={[
                                    css.setHeight(68), 
                                    css.setBg(colors.primary20),
                                    css.setWidth(30, '%'), 
                                    css.center,
                                    css.setBorder(1, colors.primaryDark),
                                    css.setRadius(12),
                                    css.mtsm
                                ]}>
                                <MyButton
                                    type='icon'
                                    iconName={opt.iconName}
                                    iconSet={opt.iconSet}
                                    iconSize={24}
                                    iconStyle={[css.setColor(colors.primaryDark)]}
                                    style={[]}
                                />
                                <MyText 
                                    title={opt.label} 
                                    style={[css.setColor(colors.primaryDark)]} 
                                    onPress={handleAction.bind(this, opt)} 
                                />
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}

export default Dashboard;