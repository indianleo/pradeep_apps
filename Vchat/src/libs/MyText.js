import React from 'react';
import { Text } from 'react-native';
import commonStyle from '../css/commonStyle';
import { UI } from '../config/theme';

const MyText = (props) => {
    const theme = {
        "default": [commonStyle.textStyle, commonStyle.textDark],
        "heading": [commonStyle.themeHeadingText],
        "orange": [commonStyle.themeOrangeText],
        "orangeCenter": [commonStyle.themeOrangeText, commonStyle.textCenter],
        "purple": [commonStyle.themeOrangeText, commonStyle.textPurple],
        "white": [commonStyle.themeNormalText, commonStyle.textWhite]
    }
    const wrapperStyle = theme[props.theme || "default"];

    const onTouch = () => {
        if (props.arg) {
            props.onPress?.call(this, props.arg)
        } else {
            props.onPress?.call(this);
        }
    }

    if (props.nestedTitle) {
        return (
            <Text
                style={UI.mergeArray(wrapperStyle, props.style)}
                onPress={onTouch}
                {...props.textProps}
            >
                {props.title}
                <Text style={props.nestedStyle}>
                    {props.nestedTitle}
                </Text>
            </Text>
        )
    }

    return (
        <Text
            style={UI.mergeArray(wrapperStyle, props.style)}
            onPress={onTouch}
            {...props.textProps}
        >
            {props.title || props.children}
        </Text>
    )
}

export default MyText;