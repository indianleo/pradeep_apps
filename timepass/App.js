/**
 * App: timepass
 * AUthor: Pradeep Yadav
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          {global.HermesInternal == null ? null : (
            <View>
              <Text>Engine: Hermes</Text>
            </View>
          )}
          <View>
              <Text>Hello Pradeep</Text>
              <Text>
                We are going to create app Timepass
              </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
