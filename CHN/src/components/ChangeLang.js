import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ImageBackground,
    TouchableOpacity, 
    Modal 
} from 'react-native';
import commonStyle from '../css/commonStyle';
import ChnContext from '../context/ChnContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { apiCall, storeData, allowedToken } from '../api/apiAction';
import ShowError from './ShowError';
import Loader from './Loader';

const ChangeLang = React.forwardRef((props, ref)=> {
    const contextType = React.useContext(ChnContext);
    const [modalVisible, updateModal] = React.useState(false);
    const [langList, setLangMenu] = React.useState([]);
    const [errObj, setError] = React.useState({});
    const [isLoading, setLoading] = React.useState(false);
    let stateUpdate = true;
    React.useEffect(()=> {
        if (props.callApi) {
            setLoading(true);
            apiCall(`/languages?isActive=1&${allowedToken}`, 
                {
                    headers: {"Content-Type": "application/json"}
                }
            ).then((res)=> {
                //console.log({res})
                if (stateUpdate && !res['error']) {
                    setLangMenu(res);
                    setLoading(false);
                }
            }).catch((err)=> {
                console.log({changeLang: err})
                //setError(UI.createError(JSON.stringify(err)));
                stateUpdate && setLoading(false);
            })
        }
        return ()=> {
            stateUpdate = false;
        }
    }, []);

    const setLang = (lang) => {
        if (UI.isValid(lang)) {
            if (lang.length > 2) {
                console.log("Wrong langCode. It should be in 2 char", lang);
            }
            storeData("appLangCode", {lang});
            UI.setData("langId", lang);
            setLoading(true);
            console.log({lang});
            if (props.setLang) {
                Lang("", lang);
                contextType.updateState("lang", lang);
                props.setLang?.(lang);
                props.modalView && updateModal(false);
            } else {
                apiCall(`/page-labels-keyVal/${lang}/null?${allowedToken}`).then((pages)=> {
                    if (pages.labels) {
                        storeData("appLangJson", pages.labels);
                        UI.setData('langId', lang);
                        Lang("", "reload", pages.labels);
                        contextType.updateState("lang", lang);
                        setLoading(false);
                        props.modalView && updateModal(false);
                    }
                }).catch((err)=> {
                    console.log({"labelsApi": err});
                    setLoading(false);
                    props.modalView && updateModal(false);
                    showInfoModal();
                });
            }
        }
    }

    React.useImperativeHandle(ref, ()=> ({
        showLangModal: ()=> {
            updateModal(true);
        }
    }) );

    if (props.modalView) {
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                statusBarTranslucent={true}
                onRequestClose={() => {
                    updateModal(false);
                }}
            >
                <View style={[style.centeredView, UI.setWidth()]}>
                    <View style={[style.modalView, UI.setWidth(100, '%')]}>
                        {isLoading 
                            ? <Loader loading={isLoading} style={[commonStyle.pbMd]}/>
                            :
                                <TouchableOpacity
                                    style={[
                                        UI.setHeight(40), 
                                        UI.setWidth(100, '%'),
                                        commonStyle.center,
                                        commonStyle.br,
                                        commonStyle.mbmd,
                                        UI.setMarginTop(-25),
                                        UI.setBorderBottom(1, '#ccc')
                                    ]}
                                    onPress={() => updateModal(false)}
                                >
                                    <Icon
                                        name={"chevron-down"}
                                        size={25}
                                    />
                                </TouchableOpacity>
                        }
                        <View>
                            {langList.map((item)=> {
                                return(item.isActive == 1
                                        ?
                                        <TouchableOpacity 
                                            key={item.languageId}
                                            onPress={setLang.bind(this, item.languageId)}
                                            style={[
                                                UI.setHeight(60), 
                                                UI.setWidth(300), 
                                                commonStyle.center,
                                                commonStyle.br,
                                                commonStyle.mbmd,
                                                UI.setBg('#e36c1e')
                                            ]}
                                        >
                                            <Text style={[commonStyle.textWhite, commonStyle.orangeFontSize]}>
                                                {item.language}
                                            </Text>
                                        </TouchableOpacity>
                                    : null)
                                }
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
    return(
        <ChnContext.Consumer>
            {context => (
                <ImageBackground 
                    source={require('../images/logo-icon.png')}
                    style={[UI.setWidth(100, '%'), UI.setHeight(100, '%'), commonStyle.bgWhite]}
                    imageStyle={[
                        commonStyle.imgContain,
                        UI.setScreen(20,20, '%'),
                        UI.setLeft(10, '%')
                    ]}
                >
                    
                    <View style={[commonStyle.center, UI.setHeight(100, '%')]}>
                        <View style={[UI.setHeight(50, '%')]}>
                            <Loader loading={isLoading} />
                            {langList.map((item)=> (
                                    item.isActive == 1
                                        ? 
                                            <TouchableOpacity 
                                                key={item.languageId}
                                                onPress={setLang.bind(this, item.languageId)}
                                                style={[
                                                    UI.setHeight(60), 
                                                    UI.setWidth(300), 
                                                    commonStyle.center,
                                                    commonStyle.br,
                                                    commonStyle.mbmd,
                                                    UI.setBg('#e36c1e')
                                                ]}
                                            >
                                                <Text style={[commonStyle.textWhite, commonStyle.orangeFontSize]}>
                                                    {item.language}
                                                </Text>
                                            </TouchableOpacity>
                                        : null
                                )
                            )}
                        </View>
                        <ShowError data={errObj} type="reqInfo" />
                    </View>
                </ImageBackground>
            )}
        </ChnContext.Consumer>
    )
});
const style = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        //margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

export default ChangeLang;