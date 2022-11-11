import React from 'react';
import { View, Text, TouchableOpacity, VirtualizedList, Alert, Image } from 'react-native';
import { getItem, getItemCount, heakthRecordsList } from '../config/chnConfig';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

const HealthRecords = (props) => {
    const contextOption = React.useContext(ChnContext);

    const renderHeader = () => {
        return (
            <View style={[UI.setPadding(0,5,0,5, '%')]}>
                <View 
                    style={[
                        commonStyle.vCenter, 
                        commonStyle.row, 
                        commonStyle.alignCorner,
                    ]}
                >
                    <View style={[UI.setWidth(70, '%')]}>
                        <Text 
                            style={[
                                commonStyle.introHeadingSize, 
                                commonStyle.textBold, 
                                commonStyle.textStyle,
                                commonStyle.textBlue
                            ]}
                        >
                            {Lang('healthRecords.title')}
                        </Text>
                        <Text 
                            style={[
                                commonStyle.subHeading, 
                                commonStyle.textBold, 
                                commonStyle.textStyle,
                                commonStyle.textBlue
                            ]}
                        >
                            {Lang('app 212.welUsr', {user: contextOption.user.name})}
                        </Text>
                    </View>
                    <Image
                        source={require('../images/1024x/acount.png')}
                        style={[commonStyle.pageIcons]}
                    />
                </View>
            </View>
        );
    }

    const  renderListItem = ({ item }) => {
        return(
            <View style={[UI.setPadding(0,5,5,5, '%')]}>
                <TouchableOpacity 
                    style={[
                        commonStyle.shadow,
                        commonStyle.vCenter,
                        commonStyle.bgWhite,
                        commonStyle.pLg,
                        commonStyle.br,
                        UI.setHeight(70),
                        UI.setWidth(100, '%'),
                        commonStyle.row,
                        commonStyle.alignCorner
                    ]} 
                    onPress={handlePageAction.bind(this, item)}
                >
                    <Text 
                        style={[
                            commonStyle.themeOrangeText
                        ]}
                    >
                        {Lang(item.text)}
                    </Text>
                    <Icon name="angle-right" size={30} style={[commonStyle.textBlue]} />
                </TouchableOpacity>
            </View>
        )
    }

    const handlePageAction = (item)=> {
        try {
            props.navigation.navigate("HealthRecordInfo", item);
        } catch(err) {
            Alert.alert(
                "Rquested Page in Underdevelopemnt",
                page,
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { 
                        text: "OK", 
                        onPress: () => console.log("OK Pressed"),
                        style: "ok" 
                    }
                ]
            );
        }
    }

    return (
        <ChnContext.Consumer>
            {context => (
                <View style={[commonStyle.themeBg]}>
                    <VirtualizedList
                        data={heakthRecordsList}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={renderHeader}
                        renderItem={renderListItem}
                        getItemCount={getItemCount}
                        getItem={getItem}
                        style={[UI.setMarginTop(10), UI.setPadding(20,10,20,10)]}
                    />
                </View>
            )}
        </ChnContext.Consumer>
    )
}

export default HealthRecords;