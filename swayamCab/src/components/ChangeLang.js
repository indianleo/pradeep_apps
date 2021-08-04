import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image,
    TouchableOpacity,  
} from 'react-native';
import commonStyle from '../css/commonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { apiCall, storeData, allowedToken } from '../api/apiAction';
import MyContext from '../context/MyContext';

const ChangeLang = React.forwardRef((props, ref)=> {
    const contextType = React.useContext(MyContext);
    const [modalVisible, updateModal] = React.useState(false);
    const [langList, setLangMenu] = React.useState([
        {
            languageId: "en",
            language: "English"
        },
        {
            languageId: "hi",
            language: "Hindi"
        }
    ]);
    let stateUpdate = true;
    React.useEffect(()=> {
        return ()=> {
            stateUpdate = false;
        }
    }, []);

    const setLang = (lang) => {
        if (UI.isValid(lang)) {
            if (lang.length > 2) {
                console.log("Wrong langCode. It showul be in 2 char", lang);
            }
            if (props.setLang) {
                Lang("", lang);
                contextType.updateState("lang", lang);
                props.setLang?.(true);
            }
        }
    }

    React.useImperativeHandle(ref, ()=> ({
        showLangModal: ()=> {
            updateModal(true);
        }
    }) );

    return(
        <MyContext.Consumer>
            {context => (
                <View>
                    <Image
                        source={require('../images/icon.png')}
                        style={[
                            commonStyle.absolute,
                            commonStyle.imgContain,
                            UI.setTop(-20),
                            UI.setScreen(100, 20, "%")
                        ]}
                    />
                    <View style={[commonStyle.center, UI.setHeight(100, '%')]}>
                        <View style={[UI.setHeight(20, '%')]}>
                            {langList.map((item)=>
                                <TouchableOpacity 
                                    key={item.languageId}
                                    onPress={setLang.bind(this, item.languageId)}
                                    style={[
                                        UI.setHeight(60), 
                                        UI.setWidth(300), 
                                        commonStyle.btnSky,
                                        commonStyle.center,
                                        commonStyle.br,
                                        commonStyle.mbmd,
                                    ]}
                                >
                                    <Text style={[commonStyle.textWhite, commonStyle.orangeFontSize]}>
                                        {item.language}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            )}
        </MyContext.Consumer>
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