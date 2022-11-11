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
        switch(props.iconSet) {
            case 'AntDesign': 
                return (
                    <AntDesign 
                        name={props.name}
                        size={props.size}
                        style={props.style}
                    />
                )
            case 'Entypo': 
                return (
                    <Entypo 
                        name={props.name}
                        size={props.size}
                        style={props.style}
                    />
                )
            case 'EvilIcons':
                return (
                    <EvilIcons 
                        name={props.name}
                        size={props.size}
                        style={props.style}
                    />
                )
            case 'Feather':
                return (
                    <Feather 
                        name={props.name}
                        size={props.size}
                        style={props.style}
                    />
                )
            case 'MaterialComIcons':
                return (
                    <MaterialCommunityIcons 
                        name={props.name}
                        size={props.size}
                        style={props.style}
                    />
                )
            case 'MaterialIcons':
                return (
                    <MaterialIcons 
                        name={props.name}
                        size={props.size}
                        style={props.style}
                    />
                )
            case 'Ionicons':
                return (
                    <Ionicons 
                        name={props.name}
                        size={props.size}
                        style={props.style}
                    />
                )
            case 'Foundation':
                return (
                    <Foundation 
                        name={props.name}
                        size={props.size}
                        style={props.style}
                    />
                )
            case 'fontisto':
                return (
                    <Fontisto 
                        name={props.name}
                        size={props.size}
                        style={props.style}
                    />
                )
            default :
                return (
                    <Icon 
                        name={props.name}
                        size={props.size}
                        style={props.style}
                    />
                )
        }
    }
    return getIcon();
}

export default Icons;