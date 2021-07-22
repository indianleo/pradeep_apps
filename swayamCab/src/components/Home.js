import React from  'react';
import { SafeAreaView, StatusBar} from 'react-native';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import Driver from './Driver';
import Rider from './Rider';
const TRANSITIONS = ['fade', 'slide', 'none'];
const Home = (props)=> {
    const contextOptions = React.useContext(MyContext);
    const getPage = () => {
        console.log(contextOptions);
        if (contextOptions.isRider) {
            return <Rider />
        }
        return <Driver />
    }

    return (
        <SafeAreaView>
            <StatusBar
                animated={true}
                translucent={true}
                backgroundColor="transparent"
                showHideTransition={TRANSITIONS[2]}
            />
            {getPage()}
        </SafeAreaView>
    )
}

export default Home;