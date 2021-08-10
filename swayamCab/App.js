/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  Text,
  View,
} from 'react-native';
import Drawer from 'react-native-drawer'
import SidePane from './src/components/SidePane';
import SplashScreen from 'react-native-splash-screen';
import i18n from './src/config/i18n';
import ChangeLang from './src/components/ChangeLang';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {MyProvider} from './src/context/MyContext';
import {themeAction} from  './src/config/theme';
import HeaderLeft from './src/nav/HeaderLeft';
import HeaderRight from './src/nav/HeaderRight';
//import HeaderTitle from './src/nav/HeaderTitle';
import HeaderBackground from './src/nav/HeaderBackground';
import ImageSlider from './src/components/ImageSlider';
import InfoModal from './src/libs/InfoModal';
import Login from './src/components/Login';
import Enrollment from './src/components/Enrollment';
import Home from './src/components/Home';
import Driver from './src/components/Driver';
import Rider from './src/components/Rider';
import Profile from './src/components/Profile';
import Ongoing from './src/components/Ongoing';
import Finished from './src/components/Finished';
import About from './src/components/About';
import Canceled from './src/components/Canceled';
import Feedback from './src/components/Feedback';
import ShareLocation from './src/components/ShareLocation';
import { requestLocation } from './src/config/myConfig';
import PendingReq from './src/components/PendingReq';

const Stack = createStackNavigator();
global.UI = themeAction();
const App: () => Node = () => {
    let infoModalRef = React.useRef();
    let _drawer = React.useRef();
    let navigationRef = React.useRef();
    const [showIntro, updateIntro] = React.useState(true);
    const [showLang, updateShowLang] = React.useState(false);
    const [_user, setUser] = React.useState("");
    const [_needEnroll, setEnroll] = React.useState(false);
    const [drawerState, setDrawer] = React.useState(false);

    React.useEffect(()=> {
        UI.initGeoCoading();
        SplashScreen.hide();
        if (!UI.ios) requestLocation();
    }, []);

    global.Lang = (text, _data)=> {
      if (typeof _data == 'string') {
        i18n.locale = _data;
        return;
      }
      if (_data) {
        return i18n.t(text, _data);
      } else {
        return i18n.t(text);
      }
    }

    const setLang = () => {
      updateShowLang(true);
    }

    const onSkipIntro = ()=> {
      updateIntro(false);
    }

    global.showInfoModal = (data) => {
      infoModalRef.current.showInfoModal(data);
    }

    const handleLoginAction = (action, data)=> {
      switch(action) {
        case 'reg':
          setEnroll(true);
        break;
        case 'back':
          setEnroll(false);
        break;
        case 'logout': 
          closeDrawer();
          setUser("");
        break;
        case 'login':  
          setUser(action);
          setEnroll(false);
        break;
      }
    }
  
    const loginPage = () => {
      return (
      <View style={{paddingTop: UI.ios ? 50 : 0}}>
        {_needEnroll 
          ? <Enrollment handleLoginAction={handleLoginAction} />
          : <Login handleAction={handleLoginAction} />
        }
      </View>
      )
    }

    const loadDefault = ()=> {
      if (!showLang) {
        return(<View style={{paddingTop: 50}}><ChangeLang setLang={setLang} callApi={showIntro} /></View>);
      } else {
        return(
          <View style={{paddingTop: '10%'}}>
            <ImageSlider
              onSkip={onSkipIntro}
              hideOnSlide={3}
              //logo={require('./src/images/icon.png')}
              logoHeight={100}
              logoWidth={200}
              uri={false}
              data={[
                {
                  src: require('./src/images/intro1.png'),
                  info: Lang("slider.info1"),
                  subText: Lang("slider.subText1"),
                },
                {
                  src: require('./src/images/intro2.jpeg'),
                  info: Lang("slider.info2"),
                  subText: Lang("slider.subText2"),
                },
                {
                  src: require('./src/images/intro3.jpeg'),
                  info: Lang("slider.info3"),
                  subText: Lang("slider.subText3"),
                },
              ]}
            />
          </View>
        )
      }
    }
  
    const loadStack = ()=> {
      return(
        [
          <Stack.Navigator 
            key={"stackNav"}
            screenOptions = {(_navData) => ({
              headerBackground: props => <HeaderBackground />,
              headerTitle: null,
              headerRight: props => <HeaderRight {...props} {..._navData} handleLoginAction={handleLoginAction} />,
              headerLeft: props => <HeaderLeft {...props} {..._navData} hideBack={true} openDrawer={openDrawer} closeDrawer={closeDrawer} drawerState={drawerState} />,
            })}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{title: "Swyam Cab"}}
            />
            <Stack.Screen
              name="Driver"
              component={Driver}
              options={{title: "Driver"}}
            />
            <Stack.Screen
              name="Rider"
              component={Rider}
              options={{title: "Rider"}}
            />
             <Stack.Screen
              name="Profile"
              component={Profile}
              options={{title: "Profile"}}
            />
            <Stack.Screen
              name="PendingReq"
              component={PendingReq}
              options={{title: "Pending Request"}}
            />
             <Stack.Screen
              name="Ongoing"
              component={Ongoing}
              options={{title: "Ongoing"}}
            />
             <Stack.Screen
              name="Finished"
              component={Finished}
              options={{title: "Finished Ride"}}
            />
             <Stack.Screen
              name="Canceled"
              component={Canceled}
              options={{title: "Canceled"}}
            />
             <Stack.Screen
              name="Feedback"
              component={Feedback}
              options={{title: "Feedback"}}
            />
             <Stack.Screen
              name="ShareLocation"
              component={ShareLocation}
              options={{title: "Share Location"}}
            />
             <Stack.Screen
              name="About"
              component={About}
              options={{title: "About"}}
            />
          </Stack.Navigator>
        ]
      )
    }

    const openDrawer = ()=> {
      _drawer.open();
      setDrawer(true);
    }
  
    const closeDrawer = ()=> {
      _drawer.close();
      setDrawer(false);
    }
  
    return (
      <MyProvider>
        <NavigationContainer ref={navigationRef}>
          <Drawer
            type="overlay"
            tapToClose={true}
            ref={(ref)=> _drawer = ref}
            content={<SidePane navRef={navigationRef.current} closeDrawer={closeDrawer} handleLoginAction={handleLoginAction} />}
            openDrawerOffset={0.2}
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            tweenHandler={(ratio) => ({
              main: { opacity:(2-ratio)/2 }
            })}
            styles={{
              drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
              main: {paddingLeft: 0},
            }}
            onClose={()=> setDrawer(false)}
          >
            { showIntro ? loadDefault() : (_user ? loadStack() : loginPage()) }
            <InfoModal ref={infoModalRef} key="intorModal" />
          </Drawer>
        </NavigationContainer>
      </MyProvider>
    );
};

export default App;
