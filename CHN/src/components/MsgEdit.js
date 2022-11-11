import React from "react";
import { KeyboardAvoidingView, ScrollView, TextInput, View } from "react-native";
import { apiCall } from "../api/apiAction";
import commonStyle from "../css/commonStyle";
import MyButton from "./libs/MyButton";
import { useKeyboard } from "./libs/MyKeyboard";
import MyText from "./libs/MyText";
import Select from "./libs/Select";
import Loader from "./Loader";

const MsgEdit = (props)=> {
    const [modalType, setModalType] = React.useState("");
    const [_formData, updateFormData] = React.useState({});
    const [currReply, setCurrReply] = React.useState({});
    const [topics, setTopics] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const [info, setStatus] = React.useState({status: 2, msg: "Loading.." });
    const Color = ["#198754", "#198754", "#017BFE", "#DC3444", "#DC3444"];
    /**
     * status code
     * 1: success
     * 2: waiting
     * 3: warning
     * 4: error
     */
    const keyboardHeight = useKeyboard();

    React.useEffect(()=> {
        setStatus({status: 2, msg: "Waiting..."})
        setModalType(props.editType || "");
        setCurrReply(props.currReply || {});
        if (props.editType == "new") {
            apiCall("/topics").then((res)=> {
                let temp = topics;
                for (let key in res) {
                    temp.push({"label": res[key], "value": key})
                }
                setTopics([...temp]);
            }).catch((err)=> {
                console.log({toipcs: err});
                setStatus({status: 4, msg: Lang("msg.apiError")})
            }).finally(()=> {
                setLoading(false);
            })
        } else {
            setLoading(false);
        }
    }, []);

    const sendMsg = ()=> {
        setLoading(true);
        if (modalType == "new") {
            apiCall("/send-message", {method: "POST"}, {"topic": _formData.topic, "message": _formData.message}).then((res)=> {
                console.log(res);
                props.refreshData(props.seq);
                setStatus({status: 1, msg: Lang("msg.msgSent")})
            }).catch((err)=> {
                console.log({sendMsg: err});
                setStatus({status: 4, msg: Lang("msg.errSend")})
            }).finally(()=> {
                setLoading(false);
            })
        } else {
            apiCall("/reply-to-message", {method: "POST"}, {"id": currReply.id, "message": _formData.message}).then((res)=> {
                console.log(res);
                props.refreshData(props.seq);
                setStatus({status: 1, msg: Lang("msg.msgReply")})
            }).catch((err)=> {
                console.log({repy: err});
                setStatus({status: 4, msg: Lang("msg.errReply")})
            }).finally(()=> {
                setLoading(false);
            })
        }
    }

    const onConsent = ()=> {
        props.onClosePopup();
    }

    const getInfo = ()=> {
        return (
            <View style={[commonStyle.pLg]}>
                <View 
                    style={[
                        UI.setBg(Color[info.status]), 
                        commonStyle.flex1, 
                        commonStyle.p,
                        UI.setRadius(3)
                    ]}
                >
                    <MyText
                        style={[commonStyle.textWhite, commonStyle.fs6, commonStyle.textBold]}
                        title={info.msg}
                    />
                </View>
                <MyButton
                    theme={true}
                    title={Lang("app 212.ok")}
                    style={[UI.setScreen(70, 40), commonStyle.mt]}
                    textStyle={[commonStyle.textBold, commonStyle.fs6]}
                    onPress={onConsent}
                />
            </View>
        )
    }

    const handleInput = (input, value)=> {
        updateFormData({..._formData, ...{[input]: value} });
   }

    const layout = ()=> {
        let layout = [];

        switch(modalType) {
            case 'new': {
                layout = (
                    <View 
                        key={"newMsg"} 
                        style={[
                            commonStyle.hPadLg
                        ]}
                    >
                        <View>
                            <MyText
                                title={Lang("msg.msgTopic")}
                                style={[commonStyle.fs5, commonStyle.textBold]}
                            />
                            <Select
                                id={"msgTopic"}
                                onChange={handleInput.bind(this, "topic")}
                                list={topics}
                                selectProps={{
                                    placeholder: {label: "Select"},
                                    value: _formData["topic"]
                                }}
                            />
                        </View>
                        <View style={[commonStyle.ptMd]}>
                            <MyText
                                title={Lang("msg.msgContent")}
                                style={[commonStyle.fs5, commonStyle.textBold]}
                            />
                            <TextInput
                                onChangeText={handleInput.bind(this, "message")}
                                style={[commonStyle.themeTextBox, UI.setHeight(100), commonStyle.textAlignV]}
                                multiline={true}
                            />
                        </View>
                        <View style={[commonStyle.row, commonStyle.ptMd, commonStyle.center]}>
                            <MyButton
                                theme={true}
                                title={Lang("msg.send")}
                                onPress={sendMsg}
                                arg={{type: "new", }}
                                style={[commonStyle.mr, UI.setScreen(80, 35)]}
                                disabled={!_formData.message}
                            />
                            <MyButton
                                title={Lang("msg.cancel")}
                                theme={true}
                                onPress={props.onClosePopup}
                                style={[UI.setScreen(80, 35)]}
                            />
                        </View>
                    </View>
                )
            }
            break;
            case 'reply': {
                const msgHeader = props.getMsgHeader(currReply);
                const titleStyle = [commonStyle.themeText, UI.setWidth(90), commonStyle.fs6, commonStyle.textBold];
                layout = (
                    <View 
                        key={"replyMsg"} 
                        style={[
                            commonStyle.hPadLg,
                        ]}
                    >
                        <View style={[UI.setBg("#ccc"), commonStyle.pLg, UI.setRadius(3)]}>
                            <MyText
                                type="inLine"
                                title={Lang("msg.from") + ":"}
                                titleStyle={titleStyle}
                                subTitle={msgHeader.from}
                                subTitleStyle={[commonStyle.themeNormalText]}
                            />
                            <MyText
                                type="inLine"
                                title={Lang("msg.to") + ":"}
                                titleStyle={titleStyle}
                                subTitle={msgHeader.to}
                                subTitleStyle={[commonStyle.themeNormalText]}
                            />
                            {/* <MyText
                                type="inLine"
                                title="Topic:"
                                titleStyle={titleStyle}
                                subTitle={msgHeader.topic}
                                subTitleStyle={[commonStyle.themeNormalText]}
                            /> */}
                            <MyText
                                type="inLine"
                                title={Lang("msg.msg") + ":"}
                                titleStyle={titleStyle}
                                subTitle={currReply.message}
                                subTitleStyle={[commonStyle.themeNormalText, commonStyle.flex1, commonStyle.wrap]}
                            />
                        </View>
                        <View style={[commonStyle.ptMd]}>
                            <TextInput
                                onChangeText={handleInput.bind(this, "message")}
                                style={[commonStyle.themeTextBox, UI.setHeight(100), commonStyle.textAlignV]}
                                multiline={true}
                                placeholder={Lang("msg.replyHere")}
                            />
                        </View>
                        <View style={[commonStyle.row, commonStyle.ptMd, commonStyle.center]}>
                            <MyButton
                                theme={true}
                                title={Lang("msg.send")}
                                onPress={sendMsg}
                                arg={{type: "reply", }}
                                style={[commonStyle.mr, UI.setScreen(80, 35)]}
                                disabled={!_formData.message}
                            />
                            <MyButton
                                title={Lang("msg.cancel")}
                                theme={true}
                                onPress={props.onClosePopup}
                                style={[UI.setScreen(80, 35)]}
                            />
                        </View>
                    </View>
                )
            }
            break;
        }
        return (
            <View style={[UI.setPaddingBottom(50)]}>
                {layout}
                {
                    isLoading 
                        ?
                            <View 
                                style={[
                                    commonStyle.absolute, 
                                    commonStyle.absoluteCenter,
                                    commonStyle.center,
                                ]}>
                                <Loader loading={isLoading} />
                            </View>
                        :   null
                }
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView 
                style={[
                    commonStyle.vPadMd,
                ]}
            >
                {info.status == 2 ? layout() : getInfo() }
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default MsgEdit;