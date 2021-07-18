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

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {MyProvider} from './src/context/MyContext';
import {themeAction} from  './src/config/theme';
import HeaderLeft from './src/nav/HeaderLeft';
import HeaderRight from './src/nav/HeaderRight';
import HeaderTitle from './src/nav/HeaderTitle';
import HeaderBackground from './src/nav/HeaderBackground';
import ImageSlider from './src/components/ImageSlider';
import InfoModal from './src/libs/InfoModal';
import Login from './src/components/Login';
import Enrollment from './src/components/Enrollment';
import Home from './src/components/Home';

const Stack = createStackNavigator();
global.UI = themeAction();
const App: () => Node = () => {
    let infoModalRef = React.useRef();
    const [showIntro, updateIntro] = React.useState(true);
    const [_user, setUser] = React.useState("");
    const [_needEnroll, setEnroll] = React.useState(false);

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
      return(
        <View style={{paddingTop: '10%'}}>
          <ImageSlider
            onSkip={onSkipIntro}
            hideOnSlide={3}
            logo={require('./src/images/logo-icon.png')}
            uri={false}
            data={[
              {
                src: require('./src/images/intro1.png'),
                info: "Slide 1",
              },
              {
                src: require('./src/images/intro2.png'),
                info: "Slide 2",
              },
              {
                src: require('./src/images/intro3.png'),
                info: "Slide 3",
              },
            ]}
          />
        </View>
      )
    }
  
    const loadStack = ()=> {
      return(
        [
          <Stack.Navigator 
            key={"stackNav"}
            screenOptions = {(_navData) => ({
            headerBackground: props => <HeaderBackground />,
            headerTitle: props => <HeaderTitle {...props} {..._navData} />,
            headerRight: props => <HeaderRight {...props} {..._navData} />,
            headerLeft: props => <HeaderLeft {...props} {..._navData} hideBack={true} />,
            })}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{title: "SwyamCab"}}
            />
          </Stack.Navigator>,
          <InfoModal ref={infoModalRef} key="intorModal" />
        ]
      )
    }
  
    return (
      <MyProvider>
        <NavigationContainer>
        { showIntro ? loadDefault() : ( _user ? loadStack() : loginPage()) }
        </NavigationContainer>
      </MyProvider>
    );
};

export default App;
