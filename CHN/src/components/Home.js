import React from 'react';
import { 
    SafeAreaView,
    ScrollView,
    StatusBar,
    Image,
    View,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import ChnContext from '../context/ChnContext';
import Welcome from './Welcome';
const TRANSITIONS = ['fade', 'slide', 'none'];
export default class Home extends React.Component {
    static contextType = ChnContext;
    constructor() {
        super();
        this.state = {
            statusBarTransition: TRANSITIONS[2],
            hidden: false,
            showIntro: true,
            lang: false,
            localeLang: '',
            isGuest: false,
            isLogin: false,
        }
    }

    componentDidMount() {
        console.log("Home Mounted");
    }

    render() {

        return (
            <SafeAreaView>
                <StatusBar
                    animated={true}
                    translucent={true}
                    backgroundColor={"transparent"}
                    showHideTransition={this.state.statusBarTransition}
                    networkActivityIndicatorVisible={true}
                />
                <Welcome {...this.props} />
            </SafeAreaView>
        )
    }
}
