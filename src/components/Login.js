import React from 'react';
import {  
  Text, 
  View,
  Keyboard,
} from 'react-native';

import {
  ActionList,
} from './ThemeAction';
import theme from '../css/theme';
import {
  Button,
  Loader,
  Menu,
  Navbar,
  Pic,
  TextBox,
  ThemeModal,
} from './';

var UI = ActionList();
var width = UI.width;
var height = UI.height;
var _this;
export default class Login extends React.Component {

  constructor(){
    super();
    this.state ={
      menu : 0,
      isOpen : false,
      scrollHeight : 0,
    };
    _this = this;
    this.user = "";
    this.pass = "";
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
    let msgData = {
      'modalType' : 'notify',
      'msg'       : "Login to open Menu",
    };
    this.refs.modal.show(msgData);
  }

  openModal( msg ){
    let msgData = {
      'modalType' : 'notify',
      'msg'       : msg,
    };
    this.refs.modal.show(msgData);
  }

  checkUser(){
    let admin = { user : "admin", pass : "admin" };
    if( admin.user == this.user && admin.pass == this.pass ){
        UI.location('WelcomeAdmin');
    } else {
      this.send();
      //_this.openModal("!!! Access Denied !!!");
    }
  }

  store( field, char ) {
      switch( field ) {
         case 'user' : this.user = char;
         break;
         case 'pass' : this.pass = char;
         break;
         default : alert("Field Does't Match");
         break;
      }
  }

  send(){
    let data = {
      email : this.user,
      pass : this.pass,
      action : "login",
    };

    let call = new XMLHttpRequest();
    call.onreadystatechange = function()
    {
      if(call.readyState==4 && call.status==200)
      {
         this.isValid = call.responseText;
         if( this.isValid ){
            UI.location('Welcome');
         } 
         else {
            _this.openModal("!! Access Denied !!"); 
         }
        _this.setState({ isOpen : false }); 
      }
      else
      {
          if( !_this.state.isOpen ){
            _this.setState({ isOpen : true });
          }
      }
    }
    call.open( "GET", UI.server + "action.php?data=" + JSON.stringify(data), true );
    call.send(); 
  }

  render(){
    return(
      <View
           style={[
               UI.setScreen(width,height),
           ]}
        >
            <Navbar
                title = {"Login"}
                onMenuTouch = {this.onMenuNavigation.bind(this)}
            />
            <View>
                <Pic
                   source = {require('../image/login_banner.jpg')}
                   height = {150}
                />
            </View>
            <View
                style = {[
                    theme.center
                ]}
            >
              <TextBox
                  height = {60}
                  onType = {( char )=>{ this.store('user',char ) }}
                  placeholder = {"User"}             
               />

              <TextBox
                  height = {60}
                  secure = {true}
                  onType = {( char )=>{ this.store('pass',char ) }}
                  placeholder = {"Password"}             
               />
            </View>
            <View
                style = {[ theme.center,theme.row ]}
            >
                <Button
                    label = {"Login"}
                    theme = {'btnSuccess'}
                    height = {30}
                    width = {70}
                    onTouch = {()=>{ this.checkUser() }}
                />
                <Button
                    label = {"Back"}
                    style = {[ UI.setMarginLeft(5)]}
                    theme = {'btnWarning'}
                    height = {30}
                    width = {70}
                    onTouch = {()=>{ this.send() }}
                />
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
            <ThemeModal ref={"modal"}/>
        </View>
    );
  }
}