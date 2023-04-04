import React from "react";
import {SafeAreaView, StatusBar, Text, View} from "react-native";
import { colors } from "../../css/cssConfig";
import CallLogs from "./CallLogs";
import Dashboard from "./Dashboard";

const Home = () => {
    const TRANSITIONS = ['fade', 'slide', 'none'];

    return (
        <SafeAreaView>
            <StatusBar
                animated={true}
                translucent={true}
                backgroundColor={colors.primary100}
                showHideTransition={TRANSITIONS[2]}
                networkActivityIndicatorVisible={true}
            />
            <Dashboard />
        </SafeAreaView>
    )
}

export default Home;