import React from 'react';
import {
	View,
	Text,
} from 'react-native';
import Drawer from 'react-native-drawer';
import{
	Button,
	Pic,
	Navbar,
	ThemeModal,
	Menu,
	AdminMenu,
	TextBox,
	Loader,
} from './';

import { ActionList } from './ThemeAction';
import theme from '../css/theme';
const UI = ActionList();
let { height, width } = UI;
let _this;

export default class Invite extends React.Component {
	constructor(){
		super();
		_this = this;
		this.state = { isOpen : false };
		this.userEmail = "singh.anamika.19.01@gmail.com";
		this.allyName = "";
		this.allyMobile = "";
		this.allyEmail = "";
	}

	componentWillMount(){
	}

	onMenuNavigation() {
	   this.refs.drawer.open();
	}

	openModal( msg ){
	    let msgData = {
	      'modalType' : 'notify',
	      'msg'       : msg,
	    };
	    this.refs.modal.show(msgData);
	}

	send(){
	    let data = {
	      userEmail : this.userEmail,
	      allyName : this.allyName,
	      allyEmail : this.allyEmail,
	      allyMobile : this.allyMobile,
	      program : 'invite',
	    };


	    let call = new XMLHttpRequest();
	    call.onreadystatechange = function()
	    {
	      if(call.readyState==4 && call.status==200)
	      {
	         //console.log("data = ",call.responseText); 
	         _this.setState({ isOpen : false }); 
	        _this.openModal("News Submited Succesfully! /n Congaratulations! You have get 1 Bid Coin");
	      }
	      else
	      {
	           _this.setState({ isOpen : true });
	      }
	    }
	    call.open( "GET", UI.localhost + "guest.php?data=" + JSON.stringify(data), true );
	    call.send(); 
	}

  	store( field, char ) {
      switch( field ) {
         case 'name' : this.title = char;
         break;
         case 'email' : this.pic = char;
         break;
         case 'contact' : this.type = char;
         break;
         default : this.openModal("Field Does't Match");
         break;
      }
  	}

	render() {
		const sidePane = ( this.props.user == "admin" ? <AdminMenu /> : <Menu  user={this.props.user} userEmail = {this.props.userEmail} /> );
		return(
			<Drawer 
		        ref = "drawer" 
		        type = "overlay" 
		        content = {sidePane} 
		        tapToClose = {true} 
		        openDrawerOffset = {0.2} 
		        panCloseMask = {0.2} 
		        closedDrawerOffset = {-3} 
		        styles = {{ drawer: {backgroundColor:'white',borderColor:'#bbbbbb',borderWidth:1,shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3}}}
		    >	
		    	<Navbar
	                title = {"Invite & Earn"}
	                onMenuTouch = {this.onMenuNavigation.bind(this)}
	            />
	            <View>
	                <Pic
	                   source = {require('../image/refer.png')}
	                   height = {150}
	                />
	            </View>
		    	<View
		    		style = {[
		    			theme.center,
		    		]}
		    	>
		    		<View>
		    			<TextBox 
	                        height = {50}
	                        placeholder= {"Friend Name"}
	                        onType = {( char )=>{ this.store('name', char ) }}
	                    />
		    		</View>
		    		<View>
		    			<TextBox 
	                        height = {50}
	                        placeholder= {"Friend Email"}
	                        onType = {( char )=>{ this.store('email', char ) }}
	                    />
		    		</View>
		    		<View>
		    			<TextBox 
	                        height = {50}
	                        placeholder= {"Friend Contact No."}
	                        onType = {( char )=>{ this.store('contact', char ) }}
	                    />
		    		</View>
		    		<View>
		    			<Button
		    				height = {40}
		    				width = {100}
		    				label = {"Submit"}
		    				theme = {'btnSuccess'}
		    				onTouch = { this.send.bind(this) }
		    			/>
		    		</View>
		    	</View>
		    	{
		    		this.state.isOpen 
		    			?
		    				<View
	                            style={[
	                              theme.absolute,
	                            ]}
	                        >
	                            <Loader
	                              animating = { this.state.isOpen }
	                              height = {height}
	                              width = {width}
	                              color = { '#178484'}
	                            />
		                     </View>
		    			:
		    				null
		    	}
		    	<ThemeModal ref={"modal"} />
		    </Drawer>
		);
	}
}