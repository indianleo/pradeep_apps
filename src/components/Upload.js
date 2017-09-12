import React from 'react';
import {
	View,
	Text,
	Keyboard,
	ScrollView,
	Picker
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

export default class Upload extends React.Component {
	constructor(){
		super();
		_this = this;
		this.state = { 
			isOpen 			: false, 
			scrollHeight 	: height,
			selected 		: "Category", 
		};
		this.sidePane = "";
		this.title = "";
		this.details = "";
		this.pic = "";
		this.place = "";
		this.type = "";
		this.userEmail = "";
	}

	componentWillMount () {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
      UI.setBack();
      this.sidePane = ( this.props.user == "admin" ? <AdminMenu /> : <Menu /> );
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    UI.unsetBack();
  }

  _keyboardDidShow (e) {
    _this.setState({ scrollHeight : height - e.endCoordinates.height});
  }

  _keyboardDidHide (e) {
     _this.setState({ scrollHeight : height });
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
	      cat : this.state.selected.toLowerCase(),
	      place : this.place,
	      info : this.details,
	      date : "00-00-0000",
	      uploadBy : this.userEmail,
	      action : "update_mobile_news",
	    };


	    let call = new XMLHttpRequest();
	    call.onreadystatechange = function()
	    {
	      if(call.readyState==4 && call.status==200)
	      {
	         let data = call.responseText; 
	         _this.setState({ isOpen : false }); 
	        _this.openModal(data);
	      }
	      else
	      {
	           _this.setState({ isOpen : true });
	      }
	    }
	    call.open( "GET", UI.server + "action.php?data=" + JSON.stringify(data), true );
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
	            <ScrollView
	            	style = {[ UI.setHeight( (this.state.scrollHeight) - 220 ) ]}
	            >
			    	<View
			    		style = {[
			    			theme.center,
			    		]}
			    	>
			    		
			    		<View style ={[ UI.setWidth(width - 30),UI.setBorderBottom(1,'#ccc')]} >
		                    <Picker
		                        selectedValue  = { this.state.selected }
		                        onValueChange =  {(itemValue, itemIndex) => this.setState({ selected : itemValue }) }
		                        mode = {"dropdown"}
		                    >
		                        <Picker.Item label="Category" value="latest" />
								<Picker.Item value="latest" label="Latest" />
								<Picker.Item value="state" label="State" />
								<Picker.Item value="sports" label="Sports" />
								<Picker.Item value="marketing" label="Bssiness" />
								<Picker.Item value="national" label="National" />
								<Picker.Item value="international" label="International" />
								<Picker.Item value="education" label="Education" />
								<Picker.Item value="entertainment" label="Entertainment" />
		                    </Picker>
		                </View>
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
		                        placeholder= {"Picture"}
		                        onType = {( char )=>{ this.store('pic', char ) }}
		                    />
			    		</View>
			    		<View>
			    			<TextBox 
		                        height = {50}
		                        placeholder= {"News Source"}
		                        onType = {( char )=>{ this.store('place', char ) }}
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
			    </ScrollView>
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