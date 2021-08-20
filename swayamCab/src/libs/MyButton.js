import { isArray } from 'lodash';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import commonStyle from '../css/commonStyle';
import Icons from './Icons';

const MyButton = (props) => {
    const rowBased = ["rightTextIcon", "leftTextIcon", "checkbox"];

    const onTouch = () => {
        if (props.disabled) return false;
        if (props.arg) {
            props.onPress?.call(this, props.arg);
        } else {
            props.onPress?.("pradeep");
        }
    }

    const getWrapperStyle = (target, pressed) => {
        if (target == "text") {
            let st =  props.theme ? [commonStyle.themeBtnText] : [commonStyle.textStyle, commonStyle.textLightBold];
            return UI.mergeArray(st, props.textStyle);
        } else {
            let st =  props.theme ? [commonStyle.btnSky] : [commonStyle.br, commonStyle.middle]; 
            if (rowBased.includes(props.type)) {
                st.push(commonStyle.row);
            }
            if (props.disabled) {
                st.push(UI.setOpacity(.4));
            }
            st = UI.mergeArray(st, props.style);

            return ([...st, UI.setOpacity(pressed ? 0.7 : 1), (props.disabled && commonStyle.disable)]);
        }
    }

    const getInnerLayout = ()=> {
        let iconColor = props.theme ? commonStyle.textWhite : props.iconStyle;
        let nested = props.nestedTitle ? (<Text style={props.nestedStyle}>{props.nestedTitle}</Text>) : null;
        switch(props.type) {
            case 'rightTextIcon':
                return (
                    <>
                        <Icons
                            iconSet={props.iconSet}
                            name={props.iconName}
                            size={props.iconSize}
                            style={iconColor}
                        />
                        <Text style={getWrapperStyle("text")}>
                            {props.title}
                            {nested}
                        </Text>
                    </>
                )
            case 'leftTextIcon':
                return (
                    <>
                        <Text style={getWrapperStyle("text")}>
                            {props.title}
                            {nested}
                        </Text>
                        <Icons
                            iconSet={props.iconSet}
                            name={props.iconName}
                            size={props.iconSize}
                            style={iconColor}
                        />
                    </>
                )
            case 'icon':
                return (
                    <Icons
                        iconSet={props.iconSet}
                        name={props.iconName}
                        size={props.iconSize}
                        style={iconColor}
                    />
                )
            default :
                return (
                    <Text style={getWrapperStyle("text")}>
                        {props.title}
                        {nested}
                    </Text>
                )
        }
    }

    return (
        <TouchableOpacity
            onPress={onTouch}
            style={getWrapperStyle()}
        >
            {getInnerLayout()}
        </TouchableOpacity>
    )
}

export default MyButton;