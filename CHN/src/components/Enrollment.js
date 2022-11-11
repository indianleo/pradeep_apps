import React, {useState} from 'react';
import {
    View,
    TextInput,
    VirtualizedList
} from 'react-native';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
import form from '../config/chnData.json';
import { apiCall, checkRules, getStoreData, goHome, storeData } from '../api/apiAction';
import MyText from './libs/MyText';
import MyButton from './libs/MyButton';
import Select from './libs/Select';
import {getItemCount, getItem} from '../config/chnConfig';
import Loader from './Loader';
import ShowError from './ShowError';
import ErrorZone from './libs/ErrorZone';
import InfoModal from '../components/InfoModal';
import DatePicker from './libs/DatePicker';
import { useKeyboard } from './libs/MyKeyboard';
const Enrollment = (props)=> {
    const listRef = React.useRef();
    const [formSeq, updateformSeq] = useState(1);
    const [_formData, updateFormData] = useState({});
    const [_data, setData] = React.useState({});
    const [isLoading, setLoading] = React.useState(true);
    const [errObj, setError] = React.useState({});
    const [isNetError, setNetError] = React.useState(false);
    const [dateModal, showDate] = React.useState(false);
    const [currDateField, setCurrName] = React.useState(null);
    const seqLabel = ["-","enrollment.seq1Label", "enrollment.seq2Label", "enrollment.seq3Label", "enrollment.seq4Label", "enrollment.seq5Label","enrollment.seq6Label"];
    const formLimit = 5;
    const keyboardHeight = useKeyboard();
    const contextOption = React.useContext(ChnContext);
    const today = new Date();

    React.useEffect(()=> {
        getData();
    }, []);

    const getData = () => {
        if (contextOption.user?.email) {
            updateFormData({..._formData, ...{"email": contextOption.user.email} });
        }
        // getStoreData("enrollData").then((res)=> {
        //     console.log(res);
        //     if (res) updateFormData({...res});
        // })
        apiCall("/patient-enroll-data").then((res)=> {
            setData({...filterOptions(res)});
            handleInput({name: "created"}, today.toISOString().split("T")[0]);
            setLoading(false);
        }).catch((err)=> {
            console.log(err);
            setNetError(true);
        })
    }

    const handleInput = (input, value)=> {
        if (input.inputType == "date") return false;
        let warn = checkRules(input, value);
        if (warn) {
            setError(UI.createError(warn, input.name));
        } else {
            setError({...errObj, ...{[input.name]: ""} });
        }
        updateFormData({..._formData, ...{[input.name]: value} });
        storeData("enrollData", {..._formData, ...{[input.name]: value} });
    }

    const handleDateOpen = (item) => {
        if (item.inputType == "date") {
            setCurrName(item.name);
            showDate(true);
        }
    }

    const datWarning = ()=> {
        setTimeout(()=> { 
            showInfoModal(Lang("app 212.useCal"));
        }, 500)
    }

    const onDayPress = (_cur) => {
        if (currDateField) {
            console.log({today: today.toISOString().split("T")[0], curr: _cur.dateString})
            handleInput({name: currDateField}, _cur.dateString);
        }
    }

    const onBackPress = ()=> {
        updateformSeq(formSeq - 1);
    }

    const onSubmit = ()=> {
        console.log(_formData);
        let warn = form[formSeq].find((item)=> item.isRequired && !_formData[item.name]);
        if (warn) {
            showInfoModal(`${Lang("enrollment.fillReq")} Please check from "${Lang(warn.label)}"`);
            return;
        }
        if (formSeq > formLimit) {
            showInfoModal({isLoading: true});
            console.log(_formData);
            apiCall("/patient-enroll", {method: "POST"}, _formData).then((res)=> {
                console.log(res);
                if (res.status) {
                    showInfoModal({title: Lang("enrollment.formSaved"), onOk:()=> goHome(props.navigation, true) });
                } else {
                    setError(UI.createError(res));
                    if (typeof res.error == "string") {
                        showInfoModal(res.error)
                    } else {
                        showInfoModal(Lang("enrollment.checkReq"))
                    }
                }
            }).catch((err)=> {
                console.log({patienEnroll: err});
                showInfoModal();
            })
        }  else {
            updateformSeq(formSeq + 1);
        }
    }

    const filterOptions = (res) => {
        let tempData = {};
        for (let field in res) {
            let obj = res[field];
            let objRes = Object.keys(obj)
            if (field == "county_list") {
                objRes = objRes.sort((c, n)=> c-n);
            }
            tempData[field] = objRes.map((item)=> {
                return {label: obj[item], value: item}
            })
        }
        return tempData;
    }

    const getFormValue = React.useCallback((value, data)=> {
        switch (data.dataType) {
            case 'date': {
                if (value) {
                    let tempDate = value.split("-");
                    return `${tempDate[1]}/${tempDate[2]}/${tempDate[0]}`;
                }
            }
            break;
            case 'email': {
                return contextOption.user.email;
            }
        }
        return value;
    }, []);

    const checkEmail = ()=> {
        if (_formData.fname && _formData.lname && _formData.email) {
            apiCall("/patient-account", {method: "POST"}, {
                "first_name": _formData.fname,
                "last_name": _formData.lname,
                "email": _formData.email
            }).then((res)=> {
                showInfoModal(Lang(res ? "enrollment.checkExistingTrue" : "enrollment.checkExistingFalse"))
                console.log(res);
            })
        }
    }

    const headerLayout = React.useMemo(() => {
        return (
            <View>
                
                <View style={[UI.setPadding(5,5,0,5,'%')]}>
                    <MyText
                        theme="heading"
                        title={Lang(seqLabel[formSeq])}
                    />
                    {formSeq > 1
                        ?
                            <View 
                                style={[
                                    commonStyle.row, 
                                    commonStyle.ptSm, 
                                    commonStyle.alignCorner,
                                ]}
                            >
                                <MyButton
                                    type="icon"
                                    title={Lang("app 212.back")}
                                    style={[UI.setHeight(30)]}
                                    textStyle={[commonStyle.orangeFontSize]}
                                    onPress={onBackPress}
                                    iconSet="antDesign"
                                    iconName="left"
                                    iconStyle={[commonStyle.themeHeadingText]}
                                    iconSize={30}
                                />
                                <MyText
                                    title={formSeq}
                                    style={[
                                        commonStyle.textCenter, 
                                        UI.setWidth(50), 
                                        commonStyle.themeOrangeText
                                    ]}
                                />
                                <MyButton
                                    type="icon"
                                    title={Lang(formSeq > formLimit ? "app 212.submit" : "app 212.next")}
                                    style={[UI.setHeight(30)]}
                                    textStyle={[commonStyle.orangeFontSize]}
                                    disabled={(_formData.service == "dental" || (formSeq > formLimit) )}
                                    onPress={onSubmit}
                                    iconSet="antDesign"
                                    iconName="right"
                                    iconStyle={[commonStyle.themeHeadingText]}
                                    iconSize={30}
                                />
                            </View>
                        : null
                    }
                </View>
            </View>
        )
    }, [formSeq])

    const getFormLayout = ({item}) => {
        let _currLayout = null;
        const wanringBorder = (item.isRequired && !_formData[item.name]) ? UI.setBorder(1, 'red') : "";
        switch (item.inputType) {
            case 'select': 
                _currLayout = (<View style={[commonStyle.pbMd]}>
                    <Select
                        id={item.id}
                        onChange={handleInput.bind(this, item)}
                        list={_data[item.field]}
                        selectProps={{
                            placeholder: {label: item.placeholder || "Select"},
                            value: _formData[item.name]
                        }}
                    />
                    <ShowError data={errObj} type={item.name} />
                </View>
                )
                break;
            case 'date':
                _currLayout = (
                    <View style={[commonStyle.vPadMd]}>
                        <View 
                            style={[
                                commonStyle.textBoxBorderColor, 
                                commonStyle.row,
                                commonStyle.vCenter,
                                wanringBorder
                            ]}
                        >
                            <MyButton
                                type="icon"
                                iconName="calendar"
                                iconSize={30}
                                iconStyle={[commonStyle.textBlue]}
                                style={[UI.setPadding(3,8,3,8)]}
                                onPress={handleDateOpen.bind(this, item)}
                            />
                            <TextInput
                                placeholder={item.placeholder}
                                //onChangeText={handleInput.bind(this, item)}
                                onPressIn={datWarning}
                                keyboardType={item.keyboard || "default"}
                                value={getFormValue(_formData[item.name], item)}
                                maxLength={item.maxLength}
                                pointerEvents={"none"}
                                style={[
                                    commonStyle.bgWhite, 
                                    UI.setHeight(50), 
                                    UI.setWidth(87, '%'),
                                    commonStyle.p,
                                    commonStyle.textStyle,
                                    commonStyle.placeHolderFont,
                                ]}
                            />
                        </View>
                        <ShowError data={errObj} type={item.name} />
                    </View>
                )
                break;
            case 'article': 
                _currLayout = null;
            break;
            default : 
                _currLayout = (
                    <View style={[commonStyle.vPadMd]}>
                        <TextInput
                            placeholder={item.placeholder}
                            onChangeText={handleInput.bind(this, item)}
                            keyboardType={item.keyboard || "default"}
                            value={getFormValue(_formData[item.name], item)}
                            onPressIn={handleDateOpen.bind(this, item)}
                            maxLength={item.maxLength}
                            style={[
                                commonStyle.textBoxBorderColor,
                                commonStyle.bgWhite, 
                                UI.setHeight(50), 
                                commonStyle.p,
                                commonStyle.textStyle,
                                commonStyle.placeHolderFont,
                                wanringBorder
                            ]}
                        />
                        <ShowError data={errObj} type={item.name} />
                        {item.dataType == "email"
                            ?   <View style={[UI.setWidth(100, '%'), commonStyle.row, commonStyle.alignEnd]}>
                                    <MyButton
                                        theme={true}
                                        title={Lang("enrollment.checkAvailable")}
                                        onPress={checkEmail}
                                        style={[commonStyle.mt, commonStyle.vPadSm]}
                                    />
                                </View>
                            : null
                        }
                    </View>
                )
                break;
        }

        return (
            <View style={[commonStyle.ptXLg, UI.setPadding(4,5,0,5,'%')]}>
                <MyButton
                    title={Lang(item.label)}
                    type={item.isRequired ? "leftTextIcon" : "text"}
                    textStyle={[commonStyle.themeOrangeText]}
                    style={[{alignItems: "flex-start"}]}
                    iconSet="fontawesome"
                    iconName="star"
                    iconSize={10}
                    iconStyle={[UI.setColor("red")]}
                />
                {_currLayout}
            </View>
        )
    }

    const footerLayout = () => {
        return (
            <>
            <View 
                style={[
                    commonStyle.row, 
                    commonStyle.vPadSm, 
                    commonStyle.center,
                    UI.setPaddingBottom(30)
                ]}
            >
                <MyButton
                    theme={true}
                    title={Lang(formSeq > formLimit ? "app 212.submit" : "app 212.next")}
                    style={[UI.setHeight(40)]}
                    textStyle={[commonStyle.orangeFontSize]}
                    disabled={_formData.service == "dental"}
                    onPress={onSubmit}
                />
                {formSeq > 1
                    ? <MyButton
                            theme={true}
                            title={Lang("app 212.back")}
                            style={[UI.setHeight(40), commonStyle.mlmd, commonStyle.bgDark]}
                            textStyle={[commonStyle.orangeFontSize]}
                            onPress={onBackPress}
                        />
                    : null
                
                }
            </View>
            {_formData.service == "dental" 
                ? <View style={[commonStyle.vPadSm, commonStyle.center]}><MyText title="Dental Service is coming soon" /></View>
                : null
            }
            </>
        )
    }

    const scrollOn = (indexNum)=> {
        setTimeout(() => listRef.current.scrollToIndex({ index: indexNum }), 2000);
    }

    const getItemLayout= (data, index)=> {
        const h = Math.floor(UI.height() - keyboardHeight);
        return { 
            length: h, 
            offset: h * index, 
            index 
        };
    }   

    if (isNetError) {
        return (
            <ErrorZone onClose={()=> setNetError(false)} tryAgain={getData} />
        )
    } 
    return(
        <ChnContext.Consumer>
            {context => ( 
                <>
                    {isLoading
                        ? <Loader loading={isLoading} />
                        : 
                            <View 
                                style={[
                                    (keyboardHeight > 0)
                                        ? UI.setHeight(Math.floor(UI.height() - keyboardHeight))
                                        : null
                                ]}
                            >
                                <VirtualizedList
                                    ref={listRef}
                                    data={form[formSeq]}
                                    keyExtractor={(item)=> item.id}
                                    renderItem={getFormLayout}
                                    ListHeaderComponent={headerLayout}
                                    ListFooterComponent={footerLayout}
                                    getItem={getItem}
                                    getItemCount={getItemCount}
                                   //getItemLayout={getItemLayout}
                                />
                            </View>
                    }
                    <InfoModal external={true} isVisible={dateModal} onClose={()=> showDate(false)}>
                        <DatePicker 
                            onTouch={onDayPress} 
                            list={true} 
                            style={[UI.setMaxHeight(UI.height()/1.2), UI.setWidth()]}
                            currentDate={_formData[currDateField]}
                        />
                    </InfoModal>
                </>
                
            )}
        </ChnContext.Consumer>
    )
}

export default Enrollment;