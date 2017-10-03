/**
* File Name : BidReq.js
* Author    : Anamika Singh
*/
import React from 'react';
import {  
  Text, 
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  ActionList,
} from './ThemeAction';
import Drawer         from 'react-native-drawer';
import VectorIcon from 'react-native-vector-icons/FontAwesome';
import theme from '../css/theme';
import {
  Button,
  TextBox,
  AdminMenu,
  Navbar,
  Pic,
  ThemeModal,
  Loader
} from './';

var UI = ActionList();
var width = UI.width;
var height = UI.height;
var _this;
export default class BidReq extends React.Component {

  constructor(){
    super();
    this.state ={
      menu : 0,
      load : false,
    };
    _this = this;
    this.email = "";
    this.bid_coins = "";
  }

  onMenuNavigation() {
    this.refs.drawer.open();
    this.setState({ menu : 0 });
  }

  componentWillMount() {
    UI.setBack();
  }

  store( field, char ) {
      switch( field ) {
         case 'email' : this.email = char;
         break;
         case 'bid_coins' : this.bid_coins = char;
         break;
         default : alert("Field Does't Match");
         break;
      }
  }

  send(){
    let data = {
      email : this.email,
      bid_coins : this.bid_coins,
      action : "bid_coin_mobile_update",
    };

    let call = new XMLHttpRequest();
    call.onreadystatechange = function()
    {
      if(call.readyState==4 && call.status==200)
      {
          data = call.responseText;
         _this.openModal(data); 
        _this.setState({ load : false }); 
      }
      else
      {		if( !_this.state.load ) {
      			 _this.setState({ load : true });
      		}
      }
    }
    call.open( "GET", UI.server + "action.php?data=" + JSON.stringify(data), true );
    call.send(); 
  }

  openModal( data ){
    let msgData = {
      'modalType' : 'notify',
      'msg'       : data,
    };
    this.refs.modal.show(msgData);
  }

  render(){
    var sidePane = <AdminMenu />;
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
           style={[
               UI.setScreen(width,height),
           ]}
        >
          <Navbar
              title = {"Bid Request"}
              onMenuTouch = {this.onMenuNavigation.bind(this)}
          />
	        <ScrollView
	            style = {[
	                UI.setHeight(height - 200),
	            ]}
	        >
	            <View
	                style = {[ theme.center ]}
	            >
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
	                        placeholder= {"Bid Coins"}
	                        onType = {( char )=>{ this.store('bid_coins', char ) }}
	                    />
	                </View>
	                <View>
	                    <Button
		                      height={30}
		                      width={70}
		                      label={"Request"}
		                      theme={"btnSuccess"}
		                      onTouch = { ()=>{ this.send() }}
		                />
	                </View>
	            </View>
	        </ScrollView>
      		{
             	this.state.load 
             		?
             			<View style={[ theme.pointCenter ]}>
             				<Loader
             					animating ={ true }
             					height= {height}
             					width = {width}
             				/>
             			</View>

             		:
             			null
             } 
          	<ThemeModal ref={"modal"}/> 
        </View>
      </Drawer>
    );
  }
}