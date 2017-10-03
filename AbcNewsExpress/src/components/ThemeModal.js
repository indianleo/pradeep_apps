/**
 * File Name : ThemeModal.js Author : Pradeep Yadav Description : ThemeModal
 * Theme Component Version : 1.0 Packege : Theme Components Last update : 11
 * March 2017
 */

import React, {Component} from 'react';
import {
	View,
	Text,
	Modal,
	TouchableOpacity,
	PanResponder,
} from 'react-native';

import { msg } 						 from './Language';
import VectorIcon 					 from 'react-native-vector-icons/FontAwesome';
import { Actions } 					 from 'react-native-router-flux';
import theme 					     from '../css/theme';
import { ActionList }				 from './ThemeAction';
import Style 						 from '../css/DynamicDimension';
import Button from './Button';

var _this;
var UI = ActionList();
var width = UI.width;
var height = UI.height;
var AppStatus = false;

export default class ThemeModal extends Component{

	constructor() {
		super();
		this.state ={
			show   : false,
			layout : "",
		};
		_this          	= this;
		this.msgData	= "";
		this.msgText 	= "";
		this.modalType 	= "";
		this.offline 	= "";
		this.controls 	= "";
		this.mode 		= false;
		this.pointY		= 0;
		this.positionList = {
			'center': height*.4,
			'bottom': 0,
		};
	};
	
	componentWillMount(){
    	/*UI.display({ onChange : _this._orientationDidChange });
    	UI.onSartApp(function(res){
    		AppStatus = res;
    	});
    	*/
    	this.createResponder();
    }
	
	createResponder(){
		this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder    : (event,gesturState) =>
        	{
        		this.pointY = gesturState.dy;
        		return true;
        	},
            onPanResponderRelease           : (e, gesturState) => 
        	{
        		// this.setRect(e.nativeEvent.locationX,e.nativeEvent.locationY);
        		// console.log("gu",gesturState.dy);
        		if( (this.pointY+5) < gesturState.dy ) {
        			this.onClose();
        		}
        		
            }
        });
	}
	
    _orientationDidChange ( orientation ) {
    	if( orientation != 'UNKNOWN'){
			UI.deviceInfo( AppStatus, function(res){
				height = res.height;
				width = res.width;
				_this.positionList = {
						'center': height*.4,
						'bottom': 0,
				};
				_this.setState({ layout : res.view });
			});
    	}
	}

	show( data ) {
		this.stateUpdator( data );
	}

	hide() {
		this.mode = false;
		this.setState({ show : false });
	}
    
    stateUpdator( data ) {
		this.msgData = data;
		this.postion = this.positionList[ data.position || 'bottom' ];
		this.msgText = data.msg || "Message Not Get";
		this.offline = data.offline || false;
		this.controls = this.renderBtn( data.modalType );
		this.mode = true;
		this.setState({ show : true });   
	}
	
	onConfirm() {
		if(this.msgData.onConfirm) {
			this.msgData.onConfirm();
		}
		this.mode = false;
		this.setState({ show : false });
	}
	
	onReject() {
		if(this.msgData.onReject) {
			this.msgData.onReject();
		}
		this.mode = false;
		this.setState({ show : false });
	}
	
	onClose() {
		if(this.msgData.onClose) {
			this.msgData.onClose();
		}
		this.mode = false;
		this.setState({ show : false });
	}
	
	backScreen() {
	   	 if( this.msgData.onBack ) {
	   		this.msgData.onBack(); 
	   	 } 
   		this.mode = false;
		this.setState({ show : false });
    }
	
	modalLayout() {
		if( this.msgData.ui ) {
			return(
				<View 
	           		style={[
	                    UI.setWidth(width), 
	                    theme.center, 
	                    (this.msgData.style || null),
	                    { 
	                    	position: 'absolute', 
	                    	bottom: this.postion, 
	                    	left: 0, 
	                    	borderColor: '#b3b3b3', 
	                    	borderWidth : 1, 
	                    	backgroundColor: '#fff'
	                    }
	                 ]}
		        >
					{ this.msgData.children } 
				</View>
			   
			);
		} else {
			let data = this.renderNotificationModal();
			return data;
		}
	
      
	}
	
	renderNotificationModal() {
		
		return(
           <View 
           		{...this.panResponder.panHandlers}
           		style={[
                    UI.setWidth(width), 
                    theme.center, 
                    { 
                    	position:'absolute', 
                    	bottom:this.postion, 
                    	left:0, 
                    	borderColor:'#b3b3b3', 
                    	borderWidth : 1, 
                    	backgroundColor:'#f2f2f2'
                    }
                 ]}
           >
               {
	              this.offline === false 
	                 ?  <View style={[ theme.center,UI.setWidth(width), theme.frame ]}>
	                      <View style={[ theme.frame ]}>
		                      <Text style={[ theme.textDefault, theme.h9, theme.textSharp ]}>
		                      	{ this.msgText }
		                      </Text>
		                  </View>
	                      { this.controls }
	                   </View>
	                :  <View>{ this.renderOffline() }</View>
               }
          </View>
		);
	}
	
	renderBtn( btnType ) {
        switch(btnType) {
          case 'notify' : return(
        		  <Button 
                	theme="btnDanger"
                	width="70"
                	height="30"
                	label="close"
                	onTouch={this.onClose.bind(this)} 
                />
              
          );
          break;
          case 'feedback' : return(
              <View style={[theme.rowStyle, { paddingBottom:10 } ]}>
                  <Button 
	              	theme="btnSuccess"
	              	width="80"
	              	height="30"
	              	margin="5"
	              	fontWeight="500"
	              	label="Yes"
	              	onTouch={this.onConfirm.bind(this)} 
	              />
                  <Button 
	              	theme="btnDanger"
	              	width="70"
	              	height="30"
	              	margin="5"
	              	fontWeight="500"
	              	label="No"
	              	onTouch={this.onClose.bind(this)} 
	              />
             </View>
          );
          break;
        }
     }

     renderOffline() {
       return(
	         <View style={[theme.center,UI.setHeight(height), {backgroundColor : '#fff'} ]}>
	             <Text style={[theme.center,theme.frame]}>
	               <VectorIcon 
	               		name={"error"} 
	               		size={24} 
	               		color={'#fff'} 
	               	/>
	             </Text>
	             <Text style={[ {fontWeight:'600',color:'#373737'} ]}>
	               {msg['cant_connection']}
	             </Text>
	             <Text style={[ theme.frame,{fontWeight:'500'} ]}>
	               {msg['check_connection']}
	             </Text>
	             <View style={[UI.setWidth(width),theme.rowStyle,theme.center]}>
		             <Button 
		              	theme="btnSuccess"
		              	width="130"
		              	height="35"
		              	margin="5"
		              	fontWeight="500"
		              	label="Try Again"
		              	onTouch={this.onClose.bind(this)} 
		              />
		             { this.msgData.noBack == true
		            	? null
		            	: <Button 
			              	theme="btnDanger"
			              	width="80"
			              	height="35"
			              	margin="5"
			              	fontWeight="500"
			              	label="Back"
			              	onTouch={ this.msgData.terminal ? this.onClose.bind(this) : this.backScreen.bind(this) } 
				          />
		              }
		          </View>
	         </View>
       );
     }
     
     render() { 
 		return(
 			<Modal
                animationType={"slide"}
                transparent={true}
                visible={ this.mode }
                onRequestClose={() => { this.onClose() }}
             >
	 			<View
					{...this.panResponder.panHandlers}
					style = {[ 
					    theme.pointCenter, 
					    { 
					    	backgroundColor : ( this.msgData.noBackdrop ? 'transparent' : '#000' ), 
					    	opacity : 0.6, 
					    }, 
					]}
				>
				</View>
 				{ this.modalLayout() }
 		    </Modal> 
 		);
 	}
	

}	