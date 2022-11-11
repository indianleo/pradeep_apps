/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Provider } from 'react-redux';
import Welcome from './src/pages/Welcome';
import Chat from './src/pages/Chat';
import appStore from './src/store';

const Stack = createStackNavigator();

const App = () => {

  const loadStack = React.useMemo(()=> {
    return (
      <Stack.Navigator>
          <Stack.Screen
              name="Home"
              component={Welcome}
              options={{title: "Dashboard"}}
          />
          <Stack.Screen
              name="Chat"
              component={Chat}
              options={{title: "Chat"}}
          />
      </Stack.Navigator>
    )
  }, []);
  return (
    <Provider store={appStore}>
        <NavigationContainer>
            {loadStack}
        </NavigationContainer>
    </Provider>
  );
};

export default App;
