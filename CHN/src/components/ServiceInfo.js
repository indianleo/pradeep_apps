import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
import { BaseUrl } from '../api/apiAction';
import MyText from './libs/MyText';

const ServiceInfo = (props)=> {
    const [infoData, setInfo] = React.useState({});
    const [isLoading, setLoader] = React.useState(true);
    const contextOption = React.useContext(ChnContext);

    React.useEffect(()=> {
        setInfo( props.route.params );
        setLoader(false);
    }, [contextOption.net])
    
    const makeAppointment = ()=> {
        props.navigation.navigate('MakeAppointment', {visitInfo: "new"})
    }

    const getInfo = React.useCallback((item) => {
        return(
            <View>
                <MyText title={item.contentHeading} style={[UI.setFont(17)]} />
                <MyText title={item.description} style={UI.setFont(15)} />
            </View>
        )
    }, [])
    
    return(
        <ChnContext.Consumer>
            {context =>
                <ScrollView>
                    {isLoading ? <ActivityIndicator size="small" color="#0000ff" />
                    :   <>
                            <View style={[UI.setPadding(5,5,5,5, '%')]}>
                                <MyText 
                                    theme="heading"
                                    title={infoData.isStatic ? Lang(infoData.serviceName) : infoData.serviceName}
                                />
                                <View>
                                    <Image
                                        source={
                                            infoData.isStatic ? infoData.largeImagePath
                                                  : {uri: BaseUrl + infoData.largeImagePath}
                                            }
                                        style={[
                                            context.portrait ? commonStyle.imgCover : commonStyle.imgContain,
                                            UI.setHeight( (context.portrait ? UI.height() : UI.width() ) * .4 ),
                                            UI.setWidth(100, '%'),
                                        ]}
                                    />
                                </View>
                            </View>
                            <View style={[UI.setPadding(5,5,5,5, '%')]}>
                                <MyText 
                                    theme="orange"
                                    title={infoData.heading} 
                                    nestedTitle={":"}
                                />
                                {getInfo(infoData)}
                            </View>
                        </>
                    }
                    {/*context.isLogined 
                        ?
                            <View 
                                style={[
                                    commonStyle.vCenter, 
                                    commonStyle.mtmd, 
                                    commonStyle.mblg
                                ]}
                            >
                                <TouchableOpacity 
                                    onPress={makeAppointment}
                                    style={[
                                        UI.setWidth(93, '%'), 
                                        commonStyle.bgOrange, 
                                        commonStyle.middle,
                                        commonStyle.br,
                                        UI.setPaddingAll(20)
                                    ]}
                                >
                                    <Text 
                                        style={[
                                            commonStyle.textCenter, 
                                            commonStyle.backFontSize, 
                                            commonStyle.textWhite, 
                                            commonStyle.textLightBold,
                                            commonStyle.textStyle
                                        ]}
                                    >
                                        {Lang('services.appoint')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        : null
                    */}
                </ScrollView>
            }
        </ChnContext.Consumer>
    )
}

export default ServiceInfo;