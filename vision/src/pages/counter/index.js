import React from "react";
import {View, TouchableOpacity, Text} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { addAmt, decrement, increment } from "./counterReducer";
import styles from "./styles";

const Counter = ()=> {
    const count = useSelector((state)=> state.counter.value);
    const dispatch = useDispatch();

    const handlePress = (type) => {
        switch(type) {
            case 'add': dispatch(increment());
            break;
            case 'subs': dispatch(decrement());
            break;
            case 'action': dispatch(addAmt(10))
            break;
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={handlePress.bind(this, "add")} style={[styles.center, styles.btn]}>
                <Text>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress.bind(this, "subs")} style={[styles.center, styles.btn]}>
                <Text>Substract</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress.bind(this, "action")} style={[styles.center, styles.btn]}>
                <Text>Add Amt</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Counter;