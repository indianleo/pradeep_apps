import { isArray } from 'lodash';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import commonStyle from '../css/commonStyle';
import Icons from './Icons';

const MyButton = (props) => {

    const onTouch = () => {
        if (props.disabled) return false;
        if (props.arg) {
            props.onPress?.call(this, props.arg);
        } else {
            props.onPress?.("pradeep");
        }
    }

    const wrapperStyle = () => { console.log(props.disabled)
        let style = props.theme ? [commonStyle.btnSky] : [];
        if (props.style) {
            style = isArray(props.style) ? [...style, ...props.style] : [...style, props.style];
        }
        if (props.disabled) {
            style.push(UI.setOpacity(.4));
        }

        return style;
    }

    if (props.theme) {
        return (
            <TouchableOpacity
                onPress={onTouch}
                style={wrapperStyle()}
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
            style={wrapperStyle()}
        >
            {getInnerLayout()}
        </TouchableOpacity>
    )
}

export default MyButton;