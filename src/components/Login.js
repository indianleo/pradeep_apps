import React from 'react';
import {  
  Text, 
  View 
} from 'react-native';

import {
  ActionList,
} from './ThemeAction';
import theme from '../css/theme';
import {
  Button,
  Title,
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
    };
    _this = this;
  }

  onMenuNavigation() {
    let msgData = {
      'modalType' : 'notify',
      'msg'       : "Login to open Menu",
    };
    this.refs.modal.show(msgData);
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
                  placeholder = {"User"}             
               />

              <TextBox
                  height = {60}
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
                    onTouch = {()=>{ UI.location('Welcome') }}
                />
                <Button
                    label = {"Back"}
                    style = {[ UI.setMarginLeft(5)]}
                    theme = {'btnWarning'}
                    height = {30}
                    width = {70}
                    onTouch = {()=>{ UI.location('Home') }}
                />
            </View>
            <ThemeModal ref={"modal"}/>
        </View>
    );
  }
}