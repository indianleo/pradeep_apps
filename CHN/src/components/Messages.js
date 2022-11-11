import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { apiCall } from "../api/apiAction";
import commonStyle from "../css/commonStyle";
import MyButton from "./libs/MyButton";
import MyText from "./libs/MyText";
import Loader from "./Loader";
import ChnContext from "../context/ChnContext";
import MsgEdit from "./MsgEdit";

const Messages = (props)=> {
    const [msgList, setMsgList] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const [popup, setPopup] = React.useState(false);
    const [modalType, setModalType] = React.useState("");
    const [seq, setSeq] = React.useState(1);
    const [currReply, setCurrReply] = React.useState({});
    const [totalPage, setTotalPage] = React.useState(0);
    const [pointer, setPointer] = React.useState(0);
    const maxSeq = 5;
    const contextOptions = React.useContext(ChnContext);

    React.useEffect(()=> {
        getData(seq);
    }, [])

    const getData = (newSeq)=> {
        apiCall("/message-list", {method: "POST"}, {"page": newSeq}).then((res)=> {
            console.log(res);
            setMsgList(res.items);
            setTotalPage(res.totalPage);
            loadNext("firstTime");
            console.log({totalPage: res.totalPage, p: res.totalPage/maxSeq});
        }).catch((err)=> {
            console.log(err);
        }).finally(()=> {
            setLoading(false)
        })
    }

    const onNewMsg = (arg)=> {
        setModalType("new");
        setPopup(true);
    }

    const reply = (arg)=> {
        setCurrReply({...arg});
        setModalType("reply");
        setPopup(true);
    }

    const close = (arg)=> {
        apiCall("/message-closed", {"method": "POST"}, {id: arg.id}).then((res)=> {
            setLoading(true);
            getData(seq);
        }).catch((err)=> {
            console.log(err);
        })
    }

    const onClosePopup = ()=> {
        setPopup(false);
    }

    const renderEmpty = ()=> {
        return (
            <View style={[commonStyle.pLg]}>
                <Loader loading={isLoading} style={[commonStyle.p]}/>
                {isLoading ? null : <Text>{Lang("msg.noMsg")}</Text>}
            </View>
        )
    }

    const renderHeader = ()=> {
        return (
            <View style={[commonStyle.pLg, commonStyle.row, commonStyle.vCenter, commonStyle.alignCorner]}>
                <View style={[commonStyle.row, commonStyle.vCenter]}>
                    <Image
                        source={require("../images/1024x/logo.png")}
                        style={[UI.setScreen(50,50)]}
                    />
                    <MyText title={Lang("msg.pageTitle")} theme="heading" style={[commonStyle.pl]} />
                </View>
                <MyButton
                    theme={true}
                    type="icon"
                    iconName="plus"
                    onPress={onNewMsg}
                    arg={"new"}
                    iconSize={25}
                    style={[commonStyle.ml, commonStyle.themeRevertBg, commonStyle.center, UI.setRound(50)]}
                />
            </View>
        )
    }

    const loadNext = (arg) => {
        let tempSeq = seq;
        switch (arg) {
            case 'next': {
                let part = totalPage/ maxSeq;
                if (pointer < part) setPointer(pointer + 1);
                console.log({part, pointer});
            }
            break;
            case 'pre': {
                if (pointer > 1) setPointer(pointer - 1);
            }
            break;
            case 'firstTime': {
                tempSeq = 1;
            }
            break;
            default: tempSeq = arg;
        }
        setSeq(tempSeq);
        if (arg != 'firstTime') {
            setMsgList([]);
            setLoading(true);
            getData(tempSeq);
        }
        Array.from(Array(maxSeq).keys()).map((item, index)=> console.log(index+ pointer, pointer) );
    }

    const renderFooter = ()=> {
        return (
            <View style={[commonStyle.pLg, commonStyle.row, commonStyle.mblg, commonStyle.hCenter]}>
                {totalPage > maxSeq 
                    ?<MyButton
                        theme={true}
                        type="icon"
                        iconName="step-backward"
                        iconSize={22}
                        onPress={loadNext}
                        arg={"pre"}
                        style={[commonStyle.mr, commonStyle.themeRevertBg, UI.setRound(46)]}
                        disabled={isLoading}
                    />
                    : null
                }
                {Array.from(Array(maxSeq).keys()).map((item, index)=> 
                    <MyButton
                        key={index + pointer}
                        theme={true}
                        title={(index+1) + pointer}
                        onPress={loadNext}
                        arg={index+pointer}
                        style={[commonStyle.mr, commonStyle.themeRevertBg, UI.setRound(46)]}
                        disabled={isLoading}
                    />
                )}
                {totalPage > maxSeq 
                    ?
                    <MyButton
                        theme={true}
                        type="icon"
                        iconName="step-forward"
                        iconSize={22}
                        onPress={loadNext}
                        arg={"next"}
                        style={[commonStyle.themeRevertBg, UI.setRound(46)]}
                        disabled={isLoading}
                    />
                    : null
                }
            </View>
        )
    }

    const getAction = (item, titleStyle) => {
        if (item.msg_status == 'MARKED_DONE' || item.type == "SMS") {
            const str = item.msg_status == 'MARKED_DONE' ? Lang("msg.closed") : Lang("msg.smsSent"); 
            return (
                <MyText
                    type="inLine"
                    title={Lang("msg.actions") + ":"}
                    titleStyle={[...titleStyle]}
                    subTitle={str}
                    style={[commonStyle.pt]}
                    subTitleStyle={[commonStyle.themeNormalText]}
                />
            )
        } else {
            return (
                <View style={[commonStyle.row, commonStyle.vPadMd]}>
                    <MyButton
                        theme={true}
                        title={Lang("msg.reply")}
                        style={[commonStyle.mrsm, UI.setHeight(30)]}
                        arg={item}
                        onPress={reply}
                    />
                    <MyButton
                        theme={true}
                        title={Lang("msg.closed")}
                        onPress={close}
                        style={[UI.setHeight(30)]}
                        arg={item}
                    />
                </View>
            )
        }
    }

    const getMsgHeader = (item)=> {
        const temp = {from: "", to: ""};
        if (item.msg_to == 'PATIENT') {
            temp.to = contextOptions.user.fname + " " + contextOptions.user.lname;
            temp.from = item.user_name || 'SUPPORT';
         } else if (item.msg_from == 'PATIENT') {
            temp.from = contextOptions.user.fname + " " + contextOptions.user.lname;
            temp.to = item.user_name || 'SUPPORT';
         } else {
            temp.from = item.msg_from;
            temp.to =  item.msg_to;
         }

         return temp;
    }

    const renderRow = ({item})=> {
        const titleStyle= [commonStyle.themeText, UI.setWidth(87)];
        const boxStyle = [UI.setBorderBottom(1, "#ccc"), commonStyle.vPadSm];
        const msgHeader = getMsgHeader(item);
        return (
            <View
                style={[
                    commonStyle.pMd,
                ]}
            >
                <View 
                    style={[
                        commonStyle.bgWhite, 
                        commonStyle.pMd, 
                        commonStyle.shadow,
                        item.msg_status == "MARKED_UNREAD" && UI.setBorder(1, "red")
                    ]}
                >
                    <MyText
                        type="inLine"
                        title={Lang("msg.date") + ":"}
                        titleStyle={[...titleStyle]}
                        style={boxStyle}
                        subTitle={item.date}
                        subTitleStyle={[commonStyle.themeNormalText]}
                    />
                    <MyText
                        type="inLine"
                        title={Lang("msg.type") + ":"}
                        titleStyle={[...titleStyle]}
                        style={boxStyle}
                        subTitle={item.type}
                        subTitleStyle={[commonStyle.themeNormalText]}
                    />
                    <MyText
                        type="inLine"
                        title={Lang("msg.status") + ":"}
                        titleStyle={[...titleStyle]}
                        style={boxStyle}
                        subTitle={item.msg_status == 'MARKED_DONE' || item.type == "SMS" ? Lang("msg.closed") : Lang("msg.open")}
                        subTitleStyle={[commonStyle.themeNormalText]}
                    />
                    <MyText
                        type="inLine"
                        title={Lang("msg.from") + ":"}
                        titleStyle={[...titleStyle]}
                        style={boxStyle}
                        subTitle={msgHeader.from}
                        subTitleStyle={[commonStyle.themeNormalText]}
                    />
                    <MyText
                        type="inLine"
                        title={Lang("msg.to") + ":"}
                        titleStyle={[...titleStyle]}
                        style={boxStyle}
                        subTitle={msgHeader.to}
                        subTitleStyle={[commonStyle.themeNormalText]}
                    />
                    <MyText
                        type="inLine"
                        title={Lang("msg.msg") + ":"}
                        titleStyle={[...titleStyle]}
                        style={boxStyle}
                        subTitle={item.message.replace(/(?:\r\n|\r|\n)/g, ' ')}
                        subTitleStyle={[commonStyle.themeNormalText, commonStyle.wrap, commonStyle.flex1]}
                    />
                    {getAction(item, titleStyle)}
                </View>
            </View>
        )
    }

    return (
        <View>
            {popup ? 
                <MsgEdit
                    currReply={currReply}
                    editType={modalType}
                    getMsgHeader={getMsgHeader}
                    onClosePopup={onClosePopup}
                    seq={seq}
                    refreshData={getData}
                />
            : 
                <FlatList
                    data={msgList}
                    keyExtractor={(item)=> item.id}
                    renderItem={renderRow}
                    ListEmptyComponent={renderEmpty}
                    ListFooterComponent={renderFooter}
                    ListHeaderComponent={renderHeader}
                    //stickyHeaderIndices={[0]}
                />
            }
        </View>
    )
}

export default Messages;