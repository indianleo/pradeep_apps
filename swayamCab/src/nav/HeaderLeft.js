import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';

const HeaderLeft = (props) => {
    const onBack = ()=> {
        props.navigation.goBack(null);
    }
    return(
        <View>
           {props.hideBack ? null : <HeaderBackButton tintColor={'white'} onPress={onBack} />}
        </View>
    )
}

export default HeaderLeft;