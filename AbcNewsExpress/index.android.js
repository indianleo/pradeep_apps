import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import App from './App';

export default class AbcNewsExpress extends Component {
    render() {
		return (
		  <View>
			<Text>Hello Pradeep</Text>
		  </View>
		);
	}
}



AppRegistry.registerComponent('AbcNewsExpress', () => App);
