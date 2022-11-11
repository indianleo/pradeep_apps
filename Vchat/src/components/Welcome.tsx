import React from "react";
import { 
    Text, 
    View, 
    SafeAreaView,
    StatusBar, 
    useColorScheme
} from "react-native";
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Welcome = ()=> {
    const isDarkMode:boolean = useColorScheme() === 'dark';

    const backgroundStyle: any = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    return(
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <View>
                <Text>Pradeep</Text>
            </View>
        </SafeAreaView>
    )
}

export default Welcome;