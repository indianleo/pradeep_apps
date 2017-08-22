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
	TextBox,
	Loader,
} from './';

import { ActionList } from './ThemeAction';
import theme from '../css/theme';
const UI = ActionList();
let { height, width } = UI;
let _this;

export default class Upload extends React.Component {
	constructor(){
		super();
		_this = this;
		this.state = { isOpen : false };
		this.sidePane = "";
		this.title = "";
		this.details = "";
		this.pic = "";
		this.place = "";
		this.type = "";
		this.userEmail = "";
	}

	componentWillMount(){
		this.sidePane = <Menu />;
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
	      title : this.title,
	      pic : this.pic,
	      type : this.type,
	      place : this.place,
	      details : this.details,
	      userEmail : this.userEmail,
	      program : "news",
	    };


	    let call = new XMLHttpRequest();
	    call.onreadystatechange = function()
	    {
	      if(call.readyState==4 && call.status==200)
	      {
	         //console.log("data = ",call.responseText); 
	         _this.setState({ isOpen : false }); 
	        _this.openModal("News Submited Succesfully! \n Congaratulations! You have get 1 Bid Coin");
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
         case 'title' : this.title = char;
         break;
         case 'pic' : this.pic = char;
         break;
         case 'type' : this.type = char;
         break;
         case 'place' : this.place = char;
         break;
         case 'details' : this.details = char;
         break;
         default : this.openModal("Field Does't Match");
         break;
      }
  	}

	render() {

		return(
			<Drawer 
		        ref = "drawer" 
		        type = "overlay" 
		        content = {this.sidePane} 
		        tapToClose = {true} 
		        openDrawerOffset = {0.2} 
		        panCloseMask = {0.2} 
		        closedDrawerOffset = {-3} 
		        styles = {{ drawer: {backgroundColor:'white',borderColor:'#bbbbbb',borderWidth:1,shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3}}}
		    >	
		    	<Navbar
	                title = {"Upload News"}
	                onMenuTouch = {this.onMenuNavigation.bind(this)}
	            />
	            <View>
	                <Pic
	                   source = {require('../image/upload.png')}
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
	                        placeholder= {"Title"}
	                        onType = {( char )=>{ this.store('title', char ) }}
	                    />
		    		</View>
		    		<View>
		    			<TextBox 
	                        height = {50}
	                        placeholder= {"Type"}
	                        onType = {( char )=>{ this.store('type', char ) }}
	                    />
		    		</View>
		    		<View>
		    			<TextBox 
	                        height = {50}
	                        placeholder= {"Picture"}
	                        onType = {( char )=>{ this.store('pic', char ) }}
	                    />
		    		</View>
		    		<View>
		    			<TextBox 
	                        height = {50}
	                        placeholder= {"Place"}
	                        onType = {( char )=>{ this.store('contact', char ) }}
	                    />
		    		</View>
		    		<View>
		    			<TextBox 
	                        height = {50}
	                        placeholder= {"News Details"}
	                        onType = {( char )=>{ this.store('details', char ) }}
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