import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = (props)=> {
    let title = typeof props.children == 'string' ? props.children : null;
    return(
        <View style={[style.headerBar]}>
            <View>
                <Text style={style.title}>
                    {title}
                </Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    headerBar: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 18
    }
})

export default Header;