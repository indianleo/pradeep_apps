import React from "react";
import {SafeAreaView, StatusBar, Text, View} from "react-native";
import CallLogs from "./CallLogs";

const Home = () => {
    const TRANSITIONS = ['fade', 'slide', 'none'];

    return (
        <SafeAreaView>
            <StatusBar
                animated={true}
                translucent={true}
                backgroundColor={"transparent"}
                showHideTransition={TRANSITIONS[2]}
                networkActivityIndicatorVisible={true}
            />
            <CallLogs />
        </SafeAreaView>
    )
}

export default Home;