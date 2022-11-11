import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyle from '../css/commonStyle';
import { providerBioFileds } from '../config/chnConfig';
import { apiCall, BaseUrl, checkAppointment, goHome } from '../api/apiAction';
import ChnContext from '../context/ChnContext';
import Icons from './libs/Icons';
import MyButton from './libs/MyButton';
import MyText from './libs/MyText';
import InfoModal from './InfoModal';
import Loader from './Loader';
import { Calendar } from 'react-native-calendars';

const ProviderBio = (props)=> {
    const _param = props.route?.params || {};
    const _today = new Date();
    const [isLoading, setLoading] = React.useState(false);
    const [errorStr, setError] = React.useState(true);
    const [showBio, setBio] = React.useState(false);
    const contextOption = React.useContext(ChnContext);
    const [appoTime, setAppoTime] = React.useState("");
    const [_modalView, showModal] = React.useState(false);
    const [markedDate, setMarked] = React.useState({});
    const [_date, setAppoDate] = React.useState();
    const [allDates, setAllDates] = React.useState([]);
    const [_data, updateData] = React.useState({
        provideImg: _param.imagePath,
        name: _param.name,
        role: _param.title,
        rating: _param.rating || 2,
        info: _param,
        daySlot: {},
        morningSlot: [],
        eveningSlot: [],
        facility: _param.facility
    });
    
    React.useEffect(()=> {
        setLoading(true);
        console.log({"providerBioParam":_param});
        getAvailbleDates().then((dateRes)=> {
            if (dateRes.status) {
                if (dateRes.availableDates?.length > 0) {
                    const _mark = {};
                    dateRes.availableDates.map((d)=> {
                        _mark[d] = {selected: true}
                    })
                    setAllDates(dateRes.availableDates);
                    setMarked({..._mark});
                    setAppoDate(dateRes.availableDates[0]);
                }
                getData(dateRes.availableDates).then((res)=> {
                    updateData(res);
                    setLoading(false);
                }).catch((err)=> {
                    if (typeof err == "string") {
                        setError(err);
                    }
                    setLoading(false);
                });
            } else {
              console.log(res);  
              setLoading(false);
            }
        }).catch((err)=> {
            console.log(err);
            setLoading(false);
        })
    }, [contextOption.net]);

    const getAvailbleDates = (nextMonth) => {
        return new Promise((resolve)=> {
            const reqObj = {
                "provider": _param.ref_provId,
                "facility": _param.facilityId || _param.facility_id,
                "visitType": _param.visitType,
                "month": getDigit( nextMonth ||(_today.getMonth() + 1)), 
                "year": _today.getFullYear(),
                "prefer_from": _param.from,
                "prefer_to": _param.to,
                "line": _param.am_line,
                "am_dept": _param.am_dept,
                "am_category": _param.department
            };
            apiCall("/available-dates", {method: "POST"}, reqObj).then((res)=> {
                resolve(res);
            }).catch((err)=> {
                console.log(err);
                resolve(null);
            })
        })
    }

    const getDigit = (n) => {
        if (n < 10) {
            return "0" + n;
        }
         return n;
    }

    const getData = (_allDates)=> {
        // APi call will be here for selected provider
        return new Promise((resolve, reject)=> {
            if (_allDates.length > 0) {
                const reqObj = {
                    "provider": _param.ref_provId,
                    "facility": _param.facilityId || _param.facility_id,
                    "date": _allDates[0],
                    "prefer_from": _param.from,
                    "prefer_to": _param.to,
                    "visitType": _param.visitType,
                    "line": _param.am_line,
                    "am_dept": _param.am_dept,
                    "am_category": _param.department
                };
                apiCall("/available-slots", {method: "POST"}, reqObj).then((res)=> {
                    if (res.status) {
                        resolve({
                            provideImg: _param.imagePath,
                            name: _param.name,
                            role: _param.title,
                            rating: _param.rating || 5,
                            info: _param,
                            daySlot: {},
                            morningSlot: filterSlots(res.slots, "am"),
                            eveningSlot: filterSlots(res.slots, "pm"),
                            facility: _param.facility,
                            facilityId: res.virtual_facility
                        });
                    } else {
                        if (res.error) {
                            let errStr = typeof res.error == "string" ? res.error : (res.error.date && res.error.date[0]);
                            reject(errStr || Lang("api 212.apiErr"));
                        } else {
                            reject(Lang("api 212.apiErr"));
                        }
                    }
                    
                }).catch((err)=> {
                    console.log(err);
                    reject(Lang("api 212.apiErr"));
                });
            } else {
                reject(Lang("personProvider.noAvailApp"));
            }
            
        });
    }

    const filterSlots = React.useCallback((slots, type) => {
        const tempSlots = [];
        slots.map((items)=> {
            if (items.endsWith(type)) {
                tempSlots.push(items.replace(type, ""));
            }
        })
        return tempSlots;
    }, []);

    const getTimeSlot = (timePhase) => {
        let slot = timePhase == "AM" ? _data.morningSlot : _data.eveningSlot;
        return (
            <View style={[commonStyle.row, commonStyle.wrap]}>
                {slot?.map((day, index) =>
                    <TouchableOpacity 
                        key={index} 
                        style={[
                            UI.setMarginAll(5), 
                            (day + " " + timePhase == appoTime) ? commonStyle.bgOrange :commonStyle.bgWhite,
                            commonStyle.pMd,
                            commonStyle.row,
                            commonStyle.center,
                            UI.setWidth(30,'%'),
                            commonStyle.brSm,
                        ]}
                        onPress={()=> setAppoTime(day + " " + timePhase)}
                    >
                        <Icon
                            name="clock-o"
                            size={18}
                            style={[
                                UI.setMarginRight(5),
                                (day + " " + timePhase == appoTime) ? commonStyle.textWhite : commonStyle.textDark
                            ]}
                        />
                        <Text 
                            style={[
                                commonStyle.textStyle, 
                                UI.setFont(15), 
                                commonStyle.textLight,
                                (day + " " + timePhase == appoTime) ? commonStyle.textWhite : commonStyle.textDark
                            ]}
                        >
                            {day + " " + timePhase}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        )
    }

    const checkFacility = () => {
        UI.ask({
            title: _param.facility,
            msg: Lang("personProvider.facilityWarnMsg"),
            onOk: makeAppointent,
            onCancel: ()=> showInfoModal(Lang("personProvider.cancelAppo")),
        })
    }

    const onConfirm = (payNow) => {
        showModal(false);
        if (payNow) {
            props.navigation.navigate("PayNow", _data);
            props.navigation.reset({
                index: 0,
                routes: [{name: 'Home', params: _data}],
            });
            props.navigation.navigate("PayNow", _data);
        } else {
            goHome(props.navigation);
        }
    }

    const makeAppointent = () => {
        if (appoTime) {
            let tempData = _param.visitType == "virtual" ? {facilityId: _data.facilityId} : {};
            tempData.onDate = _date;
            checkAppointment(contextOption, {..._param, appoTime, ...tempData}).then((res)=> {
                console.log(res);
                updateData({..._data, ...{['payAmt']: res.copay_amount}});
                contextOption.fetchAppointmentList("/current-appointments");
                showModal(true);
            }).catch((err)=> {
                console.log({err});
                showModal(true);
            });
        } else {
            showInfoModal(Lang("appointment.selectSlot"))
        }
    }

    const getBioLayout = React.useMemo(() => {
        if (showBio) {
            return (
                <View
                    style={[
                        commonStyle.bgWhite,
                        commonStyle.brMd,
                        commonStyle.pLg
                    ]}
                >
                    {providerBioFileds.map((items)=> 
                        <View key={items.id} style={[commonStyle.ptLg]}>
                            <Text 
                                style={[
                                    commonStyle.textStyle, 
                                    commonStyle.textOrange, 
                                    commonStyle.textLight,
                                    commonStyle.fs6
                                ]}
                            >
                                {Lang(items.label)}:
                            </Text>
                            <Text>
                                {_data.info[items.id]}
                            </Text>
                        </View>
                    )}
                </View>
            )
        }
        return null;
    }, [showBio])

    const toggleBio = () => {
        setBio(!showBio);
    }

    const handleMonth = (_cur) => {
        setLoading(true)
        getAvailbleDates(_cur.month).then((dateRes)=> {
            if (dateRes.status && dateRes.availableDates?.length > 0) {
                const _mark = {};
                dateRes.availableDates.map((d)=> {
                    _mark[d] = {selected: true}
                })
                setAllDates(dateRes.availableDates);
                setMarked({..._mark});
                setAppoTime("");
                setError("");
            }
        }).catch((err)=> {
            console.log(err);
        }).finally(()=> {
            setLoading(false);
        })
    }

    const handleDate = (_cur) => {
        if (allDates.includes(_cur.dateString)) {
            setLoading(true);
            setAppoTime("");
            setAppoDate(_cur.dateString);
            getData([_cur.dateString]).then((res)=> {
                updateData(res);
                setLoading(false);
                setError("");
            }).catch((err)=> {
                if (typeof err == "string") {
                    setError(err);
                }
                setLoading(false);
            });
        } else {
            showInfoModal(Lang("appointment.appoNotAvail", {currDate: _cur.dateString}))
        }
    }

    const showLoader = React.useMemo(()=> {
        return (
            <View style={[ commonStyle.center]}>
                <Loader color="#0000ff" loading={isLoading} style={[commonStyle.pLg]} />
                {errorStr
                    ?
                        <View style={[commonStyle.ptLg]}>
                            <MyText title={errorStr} theme={"heading"} style={[commonStyle.fs3]}/>
                            {/* <MyButton
                                theme={true}
                                title={"Back"}
                                onPress={()=> props.navigation.goBack(null)}
                                style={[UI.setPadding(2,3,2,3, '%'), commonStyle.mtlg]}
                                textStyle={[commonStyle.fs2]}
                            /> */}
                        </View>
                    : null
                }
            </View>
        )
    }, [errorStr, isLoading])

    const getInfo = React.useMemo(()=> {
        if (_param.visitType != "virtual") {
            return(
                <View style={[commonStyle.ptLg, commonStyle.pbMd]}>
                    <MyText title={"Selected Facility"} style={[commonStyle.textBlue]}/>
                    <MyText theme="default" title={_param.facility} />
                </View>
            )
        }
        return null;
        
    }, [_param])

    const getSlotView = React.useMemo(()=> {
        if (_data.morningSlot?.length > 0 || _data.eveningSlot?.length > 0) {
            return (
                <>
                    <View style={[UI.setPaddingTop(20), UI.setBorderBottom(1, '#ccc')]}>
                        <MyText 
                            theme="heading" 
                            style={[commonStyle.fs3]}
                            title={`${Lang("personProvider.slotFor")} ${_date}`} 
                        />
                    </View>
                    <View>
                        <MyText theme="purple" title={Lang("personProvider.morning")} />
                        <View style={[commonStyle.vPadLg]}>
                            {getTimeSlot("AM")}
                        </View>
                    </View>
                    <View>
                        <MyText theme="purple" title={Lang("personProvider.evening")} />
                        <View style={[commonStyle.vPadLg]}>
                            {getTimeSlot("PM")}
                        </View>
                    </View>
                    <View>
                        <MyButton
                            theme={true}
                            title={Lang("personProvider.makeAppo")}
                            onPress={_param.facilityId ? makeAppointent : checkFacility}
                            style={[UI.setWidth(100, '%'), UI.setHeight(50)]}
                            textStyle={[commonStyle.fs5]}
                            //hide={!_param.reason}
                        />
                    </View>
                </>
            )
        } 
        return null
    }, [_data, appoTime])

    return (
        <ScrollView>
            <View 
                style={[
                    commonStyle.row, 
                    commonStyle.vCenter, 
                    commonStyle.pMd,
                    commonStyle.bgDarkRed,
                    UI.setRadiusOn(25, 'bottomLeft'),
                    UI.setRadiusOn(25, 'bottomRight'),
                ]}
            >
                <View style={[commonStyle.pr]}>
                    <Image
                        source={{uri: BaseUrl +_data.provideImg}}
                        style={[UI.setWidth(100), UI.setHeight(100)]}
                    />
                </View>
                <View style={[UI.setWidth(70, '%')]}>
                    <MyText theme="orange" title={_data.name || "Provider Name"} style={commonStyle.textWhite} />
                    <MyText 
                        title={_data.role || "Role XXXXX"} 
                        style={[commonStyle.textWhite, commonStyle.runingFontSize]} 
                        textProps={{numberOfLines: 1}} 
                    />
                    <Text 
                        style={[
                            commonStyle.runingFontSize, 
                            commonStyle.textStyle, 
                            commonStyle.textWhite,
                        ]}
                        numberOfLines={1}
                    >
                        <Icons
                            iconSet="entypo"
                            name="location"
                            size={15}
                        />
                        {"  " + (_data?.facility || "Provider Location")}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={[
                    commonStyle.absolute,
                    UI.setScreen(50, 60),
                    UI.setRight(5, '%'),
                    UI.setTop(showBio ? 6 : 8, '%'),
                    commonStyle.br,
                    showBio ? commonStyle.bgOrange : commonStyle.bgWhite,
                    commonStyle.center,
                    UI.setZindex(10)
                ]}
                onPress={toggleBio}
            >
                <Text 
                    style={[
                        commonStyle.themeOrangeText, 
                        showBio ? commonStyle.textWhite : commonStyle.textOrange,
                    ]}
                >
                    {Lang("personProvider.bio")}
                </Text>
                <Icon 
                    name={showBio ? "chevron-down" : "chevron-up"}
                    style={[showBio ? commonStyle.textWhite : commonStyle.textOrangeDark]}
                    size={20}
                />
            </TouchableOpacity>
            <View style={[UI.setPadding(2, 2, 2, 2, '%'), UI.setZindex(-1)]}>
                {getBioLayout}
            </View>
            <View style={[UI.setPadding(5, 5, 5, 5, '%')]}>
                {getInfo}
                <View style={[commonStyle.ptLg, commonStyle.pbMd]}>
                    <MyText theme="orange" title={Lang('appointment.date')} />
                </View>
                <View>
                    <Calendar 
                        markedDates={markedDate} 
                        onDayPress={handleDate} 
                        onMonthChange={handleMonth}
                        disabledByDefault={true}
                    />
                </View>
                {showLoader}
                {allDates.length > 0 && getSlotView}
            </View>
            <InfoModal external={true} isVisble={_modalView} onClose={onConfirm}>
                <View>
                    <View>
                        <MyText theme="heading" title={Lang("appointment.thankYou")} />
                        <MyText theme="orange" title={Lang("appointment.schWith")} style={[commonStyle.mt]} />
                        <MyText title={_data.name || "XXXX XXXX"} style={[commonStyle.themeNormalText]}/>
                        <MyText theme="orange" title={Lang("appointment.onDate")} style={[commonStyle.mt]}/>
                        <MyText title={ _date} style={[commonStyle.themeNormalText]}/>
                        <MyText theme="orange" title={Lang("appointment.onFacility")} style={[commonStyle.mt]} />
                        <MyText 
                            title={_param.visitType == "virtual" ? "Virtual" : _param.facility} 
                            style={[commonStyle.themeNormalText]}
                        />
                    </View>
                    {
                        _data.payAmt == 0
                            ? 
                                <View style={[commonStyle.pLg]}>
                                    <MyButton
                                        theme={true}
                                        title={Lang("app 212.ok")}
                                        onPress={onConfirm}
                                        arg={false}
                                        style={[UI.setWidth(100), commonStyle.pMd]}
                                        textStyle={[commonStyle.fs4]}
                                    />
                                </View>
                            :
                                <View style={[commonStyle.pLg, commonStyle.row]}>
                                    <MyButton
                                        theme={true}
                                        title={Lang("appointment.payNow")}
                                        onPress={onConfirm}
                                        arg={true}
                                        style={[UI.setWidth(120), commonStyle.pMd]}
                                        textStyle={[commonStyle.fs4]}
                                    />
                                    {/* <MyButton
                                        theme={true}
                                        title={Lang("appointment.payLater")}
                                        onPress={onConfirm}
                                        arg={false}
                                        style={[UI.setWidth(120), commonStyle.ml, commonStyle.pMd]}
                                        textStyle={[commonStyle.fs4]}
                                    /> */}
                                </View>
                    }
                </View>
            </InfoModal>
        </ScrollView>
    )
}

export default ProviderBio;