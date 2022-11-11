import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import commonStyle from '../css/commonStyle';
import {Calendar} from 'react-native-calendars';
import ChnContext from '../context/ChnContext';
import { getMonthName, vitalList } from '../config/chnConfig';
import { apiCall } from '../api/apiAction';
import MyText from './libs/MyText';
import Loader from './Loader';
const Vitals = (props)=> {
    const [isLoading, setLoading] = React.useState(false);
    const [vitalHistory, setHistory] = React.useState({});
    const today = new Date().toISOString().split("T")[0]
    const [currentDate, setDate] = React.useState({dateString: today});

    React.useEffect(()=> {
        setCurrentHistory();
    }, [currentDate])

    const setCurrentHistory = () => {
        setLoading(true);
        apiCall(`/vital-history?date=${currentDate.dateString}`).then((res)=> {
            console.log(res);
            if (UI.isValid(res)) {
                setHistory({...res});
            }
        }).catch((err)=> {
            console.log({vital: err});
            showInfoModal();
        }).finally(()=> {
            setLoading(false);
        })
    }

    const getVitals = (_data, isPortrait) => {
        let temp = vitalHistory[_data.historyField];
        const vitalsValue = _data.postKeys?.map((item, index)=> {
            if (!temp) return null;
            const value = temp[item];
            const label = item == "heartrate" ? Lang("vitals.heartRate"): Lang("vitals." +item);
            return (
                <View key={index} style={[commonStyle.row, UI.setBorder(1, '#ccc'), commonStyle.p]}>
                    <MyText title={label + ":"} style={[commonStyle.textBlue, UI.setWidth(120)]}/>
                    <MyText title={value} style={[commonStyle.plMd]}/>
                </View>
            )
        })
        if (temp) {
            return (
                <View style={[commonStyle.flex1, UI.setPaddingLeft(isPortrait ? 17 : 7.5, '%')]}>
                    <View style={[commonStyle.wrap]}>
                        {vitalsValue}
                    </View>
                    <Text 
                        style={[
                            commonStyle.themeTextSm, 
                            commonStyle.textOffDark,
                            commonStyle.textRight
                        ]}
                    >
                        {"On " + getMonthName("", "addDay", null, "year")}
                    </Text>
                </View>
            )
        }
        return null;
    };

    const setVitalsInfo = (item) => {
        props.navigation.navigate("VitalsInfo", item);
    }

    const handleDay = (day) => {
        setDate({...day})
       // setCurrentHistory();
    }

    return (
        <ChnContext.Consumer>
            {context => (
                <ScrollView style={[UI.setPadding(20,30, 20, 30)]}>
                    <View 
                        style={[
                            commonStyle.vCenter, 
                            commonStyle.row, 
                            commonStyle.alignCorner,
                        ]}
                    >
                        <View style={[UI.setWidth(100, '%')]}>
                            <Text style={[UI.setFont(28), commonStyle.textBold, commonStyle.textBlue]}>
                                {Lang('vitals.title')}
                            </Text>
                            <Text style={[UI.setFont(24), commonStyle.textBold, commonStyle.textBlue]}>
                                {Lang('app 212.welUsr', {user: context.user.name })}
                            </Text>
                        </View>
                    </View>
                    <View style={[commonStyle.ptMd, commonStyle.pb]}>
                        <Text 
                            style={[
                                commonStyle.fs3, 
                                commonStyle.textLightBold, 
                                commonStyle.textDark,
                                commonStyle.textStyle
                            ]}
                        >
                            {Lang('vitals.fill')}
                        </Text>
                    </View>
                    <View style={[commonStyle.vCenter]}>
                        <View style={[commonStyle.row, commonStyle.wrap,]}>
                            {vitalList.map((item)=> 
                                <TouchableOpacity 
                                    key={item.id} 
                                    style={[
                                        UI.setWidth(33.3, '%'), 
                                        commonStyle.vCenter, 
                                        commonStyle.pbLg,
                                    ]}
                                    onPress={setVitalsInfo.bind(this, item)}
                                >
                                    <Image
                                        source={item.vitalImg}
                                        style={[UI.setScreen(100,100)]}
                                    />
                                    <Text 
                                        style={[
                                            commonStyle.themeOrangeText,
                                            UI.setFont(15), 
                                            commonStyle.pt,
                                            commonStyle.textCenter
                                        ]}
                                    >
                                        {Lang(item.vitalName)}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    <View style={[commonStyle.pbLg, commonStyle.ptXLg]}>
                        <Text style={[commonStyle.fs2, commonStyle.textBold, commonStyle.textOrange]}>
                            {Lang('vitals.cal')}
                        </Text>
                    </View>
                    <View 
                        style={[
                            UI.setWidth(100, '%')
                        ]}
                    >
                        <Calendar
                            onDayPress={handleDay}
                        />
                    </View>
                    <View style={[UI.setPaddingTop(25)]}>
                        <Text style={[commonStyle.fs2, commonStyle.textBold, commonStyle.textOrange]}>
                            {"On " + getMonthName("", "addDay", currentDate)}
                            <Loader loading={isLoading} />
                        </Text>
                    </View>
                    <View style={[commonStyle.vPadLg]}>
                        {vitalList.map((item)=> 
                            <View 
                                key={"dev_"+item.id}
                                style={[
                                    UI.setVpadding(10),
                                    UI.setPadding(10,10,10,5),
                                    UI.setBorder(1, "#ccc"),
                                    commonStyle.mbmd,
                                    commonStyle.bgWhite,
                                ]}
                            >
                                <View
                                    style={[
                                        commonStyle.row,
                                        commonStyle.vCenter
                                    ]}
                                >
                                    <Image
                                        source={item.vitalImg}
                                        style={[
                                            UI.setScreen(50,50)
                                        ]}
                                    />
                                    <Text 
                                        style={[
                                            UI.setFont(18), 
                                            commonStyle.textStyle, 
                                            commonStyle.textOrange,
                                            commonStyle.pl,
                                            commonStyle.textLightBold
                                        ]}
                                    >
                                        {Lang(item.vitalName)}:
                                    </Text>
                                </View>
                                {getVitals(item, context.portrait)}
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
        </ChnContext.Consumer>
    )
}

export default Vitals;