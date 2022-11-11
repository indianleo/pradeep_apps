import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, VirtualizedList, Image } from 'react-native';
import { apiCall } from '../api/apiAction';
import { getItem, getItemCount } from '../config/chnConfig';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
import MyButton from './libs/MyButton';
import MyText from './libs/MyText';

const MyAppointments = (props)=> {
    const contextOptions = React.useContext(ChnContext);
    const [listType, setListType] = React.useState("upcoming");
    const _navigation = useNavigation();

    React.useEffect(()=> {
        contextOptions.fetchAppointmentList("/current-appointments").then((res)=> {
            console.log("Appointment Fetched");
        }).catch((err)=> {
            console.log({MyAppoi: err});
        });
    }, [contextOptions.net])

    const getList = (type) => {
        contextOptions.fetchAppointmentList("/current-appointments").then((res)=> {
            console.log("past Appointment Fetched", res);
        }).catch((err)=> {
            console.log({MyAppoi: err});
        });
        setListType(type);
    }

    const getHeader = () => {
        return (
            <View style={[UI.setPadding(5,5,5,5,'%')]}>
                <View>
                    <MyText 
                        title={Lang('appointment.pageTitle')}
                        theme="heading"
                    />
                </View>
                <View style={[commonStyle.ptMd, commonStyle.row]}>
                    <MyButton
                        theme={true}
                        title={Lang("appointment.upcomingAppo")}
                        style={[UI.setHeight(40), listType == "past" && UI.setBg("gray")]}
                        onPress={getList}
                        arg={"upcoming"}
                    />
                    <MyButton
                        theme={true}
                        title={Lang("appointment.pastAppo")}
                        style={[UI.setHeight(40), commonStyle.ml, listType == "upcoming" && UI.setBg('gray')]}
                        onPress={getList}
                        arg={"past"}
                    />
                </View>
            </View>
        )
    }

    const cancelAppo = (currAppo) => {
        if (currAppo.pc_eid) {
            apiCall("/cancel-appointment", {method: "POST"}, {"appt_id": currAppo.pc_eid}).then((res)=> {
                if (res.status) {
                    contextOptions.fetchAppointmentList("/current-appointments").then((appoRes)=> {
                        console.log({appoRes});
                    }).catch((err)=> {
                        console.log({"fetchAppoiError": err});
                    });
                } else {
                    showInfoModal("Error occured on cancel due to server Error");
                }
            }).catch((err)=> {
                console.log({"cancelAppoiError": err});
                showInfoModal(Lang("app 212.apiErr"));
            })
        } else {
            showInfoModal("Cancelation time is over. Now you can't cancel it.");
        }
    }

    const checkInAppo = (currAppo) => {
        if (currAppo.pc_eid) {
            let obj = {
                "appt_id": currAppo.pc_eid,
                "appt_phone": contextOptions.user.phone_cell
            }
            apiCall("/appointment-checkin", {method: "POST"}, obj).then((res)=> {
                if (res.status) {
                    contextOptions.fetchAppointmentList("/current-appointments").then((res)=> {
                        console.log("Appointment Fetched");
                    }).catch((err)=> {
                        console.log({MyAppoi: err});
                    });
                    showInfoModal(res.message);
                } else {
                    showInfoModal("Check-IN failed");
                }
            }).catch((err)=> {
                console.log(err);
                showInfoModal();
            })
        } else {
            showInfoModal("Patient ID is not available.");
        }
    }

    const checkAppoButton = (type, item) => {
        if (listType == "past") {
            return true;
        }
        let res = false;
        if (type == "checkIN") {
            res = (item.pc_apptstatus == "@");
        } else {
            let appoTime = new Date(item.pc_eventDate).getTime();
            // If cancelation time is grater  than appoitnemnt time then button will disable by returning true
            res = (contextOptions.apptCancelTime > appoTime);
        }
        return res;
    }

    const reschedule = (currAppo)=> {
        currAppo.visitType = currAppo.pc_visit_type == "virtual" ? "virtual" : "inPerson";
        currAppo.rating = 3;
        if (currAppo.pc_eid) {
            apiCall("/cancel-appointment", {method: "POST"}, {"appt_id": currAppo.pc_eid}).then((res)=> {
                //console.log(res);
                apiCall("/reschedule-appointment", {method: "POST"}, {"appt_id": currAppo.pc_eid}).then((innerRes)=> {
                    _navigation.navigate('ProviderBio', innerRes);
                }).catch((err)=> {
                    console.log(err);
                })
            }).catch((err)=> {
                console.log({"cancelAppoiError": err});
                showInfoModal(Lang("app 212.apiErr"));
            })
        }
    }

    const getLastFive = (list) => {
        let res = [];
        list.sort((pre,post)=> new Date(pre.date) - new Date(post.date));
        let currDate = new Date();
        let currTime = currDate.getTime();
        console.log({list})
        list.map((items, index)=> {
            //let appoDate = new Date(items.pc_eventDate);
            const evDate = items.pc_eventDate.split("-");
            let appoDate = new Date();
            appoDate.setDate(+evDate[2]);
            appoDate.setMonth( (+evDate[1]) - 1);
            appoDate.setFullYear(+evDate[0]);
            let timeStr = items.pc_startTime.split(":");
            appoDate.setHours(timeStr[0]);
            appoDate.setMinutes(timeStr[1]);
            appoDate.setSeconds(timeStr[2]);
            console.log({appoDate})
            if (listType == "past") {
                if (currTime > appoDate.getTime()) {
                    res.push(items);
                }
            } else {
                if (currTime < appoDate.getTime()) {
                    res.push(items);
                }
            }
        })
        return res;
    }

    const getCurrentInline = (list) => {
        let res = [];
        list.sort((pre,post)=> new Date(pre.date) - new Date(post.date));
        let currDate = new Date();
        let currTime = currDate.getTime();
        list.map((items, index)=> {
            const evDate = items.pc_eventDate.split("-");
            let appoDate = new Date();
            appoDate.setDate(+evDate[2]);
            appoDate.setMonth( (+evDate[1]) - 1);
            appoDate.setFullYear(+evDate[0]);
            let timeStr = items.pc_startTime.split(":");
            appoDate.setHours(timeStr[0]);
            appoDate.setMinutes(timeStr[1]);
            appoDate.setSeconds(timeStr[2]);
            if (res.length < 6 && currTime < appoDate.getTime()) {
                res.push(items);
            }
        })
        return res;
    }

    const getDivider = () => {
        return (
            <View style={[UI.setPadding(0,5,0,5, '%')]}>
                <View style={[UI.setBg("#ccc"), UI.setHeight(1)]} />
            </View>
        )
    }

    const getAppointmentList = ({item})=> {
        return(
            <View style={[UI.setPadding(contextOptions.portrait ? 5 : 3,props.inline ? 0 : 5,5,5,'%'), UI.setWidth(UI.width()-68)]}>
                <View 
                    key={item.pc_eid} 
                >
                    <MyText 
                        title={item.pc_title} 
                        style={[commonStyle.textBlue]} 
                    />
                    <MyText 
                        title={"Facility:"} 
                        nestedTitle={item.pc_visit_type == "virtual" ? "Virtual" : item.facility}
                        style={[commonStyle.themeTextSm]} 
                        nestedStyle={[commonStyle.textDark]}
                    />
                    <MyText 
                        title={"Provider:"} 
                        nestedTitle={` ${item.name}`}
                        style={[commonStyle.themeTextSm]} 
                        nestedStyle={[commonStyle.textDark]}
                    />
                    <View style={[commonStyle.row]}>
                        <MyText 
                            title={`Date: ${item.pc_eventDate}`}
                            style={[commonStyle.themeTextSm, commonStyle.textDark]} 
                        />
                        <MyText 
                            title={`Time: ${item.pc_startTime}`}
                            style={[commonStyle.themeTextSm, commonStyle.textDark, commonStyle.pl]} 
                        />
                    </View>
                    {item.appt_cancel_id
                        ?
                            <View style={[commonStyle.row, commonStyle.pt]}>
                                <MyText title={Lang("appointment.cancelAppoReq")} theme="orange" style={[UI.setFont(14)]}/>
                            </View>
                        :
                            <View style={[commonStyle.row, commonStyle.pt]}>
                                <MyButton
                                    theme={true}
                                    title="Cancel"
                                    style={[UI.setHeight(25), commonStyle.mr]}
                                    onPress={cancelAppo}
                                    disabled={checkAppoButton("cancel", item)}
                                    arg={item}
                                />
                                <MyButton
                                    theme={true}
                                    title="Check-In"
                                    style={[UI.setHeight(25),commonStyle.mr]}
                                    onPress={checkInAppo}
                                    disabled={checkAppoButton("checkIN", item)}
                                    arg={item}
                                />
                                <MyButton
                                    theme={true}
                                    title="Reschedule"
                                    style={[UI.setHeight(25)]}
                                    onPress={reschedule}
                                    disabled={checkAppoButton("checkIN", item)}
                                    arg={item}
                                />
                            </View>
                    }
                </View>
            </View>
        )
    }

    const getInline = (context) => {
        if (context.appointmentList.length == 0) {
            return (
                <MyText
                    title={Lang("welcome.noAppo")}
                />
            )
        } else {
            return(<VirtualizedList
                horizontal={true}
                pagingEnabled={true}
                data={getCurrentInline(context.appointmentList)}
                keyExtractor={(item)=> item.pc_eid}
                renderItem={getAppointmentList}
                getItem={getItem}
                getItemCount={getItemCount}
            />)
        }
    }

    return (
        <ChnContext.Consumer>
            {context=> 
                props.inline
                    ?  
                        getInline(context)
                    :
                        <VirtualizedList
                            data={getLastFive(context.appointmentList)}
                            keyExtractor={(item)=> item.pc_eid}
                            ListHeaderComponent={getHeader}
                            ItemSeparatorComponent={getDivider}
                            renderItem={getAppointmentList}
                            getItem={getItem}
                            getItemCount={getItemCount}
                        />
            }
        </ChnContext.Consumer>
    )
}

export default MyAppointments;