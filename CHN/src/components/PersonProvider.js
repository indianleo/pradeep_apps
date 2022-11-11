import React from 'react';
import { View, Text, Image, TouchableOpacity, VirtualizedList, Pressable, ScrollView } from 'react-native';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
import { useNavigation } from '@react-navigation/native';
import { apiCall, BaseUrl } from '../api/apiAction';
import { getItem, getItemCount, providerBioFileds } from '../config/chnConfig';
import Icons from './libs/Icons';
import Loader from './Loader';
import MyText from './libs/MyText';
import InfoModal from './InfoModal';
const PersonProvider = (props)=> {
    const _navigation = useNavigation();
    const [providers, setProviders] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const [modalLayout, setModalData] = React.useState([]);
    const [bioModal, showBioModal] = React.useState(false);
    let _param = props.route?.params || {};
    const contextOption = React.useContext(ChnContext);

    React.useEffect(()=> {
        if (contextOption.isLogined) {
            let url = `/available-providers?isActive=1`;
            if (_param.direct || props.inline) {
                url = `${_param.direct ?  '/providers' : '/existing-providers'}?isActive=1`
            } else {
                if (_param.am_dept) url += `&department=${_param.am_dept}`;
                if (_param.facilityId) url += `&facility=${_param.facilityId}`;
                if (_param.visitType) url += `&visitType=${_param.visitType}`;
                if (_param.am_line) url += `&line=${_param.am_line}`;
            }
            console.log({url});
            apiCall(url).then((res)=> {
                if (!Array.isArray(res) && res.original) {
                    showInfoModal(res.original.error);
                } else {
                    console.log(res)
                    setProviders([...res]);
                }
            }).catch((err)=> {
                console.log({personProvider: err});
                showInfoModal(Lang("app 212.apiErr"));
            }).finally(()=> {
                setLoading(false);
            })
        } else {
            setLoading(false);
        }
    }, [contextOption.net]);

    const openSlot = (item) => {
        item.visitType = item.pc_visit_type == "face" ? "inPerson" : "virtual";
        item.isHistory = true;
        _navigation.navigate('ScheduleAppo', {...item, ..._param}); 
    }

    const openBio = (item)=> {
       _navigation.navigate('ProviderBio', {...item, ..._param});
    }

    const showBio = (item)=> {
        setModalData(getBioLayout(item));
        showBioModal(true);
    }

    const handleAction = (item) => {
        if (_param.notAllow) {
           showBio( item);
        } else {
            openBio(item)
        }
    }

    const getBioLayout = (_data) => {
        return (
            <ScrollView
                style={[
                    commonStyle.bgWhite,
                    commonStyle.brMd,
                    commonStyle.pLg,
                    UI.setWidth(95, '%'),
                    UI.setHeight(UI.height()/2)
                ]}
            >
                {providerBioFileds.map((items, index)=> 
                    <View 
                        key={items.id} 
                        style={[
                            commonStyle.ptLg, 
                            (index == providerBioFileds.length - 1) && UI.setHeight(100)
                        ]}
                    >
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
            </ScrollView>
        )
    }

    const getHeading = (index) => {
        const str = ["personProvider.prevProvider", "personProvider.closestProvider"];
        if (str[index]) {
            return(
                <View style={[commonStyle.vPadLg]}>
                    <MyText
                        theme="orange"
                        title={Lang(str[index])}
                        textProps={{disabled: true}}
                    />
                </View>
            )
        }
        return null;
    }

    const renderHeader = () => {
        return (
            <View style={[UI.setPaddingLeft(10)]}>
                <View style={[UI.setWidth(70, '%'), UI.setHeight(40)]}>
                    <Text 
                        style={[
                            commonStyle.themeHeadingText,
                        ]}
                    >
                        {_param.providerDisable ? Lang('myProvider.allProvider') : Lang('personProvider.pageTitle')}
                    </Text>
                </View>
            </View>
        );
    }

    const  renderListItem = ({ item, index }) => {
        return(
            <View style={[UI.setPadding(1,3,1,3,'%')]}>
                {getHeading(index)}
                {item.providerId == "-1"
                    ?   
                        <View style={[commonStyle.bgWhite, commonStyle.mbmd, commonStyle.pMd]}>
                            <MyText title={Lang("appointment.noMyProvider")} />
                        </View>
                    : 
                        <TouchableOpacity 
                            style={[
                                commonStyle.row,
                                commonStyle.mbmd,
                                commonStyle.pMd,
                                commonStyle.bgWhite
                            ]} 
                            onPress={handleAction.bind(this, item)}
                        >
                            <Image
                                source={{uri: BaseUrl + item.imagePath}}
                                style={[commonStyle.listImg]}
                            />
                            <View style={[commonStyle.flex1, commonStyle.middle]}>
                                <MyText 
                                    title={item.name} 
                                    theme="orange" 
                                    style={[commonStyle.pl]} 
                                    textProps={{disabled: true}} 
                                />
                                <MyText 
                                    title={item.title} 
                                    theme="default" 
                                    textProps={{numberOfLines: 2, disabled: true}}
                                    style={[
                                        commonStyle.pl,
                                        commonStyle.orangeTextBelowIcon,
                                        commonStyle.wrap,
                                        commonStyle.textLineMd
                                    ]} 
                                />
                                <Text 
                                    style={[
                                        commonStyle.orangeTextBelowIcon, 
                                        commonStyle.pl, 
                                        commonStyle.textBlue, 
                                        commonStyle.wrap,
                                        commonStyle.textStyle,
                                        commonStyle.textLineMd
                                    ]}
                                    disabled={true}
                                    numberOfLines={1}
                                >
                                    <Icons
                                        iconSet="entypo"
                                        name="location"
                                        size={15}
                                    />
                                    {"  " + item.facility}
                                </Text>
                            </View>
                        </TouchableOpacity>
                }
            </View>
        )
    }

    const renderListInlineItem = ({ item }) => {
        return(
            <>
                {
                    item.providerId == "-1"
                        ?   null
                        :
                            <Pressable 
                                style={[UI.setWidth(130), commonStyle.center]} 
                                onPress={openSlot.bind(this, item)}
                            >
                                <Image
                                    source={{uri: BaseUrl + item.imagePath}}
                                    style={commonStyle.listImg}
                                />
                                <Text 
                                    style={[
                                        commonStyle.themeOrangeText, 
                                        UI.setFont(15),
                                        commonStyle.pt, 
                                        commonStyle.pl,
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.name} 
                                </Text>
                                <Text 
                                    style={[
                                        UI.setFont(12), 
                                        commonStyle.pl, 
                                        commonStyle.textDark, 
                                        commonStyle.wrap,
                                        commonStyle.textStyle,
                                        commonStyle.textLineMd,
                                        commonStyle.pb
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.title}
                                </Text>
                            </Pressable>
                }
            </>
        )
    }

    const onBlankList = () => {
        return (
            <View style={[!props.inline && UI.setPadding(1,3,1,3,'%')]}>
                <Text style={[UI.setWidth()]}>
                    {Lang("personProvider.noProvider")}
                </Text>
            </View>
        )
    }

    

    const getLayout = () => {
        if (isLoading) {
            return <Loader loading={true} style={[commonStyle.vPadMd]}/>
        }
        if (props.inline) {
            return (
                <View style={[]}>
                    <VirtualizedList
                        initialNumToRender={5}
                        horizontal={true}
                        data={providers}
                        keyExtractor={item => item.providerId}
                        renderItem={renderListInlineItem}
                        ListEmptyComponent={onBlankList}
                        getItemCount={getItemCount}
                        getItem={getItem}
                        style={[]}
                    />
                </View>
            )
        } else {
            return (
                <View style={[commonStyle.themeBg]}>
                    <VirtualizedList
                        data={providers}
                        keyExtractor={item => item.providerId}
                        ListHeaderComponent={renderHeader}
                        renderItem={renderListItem}
                        getItemCount={getItemCount}
                        getItem={getItem}
                        ListEmptyComponent={onBlankList}
                        style={[UI.setMarginTop(10), UI.setPadding(20,10,20,10)]}
                    />
                    <InfoModal 
                        external={modalLayout} 
                        isVisble={bioModal} 
                        onClose={()=> showBioModal(false)}
                    />
                </View>
            )
        }
    }

    return(
        <ChnContext.Consumer>
            {context => getLayout()}
        </ChnContext.Consumer>
    )
}

export default PersonProvider;