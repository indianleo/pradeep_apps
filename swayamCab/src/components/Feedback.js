import React from 'react';
import { View, Text, TextInput} from 'react-native';
import { pushDb } from '../config/myConfig';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import MyButton from '../libs/MyButton';

const Feedback = (props) => {
    const [msg, setMsg] = React.useState("");
    const contextOption = React.useContext(MyContext);

    const sendFeedback = () => {
        pushDb(`/feedbacks`, {user: contextOption.userId, msg}).then(()=> {
            showInfoModal("Feedback submitted");
        })
    }

    return(
        <View style={[UI.setPadding(5,5,5,5, '%')]}>
            <View>
                <Text style={[commonStyle.themeHeadingText, commonStyle.pbMd]}>
                    {Lang("feed.enterMsg")}:
                </Text>
                <TextInput
                    multiline={true}
                    style={[UI.setHeight(100), commonStyle.themeTextBox]}
                    onChangeText={(str)=> setMsg(str)}
                />
            </View>
            <View style={[commonStyle.center, commonStyle.ptLg]}>
                <MyButton
                    theme={true}
                    title={Lang("feed.submit")}
                    style={[UI.setHeight(40)]}
                    onPress={sendFeedback}
                />
            </View>
        </View>
    )
}

export default Feedback;