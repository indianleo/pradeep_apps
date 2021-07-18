import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const HeaderBackground = (props) => {
    return(
        <View>
           <LinearGradient
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                colors={[ '#8f055b', '#ed0707', '#f58207' ]}
                style={style.headerBg}
           />
        </View>
    )
}

const style = StyleSheet.create({
    headerBg: {
        //backgroundColor: 'rgb(245,130,7)',
        width: '100%',
        height: '100%',
    }
})

export default HeaderBackground;