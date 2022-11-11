import React from 'react';
import { View, Text } from 'react-native';
const ShowError = (props) => {
    let findErr = props.data[props.type];
    let textStyle = UI.mergeArray([UI.setColor('red')], props.style);
    if (findErr) {
        return (
            <View style={props.style}>
                {findErr.map((err, index)=> 
                    <Text key={index} style={textStyle}>
                        {err}
                    </Text>
                )}
            </View>
        )
    } 
    return null;
}

export default ShowError;