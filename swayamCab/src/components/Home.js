import React from  'react';
import { SafeAreaView, StatusBar, BackHandler} from 'react-native';
import MyContext from '../context/MyContext';
import commonStyle from '../css/commonStyle';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Driver from './Driver';
import Rider from './Rider';
const TRANSITIONS = ['fade', 'slide', 'none'];
const Home = (props)=> {
    const contextOptions = React.useContext(MyContext);
    const navRoute = useRoute();
    const getPage = () => {
        console.log(contextOptions);
        if (contextOptions.isRider) {
            return <Rider />
        }
        return <Driver />
    }

    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
              if (navRoute.name === 'Home') {
                    UI.ask({
                        title: "Hold On!",
                        msg: "Are you sure you want to exit the App",
                        onOk: ()=> BackHandler.exitApp(),
                        onCancel: ()=> null, 
                    });
                    return true;
              }
  
              return false;
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [navRoute]),
    );

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