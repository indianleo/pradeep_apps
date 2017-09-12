/**
* File Name : BidUpdate.js
*//**
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
export default class BidUpdate extends React.Component {

  constructor(){
    super();
    this.state ={
      menu : 0,
      load : false,
    };
    _this = this;
    this.bid_state = "";
    this.bid_info = "";
    this.name = "";
    this.image = "";
  }

  onMenuNavigation() {
    this.refs.drawer.open();
    this.setState({ menu : 0 });
  }

  componentWillMount(){
   
  }

  store( field, char ) {
      switch( field ) {
         case 'name' : this.name = char;
         break;
         case 'image' : this.image = char;
         break;
         case 'state' : this.bid_state = char;
         break;
         case 'info' : this.bid_info = char;
         break;
         default : alert("Field Does't Match");
         break;
      }
  }

  send(){
    let data = {
      name : this.name,
      image : this.image,
      bid_state : this.bid_state,
      bid_info : this.bid_info,
      action : "bid_item_mobile_update",
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
	                        placeholder= {"Name"}
	                        onType = {( char )=>{ this.store('name', char ) }}
	                    />
	                </View>
	                <View>
	                    <TextBox 
	                        height = {50}
	                        placeholder= {"Bid Image"}
	                        onType = {( char )=>{ this.store('image', char ) }}
	                    />
	                </View>
	                <View>
	                    <TextBox 
	                        height = {50}
	                        placeholder= {"Bid State"}
	                        onType = {( char )=>{ this.store('state', char ) }}
	                    />
	                </View>
	                <View>
	                    <TextBox 
	                        height = {50}
	                        placeholder= {"Bid Info"}
	                        onType = {( char )=>{ this.store('info', char ) }}
	                    />
	                </View>
	                <View>
	                    <Button
		                      height={40}
		                      width={100}
		                      label={"UpLoad Item"}
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