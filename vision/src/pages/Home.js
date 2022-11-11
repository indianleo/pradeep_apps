import { useNavigation } from '@react-navigation/native';
import React from 'react'
import {View, TextInput} from 'react-native';
import { UI } from '../config/theme';
import { bgColor } from '../css/colors';
import commonStyle from '../css/commonStyle';
import { MyButton, MyText } from '../libs';

export default function () {
    const _nav = useNavigation();
    const [roomCode, setCode] = React.useState("");
    const LENGTH = 6;

    const handleStr = React.useCallback((code)=> {
        setCode(code);
    }, [])

    // Generating random room id for the initiating peer
    const generateID = () => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < LENGTH; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const joinRoom = ()=> {
        if (roomCode != "") {
            _nav.navigate("Chat", { roomID: roomCode });
        }
    }

    const createRoom = ()=> {
        // Make a new room ID
    	const room = generateID();
    	console.log(room); // Share this room id to another peer in order to join in the same room
    	setCode(room);
        _nav.navigate('Chat', { roomID: room });
    }

    return (
        <View style={[commonStyle.pLg, commonStyle.bgWhite]}>
            <View>
                <TextInput
                    onChangeText={handleStr}
                    value={roomCode}
                    style={[
                        UI.setPaddingAll(10),
                        commonStyle.themeTextBox
                    ]}
                />
            </View>
            <View style={[commonStyle.ptLg]}>
                <MyButton
                    theme="orange"
                    title="Join Room"
                    onPress={joinRoom}
                    disabled={!roomCode}
                    style={[
                        UI.setHeight(40),
                        UI.setWidth(100, '%'),
                        commonStyle.mb,
                        UI.setBg(bgColor.blue)
                    ]}
                />
                <MyButton
                    theme="orange"
                    title="Create Room"
                    onPress={createRoom}
                    style={[
                        UI.setHeight(40),
                        UI.setWidth(100, '%'),
                        UI.setBg(bgColor.blue)
                    ]}
                />
                <MyText
                    title="Don't have room ID?"
                    style={[commonStyle.textCenter, commonStyle.mt]}
                />
            </View>
        </View>
    )
}