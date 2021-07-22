import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyle from '../css/commonStyle';

const HeaderLeft = (props) => {
    const onBack = ()=> {
        props.navigation.goBack(null);
    }

    const checkBack = () => {
        if (props.route.name == "Home") {
            return false;
        }
        return true;
    }
    const toggleDrawer = () => {
        if (props.drawerState) {
            props.closeDrawer()
        } else {
            props.openDrawer();
        }
    }
    
    return(
        <View style={[commonStyle.row, commonStyle.center]}>
           { checkBack() ? <HeaderBackButton tintColor={'white'} onPress={onBack} /> : null}
           <TouchableOpacity onPress={toggleDrawer}>
                <Icon name="menu" style={[commonStyle.textWhite, commonStyle.plMd]} size={18} />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderLeft;