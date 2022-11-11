import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { apiCall, BaseUrl } from '../api/apiAction';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
import { useNavigation } from '@react-navigation/native';
import InfoModal from '../components/InfoModal';
import { providerBioFileds } from '../config/chnConfig';
import MyButton from './libs/MyButton';
import MyText from './libs/MyText';

const MyProvider = (props) => {
    const [providers, setProviders] = React.useState([]);
    const [primaryProvide, setPrimary] = React.useState({});
    const [modalLayout, setModalData] = React.useState(null);
    const [showModal, visibleModal] = React.useState(false);
    const _navigation = useNavigation();
    React.useEffect(()=> {
        apiCall("/providers").then((res)=> {
            setPrimary(res[0]);
            res.shift();
            //console.log(res);
            setProviders([...res]);
        }).catch((err)=> {
            console.log(err);
            showInfoModal();
        })
    }, [])

    const openBio = (item)=> {
        _navigation.navigate('ProviderBio', item);
    }

    const getBioLayout = (_data) => {
        return (
            <View
                style={[
                    commonStyle.bgWhite,
                    commonStyle.brMd,
                    commonStyle.pLg
                ]}
            >
                {providerBioFileds.map((items)=> 
                    <View key={items.id} style={[commonStyle.ptLg]}>
                        <Text 
                            style={[
                                commonStyle.textStyle, 
                                commonStyle.textOrange, 
                                commonStyle.textLight,
                                commonStyle.fs6
                            ]}
                        >
                            {Lang(items.label)}:
                        </Text>
                        <Text>
                            {_data[items.id]}
                        </Text>
                    </View>
                )}
            </View>
        )
    }

    const showBio = (item) => {
        setModalData(getBioLayout(item));
        visibleModal(true);
    }

    const modalClose = () => {
        visibleModal(false);
    }

    const needProvider = () => {
        props.navigation.navigate("MakeAppointment", {visitInfo: "new"});
    }

    const renderListInlineItem = ({ item }) => {
        return(
            <View 
                style={[UI.setWidth(130), UI.setMinHeight(200)]} 
                //onPress={openBio.bind(this, item)}
            >
                <Image
                    source={{uri: BaseUrl + item.imagePath}}
                    style={[commonStyle.listImg, commonStyle.center]}
                />
                <Text 
                    style={[
                        commonStyle.themeOrangeText, 
                        UI.setFont(15),
                        commonStyle.pl,
                        commonStyle.pt,
                        commonStyle.textCenter
                    ]}
                    numberOfLines={1}
                >
                    {item.name}
                </Text>
                <Text 
                    style={[
                        UI.setFont(12), 
                        commonStyle.pl, 
                        UI.setHeight(30),
                        commonStyle.textDark, 
                        commonStyle.wrap,
                        commonStyle.textStyle,
                        commonStyle.textLineSm
                    ]}
                    numberOfLines={2}
                >
                    {item.title}
                </Text>
                <TouchableOpacity 
                    style={[commonStyle.p, commonStyle.center]}
                    onPress={showBio.bind(this, item)}
                >
                    <Text style={[commonStyle.themeNormalText]}>
                        View Bio
                    </Text>
                    <Icon name="chevron-down" style={[commonStyle.themeNormalText, commonStyle.textCenter]} />
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <ChnContext.Consumer>
            {context =>
                <ScrollView >
                    <View style={[commonStyle.themeBg, UI.setPadding(5,5,0,5, '%')]}>
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
                                        commonStyle.themeHeadingText,
                                    ]}
                                >
                                    {Lang("myProvider.title")}
                                </Text>
                            </View>
                            <Image
                                source={require('../images/provider.png')}
                                style={[UI.setScreen(90,90)]}
                            />
                        </View>
                    </View>
                    {providers.length > 0 
                        ? null 
                        : <ActivityIndicator size="small" color="#0000ff" style={[commonStyle.pLg]} />
                    }
                    {/* <View style={[UI.setPadding(5,5,5,5,'%')]}>
                        <MyButton
                            title={"I need a new provider"}
                            theme={true}
                            style={[UI.setWidth(100, '%'), UI.setHeight(50)]}
                            textStyle={[commonStyle.orangeFontSize]}
                            onPress={needProvider}
                        />
                    </View> */}
                    <View style={[UI.setPaddingLeft(5, '%')]}>
                        <Text style={[commonStyle.themeSubText, commonStyle.textBlue]}>
                            {Lang("myProvider.primaryProvider")}
                        </Text>
                    </View>
                    <View style={[UI.setPadding(5, 5, 5, 5, '%')]}>
                        {providers.length > 1 && primaryProvide.providerId != "-1"?
                            <View 
                                style={[
                                    commonStyle.bgWhite, 
                                    commonStyle.row, 
                                    commonStyle.pMd,
                                    commonStyle.brSm,
                                    commonStyle.shadow
                                ]}
                            >
                                <View>
                                    <Image
                                        source={{uri: BaseUrl + primaryProvide.imagePath}}
                                        style={[
                                            commonStyle.imgContain,
                                            UI.setScreen(80,80),
                                        ]}
                                    />
                                </View>
                                <View style={[commonStyle.pl, UI.setWidth(75, '%')]}>
                                    <Text style={[commonStyle.themeOrangeText]}>
                                        {primaryProvide.name}
                                    </Text>
                                    <Text 
                                        style={[
                                            commonStyle.themeNormalText, 
                                            commonStyle.textDark, 
                                            commonStyle.textLineMd
                                        ]}
                                        numberOfLines={2}
                                    >
                                        {primaryProvide.title}
                                    </Text>
                                    <TouchableOpacity 
                                        style={[
                                            UI.setPadding(10,5,5,5), 
                                            {alignSelf: 'flex-end'}]
                                        }
                                        onPress={showBio.bind(this, primaryProvide)}
                                    >
                                        <Text style={[commonStyle.themeNormalText]}>
                                            View Bio
                                        </Text>
                                        <Icon name="chevron-down" style={[commonStyle.themeNormalText, commonStyle.textCenter]} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            : 
                                <View style={[commonStyle.bgWhite, commonStyle.brSm, commonStyle.pMd]}>
                                    <MyText title={Lang("appointment.noMyProvider")} />
                                </View>
                        }
                    </View>
                    <View style={[UI.setPaddingLeft(5, '%')]}>
                        <Text style={[commonStyle.themeSubText, commonStyle.textBlue]}>
                            {Lang("myProvider.allProvider")}
                        </Text>
                    </View>
                    <View style={[commonStyle.bgWhite, commonStyle.textBoxBorderColor, commonStyle.shadow]}>
                        <View style={[UI.setPadding(3, 5, 3, 5, '%')]}>
                            <Text style={[commonStyle.themeOrangeText]}>
                                {"Medical " + Lang("myProvider.provider") }
                            </Text>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={providers}
                            keyExtractor={item => item.providerId}
                            renderItem={renderListInlineItem}
                            style={[]}
                        />
                    </View>
                    <InfoModal 
                        external={modalLayout} 
                        isVisble={showModal} 
                        onClose={modalClose}
                    />
                </ScrollView>
            }
        </ChnContext.Consumer>
    )
}

export default MyProvider;