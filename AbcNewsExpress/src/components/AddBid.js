import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	WebView,
	Keyboard,
} from 'react-native';

import Drawer from 'react-native-drawer';
import theme from '../css/theme';
import { ActionList } from './ThemeAction';
import { gateway } from './Gateway.js'
import {
	Button,
	Navbar,
	Menu,
	AdminMenu,
	Pic,
	TextBox,
} from './';

const UI = ActionList();
let width = UI.width;
let height = UI.height;
let _this;
let appPath = "file:///android_asset/";
export default class AddBid extends React.Component{
	constructor(){
		super();
		this.state = { menu : 0, checkout : false, scrollHeight : 0 };
		this.bids = 0;
		this.name = "";
		this.email = "";
		this.contact = "";
		this.zip = "";
		this.city = "";
		this.cityState = "";
		this.country = "";
		this.address = "";
		this.area = "";
		this.data = {};
		_this = this;
	}

	componentWillMount () {
	    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
	    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
	  }

	  componentWillUnmount () {
	    this.keyboardDidShowListener.remove();
	    this.keyboardDidHideListener.remove();
	  }

	  _keyboardDidShow (e) {
	    _this.setState({ scrollHeight : height - e.endCoordinates.height});
	  }

	  _keyboardDidHide (e) {
	     _this.setState({ scrollHeight : height });
	  }

	onMenuNavigation() {
	    this.refs.drawer.open();
	    this.setState({ menu : 0 });
	}

	 store( field, char ) {
	      switch( field ) {
	         case 'name' : this.name = char;
	         break;
	         case 'email' : this.email = char;
	         break;
	         case 'contact' : this.contact = char;
	         break;
	         case 'city' : this.city = char;
	         break;
	         case 'bids' : this.bids = char;
	         break;
	         case 'address' : this.address = char;
	         break;
	         case 'area' : this.area = char;
	         break;
	         case 'zip' : this.zip = char;
	         break;
	         case 'country' : this.country = char;
	         break;
	         case 'state' : this.cityState = char;
	         break;
	         default : alert("Field Does't Match");
	         break;
	      }
	  }

	 send(){
	 	this.data = {
	 		name : this.name,
	 		email : this.email,
	 		contact : this.contact,
	 		city : this.city,
	 		bids : this.bids*10,
	 		address : this.address,
	 		area : this.area,
	 		zip : this.zip,
	 		country : this.country,
	 		state : this.cityState,
	 	};

	 	this.setState({ checkout : true });
	 }

	_webViewAction( navState ){ 

	}

	renderLayout(){
		if(this.state.checkout) {
			let html = gateway(this.data);
		    return(
		        	<WebView 
						source                  = {{ html : html , baseUrl : appPath }}
			          	scalesPageToFit         = { !UI.ios }
						style                   = {{ width : width }}
						onNavigationStateChange = { this._webViewAction } 
			        />
			);
		}
		else{
			return(
			    	<View style={[theme.center]}>
		              <ScrollView style= {[ UI.setHeight( (this.state.scrollHeight) - 100)]}>
		              	<View>
		                    <TextBox 
		                        height = {50}
		                        placeholder= {"Bid Counts"}
		                        onType = {( char )=>{ this.store('bids', char ) }}
		                    />
		                </View>

		                <View>
		                    <TextBox 
		                        height = {50}
		                        placeholder= {"Name on Card"}
		                        onType = {( char )=>{ this.store('name', char ) }}
		                    />
		                </View>

		                
		                <View>
		                    <TextBox 
		                        height = {50}
		                        placeholder= {"Street Address"}
		                        onType = {( char )=>{ this.store('address',char ) }}
		                    />
		                </View>

		                <View>
		                    <TextBox 
		                        height = {50}
		                        placeholder= {"Area"}
		                        onType = {( char )=>{ this.store('area',char ) }}
		                    />
		                </View>

		                <View>
		                    <TextBox 
		                        height = {50}
		                        placeholder= {"Contact No."}
		                        onType = {( char )=>{ this.store('contact', char ) }}
		                    />
		                </View>

		                <View>
		                    <TextBox 
		                        height = {50}
		                        placeholder= {"Email"}
		                        onType = {( char )=>{ this.store('email', char ) }}
		                    />
		                </View>

		                <View>
		                    <TextBox 
		                        height = {50}
		                        placeholder= {"City"}
		                        onType = {( char )=>{ this.store('city', char ) }}
		                    />
		                </View>
		                <View>
		                    <TextBox 
		                        height = {50}
		                        placeholder= {"State"}
		                        onType = {( char )=>{ this.store('state', char ) }}
		                    />
		                </View>

		                <View>
		                    <TextBox 
		                        height = {50}
		                        placeholder= {"Zip Code"}
		                        onType = {( char )=>{ this.store('zip', char ) }}
		                    />
		                </View>

		                <View>
		                    <TextBox 
		                        height = {50}
		                        placeholder= {"Country"}
		                        onType = {( char )=>{ this.store('country', char ) }}
		                    />
		                </View>

		                <View
		                    style = {[ theme.row, theme.center, ]}
		                >
		                    <Button
		                      height={30}
		                      width={70}
		                      label={"Submit"}
		                      theme={"btnSuccess"}
		                      onTouch = { ()=>{ this.send() }}
		                    />
		                    <Button
		                      height={30}
		                      width={70}
		                      style = {[ UI.setMarginLeft(5), ]}
		                      label={"Back"}
		                      theme={"btnDanger"}
		                      onTouch = { ()=>{ UI.location('Home') }}
		                    />
		                </View>
		              </ScrollView>
		            </View>
		        );
		    }
	}

	render(){
		let sidePane = ( this.props.user == "admin" ? <AdminMenu /> : <Menu  user={this.props.user} userEmail = {this.props.userEmail} /> );
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
				<View
		              style = {[
		              	UI.setFullScreen(width,height),
		              ]}
		        >
		        	<Navbar
		              title = {"Pucrchase Bid"}
		              onMenuTouch = {this.onMenuNavigation.bind(this)}
		            />
		            { this.renderLayout() }
		        </View>
		    </Drawer>
		);
	}
}