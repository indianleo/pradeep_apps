import React from "react";
import {View, Text, Image, VirtualizedList, TextInput} from 'react-native';
import { apiCall, storeData } from "../api/apiAction";
import { getItem, getItemCount } from "../config/chnConfig";
import ChnContext from "../context/ChnContext";
import commonStyle from "../css/commonStyle";
import ChangeLang from "./ChangeLang";
import InfoModal from "./InfoModal";
import MyButton from "./libs/MyButton";
import MyText from './libs/MyText';
import Loader from "./Loader";
const Profile = (props)=> {
    const contextOptions = React.useContext(ChnContext);
    const [_visibleModal, showModal] = React.useState(false);
    const [_layoutName, setLayout] = React.useState("");
    const [_editData, setEdit] = React.useState({
        "phone_home": contextOptions.user?.phone_home,
        "phone_cell": contextOptions.user?.phone_cell
    });
    const [showEdit, setEditShow] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    let langModal = React.useRef();
    const address = `${contextOptions.user?.street} ${contextOptions.user?.postal_code} ${contextOptions.user?.city} ${contextOptions.user?.state} ${contextOptions.user?.country_code}`
    const _list = [
        {
            id: 4,
            label: Lang("app 212.email"),
            type: "inf",
            value: contextOptions.user?.email,
            arg: "email",
        },
        {
            id: 5,
            label: Lang("profile.mo"),
            type: "inf",
            value: contextOptions.user?.phone_cell,
            arg: "phone_cell",
        },
        {
            id: 6,
            label: Lang("profile.housePhone"),
            type: "inf",
            value: contextOptions.user?.phone_home,
            arg: "housePhone",
        },
        {
            id: 7,
            label: Lang("profile.prePharmacy"),
            type: "inf",
            value: "",
            arg: "prePharmacy",
        },
        {
            id: 8,
            label: Lang("profile.primaryAddress"),
            type: "inf",
            value: address,
            arg: "primaryAddress",
        },
    ];
    const settingList = [
        {
            id: 1,
            label: Lang('account.noti'),
            iconName: "notifications",
            iconType: "ionicons",
            page: "Noti",
            arg: "noti",
        },
        {
            id: 2,
            label: Lang('account.fId'),
            iconName: "finger-print",
            iconType: "ionicons",
            page: "Fid",
            arg: "fId",
        },
        {
            id: 3,
            label: Lang("profile.pInf"),
            iconName: "information-circle",
            iconType: "ionicons",
            page: "Fid",
            arg: "pInf",
        },
        {
            id: 4,
            label: "Set Language",
            iconName: "language",
            iconType: "entypo",
            page: "Fid",
            arg: "setLang",
        },
        {
            id: 5,
            label: "Edit Profile",
            iconName: "language",
            iconType: "entypo",
            page: "",
            arg: "editProfile",
        },
        {
            id: 6,
            label: "Logout",
            iconName: "power-off",
            iconType: "fontAwesome",
            page: "Fid",
            arg: "logout",
        }
    ]

    const showInf = (type)=> {
        if (type == "logout") {
            storeData("_user", null);
            storeData("enrollData", null);
            props.navigation.reset({
                index: 0,
                routes: [{name: 'Home'}]
            });
            handleLoginAction && handleLoginAction("logout");
        } else if (type == "setLang") {
            langModal.current.showLangModal();
        } else if (type == "editProfile") {
            contextOptions.isLogined ? setEditShow(true) : showInfoModal(Lang("welcome.enrollWarn"));
        } else {
            setLayout(type);
            showModal(true);
        }
    }

    const renderHeader = () => {
        const bundle = [];
        settingList.map((item)=> {
            bundle.push(
                <View key={item.id}>
                    <MyButton
                        title={item.label}
                        type="rightTextIcon"
                        iconSet={item.iconType}
                        iconName={item.iconName}
                        iconSize={30}
                        theme={true}  
                        style={[UI.setWidth(), UI.setHeight(45), commonStyle.mb]}
                        textStyle={[UI.setWidth(75, '%'), commonStyle.mlmd]}
                        arg={item.arg}
                        onPress={showInf}
                    />
                </View>
            )
        })
        return (
            <View>
                <View 
                    style={[
                        commonStyle.vCenter, 
                        commonStyle.row, 
                        commonStyle.alignCorner,
                        commonStyle.pbLg,
                        UI.setBorderBottom(1, '#ccc')
                    ]}
                >
                    <View style={[UI.setWidth(70, '%')]}>
                        <MyText theme="heading" title={Lang('app 212.welUsr', {user: contextOptions.user.name})} />
                    </View>
                    <Image
                        source={require("../images/1024x/logo.png")}
                        style={[UI.setScreen(90,90)]}
                    />
                </View>
                <View style={[commonStyle.center, commonStyle.vPadLg]}>
                    {bundle}
                </View>
            </View>
        )
    }

    const renderRow = ({item}) => {
        switch(item.type) {
            case 'inf' :
                return (
                    <View 
                        style={[UI.setHeight(40), commonStyle.themeTextBox, commonStyle.row]}
                    >
                        <View style={[UI.setWidth(37, '%'), UI.setBorderRight(1, '#000'), commonStyle.hCenter]}>
                            <MyText title={item.label} />
                        </View>
                        <View style={[UI.setWidth(63, '%'), commonStyle.pl, commonStyle.hCenter]}>
                            <MyText title={item.value || "N/A"} />
                        </View>
                    </View>
                )
        }
    }

    const backFromEdit = () => {
        setEditShow(false);
    }

    const saveEdit = () => {
        apiCall("/patient-update", {method: "POST"}, _editData).then((res)=> {
            if (res.status) {
                contextOptions.handleLogin({...contextOptions.user, ..._editData})
                setEditShow(false);
            }
        }).catch((err)=> {
            console.log(err);
        })
    }

    const handleEditProfile = (name, str) => {
        setEdit({..._editData, ...{[name]: str} });
    }

    const layoutModal = React.useMemo(() => {
        switch (_layoutName) {
            case 'pInf': return (
                <View>
                    <View 
                        style={[UI.setHeight(40), commonStyle.themeTextBox, commonStyle.row]}
                    >
                        <View style={[UI.setWidth(37, '%'), UI.setBorderRight(1, '#000'), commonStyle.hCenter]}>
                            <MyText title={Lang("profile.fName")} />
                        </View>
                        <View style={[UI.setWidth(63, '%'), commonStyle.pl, commonStyle.hCenter]}>
                            <MyText title={contextOptions.user?.fname} />
                        </View>
                    </View>
                    <View 
                        style={[UI.setHeight(40), commonStyle.themeTextBox, commonStyle.row]}
                    >
                        <View style={[UI.setWidth(37, '%'), UI.setBorderRight(1, '#000'), commonStyle.hCenter]}>
                            <MyText title={Lang("profile.lName")} />
                        </View>
                        <View style={[UI.setWidth(63, '%'), commonStyle.pl, commonStyle.hCenter]}>
                            <MyText title={contextOptions.user?.lname} />
                        </View>
                    </View>
                    <View 
                        style={[UI.setHeight(40), commonStyle.themeTextBox, commonStyle.row]}
                    >
                        <View style={[UI.setWidth(37, '%'), UI.setBorderRight(1, '#000'), commonStyle.hCenter]}>
                            <MyText title={Lang("profile.gender")} />
                        </View>
                        <View style={[UI.setWidth(63, '%'), commonStyle.pl, commonStyle.hCenter]}>
                            <MyText title={contextOptions.user?.sex || "..."} />
                        </View>
                    </View>
                    <View 
                        style={[UI.setHeight(40), commonStyle.themeTextBox, commonStyle.row]}
                    >
                        <View style={[UI.setWidth(37, '%'), UI.setBorderRight(1, '#000'), commonStyle.hCenter]}>
                            <MyText title={Lang("profile.ins")} />
                        </View>
                        <View style={[UI.setWidth(63, '%'), commonStyle.pl, commonStyle.hCenter]}>
                            <MyText title={contextOptions.user?.insurance_policy_number || "N/A"} />
                        </View>
                    </View>
                </View>
            )
            case 'fId': return (
                <View>
                    <Text>Fingr ID Under Developement</Text>
                </View>
            )
            case 'noti': return (
                <View>
                    <Text>Notification Setting Under Developement</Text>
                </View>
            )
        }
    }, [_layoutName, contextOptions.user])

    const editLayout = React.useMemo(()=> {
        return (
            <View style={[commonStyle.pLg]}>
                <View style={[commonStyle.pb]}>
                    <MyText title="Home phone" style={[commonStyle.themeNormalText, commonStyle.textBold]} />
                    <TextInput 
                        onChangeText={handleEditProfile.bind(this, "phone_home")}
                        keyboardType="number-pad"
                        value={_editData.phone_home}
                        style={[
                            commonStyle.themeTextBox,
                        ]}
                    />
                </View>
                <View>
                    <MyText title="Cell phone" style={[commonStyle.themeNormalText, commonStyle.textBold]} />
                    <TextInput 
                        onChangeText={handleEditProfile.bind(this, "phone_cell")}
                        keyboardType="number-pad"
                        value={_editData.phone_cell}
                        style={[
                            commonStyle.themeTextBox
                        ]}
                    />
                </View>
                <View style={[commonStyle.row, commonStyle.center]}>
                    <MyButton
                        theme={true}
                        title="Save"
                        onPress={saveEdit}
                        style={[
                            UI.setScreen(100, 40),
                            commonStyle.mtlg,
                        ]}
                    />
                    <MyButton
                        theme={true}
                        title="Back"
                        onPress={backFromEdit}
                        style={[
                            UI.setScreen(100, 40),
                            commonStyle.mtlg,
                            commonStyle.ml,
                            commonStyle.bgDark
                        ]}
                    />
                </View>
            </View>
        )
    }, [_editData]);

    return (
        <ChnContext.Consumer>
            {context=>
                <View style={[UI.setPadding(5,5,5,5, '%')]}>
                    <Loader loading={isLoading} style={[commonStyle.vPadMd]}/>
                    {showEdit 
                        ?  editLayout
                        :
                            <VirtualizedList
                                data={_list}
                                keyExtractor={(item)=> item.id}
                                renderItem={renderRow}
                                ListHeaderComponent={renderHeader}
                                getItem={getItem}
                                getItemCount={getItemCount}
                            />
                    }
                    
                    <InfoModal isVisible={_visibleModal} external={true} onClose={()=> showModal(false)}>
                        {layoutModal}
                    </InfoModal>
                    <ChangeLang ref={langModal} key={"langModal"} modalView={true} callApi={true} />
                </View>
            }
        </ChnContext.Consumer>
    )
}

export default Profile;