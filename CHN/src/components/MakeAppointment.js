import React from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    Image, 
    TouchableOpacity,
} from 'react-native';
import commonStyle from '../css/commonStyle';
import ChnContext from '../context/ChnContext';
import { apiCall } from '../api/apiAction';
//import { Calendar } from 'react-native-calendars';
import { checkBlank, createTimeList, warnMsg } from '../config/chnConfig';
import Select from './libs/Select';
import Loader from './Loader';
import MyText from './libs/MyText';
import MyButton from './libs/MyButton';

const MakeAppointment = (props)=> {
    const _today = new Date();
    const [selectedValue, setSelectedValue] = React.useState("");
    const [reasons, setReasons] = React.useState([]);
    const [actionType, setAction] = React.useState(0);
    const [_date, setAppoDate] = React.useState();
    const [_from, setFrom] = React.useState("08 AM");
    const [_to, setTo] = React.useState("05 PM");
    const [markedDate, setMarked] = React.useState({});
    const [appoCat, setAppoCat] = React.useState([]);
    const [currDuration, setCurrDuration] = React.useState("1800");
    const [timeList, setTimeList] = React.useState({from: [], to: []});
    const _param = props.route.params || {};
    const contextOptions = React.useContext(ChnContext);
    const [_loading, setLoading] = React.useState(true);

    React.useEffect(()=> {
        console.log({_param});
        if (_param.onDemand) {
            onSelect("reason", _param.reason);
            setLoading(false);
        } else {
            apiCall("/appointment-reasons").then((res)=> {
                getLables(res);
                setLoading(false);
            }).catch((err)=> {
                console.log(err);
                showInfoModal();
            });
        }
        setTimeList({from: createTimeList("AM"), to: createTimeList("PM")})
    }, [contextOptions.net])

    const options = [
        {
            id : 1,
            img: require('../images/virtual.png'),
            text: 'appointment.vr'
        },
        {
            id : 2,
            img: require('../images/inPerson.png'),
            text: 'appointment.ip'
        },
    ];

    const getLables = (_data) => {
        let reasonArr = [];
        for (let key in _data) {
            reasonArr.push({
                label: _data[key],
                value: key,
            })
        }

        setReasons([...reasonArr]);
    }

    const onSelect = (type, itemValue)=> {
        switch(type) {
            case 'cat': setCurrDuration(appoCat[itemValue].duration);
            break;
            case 'reason' : setSelectedValue(itemValue);
            break;
            case  'from': setFrom(itemValue);
            break;
            case 'to': setTo(itemValue);
            break;
        }
    }

    const handeDate = (_cur) => {
        setMarked({[_cur.dateString]: {selected: true}});
        setAppoDate(_cur.dateString);
    }

    const handleAction = (id)=> {
        let obj = {
            pageName: id == 1 ? (_param.visitInfo == "new" ? "PersonProvider" : "ProviderBio") : "Location",
            visitType: id == 1 ? "virtual" : "inPerson",
            reason: selectedValue,
            duration: currDuration,
            onDate: _date,
            from: _from,
            to: _to,
            ..._param
        }
        // let warn = checkBlank(obj, ["onDate"]); // ["reason","duration","onDate"]
        // if (warn) {
        //     showInfoModal(warnMsg[warn]);
        //     return false;
        // }
        setAction(id);
        props.navigation.navigate(obj.pageName, obj);
    }

    const getOptions = () => {
        if (_param.appoId) {
            return (
                <TouchableOpacity 
                    onPress={handleAction.bind(this, _param.appoId)}
                    style={[
                        commonStyle.btnOrange,
                        UI.setWidth(100, '%'),
                        UI.setHeight(40),
                    ]}
                >
                    <Text style={[commonStyle.themeNormalText, commonStyle.textWhite]}>
                        {_param.appoId == 1 ? Lang("appointment.SelProvider") : Lang("appointment.selAria")}
                    </Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={[commonStyle.row, commonStyle.wrap,]}>
                    {options.map((item)=> 
                        <TouchableOpacity 
                            key={item.id} 
                            onPress={handleAction.bind(this, item.id)}
                            style={[
                                UI.setWidth(50, '%'), 
                                commonStyle.vCenter, 
                                commonStyle.pbLg,
                            ]}
                        >
                            <Image
                                source={item.img}
                                style={[commonStyle.pageIcons]}
                            />
                            <Text 
                                style={[
                                    commonStyle.themeOrangeText,
                                    commonStyle.pt
                                ]}
                            >
                                {Lang(item.text)}
                            </Text>
                        </TouchableOpacity>
                    )}
            </View>
            )
        }
    }

    if (_loading) {
        return (
            <Loader loading={true} style={[commonStyle.pLg]} />
        )
    }

    return(
        <ChnContext.Consumer>
            {context=> (
                <ScrollView 
                    style={[
                        commonStyle.themeBg, 
                    ]}
                > 
                    <View style={[UI.setPadding(20,30,20,30)]}>
                        <View 
                            style={[
                                commonStyle.vCenter, 
                                commonStyle.row, 
                                commonStyle.alignCorner,
                            ]}
                        >
                            <View style={[UI.setWidth(70, '%')]}>
                                <MyText theme="heading" title={Lang('appointment.pageTitle')} />
                                <MyText 
                                    title={Lang('app 212.welUsr', {user: context.user.name})} 
                                    style={[commonStyle.themeSubText, commonStyle.textBlue]} 
                                />
                            </View>
                            <Image
                                source={require('../images/1024x/live.png')}
                                style={[commonStyle.pageIcons]}
                            />
                        </View>
                        {/* <View style={[commonStyle.ptLg, commonStyle.pbMd]}>
                            <MyText theme="orange" title={Lang('appointment.date')} />
                        </View>
                        <View>
                            <Calendar markedDates={markedDate} onDayPress={handeDate} />
                        </View> */}
                        <View style={[commonStyle.ptXLg]}>
                            <MyText theme="orange" title={Lang('appointment.time')} />
                        </View>
                        <View style={[commonStyle.row]}>
                            <Select
                                onChange={onSelect.bind(this, 'from')}
                                list={timeList.from}
                                style={[commonStyle.flex1]}
                                selectProps={{value: _from}}
                            />
                            <Select
                                onChange={onSelect.bind(this, 'to')}
                                list={timeList.to}
                                style={[commonStyle.flex1, commonStyle.ml]}
                                selectProps={{value: _to}}
                            />
                        </View>
                        <View style={[commonStyle.vCenter, commonStyle.ptLg]}>
                            {getOptions()}
                        </View>
                    </View>
                </ScrollView>
            )}
        </ChnContext.Consumer>
    )
}

export default MakeAppointment;