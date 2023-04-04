import React from "react";
import { Image, Text, View } from "react-native";
import css from "../../css";

const EditImage = () => {
    return (
        <View>
            <Image
                source={require('../../image/device.png')}
                style={[css.setWidth(), css.imgContain]}
            />
        </View>
    )
}

export default EditImage;