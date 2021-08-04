import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loader = (props) => {
    if (props.loading) {
        return (
            <View style={[props.style]}>
                <ActivityIndicator size={props.size || "small"} color={props.color || "#0000ff"} />
            </View>
        )
    }

    return null;
}

export default Loader;