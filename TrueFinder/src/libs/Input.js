import React from "react";
import {TextInput, View, Text} from "react-native";
import css from "../css";
import MyText from "./MyText";

const Input = (props) => {

    const handleInput = () => {
        props.onChange?.();
    }

    const renderTittle = () => {
        if (props.title) {
            return (
                <View style={[css.pb]}>
                    <MyText title={props.title} style={[css.textBlack]} />
                </View>
            )
        }
        return null;
    }

    const renderInput = () => {
        const formValue =  props.data && props.name ? props.data[props.name] : '';
        switch(props.type) {
            case 'text': 
                return (
                    <View style={[]}>
                        <TextInput
                            onChangeText={handleInput}
                            value={formValue}
                            placeholder={props.placeholder}
                            style={[css.setWidth(100, '%'), css.bgWhite, css.themeTextBox]}
                            {...props.extraProps}
                        />
                    </View>
                )
            default: 
                return (
                    <View>
                        <Text style={[css.themeTextBox]}>
                            {formValue}
                        </Text>
                    </View>
                )
        } 
    }

    return (
        <View style={[css.setWidth(100, '%'), css.setHpadding(5, '%'), css.pbLg]}>
            {renderTittle()}
            {renderInput()}
        </View>
    )
}

export default Input;