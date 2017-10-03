/**
 *  File Name   : Lable.js
 *  Author      : Pradeep Yadav
 *  Description : Lable Theme Component
 *  Version     : 1.0
 *  Packege     : pegoldnative.src.components.themeComponents
 *  Last update : 10 March 2017
 */

import React, {Component} from 'react';
import {
	View,
	Text
} from 'react-native';

import Ratio, { unit } 				from '../css/DynamicDimension';
import theme 					    from '../css/theme';
import { ActionList } 				from './ThemeAction';

var UI = ActionList();
var height = UI.height;
var width = UI.width;
var _this;

export default class Lable extends Component{

	constructor() {
		super();
		this.state 		= { layout : "" };
		_this          	= this;
		this.type      	= "";
		this.ui        	= "";
		this.textColor 	= "";
	};
	
	componentWillMount() {
		this.start( this.props );
	}
	
	start( props ) {
		this.ui = UI.getUi( props );
		this.textColor = UI.getThemeTextColor();
	}
	
	render() {
		this.start( this.props );
		return(
			<View>
				{this.renderLayout( this.props )}
			</View>
		);
	}
	
	renderLayout( props ) {
		let themeName = theme[props.theme];
		let lable = props.lable || null;
		let lineNo = props.lineNo || 1;
		let style = props.style || null;
		let cover = {
			borderWidth 	: Number(this.ui['borderWidth']), 
			backgroundColor : this.ui['backgroundColor'],
			borderColor 	: theme[this.props.borderTheme] || this.ui['borderColor'],
			height			: Number(this.ui['height']),
			margin			: Number(this.ui['margin']),
			padding			: Number(this.ui['padding']),
			width 			: Number(props.width ? this.ui['width'] : 'auto'),
			borderRadius	: Number(props.round ? UI.getRadius( this.ui['height'] ) : this.ui['borderRadius']),
			justifyContent  : 'center'
		};
		
		let text = {
			fontSize   		: UI.getFontSize( { maxScale : 7, minScale : 40, props : props, width : this.ui['width'], height : this.ui['height'] } ),
			fontWeight 		: this.ui['fontWeight'],
			textAlign  		: this.ui['textAlign'],
		};
		
		let attr = { 
			cover 		: cover, 
			text 		: text, 
			lable 		: lable,
			lineNo 		: lineNo,
			themeName 	: themeName, 
			style		: style
		};
		return this.layout( attr, props );
	}
	
	layout( attr, props ){
		let themeName = props.theme || 'basic';
		let content = props.content || null;
		let color = props.color || this.textColor[themeName];
		return(
			<Text 
		 		style={[ attr['cover'], theme[themeName], attr['style'] ,attr['text'], theme.flowHidden, { color: color } ]} 
		 		numberOfLines={ attr['lineNo']} 
		 	> { content } </Text>
		);
	}
	

}	