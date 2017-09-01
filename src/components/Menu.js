import React,{Component} from 'react';
import {  
	Text, 
	View,
  TouchableOpacity,
  ScrollView 
} from 'react-native';

import {
	ActionList,
} from './ThemeAction';
import theme from '../css/theme';
import { Actions } from 'react-native-router-flux';
import {
  Button,
  Pic,
} from './';

var UI = ActionList();
var width = UI.width;
var height = UI.height;
var _this;
export default class Menu extends Component {
  constructor(){
  	super();
    this.menuList = {
          Welcome         : "Home",
          User            : "User",
          Bid             : "Live Bid",
          Invite          : "Invite",
          Upload          : "Upoad News",
          FreshNews       : "Latest News",
          National        : "National", 
          State           : "State", 
          International   : "International", 
          Business        :  "Business",
          Entertainments  : "Entertainments",
          Business        : "Business",
          Sports          : "Sports",
          Education       : "Education",
          AddBid          :  "Add Bid",
          Home            :  "Logout"
      };
  }

  onMenuNavigation(PageName){
    Actions[PageName]();
  }

  renderMenu() {
      let mArr = [];
      for(let key in this.menuList){
          mArr.push(
            <TouchableOpacity
                key = {key}
                style = {[
                    theme.center,
                    UI.setBg('#008080'),
                    UI.setHeight(40),
                    UI.setBorderBottom(1,'#ccc'),
                ]}
                onPress = { ()=>{ this.onMenuNavigation(key) } }
            >
                <Text 
                    style = {[
                        UI.setColor("#fff"),
                        theme.textSharp,
                        UI.setFont(20)
                    ]}
                >
                    {this.menuList[key]}
                </Text>
            </TouchableOpacity>
          );
      }

      return mArr;
  }

  render() {
  	return(
  		<View
        	 style={[
        	 	UI.setScreen(width*.8,height),
        	 ]}
        >
            <View
                style = {[
                  UI.setBg('#006666'),
                  UI.setHeight(100),
                  theme.center,
                  theme.row,
                ]}
            > 
                <View
                    style = {[
                        theme.center,
                        theme.frameMd,
                        UI.setWidth(width*.2),
                    ]}
                >
                    <Pic 
                       source = {require('../image/user_female.png')}
                       height = {50}
                       width  = {50}
                    />
                </View>
                <View
                    style = {[
                        UI.setWidth(width*.6),
                    ]}
                >
                    <Text
                        style = {[
                          UI.setColor("#fff"),
                          UI.setFont(20),
                        ]}
                        numberOfLines = {1}
                    >
                        Anamika Singh
                    </Text>
                    <Text
                        style = {[
                          UI.setColor("#fff"),
                          UI.setFont(16),
                        ]}
                        numberOfLines = {1}
                    >
                        singh.anamika.19.01@gmail.com
                    </Text>
                </View>
            </View>
            <ScrollView
              style = {[ UI.setHeight(height-100)]}
            >
              { this.renderMenu() }
            </ScrollView>
  		</View>
  	);

  }
}