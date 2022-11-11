import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { apiCall, storeData,getStoreData, allowedToken } from '../api/apiAction';
import MyButton from '../components/libs/MyButton';
import Loader from '../components/Loader';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
const HeaderRight = (props) => {
    const [isLoading, setLoading] = React.useState(false);
    const contextOptions = React.useContext(ChnContext);

    const handleNotification = ()=> {
        //updateModal(!modalVisible);
    }

    React.useEffect(()=> {
        getStoreData("appLangCode").then((langCode)=> {
            if (UI.isValid(langCode)) contextOptions.updateState("lang", langCode.lang);
        });
    }, [])

    const test = () => {
        getStoreData("deviceToken").then((res)=> {
            showInfoModal(res.token);
        }).catch((err)=> {
            console.log("Error in device token", err);
        })
    }

    const syncApp = ()=> {
        setLoading(true);
        if (!UI.isValid(contextOptions.lang)) {
            showInfoModal("app 212.noLang");
        }
        apiCall(`/page-labels-keyVal/${contextOptions.lang}/null?${allowedToken}`).then((pages)=> {
            if (pages.labels) {
                storeData("appLangJson", pages.labels);
                Lang(contextOptions.lang, "reload", pages.labels);
                contextOptions.updateState("lang", contextOptions.lang);
            }
            setLoading(false);
        }).catch((err)=> {
            setLoading(false);
            console.log({err, "area": "syncApp"});
            showInfoModal();
        });
    }

    const openProfile = () => {
        props.navigation.navigate("Profile");
    }

    return(
        <View style={[commonStyle.row]}>
            {/* <TouchableOpacity onPress={handleNotification} style={[commonStyle.headerBtn]}>
                <Icon name="bell-o" style={[commonStyle.themeBtnText]} size={18} />
            </TouchableOpacity> */}
            <MyButton
                type="icon"
                iconName="refresh"
                iconSize={18}
                iconStyle={[commonStyle.themeBtnText]}
                onPress={syncApp}
                style={[commonStyle.headerBtn]}
            />
            <MyButton
                type="icon"
                iconSet="antDesign"
                iconName="contacts"
                iconSize={20}
                iconStyle={[commonStyle.themeBtnText]}
                onPress={openProfile}
                style={[commonStyle.headerBtn]}
            />
            {/* <MyButton
                type="icon"
                iconName="bug-report"
                iconSet="materialIcons"
                iconSize={18}
                iconStyle={[commonStyle.themeBtnText]}
                onPress={test}
                style={[commonStyle.headerBtn]}
            /> */}
            <Loader fullScreen={true} loading={isLoading} />
        </View>
    )
}
export default HeaderRight;