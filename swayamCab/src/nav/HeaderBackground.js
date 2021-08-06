import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import commonStyle from '../css/commonStyle';
const HeaderBackground = (props) => {
    return(
        <View>
           <Image
              source={require("../images/bg2.jpeg")}
              style={[
                  commonStyle.imgStretch,
                  UI.setScreen(100,100, '%')
                ]}
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