import React from 'react';
import { View, Text, ScrollView, Image} from 'react-native';
import MyContext from '../context/MyContext';
import style from '../css/commonStyle';

const Profile = () => {
    return(
        <MyContext.Consumer>
            {context =>
                <ScrollView>
                    <View style={[style.center]}>
                        <Image
                            source={{uri: "https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png"}}
                            style={[
                                style.imgContain,
                                UI.setScreen(150,150)
                            ]}
                        />
                    </View>
                    <View style={[style.pLg]}>
                        <View style={[UI.setPadding(5,5,5,5, '%'), style.bgWhite]}>
                            <Text style={[style.themeOrangeText]}>
                                {Lang("profile.name")}: 
                            </Text>
                            <Text style={[style.themeNormalText, style.textDark]}>
                                {context.user.name}
                            </Text>
                        </View>
                        <View style={[UI.setPadding(5,5,5,5, '%'), style.bgWhite, style.mt]}>
                            <Text style={[style.themeOrangeText]}>
                                {Lang("profile.phone")}: 
                            </Text>
                            <Text style={[style.themeNormalText, style.textDark]}>
                                {context.userId}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            }
        </MyContext.Consumer>
    )
}

export default Profile;