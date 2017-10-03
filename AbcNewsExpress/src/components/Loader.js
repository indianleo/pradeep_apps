/**
 *  File Name   : Loader.js
 *  Author      : Pradeep Yadav
 *  Description : Loading ThemeComponent
 *  Version     : 1.0
 *  Packege     : pegoldnative.src.components.themeComponents
 *  Last update : 28 April 2017
 */

'use strict'
import React, {Component} from 'react';
import {
	View,
	ActivityIndicator, 
	ProgressBarAndroid,
} from 'react-native';
import theme from '../css/theme';
import { ActionList } from './ThemeAction';

var UI = ActionList();

export default class Loader extends Component {
  _getSpinner( props ) {
	  if (UI.type === 'android') {
      return (
        <ProgressBarAndroid 
        	style={{ color : (props.color=="#f8ac59") ? '#f8ac59' : null }} 
        	styleAttr="Inverse" {...props} 
        />
      );
    } else {
	  return (
        <ActivityIndicator
	        animating ={ props.animating }
        	color = { props.color || '#999999' } 
	        size={ props.size || 'large'}
        	style={[ UI.setMarginTop( (props.width > props.height) ? -(props.width*.08) : -(props.height*.08) ) ]}
        />
      
      )
    }
  }
  
  render() {
	  let props =  this.props;
    return (
       ( (props.animating) 
    	   ?  <View 
	   			  style={[
	   			      theme.absolute,
	   			      UI.setFullScreen( props.width, props.height ),
	   			      theme.center,
	   			      theme.bgTransparents,
	   			      UI.setZindex(99999),
	   		      ]}
	   		  >
			      <ActivityIndicator
			       	 animating ={ props.animating }
			   		 color = { props.color || '#999999' } 
			       	 size={ props.size || 'large'}
			   		 style={[ UI.setMarginTop( (props.width > props.height) ? -(props.width*.08) : -(props.height*.08) ) ]}
			      />
       			 { this.props.noBackdrop ? null : <View style={[theme.pointCenter,theme.bgBlack,UI.setOpacity(.2) ]}></View> } 
	   		  </View>
	   	  :  null
       )
    );
  }
  
}
