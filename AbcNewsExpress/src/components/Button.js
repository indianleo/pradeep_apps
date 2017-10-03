/**
 *  File Name   : Button.js
 *  Author      : Pradeep Yadav
 *  Description : Button Theme Component
 *  Version     : 1.0
 *  Packege     : pegoldnative.src.components.themeComponents
 *  Last update : 08 March 2017
 */

import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ActivityIndicator,
	Modal
} from 'react-native';

import VectorIcon from 'react-native-vector-icons/FontAwesome';
import Ratio						 	from '../css/DynamicDimension';
import btnStyle 					 	from '../css/theme';
import { ActionList } from './ThemeAction';
var Loader = require('./Loader');
var UI = ActionList();
var height = UI.height;
var width = UI.width;

export default class Button extends Component{

	constructor() {
		super();
		this.state = {
			loading : false,
			error   : false,
			type	: "",
		};
		_this          = this;
		this.type      = "";
		this.ui        = "";
		this.textColor = ""
	};
	
	onTouch( props ) {
		if(props.onTouch){
			props.onTouch();
		}
	}
	
	onLongTouch( props ) { 
		if( props.onLongTouch ) {
			props.onLongTouch();
		}
	}
	
	render() {
		this.start( this.props );
		return(
			<View>
				{this.renderBtn( this.props )}
			</View>
		);
	}
	
	start( props ) {
		this.ui = UI.getUi( props );
		this.textColor = UI.getThemeTextColor();
	}
	
	renderBtn( props ) {
		
		let theme = btnStyle[props.theme];
		let label = props.label || null;
		let style = props.style || null;
		
		let btn = {
			borderWidth 	: Number(this.ui['borderWidth']), 
			backgroundColor : this.ui['backgroundColor'],
			borderColor 	: this.ui['borderColor'],
			height			: Number( props.size || this.ui['height'] ),
			width 			: Number( props.size || this.ui['width'] ),
			margin			: Number(this.ui['margin']),
			borderRadius	: Number(props.round ? UI.getRadius( this.ui['height'] ) : this.ui['borderRadius']),
			justifyContent  : 'center',
		};
		
		let txt = {
			fontSize   : UI.getFontSize( { maxScale : 7, minScale : 40, props : props, width : this.ui['width'], height : this.ui['height'] } ),
			//fontWeight : this.ui['fontWeight'],
			color      : props.theme ? this.textColor[props.theme] : this.ui['color'],
			textAlign  : this.ui['textAlign'],
			
		};
		
		let attr = { btn : btn, txt : txt, label : label, theme : theme, style : style };
		return this.button( attr, props );
	}
	
	load() {
		//console.log("Loading...");
		this.setState({ loading : true });
	}
	
	loadEnd() {
		//console.log("Loading End");
		this.setState({ loading : false });
	}
	
	onError(e) {
		//console.log("Error",e);
		this.setState({ error : true, loading : false });
	}
	
	renderImage( attr, props ) {
		if( this.state.error) {
			return(
					<VectorIcon name={"error"} size={props.size} color={props.textColor} />
				);
		} else {
			return(
					<Image
			            style={[ attr['btn'] ]}
			            source={{ uri : props.image }}
					    onLoadStart={() => { this.load() } }
					    onLoadEnd={() => { this.loadEnd() } }
					    onLoad={() => { this.load() } }
				 	    onError= {(e) => { this.onError(e) } }
					/>
			);
		}
	}
	
	renderLayout( attr, props ) {
		let local = this;
		let color = attr['txt']['color'];
		let localWidth = attr['btn']['width'];
		let localHeight = attr['btn']['height']
		let iconCat = props.iconCat || "normal";
		let iconFont = attr['txt']['fontSize'];
		let lineHeight = localHeight / iconFont
		
		if( props.image ) {
			let content = this.renderImage( attr, props );
			return(
			   content
			);
		} else if( props.loginBtn ) {
			return(
				<View style={ btnStyle.rowStyle } >
				    <Text style={[ attr['txt'],{ width : localWidth*.75 } ]}>
				       { ( props.loading ) ? 'Please wait...' : attr['label'] }
					</Text>
		    		{ (props.loading)
		    			? <ActivityIndicator
	    					animating={ props.loading }
					 		style={[ attr['txt'] ]}
							color={ color }
							size="small"
						  />
		    			: null
				   	}
		    	</View>
			);
		} else if( props.labelIcon ) {
			return(
			   <View style={ btnStyle.rowStyle }>
			      <Text style={[ attr['txt'] ,{ width : localWidth*.75 }]}>
					{attr['label']}
				  </Text>
				  <VectorIcon name={props.icon} size={props.size} color={props.textColor} />
			   </View>
			);
		} else {
			return(
		      <Text style={[ attr['txt'] ]}>
				{props.label ? attr['label'] : null }
				{props.icon ? <VectorIcon name={props.icon} size={props.size} color={props.textColor} /> : null }
			  </Text>
			);
		}
	}	
	
	button( attr, props ) {
		return(
			<TouchableOpacity 
				style={[ attr['btn'], attr['style'], btnStyle.center, attr['theme'], { opacity : props.opacity } ]} 
				onPress={()=>this.onTouch( props )} onLongPress={()=>this.onLongTouch( props ) } 
			>
				{ this.renderLayout( attr, props ) }
			</TouchableOpacity>
		);
	}
	
	
	
	
	
}	