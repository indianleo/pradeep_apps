import React from 'react';
import {  
  Text, 
  View,
  TouchableOpacity, 
  ScrollView,
} from 'react-native';

import {
  ActionList,
} from './ThemeAction';
import Drawer         from 'react-native-drawer';

import { Actions } from 'react-native-router-flux';
import theme from '../css/theme';
import {
  Button,
  Title,
  Menu,
  ThemeModal,
  Pic,
} from './';

var UI = ActionList();
var width = UI.width;
var height = UI.height;
var _this;
export default class Home extends React.Component {

  constructor(){
    super();
    this.state ={
      menu : 0,
    };
    _this = this;
    this.menuList = {
          Home            : "Home",
          FreshNews       : "Fresh News",
          National        : "National", 
          State           : "State", 
          International   : "International", 
          Business        :  "Business",
          Entertainments  : "Entertainments",
          Business        : "Business",
          Sports          : "Sports",
          Education       : "Education",
      };
  }

  onMenuNavigation(PageName){
  
    Actions[PageName]();
  }

  openModal( data ){
    let msgData = {
      'modalType' : 'notify',
      'msg'       : data,
    };
    //ThemeModal.msgShow(msgData);
    this.refs.modal.show(msgData);
  }

  render() {
    return (
      <View>
          <View
            style = {[
               UI.setBg('#025271'),
               UI.setHeight(60),
               theme.row,
            ]}
          >
              <View
                style = {[
                    UI.setHeight(60),
                    UI.setWidth(width*.35),
                    theme.center,
                ]}
              >
                  <Text
                      style = {[
                          UI.setColor("#f2f2f2"),
                      ]}
                  >
                      Live Bid & News
                  </Text>
              </View>
              <View
                style = {[
                  theme.row,
                  UI.setHeight(60),
                  UI.setWidth(width*.65),
                  theme.center
                ]}
              >
                  <View
                    style ={[ UI.setMarginLeft(width*.2)]}
                  >
                      <Button
                          label = {"Login"}
                          style = {[ UI.setBorderRight(1,'#ccc')]}
                          textColor = {"#f2f2f2"}
                          height = {40}
                          width = {52}
                          onTouch = {()=>{this.onMenuNavigation('Login') } }
                      />
                  </View>
                  <View>
                      <Button
                          label = {"Register"}
                          textColor = {"#f2f2f2"}
                          height = {40}
                          width = {70}
                          onTouch = {()=>{this.onMenuNavigation('Join') } }
                      />
                  </View>
              </View>
          </View>
          <ScrollView
              style = {[
                UI.setHeight(height - 100),
              ]}
          >
              <Pic 
                  source = {require('../image/im1.jpg')}
                  height = {200}
              />
              <View
                style = {[
                    theme.row,
                    theme.center,
                    UI.setPaddingBottom(20),
                ]}
              >
                  <View
                      style = {[
                          UI.setPaddingAll(20),
                      ]}
                  >
                      <Text
                          style = {[
                              theme.textInfo,
                              UI.setFont(20),
                          ]}
                      >
                          What is Bid -
                      </Text>
                      <Text>
                          Biding is easiest way to purchase anything. It give opratunity to check your good luck.
                          Here you can bid on any desired item and if you have unique and low bid on that Item then you will
                          get that item.
                      </Text>
                  </View>
                  <Button
                      label = {"Bid Scheme"}
                      theme = {'borderInfo'}
                      border = {1}
                      height = {40}
                      width = {width*.5}
                      onTouch = { ()=>{ this.openModal('Bid Scheme wll be upadtes soon here..') } }
                  />
              </View>
              <Pic 
                  source = {require('../image/im2.jpg')}
                  height = {200}
              />
              <View
                style = {[
                    theme.row,
                    theme.center,
                ]}
              >
                  <View
                      style = {[
                          UI.setPaddingAll(20),
                      ]}
                  >
                      <Text
                          style = {[
                              theme.textInfo,
                              UI.setFont(20),
                          ]}
                      >
                          News Hub -
                      </Text>
                      <Text>
                          Here we are providing a News plateform which give fresh updates around you and your area.
                          this is place where you can find any type of news and update news which want to share also.
                      </Text>
                  </View>
                  <Button
                      label = {"Latest News"}
                      theme = {'borderInfo'}
                      border = {1}
                      height = {40}
                      width = {width*.5}
                      onTouch = { ()=>{ this.openModal('To get latest News Please Login / Register ') } }
                  />
                  
              </View>
          </ScrollView>
      
              
          <ThemeModal ref={"modal"} />   
      </View>
    );
  }
}
