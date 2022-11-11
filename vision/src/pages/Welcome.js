import React from "react";
import {useColorScheme, SafeAreaView, StatusBar} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { useSelector } from "react-redux";
import { UI } from "../config/theme";
import { MyText } from "../libs";
//import Counter from './counter';
import Home from "./Home";

const Welcome = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const count = useSelector(state=> state.counter.value);

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <Home />
        </SafeAreaView>
    )
}

export default Welcome;