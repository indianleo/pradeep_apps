import React from 'react';
import { Text, View } from 'react-native';
import { useUI } from '../config/theme';
import css from '../css';

const MyText = (props) => {
    const UI = useUI();
    const theme = {
        "default": [css.textStyle, css.textBlack],
        "heading": [css.themeHeadingText],
        "purple": [css.themeOrangeText, css.textPurple],
        "white": [css.themeNormalText, css.textWhite]
    }
    

    const onTouch = () => {
        if (props.arg) {
            props.onPress?.call(this, props.arg)
        } else {
            props.onPress?.call(this);
        }
    }

    const renderLayout = React.useMemo(()=> {
        const type = props.nestedTitle ? "nestedText" : props.type;
        const wrapperStyle = theme[props.theme || "default"];
        switch(type) {
            case 'inLine': {
                const boxStyle = (props.style && Array.isArray(props.style)) ? props.style : [props.style || ""]
                return (
                    <View 
                        onPress={onTouch}
                        style={[
                            css.row,
                            ...boxStyle
                        ]}
                    >
                        <Text
                            style={UI.mergeArray(wrapperStyle, props.titleStyle)}
                            {...props.titleProps}
                        >
                            {props.title}
                        </Text>
                        <Text
                            style={props.subTitleStyle}
                            {...props.subTitleProps}
                        >
                            {props.subTitle}
                        </Text>
                    </View>
                )
            }
            case 'nestedText': return (
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
            default: return (
                <Text
                    style={UI.mergeArray(wrapperStyle, props.style)}
                    onPress={onTouch}
                    {...props.textProps}
                >
                    {props.title || props.children}
                </Text>
            )
        }
    }, [props]);

    return renderLayout
}

export default MyText;