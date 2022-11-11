import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    StyleSheet, 
    Alert,
    Image,
    TextInput
} from 'react-native';
import commonStyle from '../css/commonStyle';
import ChnContext from '../context/ChnContext';
import InfoModal from './InfoModal';
import Loader from './Loader';

const Account = (props) => {
    const contextOption = React.useContext(ChnContext);
    const [layout, setLayout] = React.useState(null);
    const [_modal, showModal] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const [formObj, setForm] = React.useState({'email': ''});
    const options = [
        {
            id: 1,
            text: 'account.fId',
            page: "Fid"
        },
        {
            id: 2,
            text: 'account.pInf',
            page: "Info"
        },
        {
            id: 3,
            text: 'account.noti',
            page: "Noti"
        },
    ];

    const  renderListItem = ({ item }) => {
        return(
            <TouchableOpacity 
                style={styles.listItem} 
                onPress={handlePageAction.bind(this, item.page)}
            >
                <Text 
                    style={[
                        UI.setFont(22), 
                        commonStyle.plMd, 
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

    const handlePageAction = (page)=> {
        setLayout(page);
        showModal(true);
    }

    const onSubmitInf = () => {
        console.log(formObj);
        showModal(false);
    }

    const handleInput = (value) => {
        setForm({...{"email": value}});
    }

    const getLayout = () => {
        switch (layout) {
            case 'loader': 
                return <Loader loading={isLoading} />
            case 'Fid':
                return (
                    <View>
                        <Text>FID</Text>
                    </View>
                )
            case 'Info':
                return (
                    <View>
                        <View>
                            <Text style={[commonStyle.themeHeadingText]}>
                                {Lang("account.pInf")}
                            </Text>
                        </View>
                        <View style={[commonStyle.row, commonStyle.vCenter, commonStyle.pbLg]}>
                            <View style={[commonStyle.center, commonStyle.p]}>
                                <Image 
                                    source={require('../images/acount.png')}
                                    style={[commonStyle.pageIcons]}
                                />
                                <Text style={[UI.setFont(12), commonStyle.textStyle, commonStyle.textDark]}>
                                    Change Photo
                                </Text>
                            </View>
                            <View style={[UI.setWidth(70, '%')]}>
                                <Text style={[commonStyle.themeOrangeText]}>
                                    {contextOption.user.name}
                                </Text>
                                <Text style={[commonStyle.themeText, commonStyle.textDark]}>
                                    {contextOption.user.email}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View style={[commonStyle.pb]}>
                                <Text 
                                    style={[commonStyle.themeOrangeText]}
                                >
                                    Change Email
                                </Text>
                            </View>
                            <TextInput
                                onChangeText={handleInput}
                                placeholder={"New Eemail"}
                                defaultValue={formObj.email}
                                style={[commonStyle.themeTextBox, UI.setHeight(40)]}
                            />
                        </View>
                        <View style={[commonStyle.ptLg]}>
                            <TouchableOpacity 
                                style={[
                                    commonStyle.btnOrange,
                                    UI.setWidth(100, '%'), 
                                    UI.setHeight(40)
                                ]}
                                onPress={onSubmitInf}
                            >
                                <Text style={[commonStyle.textWhite, commonStyle.themeText]}>
                                    {Lang("app 212.submit")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            case 'Noti':
                return (
                    <View>
                        <Text>Notification</Text>
                    </View>
                )
            default: return null;
        }
    }

    return (
        <ChnContext.Consumer>
            {
                context => (
                    <View style={[commonStyle.themeBg, UI.setPadding(20,30,20,30)]}>
                        <View 
                            style={[
                                commonStyle.vCenter, 
                                commonStyle.row, 
                                commonStyle.alignCorner,
                            ]}
                        >
                            <View style={[UI.setWidth(70, '%')]}>
                                <Text style={[UI.setFont(28), commonStyle.textBold, commonStyle.textBlue, commonStyle.textStyle]}>
                                    {Lang('account.title')}
                                </Text>
                                <Text style={[UI.setFont(24), commonStyle.textBold, commonStyle.textBlue, commonStyle.textStyle]}>
                                    {Lang('app 212.welUsr', {user: context.user.name})}
                                </Text>
                            </View>
                            <Image
                                source={require('../images/acount.png')}
                                style={[commonStyle.pageIcons]}
                            />
                        </View>
                        <FlatList
                            data={options}
                            keyExtractor={item => item.id}
                            renderItem={renderListItem}
                            style={{marginTop:10}}
                        />
                        <InfoModal 
                            external={layout} 
                            isVisble={_modal} 
                            onClose={()=> showModal(false)}
                        >
                            {getLayout()}
                        </InfoModal>
                    </View>
                )
            }
        </ChnContext.Consumer>
    )
}

const styles = StyleSheet.create({
    listItem: {
        paddingHorizontal:10, 
        paddingVertical: 25,
        backgroundColor: '#fff', 
        marginBottom:20, 
        flexDirection:'row', 
        alignItems: 'center'
    },
})

export default Account;