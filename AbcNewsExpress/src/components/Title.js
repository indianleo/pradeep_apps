/**
 *  File Name   : Title.js
 *  Author      : Pradeep Yadav
 *  Description : Title Theme Component
 *  Version     : 1.0
 *  Packege     : pegoldnative.src.components.themeComponents
 *  Last update : 14 July 2017
 */

 import React, { Component } from 'react';
 import { 
 	View,
 	Text,
 } from 'react-native';
 import { ActionList } from './ThemeAction';

var UI = ActionList();
 export default class Title extends Component{

	constructor() {
		super();
	}

	render(){
		return(
			<View 
				style={[
					UI.setHeight(20),
				]}
			>
				<Text>{this.props.text}</Text>
			</View>
		);
	}
}
