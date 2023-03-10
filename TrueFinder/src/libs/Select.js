import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon  from 'react-native-vector-icons/FontAwesome';
import { useUI } from '../config/theme';
import css from '../css';
import Loader from '../Loader';

const Select = (props) => {
    const UI = useUI();

    const [isLoading, setLoading] = React.useState(true);
    const [optionList, setList] =  React.useState([{label: "Label 1", value: "Value 1"}]);

    const innerStyle = UI.ios ? [css.vPadMd]: [css.setVpadding(5), css.textBoxBorderColor, css.mtsm];
    let viewStyle = Array.isArray(props.style) ? [...innerStyle, ...props.style] : [...innerStyle, props.style];

    React.useEffect(()=> {
        setList(getList());
        setLoading(false);
    }, [props.list])

    const getList = () => {
        if (Array.isArray(props.list) && props.list.length > 0) {
            return props.list
        }
        return [{label: "None", value: "Value 1"}];
    }

    return (
        <View style={viewStyle}>
            {props.isLoading || isLoading
                ? <Loader loading={isLoading} />
                : <RNPickerSelect
                    key={props.id || "randomSelect"}
                    onValueChange={props.onChange}
                    onDonePress={props.onDone}
                    items={optionList}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    Icon={()=> <Icon name="chevron-down" size={18} color="#737373" />}
                    {...props.selectProps}
                />
            }
        </View>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 18,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#707070',
      borderRadius: 4,
      color: '#4d4d4d',
      backgroundColor: "#fff",
      fontWeight: '600',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      //borderWidth: 1,
      //borderColor: '#707070',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: '30%',
        right: 5,
    },
});

export default Select;