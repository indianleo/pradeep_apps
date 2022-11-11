import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { apiCall, storeData } from "../api/apiAction";
const ChnContext = React.createContext();
class ChnProvider extends React.Component {
    constructor() {
        super()
        this.state = {
            lang: "en",
            portrait: true,
            appointmentList: [],
            apptCancelDate: "",
            apptCancelTime: 0,
            net: {isConnected: false},
        }
        this.dimRef = null;
    }

    componentDidMount() {
        this.dimRef = UI.dimOn({onChange: (e)=> {
            if (e.window) {
              UI.updateDim(e.window.width, e.window.height);
              this.updateProvider("portrait", e.window.width > e.window.height ? false : true);
            }
        }})

    }

    // Subscribe
    unsubscribe = NetInfo.addEventListener(netState => {
        //console.log("Connection", netState);
        //console.log("Is connected?", state.isConnected);
        this.setState({net: netState});
    });

    componentWillUnmount() {
        UI.dimOff(this.dimRef);
        this.unsubscribe();
    }

    updateProvider = (name, value)=> {
        if (name) {
            this.setState({[name]: value});
        }
    }

    loginAction = (data)=> {
        if (data.access_token) {
            UI.accessKey(data.access_token);
        }
        storeData("_user", data);
        this.setState({
            user: data,
            isLogined: data.patient_id ? true : false,
        })
    }

    fetchAppointmentList = (listType) => {
        return new Promise((resolve)=> {
            apiCall(listType).then((res)=> {
                if (res && res.appt_cancel_date) {
                    const cacelDateStr = res.appt_cancel_date.split(" ");
                    const cancelTime = new Date( new Date(cacelDateStr[0]).toDateString() + " " + cacelDateStr[1]).getTime();
                    this.setState({
                        appointmentList: res.appointments || [],
                        apptCancelDate: res.appt_cancel_date || "",
                        apptCancelTime: cancelTime,
                    }, ()=> {
                        resolve(res);
                    });
                } else {
                    this.setState({
                        appointmentList: [],
                    }, ()=> {
                        resolve(res);
                    });
                }
                
            }).catch((err)=> {
                console.log({appointmentList: err});
                showInfoModal?.();
                resolve(err);
            });
        })
    }

    getProviderData() {
        let stateData = this.state;
        return {
            ...stateData,
            updateState: this.updateProvider,
            handleLogin: this.loginAction,
            fetchAppointmentList: this.fetchAppointmentList,
        }
    }

    render() {
        return(
            <ChnContext.Provider value={this.getProviderData()}>
                {this.props.children}
            </ChnContext.Provider>
        )
    }
}

export default ChnContext;
export {ChnProvider};
