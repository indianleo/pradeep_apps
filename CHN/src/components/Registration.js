import React from 'react';
import {
    View, 
    TextInput, 
    ScrollView, 
    Image, 
} from 'react-native';
import { apiCall, storeData } from '../api/apiAction';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
import ShowError from './ShowError';
import Loader from './Loader';
import MyText from './libs/MyText';
import MyButton from './libs/MyButton';
import InfoModal from './InfoModal';
import Icons from './libs/Icons';
import { useKeyboard } from './libs/MyKeyboard';
import DatePicker from './libs/DatePicker';

const Registration = (props)=> {
    const [formObj, setForm] = React.useState({});
    const [errObj, setError] = React.useState({});
    const [isLoading, setLoading] = React.useState(false);
    const [showModal, setModal] = React.useState(false);
    const [showPass, setShowPass] = React.useState(false);
    const [dateModal, showDate] = React.useState(false);
    const keyboardHeight = useKeyboard();

    const handleInput = (type, value) => {
        setForm({...formObj, ...{[type]: value}});
    }

    const onDayPress = (itemValue)=> {
        handleInput("dob", itemValue.dateString)
    }

    const handelModal = (st)=> {
        showDate(st);
        setModal(st);
    }

    const onSubmit = () => {
        setLoading(true);
        apiCall(
            "/register", 
            {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                }
            },
            formObj
        ).then((res)=> {
            console.log(res);
            if (res.status) {
                storeData("otpView", {status: "get" })
                setModal(true);
            } else {
                setError(UI.createError(res));
                setLoading(false);
            }
        }).catch((err)=> {
            console.log({reg: err});
            setLoading(false);
            showInfoModal();
        })
    }

    const onBack = () => {
        props.handleAction("back");
    }

    const handlePassShow = ()=> {
        setShowPass(!showPass);
    }

    const datWarning = ()=> {
        setTimeout(()=> { 
            showInfoModal("Please use calendar to select date.");
        }, 500)
    }

    const handleDateOpen = ()=> {
        showDate(true);
    }

    const rendertTitle = React.useCallback((title)=> {
        return (
            <MyText
                theme="orange"
                title={title}
                style={[commonStyle.pb]}
                nestedTitle=" *"
                nestedStyle={[UI.setColor("red")]}
            />
        )
    }, [])

    return(
        <ChnContext.Consumer>
            {context =>
                <ScrollView 
                    style={[
                        commonStyle.themeBg, 
                        (keyboardHeight > 0)
                            ? UI.setHeight(Math.floor(UI.height() - keyboardHeight))
                            : UI.setHeight(100, '%'),
                        UI.setWidth(100, '%')
                    ]}
                >
                    <View style={[UI.setPadding(5,5,5,5, '%')]}>
                        <View 
                            style={[
                                commonStyle.vCenter, 
                                commonStyle.row, 
                                commonStyle.alignCorner,
                            ]}
                        >
                            <View style={[UI.setWidth(70, '%')]}>
                                <MyText
                                    theme="heading"
                                    title={Lang('reg.title')}
                                />
                            </View>
                            <Image
                                source={require('../images/1024x/contact.png')}
                                style={[commonStyle.pageIcons]}
                            />
                        </View>
                        <Loader loading={isLoading} style={[commonStyle.pLg]} />
                        <View>
                            {rendertTitle(Lang('reg.name'))}
                        </View>
                        <View>
                            <TextInput
                                placeholder={Lang("app 212.name")}
                                onChangeText={handleInput.bind(this, 'name')}
                                style={[
                                    commonStyle.textBoxBorderColor,
                                    commonStyle.p,
                                    commonStyle.bgWhite,
                                    UI.setHeight(50),
                                    commonStyle.textStyle,
                                    commonStyle.placeHolderFont,
                                    commonStyle.textDark
                                ]}
                            />
                            <ShowError data={errObj} type="name" />
                        </View>
                        <View style={[commonStyle.ptLg, commonStyle.pb,]}>
                            {rendertTitle(Lang('reg.email'))}
                        </View>
                        <View>
                            <TextInput
                                placeholder={Lang('reg.email')}
                                onChangeText={handleInput.bind(this, 'email')}
                                keyboardType="email-address"
                                style={[
                                    commonStyle.textBoxBorderColor,
                                    commonStyle.bgWhite,
                                    UI.setHeight(50),
                                    commonStyle.p,
                                    commonStyle.textStyle,
                                    commonStyle.placeHolderFont,
                                    commonStyle.textDark
                                ]}
                            />
                            <ShowError data={errObj} type="email" />
                        </View>
                        <View style={[commonStyle.ptLg, commonStyle.pb,]}>
                            {rendertTitle(Lang('reg.userName'))}
                        </View>
                        <View>
                            <TextInput
                                placeholder={Lang('reg.userName')}
                                onChangeText={handleInput.bind(this, 'username')}
                                style={[
                                    commonStyle.themeTextBox,
                                    commonStyle.bgWhite,
                                    UI.setHeight(50),
                                    commonStyle.p,
                                    commonStyle.textDark
                                ]}
                            />
                            <ShowError data={errObj} type="username" />
                            <View>
                                <MyText title={Lang("reg.userIns1")}/>
                                <MyText title={Lang("reg.userIns2")}/>
                            </View>
                        </View>
                        <View style={[commonStyle.pt]}>
                            {rendertTitle(Lang('app 212.dob'))}
                        </View>
                        <View style={[]}>
                            <View 
                                style={[
                                    commonStyle.textBoxBorderColor, 
                                    commonStyle.row,
                                    commonStyle.vCenter,
                                ]}
                            >
                                <MyButton
                                    type="icon"
                                    iconName="calendar"
                                    iconSize={30}
                                    iconStyle={[commonStyle.textBlue]}
                                    style={[UI.setPadding(3,8,3,8)]}
                                    onPress={handleDateOpen}
                                />
                                <TextInput
                                    placeholder={Lang("app 212.dob")}
                                    onPressIn={datWarning}
                                    value={formObj.dob}
                                    pointerEvents={"none"}
                                    style={[
                                        commonStyle.bgWhite, 
                                        UI.setHeight(50), 
                                        UI.setWidth(86, '%'),
                                        commonStyle.p,
                                        commonStyle.textStyle,
                                        commonStyle.placeHolderFont,
                                    ]}
                                />
                            </View>
                            <ShowError data={errObj} type="dob" />
                        </View>
                        <View style={[commonStyle.ptLg, commonStyle.pb,]}>
                            {rendertTitle(Lang('reg.password'))}
                        </View>
                        <View>
                            <TextInput
                                placeholder={Lang('reg.pass')}
                                onChangeText={handleInput.bind(this, 'password')}
                                secureTextEntry={!showPass}
                                style={[
                                    commonStyle.themeTextBox,
                                    commonStyle.bgWhite,
                                    UI.setHeight(50),
                                    commonStyle.p,
                                    commonStyle.textDark
                                ]}
                            />
                            <ShowError data={errObj} type="password" />
                            <MyButton
                                title={Lang("reg.showPass")}
                                type="rightTextIcon"
                                iconSet="materialCommunityIcons"
                                iconSize={15}
                                iconName={ showPass ? "checkbox-marked" : "checkbox-blank-outline"}
                                onPress={handlePassShow}
                                style={[

                                ]}
                            />
                        </View>
                        <View 
                            style={[
                                commonStyle.center, 
                                commonStyle.ptXLg,
                                commonStyle.row
                            ]}
                        >
                            <MyButton
                                theme={"orange"}
                                title={Lang("app 212.submit")}
                                style={[
                                    UI.setHeight(40),
                                    commonStyle.flex1,
                                ]} 
                                onPress={onSubmit}

                            />
                            <MyButton
                                theme={"orange"}
                                title={Lang("app 212.back")}
                                style={[
                                    UI.setHeight(40),
                                    commonStyle.flex1,
                                    commonStyle.bgDark,
                                    commonStyle.ml
                                ]} 
                                onPress={onBack}

                            />
                        </View>
                        <ShowError data={errObj} type="reqInfo" />
                    </View>
                    <InfoModal  external={true} isVisble={showModal || dateModal} onClose={()=> handelModal(false) }>
                        {dateModal
                            ?
                                <DatePicker 
                                    onTouch={onDayPress} 
                                    list={true} 
                                    style={[UI.setMaxHeight(UI.height()/1.2), UI.setWidth()]}
                                    currentDate={formObj.dob}
                                />
                            :
                                <>
                                    <View style={[commonStyle.center, commonStyle.pb]}>
                                        <Icons
                                            iconSet="ionicons"
                                            size={50}
                                            name="checkmark-done-circle"
                                            style={[UI.setColor("green")]}
                                        />
                                        <MyText
                                            theme="heading"
                                            title="Registration is successfull"
                                            style={[commonStyle.fs1]}
                                        />
                                    </View>
                                    <View>
                                        <MyText
                                            theme="orange"
                                            title={Lang("reg.verifyEmail")}
                                            style={[commonStyle.textDark]}
                                        />
                                    </View>
                                    <View style={[commonStyle.row, commonStyle.vPadMd]}>
                                        <MyButton
                                            theme={true}
                                            title={"Login"}
                                            style={[UI.setHeight(40)]}
                                            onPress={()=> { setModal(false); props.handleAction("back"); }}
                                        />
                                    </View>
                                </>
                        }
                    </InfoModal>
                </ScrollView>
            }
        </ChnContext.Consumer>
    )
}

export default Registration;