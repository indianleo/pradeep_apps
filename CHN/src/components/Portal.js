import React from 'react';
import {
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    StyleSheet,
    Image,
} from 'react-native';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
const Portal = (props)=> {

    let protalList = [
        {
            id: 1,
            img: require('../images/1024x/schedule.png'),
            text: 'portal.schApp',
            page: "ScheduleAppo"
        },
        {
            id: 2,
            img: require('../images/1024x/my-health.png'),
            text: 'portal.healthManage',
            page: "Vitals"
        },
        {
            id: 3,
            img: require('../images/1024x/record.png'),
            text: 'portal.hRecords',
            page: "HealthRecords"
        },
        {
            id: 4,
            img: require('../images/1024x/refill.png'),
            text: 'portal.refill',
            page: "RefillReq",
        },
        {
            id: 5,
            img: require('../images/provider.png'),
            text: 'myProvider.title',
            page: "MyProvider",
        },

    ];

    const handlePageAction = (page)=> {
        props.navigation.navigate(page, {});
    }

    const  renderListItem = ({ item }) => {
        return(
            <TouchableOpacity 
                style={styles.listItem} 
                onPress={handlePageAction.bind(this, item.page)}
            >
                <Image
                    source={item.img}
                    style={styles.listImg}
                />
                <Text 
                    style={[
                        commonStyle.orangeFontSize, 
                        commonStyle.pl, 
                        commonStyle.textOrange, 
                        commonStyle.textLightBold,
                        commonStyle.textStyle
                    ]}
                >
                    {Lang(item.text)}
                </Text>
            </TouchableOpacity>
        )
    }

    return(
        <ChnContext.Consumer>
            {context => (
                <View style={[commonStyle.themeBg, UI.setPadding(20,30,20,30)]}>
                    <View>
                        <Text 
                            style={[
                                commonStyle.themeHeadingText,
                            ]}
                        >
                            {Lang('portal.pageTitle')}
                        </Text>
                        <Text 
                            style={[
                                commonStyle.textBlue,
                                commonStyle.themeSubText
                            ]}
                        >
                            {Lang('app 212.welUsr', {user: context.user?.name})}
                        </Text>
                    </View>
                    <FlatList
                        data={protalList}
                        keyExtractor={item => item.id}
                        renderItem={renderListItem}
                        style={{marginTop:10, height: '83%'}}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
        </ChnContext.Consumer>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding:5, 
        backgroundColor: '#fff', 
        marginBottom:20, 
        flexDirection:'row', 
        alignItems: 'center',
        borderRadius: 3
    },
    listImg: {
        width: 80, 
        height:80
    },
})

export default Portal;