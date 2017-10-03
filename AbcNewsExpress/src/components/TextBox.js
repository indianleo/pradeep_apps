/**
 *  File Name   : TextBox.js
 *  Author      : Pradeep Yadav
 *  Description : TextBox Theme Component
 *  Version     : 1.0
 *  Packege     : pegoldnative.src.components.themeComponents
 *  Last update : 10 March 2017
 */

import React, {Component} from 'react';
import {
	View,
	Text,
	TextInput
} from 'react-native';

import Ratio, { unit } 				from '../css/DynamicDimension';
import theme 					    from '../css/theme';
import { ActionList } 				from './ThemeAction';

var UI = ActionList();
var height = UI.height;
var width = UI.width;
var _this;
export default class TextBox extends Component{

	constructor() {
		super();
		_this          			= this;
		this.type      			= "";
		this.ui        			= "";
		this.textColor 			= "";
		this.placeholderColor 	= "";
	};
	
	start( props ) {
		this.ui = UI.getUi( props );
		this.placeholderColor = UI.getThemeTextColor();
	}
	
	onTouch( props ){
		if( props.onTouch ) {
			props.onTouch();
		}
	}
	
	onType( props, char ){
		if( props.onType ) {
			props.onType( char );
		}
	}
	
	onLeave( props ) {
		if( props.onLeave ) {
			props.onType();
		}
	}

	render() {
		this.start( this.props );
		return(
			<View>
				{this.renderTextBox( this.props )}
			</View>
		);
	}
	
	renderTextBox( props ) {
		
		let themeName = theme[props.theme];
		let lable = props.lable || null;
	
		let cover = {
			borderWidth 	: Number(this.ui['borderWidth']), 
			backgroundColor : this.ui['backgroundColor'],
			borderColor 	: theme[props.borderTheme] || this.ui['borderColor'],
			height			: Number(this.ui['height']),
			margin			: Number(this.ui['margin']),
			width 			: Number(this.ui['width']),
			textAlign		: this.ui['textAlign'],
			borderRadius	: Number(props.round ? UI.getRadius( this.ui['height'] ) : this.ui['borderRadius']),
			justifyContent  : 'center'
		};
		
		let txt = {
			fontSize   : UI.getFontSize( { maxScale : 2, minScale : 30, props : props, width : this.ui['width'], height : this.ui['height'] } ),
			fontWeight : this.ui['fontWeight'],
			color      : this.ui['color'],
			textAlign  : this.ui['textAlign'],
			
		};
		
		let attr = { 
				cover 		: cover, 
				txt 		: txt, 
				lable 		: lable, 
				themeName 	: themeName, 
		};
		return this.box( attr, props );
	}
	
	box( attr, props ){
		let theme = props.theme || 'basic';
		let charType = props.secure || false;
		let focus = props.autoFocus || true;
		let multi = props.multiline || false;
		if( UI.ios ) {
			return(
				 <TextInput 
		      		autoFocus={ focus } 
		      		style={[ attr['cover'], attr['txt'], attr['themeName'] ,{ paddingLeft:5 } ]} 
		      		onChangeText={ ( text ) => this.onType( props, text ) } 
				 	onFocus = { () => this.onTouch( props ) }
				 	onBlur = { () => this.onLeave( props ) }
				    secureTextEntry = { charType }
				    multiline = { multi }
				    placeholderTextColor ={ this.placeholderColor[theme] } 
		      		placeholder={ props.placeholder || "Write Here" }
				    defaultValue={ attr['lable'] }
				    autoCapitalize       = { "none" }
				 />
			);
		} else {
			return(
				<View style={ attr['cover'] }>
					 <TextInput 
			      		autoFocus={ focus } 
			      		style={[ attr['txt'], attr['themeName'] ,{ paddingLeft:5 } ]} 
			      		onChangeText={ ( text ) => this.onType( props, text ) } 
					 	onFocus = { () => this.onTouch( props ) }
					 	onBlur = { () => this.onLeave( props ) }
					    secureTextEntry = { charType }
					    multiline = { multi }
					    placeholderTextColor ={ this.placeholderColor[theme] } 
					 	placeholder={ props.placeholder || "Write Here" }
					    defaultValue={ attr['lable'] }
					    autoCapitalize       = { "none" }
					 />
			   </View>
			);
		}
	}
	

}	