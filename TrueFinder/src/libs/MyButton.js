import React from 'react';
import { Text, Pressable, Image } from 'react-native';
import { useUI } from '../config/theme';
import css from '../css';
import Icons from './Icons';

const MyButton = (props) => {
    const UI = useUI();
    const rowBased = ["rightTextIcon", "leftTextIcon", "rightImage", "leftImage", "checkbox"];

    const onTouch = ()=> {
        if (props.arg) {
            props.onPress?.call(this, props.arg, props.name);
        } else {
            props.onPress?.call(this, props.name);
        }
    }

    const getLayout = (pressed)=> {
        let iconColor = props.theme ? css.textWhite : props.iconStyle;
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
                        </Text>
                    </>
                )
            case 'leftTextIcon':
                return (
                    <>
                        <Text style={getWrapperStyle("text")}>
                            {props.title}
                        </Text>
                        <Icons
                            iconSet={props.iconSet}
                            name={props.iconName}
                            size={props.iconSize}
                            style={iconColor}
                        />
                    </>
                )
            case 'imageText':
            case 'leftImage':
                return (
                    <>
                        <Image
                            source={props.source}
                            style={[props.imgStyle]}
                        />
                        <Text style={getWrapperStyle("text")}>
                            {props.title}
                        </Text>
                    </>
                )
            case 'rightImage':
                return (
                    <>
                        <Text style={getWrapperStyle("text")}>
                            {props.title}
                        </Text>
                        <Image
                            source={props.source}
                            style={[props.imgStyle]}
                        />
                    </>
                )
            case 'checkbox': 
                return (
                    <>
                        <Icons
                            iconSet={"materialComIcons"}
                            name={props.checked ? "checkbox-marked" : "checkbox-blank-outline"}
                            size={props.iconSize || 16}
                            style={iconColor}
                        />
                        <Text style={getWrapperStyle("text")}>
                            {props.title}
                        </Text>
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
            default:  
                return (
                    <Text style={getWrapperStyle("text")}>
                        {props.title}
                    </Text>
                )
        }
    }
    const getWrapperStyle = (target, pressed) => {
        if (target == "text") {
            let st =  props.theme ? [css.themeBtnText] : [css.textStyle, css.textLightBold];
            return UI.mergeArray(st, props.textStyle);
        } else {
            let st =  props.theme ? [css.themeBtn] : [css.br, css.vCenter, props.shadow && css.shadow]; 
            if (rowBased.includes(props.type)) {
                st.push(css.row);
            }
            st = UI.mergeArray(st, props.style);

            return ([...st, css.setOpacity(pressed ? 0.7 : 1), (props.disabled && css.disable)]);
        }
    }

    if (props.hide) {
        return null;
    }

    return (
        <Pressable
            onPress={onTouch}
            style={({ pressed }) => getWrapperStyle("wrapper", pressed)}
            disabled={props.disabled || false}
        >
            {({ pressed }) => getLayout(pressed)}
      </Pressable>
    )
}

export default MyButton;