import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import css from '../css';
import MyButton from '../components/libs/MyButton';

const HeaderLeft = (props) => {
    const onBack = ()=> {
        props.navigation.goBack(null);
    }

    const checkBack = () => {
        return props.route.name != "Home";
    }

    const toggleDrawer = () => {
        if (props.drawerState) {
            props.closeDrawer()
        } else {
            props.openDrawer();
        }
    }

    return(
        <View style={[css.row, css.center]}>
           { checkBack() ? 
                <MyButton 
                    type="icon"
                    iconName="chevron-left"
                    iconSet="Feather"
                    iconSize={18}
                    iconStyle={[css.textWhite]}
                    style={[css.pl, css.prMd]}
                    onPress={onBack} 
                /> 
                : null
            }
           <TouchableOpacity onPress={toggleDrawer} style={[css.headerBtn]}>
                <Icon name="menu" style={[css.textWhite]} size={18} />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderLeft;