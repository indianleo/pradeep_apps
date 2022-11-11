import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { apiCall, storeData } from "../api/apiAction";
const AppContext = React.createContext();
class AppProvider extends React.Component {
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
        //this.dimRef = null;
    }

    componentDidMount() {
        // this.dimRef = UI.dimOn({onChange: (e)=> {
        //     if (e.window) {
        //       UI.updateDim(e.window.width, e.window.height);
        //       this.updateProvider("portrait", e.window.width > e.window.height ? false : true);
        //     }
        // }})

    }

    // Subscribe
    unsubscribe = NetInfo.addEventListener(netState => {
        this.setState({net: netState});
    });

    componentWillUnmount() {
       // UI.dimOff(this.dimRef);
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

export default AppContext;
export {AppProvider};
