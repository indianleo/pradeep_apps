import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Icons = (props)=> {
    const getIcon = ()=> {
        const iconProps = {name: props.name, size: props.size, style: props.style};
        switch(props.iconSet) {
            case 'antDesign': 
                return <AntDesign {...iconProps} />
            case 'entypo': 
                return <Entypo {...iconProps} />
            case 'evilIcons':
                return <EvilIcons {...iconProps} />
            case 'feather':
                return <Feather {...iconProps} />
            case 'materialCommunityIcons':
            case 'materialComIcons': return <MaterialCommunityIcons {...iconProps} />
            case 'materialIcons':
                return <MaterialIcons {...iconProps} />
            case 'ionicons':
                return <Ionicons {...iconProps} />
            case 'foundation':
                return <Foundation {...iconProps} />
            case 'fontisto':
                return <Fontisto {...iconProps} />
            default :
                return <Icon {...iconProps} />
        }
    }
    return getIcon();
}

export default Icons;