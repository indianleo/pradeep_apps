import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, Button} from 'react-native';
import commonStyle from '../css/commonStyle';
import { Calendar } from 'react-native-calendars';
import { LineChart, StackedBarChart} from "react-native-chart-kit";
import { apiCall } from '../api/apiAction';
import { checkBluetooth, getMonthName, legendColors, moods, vitalHistoryFormat } from '../config/chnConfig';
import MyButton from './libs/MyButton';
import SelectDevice from './SelectDevice';
import InfoModal from './InfoModal';
import MyText from './libs/MyText';
import TestDevice from './TestDevice';
import ChnContext from '../context/ChnContext';
const VitalsInfo = (props)=> {
    const [_data, updateData] = React.useState({});
    const [_articles, setArticle] = React.useState([
        {
            heading: "How To Prepare Your First Well Women's Exam.",
            img: 'https://www.maxlifeinsurance.com/content/dam/corporate/images/Health%20Insurance%20Policy%20in%20India%201.png',
            details: "When it comes to finding the right OB/GYN doctor, sometimes you feel like you have to shop arround and/or ask friends for recommendations specially if it is your first.",
        },
        {
            heading: "What is the best birth control for you?",
            img: 'https://www.maxlifeinsurance.com/content/dam/corporate/images/Health%20Insurance%20Policy%20in%20India%201.png',
            details: "When it comes to finding the right OB/GYN doctor, sometimes you feel like you have to shop arround and/or ask friends for recommendations specially if it is your first.",
        }
    ])
    const [isLoading, setLoading] = React.useState(true);
    const [_markedDate, setMarked] = React.useState({});
    const [_markedExpectedDate, setExpected] = React.useState({});
    const [currentVital, setVital] = React.useState("");
    const [graphLabels, setGraphLabels] = React.useState(["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]);
    const [chartData, setChartData] = React.useState([]);
    const [deviceModal, showDeviceModal] = React.useState(false);
    const [checkManual, showChecking] = React.useState(true);
    const [deviceType, setDeviceType] = React.useState("");
    const today = new Date();
    const _param = props.route.params || {};
    const defaultStackVal = 30;
    React.useEffect(()=> {
        if (!UI.ios) checkBluetooth();
        getData().then((tempData)=> {
            updateData(tempData);
            getChartData(tempData);
            setVital(tempData.vitalData);
            setLoading(false);
        }).catch((err)=> {
            console.log(err);
        });
    }, []);

    const getData = ()=> {
        // APi call will be here for selected provider
        return new Promise((resolve, reject)=> {
            apiCall(_param.apiName).then((res)=> {
                resolve({
                    ..._param,
                    res,
                    selectedDate: today?.toISOString().split("T")[0],
                    vitalData: currentVital || "",
                });
            }).catch((err)=> {
                reject(err);
            });
        });
    }

    const checkSaved = (fieldName, value) => {
        switch(fieldName) {
            case 'mood': {
                const result = _data?.res.find((item)=> item.date.includes(_data.selectedDate))
                return currentVital == value ? true : false;
            }
        }
        return false;
    }

    const getChartData = (tempData) => {
        let tempChartData = [];
        const labels = [];
        if (tempData.res.length >= 1) {
            tempData.res.map((item)=> {
                let dateValue = item.date || item[`${_param.fieldName}Date`];
                if (dateValue != " 00:00:00") {
                    if (_data.selectedDate == dateValue) {
                        updateData({...tempData, ...{vitalData: item.value} });
                    }
                    labels.push(dateValue.split(" ")[0]);
                    tempChartData.push(filterChartData(item, tempData));
                }
            })
            setGraphLabels([...labels]);
        }
        setChartData([...tempChartData]);
        return tempChartData;
    }

    const filterChartData = (item, tempData) => {
        if (tempData.fieldName == "periodTracker") {
            const startDate = new Date(item.periodStarted);
            const expectedDate = new Date(item.nextExpectedDate);
            const difference = expectedDate.getTime() - startDate.getTime();
            return difference / (1000 * 3600 * 24);
        }
        if (tempData.postKeys?.length > 1) {
            return tempData.postKeys.reduce((acc, currKey, index)=>  {
                if (!tempData.showChartKeys || tempData.showChartKeys.includes(currKey)) {
                    if (item[currKey] == "" || item[currKey] == "N/A") {
                        acc.push(defaultStackVal);
                    } else {
                        acc.push(measureValue(item, currKey) || defaultStackVal);
                    }
                }
                return acc;
            }, []);
        }
        if (_data.moodQues) {
            return +moods[item.value];
        } else {
           return +(item.value || item[tempData.postKeys[0]]);
        }
    }

    const measureValue = (item, currKey) =>  {
        switch (currKey) {
            case 'pulseWave': {
                return item.pulseWave_sum || defaultStackVal;
            }
            case 'pi': return (item[currKey] ? Math.round(+item[currKey]) : defaultStackVal)
            default : return (item[currKey] ? parseInt(item[currKey]) : defaultStackVal);
        }
    }

    const selectExpected = (itemValue) => {
        if (!isLoading && itemValue.dateString) {
            setExpected({[itemValue.dateString]: {selected: true}});
            updateData({
                ..._data, 
                ...{
                    nextExpectedDate: itemValue.dateString
                } 
            });
        }
    }

    const selectDate = (itemValue)=> {
        if (!isLoading && itemValue.dateString) {
            setMarked({[itemValue.dateString]: {selected: true}});
            getVitalOnDate(itemValue.dateString).then((res)=> {
                const findVital = res.pop() || "";
                console.log({findVital});
                updateData({
                    ..._data, 
                    ...{
                        vitalData: findVital,
                        selectedDate: itemValue.dateString
                    } 
                });
                setVital(findVital.moodType || findVital);
            }).catch((err)=> {
                console.log({func: "getVitalOnDate", err});
            })
        }
    }

    const getVitalOnDate = (currDate) => {
        console.log(currDate);
        return apiCall(`${_param.apiName}?startDate=${currDate}&endDate=${currDate}`);
    }

    const loadArticle = () => {
        return(
            <View>
                <View style={[commonStyle.ptLg]}>
                    <Text 
                        style={[
                            commonStyle.textLight, 
                            commonStyle.textBlue,
                            commonStyle.subHeading,
                            commonStyle.textStyle
                        ]}
                    >
                        {Lang("vitals.relArticle")}
                    </Text>
                </View>
                {_articles.map((items, index)=>
                    <View key={index} style={commonStyle.ptXLg}>
                        <View>
                            <Text 
                                style={[
                                    commonStyle.orangeFontSize, 
                                    commonStyle.textOrange, 
                                    commonStyle.textLight,
                                    commonStyle.pbSm,
                                    commonStyle.textStyle
                                ]}
                            >
                                {items.heading}
                            </Text>
                        </View>
                        <View style={commonStyle.row}>
                            <Image
                                source={{uri: items.img}}
                                style={{width: 120, height: 100}}
                            />
                            <Text 
                                style={[
                                    commonStyle.pSm, 
                                    UI.setWidth(70, '%'), 
                                    commonStyle.runingFontSize, 
                                    commonStyle.textStyle
                                ]}
                            >
                                {items.details}
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        )
    }

    const getProvider = () => {
        props.navigation.navigate('MakeAppointment', {visitInfo: "new"})
    }

    const addVitals = () => {
        showChecking(true);
        if (_param.written) {
            if (currentVital.length > 1 && _data?.selectedDate.length > 8) {
                let sendObj = {
                    [ _data.postKeys[0] ]: currentVital,
                    [ _data.postKeys[1] ]: _data.selectedDate,
                };
                setVitals(sendObj);
            } else if (_param.apiKeyName == "periodTracker") {
                let sendObj = {
                    "periodStarted": _data.selectedDate,
                    "nextExpectedDate": _data.nextExpectedDate,
                };
                setVitals(sendObj);
            }
        } else {
            //showInfoModal("First select date then fill vitals");
            showDeviceModal(true);
        }
    }

    const handleVitalChange = (newStr)=> {
        setVital(newStr)
    }

    const getXLabel = (xLabel) => {
        return getMonthName("", "showDay", xLabel);
    }

    const onDotClick = (dot) => {
        console.log(dot);
    }

    const dotContent = (dot) => {
        return null;
        return(
            <Text 
                key={dot.index + "_dot"}
                style={[
                    commonStyle.absolute, 
                    UI.setPosition(dot.y, dot.x),
                    commonStyle.textPurple
                ]}
            >
                {dot.indexData}
            </Text>
        )
    }

    const getGraph = (context) => {
        if (_data.moodQues || chartData.length == 0 || graphLabels.length == 0) {
            return (
                <Text style={[commonStyle.themeNormalText, commonStyle.textDark]}>
                    {Lang("vitals.noGraph")}
                </Text>
            );
        }
        if (_data.legends && _data?.postKeys?.length > 1) {
            return(
                <>
                    <View style={[commonStyle.row, commonStyle.wrap]}>
                        {
                            _data?.legends.map((item, index)=> 
                                <View key={index} style={[commonStyle.row, commonStyle.mr]}>
                                    <View 
                                        style={[
                                            UI.setBg(legendColors[index]), 
                                            UI.setScreen(20,20), 
                                            UI.setRadius(10),
                                            commonStyle.mr,
                                            commonStyle.ml
                                        ]} 
                                    />
                                    <MyText title={item} style={[UI.setFont(14)]}/>
                                </View>
                            )
                        }
                    </View>
                    <StackedBarChart
                        data={{
                            //legend: _data.legends,
                            labels: [...graphLabels.map(getXLabel)],
                            data: chartData,
                            barColors: legendColors
                        }}
                        width={UI.width()- (context.portrait ? 40 : 80)} // from react-native
                        height={250}
                        chartConfig={{
                            barPercentage: 1,
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 10
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 10
                        }}

                    />
                </>
            )
        }
        return (
            <LineChart
                data={{
                    labels: [...graphLabels],
                    datasets: [
                        {
                            data: chartData,
                        }
                    ]
                }}
                width={UI.width() - (context.portrait ? 40 : 80)} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 10
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                onDataPointClick={onDotClick}
               //verticalLabelRotation={10}
               renderDotContent={dotContent}
               formatXLabel={getXLabel}
                style={{
                    marginVertical: 8,
                    borderRadius: 10
                }}
            />
        )
    }

    const filterSendObj = (obj)=> {
        if (_data.selectedDate) {
            let temp = {};
            for (let key in obj) {
                if (_data.postKeys.includes(key)) {
                    if (Array.isArray(obj[key])) {
                        temp[key] = obj[key].join(",");
                    } else {
                        temp[key] = obj[key];
                    }
                }
            }
            temp['date'] = _data.selectedDate;
            temp["type"] = _param.type;
            if (checkManual) {
                temp['is_device'] = 0;
                temp['action'] = "Manual Entry";
            } else {
                temp['is_device'] = 1;
            }
            return temp;
        } else {
            return Lang("vitals.dateFirst");
        }
    }

    const setVitals = (data) => {
        let newData = filterSendObj(data);
        console.log({newData, data});
        if (typeof newData == "object") {
            setLoading(true);
            apiCall(_data.apiName, {method: "POST"}, newData).then((res)=> {
                if (res.status) {
                    showInfoModal(Lang("vitals.saved"));
                    getData().then((tempData)=> {
                        updateData(tempData);
                        getChartData(tempData);
                        setVital(tempData.vitalData);
                        setLoading(false);
                    });
                } else {
                    showInfoModal(UI.getError(res.error) || Lang("vitals.errInput"));
                }
                setLoading(false);
            }).catch((err)=> {
                console.log(err);
                showInfoModal();
                setLoading(false);
            })
        } else {
            showInfoModal(newData);
        }
        showDeviceModal(false);
    }

    const onSelectType = (newType) => {
        setDeviceType(newType);
        showChecking(false);
    }

    const onRefresh = React.useCallback(() => {
        setLoading(true);
        getData().then((tempData)=> {
            updateData(tempData);
            getChartData(tempData);
            setVital(tempData.vitalData);
            setLoading(false);
        });
    }, [_data]);

    return (
        <ChnContext.Consumer>
            {context=>
                <ScrollView 
                    style={[UI.setPadding(5,5,5,5, '%')]}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View 
                        style={[
                            commonStyle.vCenter, 
                            commonStyle.row, 
                            commonStyle.alignCorner,
                        ]}
                    >
                        <View style={[UI.setWidth(70, '%')]}>
                            <MyText 
                                title={_data.vitalName ? Lang(_data.vitalName) : "..."}
                                style={[UI.setFont(28), commonStyle.textBold, commonStyle.textBlue]}
                            />
                            <MyText 
                                title={Lang('app 212.welUsr', {user: context.user.name})}
                                style={[UI.setFont(24), commonStyle.textBold, commonStyle.textBlue]}
                            />
                        </View>
                        <Image
                            source={_data.vitalImg}
                            style={[UI.setScreen(90,90)]}
                        />
                    </View>
                    <View style={[commonStyle.pb]}>
                        <MyText
                            theme="orange"
                            title={Lang(_data.nextStart || "vitals.selectData")}
                            nestedTitle=":"
                        />
                    </View>
                    <View 
                        style={[
                            UI.setHeight(50),
                            commonStyle.bgWhite, 
                            commonStyle.middle,
                            commonStyle.mbmd
                        ]}
                    >
                        <MyText title={_data.nextStart ? _data.nextExpectedDate : _data.selectedDate} style={[commonStyle.plMd]} />
                    </View>
                    {_data.insCurrent
                        ?
                            <>
                                <View style={[commonStyle.pbLg]}>
                                    <Calendar markedDates={_markedExpectedDate} onDayPress={selectExpected} />
                                </View>
                                <View style={[commonStyle.pb]}>
                                    <MyText title={Lang(_data.insCurrent) + ":"} style={[commonStyle.textBold]} />
                                </View>
                                <View 
                                    style={[
                                        UI.setHeight(50),
                                        commonStyle.bgWhite, 
                                        commonStyle.middle,
                                        commonStyle.mbmd
                                    ]}
                                >
                                    <MyText title={_data.selectedDate} style={[commonStyle.plMd]} />
                                </View>
                            </>
                        : null
                    }
                    <View>
                        <Calendar maxDate={today} markedDates={_markedDate} onDayPress={selectDate} />
                    </View>
                    {
                        _data.moodQues
                        ?
                            <>
                            <View style={[commonStyle.row, commonStyle.wrap]}>
                                {_data?.moodList.map((_mood, moodId)=> 
                                    <TouchableOpacity 
                                        key = {"mood_" + moodId}
                                        style = {[
                                            UI.setWidth(33, '%'),
                                            commonStyle.center,
                                            commonStyle.pLg,
                                            checkSaved("mood", _mood.name) && UI.setBg("#ccc")
                                        ]}
                                        onPress = {handleVitalChange.bind(this, _mood.name)}
                                    >
                                        <Image
                                            source={_mood.img}
                                            style={[
                                                commonStyle.imgContain,
                                                UI.setScreen(80,80),
                                            ]}
                                        />
                                        <Text 
                                            style={[
                                                commonStyle.textStyle, 
                                                commonStyle.textDark,
                                                commonStyle.vPadMd,
                                                commonStyle.textLightBold
                                            ]}
                                        >
                                            {_mood.name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <MyButton
                                theme={true}
                                title={`Save Mood: ${currentVital}`}
                                style={[UI.setWidth(100, '%'), UI.setHeight(40)]}
                                textStyle={[commonStyle.themeNormalText]}
                                onPress={addVitals}
                            />
                            </>
                        :
                        <>
                            <View 
                                style={[
                                    commonStyle.pbLg, 
                                    commonStyle.ptXLg, 
                                    commonStyle.row,
                                    commonStyle.vCenter
                                ]}
                            >
                                <MyText
                                    theme="orange"
                                    title={Lang("vitals.your") + " " + Lang(_data.vitalName) + ": "}
                                    style={[commonStyle.textBold]}
                                />
                                <MyText
                                    title={vitalHistoryFormat(_data, currentVital)}
                                    textStyle={[commonStyle.fs5]}
                                    style={[commonStyle.textBlue, commonStyle.pl, commonStyle.mt]}
                                />
                            </View>
                            <View 
                                style={[
                                    UI.setHeight(50),
                                ]}
                            >
                                <MyButton
                                    theme={true}
                                    title={Lang("vitals.addNew")}
                                    onPress={addVitals}
                                    style={[UI.setHeight(40), UI.setWidth(100, '%')]}
                                    textStyle={[commonStyle.orangeFontSize]}
                                />
                            </View>
                        </>
                    }
                    <View 
                        style={[
                            UI.setPadding(25, 0, 5, 0),
                            commonStyle.row,
                            commonStyle.vCenter
                        ]}
                    >
                        <MyText theme="orange" title={Lang("vitals.viewGraph")} style={[commonStyle.textBold]} />
                    </View>
                    <View>
                        {getGraph(context)}
                    </View>
                    {/* <View 
                        style={[
                            commonStyle.vCenter, 
                            commonStyle.mtmd, 
                            commonStyle.mblg
                        ]}
                    >
                        <TouchableOpacity 
                            onPress={getProvider}
                            style={[
                                UI.setWidth(100, '%'), 
                                commonStyle.btnOrange, 
                                UI.setHeight(40)
                            ]}
                        >
                            <Text 
                                style={[
                                    commonStyle.textCenter, 
                                    commonStyle.backFontSize, 
                                    commonStyle.textWhite, 
                                    commonStyle.textLightBold,
                                    commonStyle.textStyle
                                ]}
                            >
                                {Lang('vitals.contactProvider')}
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                    <View>
                        {loadArticle()}
                    </View>
                    <InfoModal external={true} isVisible={deviceModal} onClose={()=> showDeviceModal(false)}>
                        {
                            checkManual 
                                ?   
                                    <SelectDevice 
                                        setDeviceData={setVitals} 
                                        setType={onSelectType} 
                                        cat={_param.fieldName} 
                                    />
                                :   
                                    <TestDevice 
                                        setDeviceData={setVitals} 
                                        cat={_param.fieldName} 
                                        deviceType={deviceType} 
                                        //onFailed={showDeviceModal}
                                    />
                        }
                    </InfoModal>
                </ScrollView>
            }
        </ChnContext.Consumer>
    )
}

export default VitalsInfo;