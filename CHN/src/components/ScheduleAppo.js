import React from "react";
import { TextInput, View } from "react-native";
import ChnContext from "../context/ChnContext";
import commonStyle from "../css/commonStyle";
import MyButton from "./libs/MyButton";
import MyText from "./libs/MyText";
import Select from "./libs/Select";
import { apiCall, goHome } from "../api/apiAction";
import Loader from "./Loader";

const ScheduleAppo = (props) => {
    const _contectOption = React.useContext(ChnContext);
    const [_serviceList, setServices] = React.useState(null);
    const [departList, setDepart] = React.useState([]);
    const [_sendObj, setSendObj] = React.useState({});
    const [reasons, setReasons] = React.useState([]);
    const _param = props.route.params;
    const visitList = [
        {
            "label": Lang("appointment.newPatient"),
            "value": "new"
        },
        {
            "label": Lang("appointment.schWithMy"),
            "value": "myProvider"
        },
        {
            "label": Lang("appointment.seeNextProvider"),
            "value": "createReq"
        }
    ];

    React.useEffect(()=> {
        if (_param.isHistory) {
            setSendObj({..._sendObj, ..._param});
        }
        apiCall("/service-detail").then((res)=> {
            if (UI.isValid(res)) {
               filterRes(res);
            }
        }).catch((err)=> {
            console.log({schAppo: err});
        });
        apiCall("/appointment-reasons").then((res)=> {
            const temp = [];
            for (let key in res) {
                temp.push({
                    label: res[key],
                    value: key,
                    color: "#000"
                })
            }
            setReasons([...temp]);
        }).catch((err)=> {
            console.log(err);
        }).finally(()=> {
            closeInfoModal();
        })
    }, []);

    const filterRes = (data) => {
        const depArr = [];
        const depObj = {};
        data.map((item)=> {
            // store array of department
            depArr.push({
                "label": item.am_title,
                "value": item.id,
                "color": "black"
            })
            // store whole object
            depObj[item.id] = item;
        });
        setDepart(depArr);
        setServices(depObj);
    }

    const onSelect = (type, itemValue) => {
        switch(type) {
            case 'visitInfo': {
                // for visiting selection
                setSendObj({..._sendObj, ...{[type]: itemValue} });
            }
            break;
            case 'department': {
                if (_param.isHistory) {
                    // If it is comming from exisiting history provider
                    setSendObj({..._sendObj, ..._serviceList[itemValue], ...{visitInfo: "myProvider"}});
                } else {
                    setSendObj({..._sendObj, ..._serviceList[itemValue]});
                }
            }
            break;
        }
    }

    const selectReason = (value)=> {
        setSendObj({..._sendObj, ...{"reason": value} });
    }

    const selectInvite = (value)=> {
        setSendObj({..._sendObj, ...{"invite": value} });
    }

    const onNext = (action) => {
        if (_sendObj.visitInfo == "new") {
            props.navigation.navigate("MakeAppointment", _sendObj);
        } else if ( _sendObj.visitInfo == "createReq") {
            showInfoModal({isLoading: true});
            let temp = {..._sendObj, 
                ...{
                    "phone_or_email": _contectOption.user?.phone_cell,
                    "insurance_plan_name": _contectOption.user?.insurance_plan_name || "",
                    "description": "",
                    "languageId": 1
                }
            };
            apiCall("/on-demand-virtual-visit", {method: "POST"},  temp).then((res)=> {
                if (res.status) {
                    showInfoModal({title: res.message, onOk:()=> goHome(props.navigation) });
                } else {
                    closeInfoModal();
                }
            }).catch((err)=> {
                console.log(err);
                closeInfoModal();
            })
        } else if (_param.isHistory) {
            props.navigation.navigate("ProviderBio", _sendObj);
        } else {
            showInfoModal({isLoading: true})
            apiCall("/providers").then((res)=> {
                const obj = {..._sendObj, ...res[0]};
                setSendObj(obj);
                let temp = setTimeout(()=> {
                    if (obj.providerId && obj.facility_id) {
                        closeInfoModal();
                        props.navigation.navigate("MakeAppointment", obj)
                    } else {
                        if (obj.providerId == "-1") {
                            showInfoModal(Lang("appointment.noMyProvider"));
                        } else {
                            showInfoModal(Lang("appointment.unableToget"));
                        }
                    }
                    clearTimeout(temp);
                }, 1000); 
            }).catch((err)=> {
                console.log(err);
                showInfoModal();
            })
        }
    }
    
    const layout = React.useMemo(()=> {
        if (departList.length > 0 && _serviceList) {
            return (
                <>
                    {_sendObj.visitInfo == "createReq"
                        ?   <View>
                                <View style={[commonStyle.ptMd]}>
                                    <MyText theme="orange" title={Lang("appointment.reason")} />
                                    <Select
                                        onChange={selectReason}
                                        list={reasons}
                                    />
                                </View>
                                <View style={[commonStyle.ptMd]}>
                                    <MyText theme="orange" title={Lang("appointment.selectInvite")} />
                                    <Select
                                        onChange={selectInvite}
                                        list={[
                                            {
                                                "label": "SMS",
                                                "value": "SMS"
                                            },
                                            {
                                                "label": "EMAIL",
                                                "value": "EMAIL"
                                            }
                                        ]}
                                    />
                                </View>
                            </View>
                        :   <View>
                                <MyText title={Lang("appointment.whyHere")} theme="heading" style={[commonStyle.fs1]}/>
                                <Select
                                    onChange={onSelect.bind(this, 'department')}
                                    list={departList}
                                />
                            </View>
                    }  
                    {!_param.isHistory
                        ?
                            <View style={[commonStyle.ptMd]}>
                                <MyText theme="orange" title={Lang("appointment.selectVisit")} />
                                <Select
                                    onChange={onSelect.bind(this, 'visitInfo')}
                                    list={visitList}
                                />
                            </View>
                        : null
                    }
                    <View style={[commonStyle.vPadLg]}>
                        <MyButton
                            title={_sendObj.visitInfo == "createReq" ? Lang("appointment.submit") : Lang("appointment.next")}
                            theme={true}
                            style={[UI.setHeight(45), UI.setWidth(100, '%')]}
                            textStyle={[commonStyle.fs5]}
                            onPress={onNext}
                            disabled={_sendObj.visitInfo == "createReq" ? (!_sendObj.visitInfo || !_sendObj.reason) : (!_sendObj.visitInfo || !_sendObj.am_dept)}
                            arg={"next"}
                        />
                    </View>
                </>
            )
        } 

        return <Loader loading={true} style={[]} />

    }, [departList, _sendObj, _serviceList]);

    return (
        <ChnContext.Consumer>
            {context=>
                <View style={[UI.setPadding(5,5,5,5, '%')]}>
                    {layout}
                </View>
            }
        </ChnContext.Consumer>
    )
}

export default ScheduleAppo;