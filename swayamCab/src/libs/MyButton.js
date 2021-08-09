import { isArray } from 'lodash';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import commonStyle from '../css/commonStyle';
import Icons from './Icons';

const MyButton = (props) => {

    const onTouch = () => {
        if (props.arg) {
            props.onPress?.call(this, props.arg);
        } else {
            props.onPress?.("pradeep");
        }
    }

    if (props.theme) {
        let btnStyle = [commonStyle.btnSky];
        if (props.style) {
            btnStyle = isArray(props.style) ? [...btnStyle, ...props.style] : [...btnStyle, props.style];
        }
        return (
            <TouchableOpacity
                onPress={onTouch}
                style={btnStyle}
            >
                <Text style={[commonStyle.themeBtnText, props.fontSize && {fontSize: props.fontSize} ]}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        )
    }

    const getInnerLayout = ()=> {
        switch(props.type) {
            case 'icon':
                return (
                    <Icons
                        iconSet={props.iconSet}
                        name={props.iconName}
                        size={props.iconSize}
                        style={props.iconStyle}
                    />
                )
            default :
                return (
                    <Text style={props.textStyle}>
                        {props.title}
                    </Text>
                )
        }
    }

    return (
        <TouchableOpacity
            onPress={onTouch}
            style={props.style}
        >
            {getInnerLayout()}
        </TouchableOpacity>
    )
}

export default MyButton;