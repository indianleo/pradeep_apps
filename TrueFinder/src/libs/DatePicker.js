import React from 'react';
import { Calendar } from 'react-native-calendars';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { getMonthName, months } from '../../config/chnConfig';
import css from '../css';
import Icons from './Icons';
import { useUI } from '../config/theme';
const DatePicker = (props) => {
    const UI = useUI();
    const [markedDate, setMarked] = React.useState({});
    const [showSelection, setSelection] = React.useState(false);
    const [yearList, setYearList] = React.useState([]);
    const [currentDate, setCurrent] = React.useState("");
    const [track, setTrack] = React.useState(0);
    const [currYear, setYear] = React.useState("");

    React.useEffect(()=> {
        setYear(new Date().getFullYear());
        setYearList(getyearList());
        if (props.currentDate) {
            console.log(props.currentDate)
            setMarked({[props.currentDate]: {selected: true}});
        }
    }, [])

    const onDayTouch = (_cur) => {
        console.log(_cur.dateString);
        setMarked({[_cur.dateString]: {selected: true}});
        props.onTouch?.(_cur);
    }

    const getYears = (_dd) => {
        setTrack(0);
        setSelection(true);
    }

    const getyearList = () => {
        let arr = [];
        let cd = new Date().getFullYear();
        for (let i = cd; i > 1945; i--) {
            arr.push({
                id: i,
                year: i
            })
        }
        return arr;
    }

    const loadCal = (item, index) => {
        let _dd = new Date();
        if (item.year) {
            setYear(item.year);
            setTrack(1);
        } else {
            setCurrent(`${currYear}-${getNum(index+1 || _dd.getMonth())}-${getNum(_dd.getDate())}`);
            setSelection(false);
        }
    }

    const getNum = (n) => {
        if (n < 10) {
            return '0'+n;
        }
        return n;
    }

    const renderSlots = (item, index) => {
        return (
            <View key={index} style={[css.p]}>
                <TouchableOpacity 
                    style={[css.themeBtn, css.setScreen(100, 40)]}
                    onPress={loadCal.bind(this, item, index)}
                >
                    <Text style={[css.themeBtnText]}>{item.year || item}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const customHeader = (date) => {
        let _dd = new Date(date[0]);
        return(
            <TouchableOpacity 
                onPress={getYears} 
                style={[css.setHeight(40),css.center, css.hPadLg, css.row]}
            >
                <Text style={[css.themeNormalText, css.fs6, css.textDark]}>
                    {`${getMonthName(_dd.getMonth())} ${_dd.getFullYear()}`}
                </Text>
                <Icons 
                    name="caret-down"
                    size={28}
                    style={[css.textOrange, css.pl]}
                />
            </TouchableOpacity>
        )
    }

    const getCalendar = () => {
        if (props.list) {
            return (
                <Calendar
                    current={currentDate}
                    markedDates={markedDate} 
                    onDayPress={onDayTouch} 
                    horizontal={true}
                    renderHeader={customHeader}
                />
            )
        } else {
            return (
                <Calendar 
                    markedDates={markedDate} 
                    onDayPress={onDayTouch} 
                />
            )
        }
    }

    const selectLayout = () => {
       switch (track) {
           case 0:
               return (
                   <View style={[css.row, css.wrap, css.center]}>
                       {yearList.map(renderSlots)}
                   </View>
               )
            case 1: 
                return (
                    <View style={[css.row, css.wrap, css.center]}>
                        {months.map(renderSlots)}
                    </View>
                )
            default: return null
       }
    }

    return (
        <View style={props.style}>
            {showSelection
                ? <ScrollView>{selectLayout()}</ScrollView> 
                : getCalendar()
            } 
        </View>
    )
}

export default DatePicker;