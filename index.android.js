import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './App';
export default class abc extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello Pradeep</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('abc', () => App);
