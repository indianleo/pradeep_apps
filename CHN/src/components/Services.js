import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import ChnContext from '../context/ChnContext';
import commonStyle  from '../css/commonStyle';
import { apiCall, BaseUrl } from '../api/apiAction';
import MyButton from './libs/MyButton';
import Loader from './Loader';

const Services = (props)=> {
    const [isLoading, setLoader] = React.useState(true);
    const [list, setList] = React.useState([]);
    const contextOption = React.useContext(ChnContext);
    const isStatic = false;
    React.useEffect(()=> {
        if (isStatic) {
            setList([..._list]);
            setLoader(false);
        } else {
            apiCall('/services?isActive=1').then((res)=> {
                //console.log(res);
                setList([...res]);
                setLoader(false);
            }).catch((apiCallError)=> {
                setLoader(false);
                console.log({apiCallError});
                showInfoModal();
            })
        }
        
    }, [contextOption.net]);
    
    const _list = [
        {
            serviceId: 1,
            iconImagePath: require('../images/1024x/virtual-service.png'),
            largeImagePath: require('../images/Virtual_Illustr-01.png'),
            serviceName: 'services.vs',
            heading: "Virtual Service",
            description: [
                {
                    contentHeading: "We work with our schedule. Get a same-day appointment today or book preventive exam in future. This service include:",
                    serviceList: [
                        "Men's annual exam",
                        "Prostate checkup",
                        "Immunization",
                        "Diabetes, Cholesterol, Hypertension and more",
                        "Depression",
                        "Substance abuse"
                    ]
                }
            ]
        },
        {
            serviceId: 2,
            iconImagePath: require('../images/1024x/gyn.png'),
            largeImagePath: require("../images/Women's.png"),
            serviceName: 'services.obGyn',
            heading: "OB/GYN Service",
            description: [
                {
                    contentHeading: "We work with our schedule. Get a same-day appointment today or book preventive exam in future. This service include:",
                    serviceList: [
                        "Men's annual exam",
                        "Prostate checkup",
                        "Immunization",
                        "Diabetes, Cholesterol, Hypertension and more",
                        "Depression",
                        "Substance abuse"
                    ]
                }
            ]
        },
        {
            serviceId: 3,
            iconImagePath: require('../images/1024x/mens-health.png'),
            largeImagePath: require("../images/Men's.png"),
            serviceName: "services.menHealth",
            heading: "Men's Health Service",
            description: [
                {
                    contentHeading: "We work with our schedule. Get a same-day appointment today or book preventive exam in future. This service include:",
                    serviceList: [
                        "Men's annual exam",
                        "Prostate checkup",
                        "Immunization",
                        "Diabetes, Cholesterol, Hypertension and more",
                        "Depression",
                        "Substance abuse"
                    ]
                }
            ],
        },
        {
            serviceId: 4,
            iconImagePath: require('../images/1024x/pedriatic.png'),
            largeImagePath: require('../images/Pediatrics.png'),
            serviceName: 'services.pd',
            heading: "Pediatrics Service",
            description: [
                {
                    contentHeading: "We work with our schedule. Get a same-day appointment today or book preventive exam in future. This service include:",
                    serviceList: [
                        "Men's annual exam",
                        "Prostate checkup",
                        "Immunization",
                        "Diabetes, Cholesterol, Hypertension and more",
                        "Depression",
                        "Substance abuse"
                    ]
                }
            ]
        },
        {
            serviceId: 5,
            iconImagePath: require('../images/1024x/mental-health.png'),
            largeImagePath: require('../images/Ed_Mental.png'),
            serviceName: 'services.mentalHealth',
            heading: "Mental Health Service",
            description: [
                {
                    contentHeading: "We work with our schedule. Get a same-day appointment today or book preventive exam in future. This service include:",
                    serviceList: [
                        "Men's annual exam",
                        "Prostate checkup",
                        "Immunization",
                        "Diabetes, Cholesterol, Hypertension and more",
                        "Depression",
                        "Substance abuse"
                    ]
                }
            ]
        },
        {
            serviceId: 6,
            iconImagePath: require('../images/1024x/pharmacy.png'),
            largeImagePath: require('../images/Pharmacy.png'),
            serviceName: 'services.ph',
            heading: "Pharmacy Service",
            description: [
                {
                    contentHeading: "We work with our schedule. Get a same-day appointment today or book preventive exam in future. This service include:",
                    serviceList: [
                        "Men's annual exam",
                        "Prostate checkup",
                        "Immunization",
                        "Diabetes, Cholesterol, Hypertension and more",
                        "Depression",
                        "Substance abuse"
                    ]
                }
            ]
        },
        {
            serviceId: 7,
            iconImagePath: require('../images/1024x/dental.png'),
            largeImagePath: require('../images/Dental-info.png'),
            serviceName: 'services.dental',
            heading: "Dental Service",
            description: [
                {
                    contentHeading: "We work with our schedule. Get a same-day appointment today or book preventive exam in future. This service include:",
                    serviceList: [
                        "Men's annual exam",
                        "Prostate checkup",
                        "Immunization",
                        "Diabetes, Cholesterol, Hypertension and more",
                        "Depression",
                        "Substance abuse"
                    ]
                }
            ]
        },
        {
            serviceId: 8,
            iconImagePath: require('../images/1024x/care-managment.png'),
            largeImagePath: require('../images/careManage_bg.png'),
            serviceName: 'services.cm',
            heading: "Care Management Service",
            description: [
                {
                    contentHeading: "We work with our schedule. Get a same-day appointment today or book preventive exam in future. This service include:",
                    serviceList: [
                        "Men's annual exam",
                        "Prostate checkup",
                        "Immunization",
                        "Diabetes, Cholesterol, Hypertension and more",
                        "Depression",
                        "Substance abuse"
                    ]
                }
            ]
        },
        {
            serviceId: 9,
            iconImagePath: require('../images/1024x/services.png'),
            largeImagePath: require('../images/primaryCare_bg.png'),
            serviceName: 'services.pc',
            heading: "Primary Care Service",
            description: [
                {
                    contentHeading: "We work with our schedule. Get a same-day appointment today or book preventive exam in future. This service include:",
                    serviceList: [
                        "Men's annual exam",
                        "Prostate checkup",
                        "Immunization",
                        "Diabetes, Cholesterol, Hypertension and more",
                        "Depression",
                        "Substance abuse"
                    ]
                }
            ]
        },
    ];

    const onTouchService = (item) => {
        props.navigation.navigate("ServiceInfo", {...item, ...{isStatic}});
    };

    const makeAppointment = ()=> {
        props.navigation.navigate('MakeAppointment', {visitInfo: "new"})
    }

    const loadServiceLayout = () => {
        return (
            <View style={[commonStyle.row, commonStyle.wrap]}>
                {list.map((item)=> 
                    <TouchableOpacity
                        key={item.serviceId} 
                        onPress={onTouchService.bind(this, item)}
                        style={[ 
                            UI.setWidth(33, '%'), 
                            UI.setHeight(155),
                            commonStyle.vCenter, 
                            commonStyle.pbLg,
                        ]}
                    >
                        <Image
                            source={isStatic ? item.iconImagePath: {uri: BaseUrl + item.iconImagePath}}
                            style={[UI.setScreen(100,100)]}
                        />
                        <View style={[commonStyle.center, UI.setHeight(40)]}>
                            <Text 
                                style={[
                                    commonStyle.orangeTextBelowIcon, 
                                    commonStyle.textCenter, 
                                    commonStyle.textOrange, 
                                    commonStyle.textLightBold,
                                    commonStyle.textStyle
                                ]}
                            >
                                {isStatic ? Lang(item.serviceName) :item.serviceName}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        )
    }
    
    return(
        <ChnContext.Consumer>
            {context => (
                <ScrollView style={[commonStyle.themeBg, UI.setPadding(5,8,5,8, '%')]}>
                    <View 
                        style={[
                            commonStyle.pbMd
                        ]}
                    >
                       <Text style={[commonStyle.themeHeadingText]}>
                            {Lang('services.title')}
                        </Text>
                        
                    </View>
                    <View style={[commonStyle.vCenter, commonStyle.mt]}>
                        <Loader loading={isLoading} />
                        {loadServiceLayout()}
                    </View>
                    {/* context.isLogined
                        ?
                            <View style={[commonStyle.vCenter, commonStyle.mtmd, commonStyle.mblg]}>
                                <MyButton
                                    theme={true}
                                    title={Lang('services.appoint')}
                                    style={[UI.setWidth(100, '%'), UI.setHeight(50)]}
                                    textStyle={[commonStyle.backFontSize]}
                                    onPress={makeAppointment}
                                />
                            </View>
                        : null
                    */}
                </ScrollView>
            )}
        </ChnContext.Consumer>
    )
}

export default Services;