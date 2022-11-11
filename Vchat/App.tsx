/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { store } from './src/store';
import {Provider} from 'react-redux';
import Welcome from './src/components/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {

  const stackLayout = React.useMemo(()=> {
      return (
          <Stack.Navigator>
              <Stack.Screen
                  name="Welcome"
                  component={Welcome}
                  options={{title: "Welcome"}}
              />
          </Stack.Navigator>
      )
  }, [])

  return (
    <Provider store={store}>
        <NavigationContainer>
          {stackLayout}
        </NavigationContainer>
    </Provider>
  );
}

export default App;
