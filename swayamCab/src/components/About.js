import React from 'react';
import { View, Text, Image} from 'react-native';
import commonStyle from '../css/commonStyle';

const About = (props) => {
    return(
        <View>
            <View style={[]}>
                <Image
                    source={require('../images/icon.png')}
                    style={[
                        commonStyle.imgContain,
                        UI.setWidth()
                    ]}
                />
            </View>
            <View style={[UI.setPadding(5,5,5,5, '%')]}>
                <View>
                    <Text style={[commonStyle.themeOrangeText]}>
                        {Lang("about.name")}: <Text style={[commonStyle.textDark]}>Svayam Cab</Text>
                    </Text>
                </View>
                <View>
                    <Text style={[commonStyle.themeOrangeText]}>
                        {Lang("about.version")}: <Text  style={[commonStyle.textDark]}>0.1.0</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default About;