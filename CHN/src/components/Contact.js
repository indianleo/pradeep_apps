import React, {useState} from 'react';
import {
    View, 
    Text, 
    TextInput, 
    ScrollView, 
    TouchableOpacity, 
    Image
} from 'react-native';
import { apiCall, goHome } from '../api/apiAction';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
import ShowError from './ShowError';
import Loader from './Loader';
import ErrorZone from './libs/ErrorZone';
import Select from './libs/Select';
const Contact = (props)=> {
    const [formObj, setForm] = useState({"msg_id": ""});
    const [labels, setLabels] = useState([]);
    const [errObj, setError] = React.useState({});
    const [isLoading, setLoading] = React.useState(false);
    const [isNetError, setNetError] = React.useState(false);

    React.useEffect(()=> {
        getData();
    }, []);

    const getData = () => {
        setLoading(true);
        apiCall("/contactus-subject").then((res)=> {
            let temp = [];
            for(let key in res) {
                temp.push({
                    label: res[key],
                    value: key,
                    "color": "black"
                })
            }
            setLabels([...temp]);
            setLoading(false);
        }).catch((err)=> {
            console.log(err);
            setNetError(true);
        })
    }

    const handleInput = (type, value)=> {
        setForm({...formObj, ...{[type]: value}});
    }

    const handleMessage = (text) => {
        handleInput("content", text);
    }

    const onTopicSelect = (itemValue) => {
        handleInput("topic", itemValue);
    }

    const onSubmit = ()=> {
        setLoading(true);
        apiCall("/contactus", {method: "POST"}, formObj).then((res)=> {
            if (res.status) {
                showInfoModal({title: res.success, onOk:()=> goHome(props.navigation) });
            } else if (res.error) {
                if (typeof res.error == "string") {
                    showInfoModal(res.error);
                } else {
                    setError(UI.createError(res));
                }
                setLoading(false);
            }
        }).catch((err)=> {
            showInfoModal();
        })
    }

    if (isNetError) {
        return (
            <ErrorZone onClose={()=> setNetError(false)} tryAgain={getData} />
        )
    } 

    return(
        <ChnContext.Consumer>
            {context => (
                <ScrollView style={[commonStyle.themeBg, UI.setPadding(20,30,20,30)]} >
                    <View>
                        <Text 
                            style={[
                                commonStyle.themeHeadingText,
                            ]}
                        >
                            {Lang('contact.title')}
                        </Text>
                    </View>
                    <Loader loading={isLoading} style={[commonStyle.pLg]} />
                    <View style={[commonStyle.ptLg, commonStyle.pb,]}>
                        <Text 
                            style={[
                                commonStyle.pb, 
                                commonStyle.themeOrangeText, 
                            ]}
                        >
                            {Lang("contact.topic")}
                        </Text>
                    </View>
                    <Select
                        onChange={onTopicSelect}
                        list={labels}
                        style={[commonStyle.flex1]}
                    />
                    <ShowError data={errObj} type="topic" />
                    <View style={[commonStyle.ptLg, commonStyle.pb,]}>
                        <Text style={[commonStyle.themeOrangeText]}>
                            {Lang('app 212.phone')}
                        </Text>
                    </View>
                    <View>
                        <TextInput
                            onChangeText={(str)=> handleInput("contact_number", str)}
                            keyboardType={"number-pad"}
                            style={[
                                commonStyle.themeTextBox,
                                commonStyle.bgWhite,
                                UI.setHeight(50),
                            ]}
                        />
                        <ShowError data={errObj} type="phone" />
                    </View>
                    <View style={[commonStyle.ptLg, commonStyle.pb,]}>
                        <Text style={[commonStyle.themeOrangeText]}>
                            {Lang('app 212.message')}
                        </Text>
                    </View>
                    <View>
                        <TextInput
                            onChangeText={handleMessage}
                            multiline={true}
                            textAlignVertical='top'
                            style={[
                                commonStyle.themeTextBox,
                                commonStyle.bgWhite,
                                UI.setHeight(100),
                            ]}
                        />
                        <ShowError data={errObj} type="content" />
                    </View>
                    <View style={[commonStyle.vPadLg]}>
                        <TouchableOpacity 
                            style={[commonStyle.btnOrange, UI.setHeight(40)]} 
                            onPress={onSubmit}
                        >
                            <Text 
                                style={[
                                    commonStyle.backFontSize, 
                                    commonStyle.themeNormalText,
                                    commonStyle.textWhite
                                ]}
                            >
                                {Lang("app 212.submit")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ShowError data={errObj} type="reqInfo" />
                </ScrollView>
            )}
        </ChnContext.Consumer>
    )
}

export default Contact;