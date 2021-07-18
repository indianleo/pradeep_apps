import React from "react";
const MyContext = React.createContext();
class MyProvider extends React.Component {
    constructor() {
        super()
        this.state = {
            lang: "en",
            portrait: true,
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

    componentWillUnmount() {
        UI.dimOff(this.dimRef);
    }

    updateProvider = (name, value)=> {
        this.setState({[name]: value});
    }

    loginAction = (data)=> {
        this.setState({
            user: data,
            isLogined: data.role == "guest" ? false : true,
        })
    }

    getProviderData() {
        let stateData = this.state;
        return {
            ...stateData,
            updateState: this.updateProvider,
            handleLogin: this.loginAction,
        }
    }

    render() {
        return(
            <MyContext.Provider value={this.getProviderData()}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export default MyContext;
export {MyProvider};
