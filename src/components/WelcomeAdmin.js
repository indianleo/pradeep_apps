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
  AdminMenu,
  Navbar,
  Pic,
  ThemeModal,
} from './';

var UI = ActionList();
var width = UI.width;
var height = UI.height;
var _this;
export default class WelcomeAdmin extends React.Component {

  constructor(){
    super();
    this.state ={
      menu : 0,
    };
    _this = this;
    this.itemList = {
          Bid             : { title : "Live Bid", icon : "bar-chart", details : "Manage Biding on Products" },
          BidUpdate       : { title : "Bid Product Update",  icon : "user", details : "Admin can update Bid Products" },
          ManageBid       : { title : "Manage Bid Products",  icon : "user", details : "Admin can Manage Bid Products" },
          ManageUsers     : { title : "View Users",  icon : "users", details : "Admin can Manage Users" },
          BidReq          : { title : "Bid Request",  icon : "users", details : "Admin can Add Bids to Users" },
          Upload          : { title : "Upload News",  icon : "cloud-upload", details : "Upload news and get Bid Coins" },
          FreshNews       : { title : "Latest News",  icon : "newspaper-o", details : "Latest News Updates" },
          National        : { title : "National", icon : "flag", details : "National News Updates" }, 
          State           : { title : "State", icon : "newspaper-o", details : "State News Updates" }, 
          International   : { title : "International", icon : "flag-checkered", details : " International News Updates" }, 
          Business        : { title : "Business", icon : "modx", details : "Business news Updates" },
          Entertainments  : { title : "Entertainments", icon : "film", details : "Entertainments Activities and Events" },
          Sports          : { title : "Sports", icon : "trophy", details : "Sports Highlights and Updates" },
          Education       : { title : "Education", icon : "edge", details : "Education and Awareness in India" },
      };
  }

  onMenuNavigation() {
    this.refs.drawer.open();
    this.setState({ menu : 0 });
  }

  itemResponder(pageName){
    let data = { user : 'admin'};
    UI.location(pageName, data);
  }


  renderItems(){
      let mArr = [];
      for( let key in this.itemList ) {
          mArr.push(
              <TouchableOpacity
                  key = {key}
                  style = {[
                    UI.setHeight(100),
                    UI.setWidth(width*.9),
                    theme.row,
                    theme.btnInfo,
                    UI.setMarginTop(10),
                  ]}
                  onPress = {()=> { this.itemResponder(key) }}
              >
                  <View
                      style = {[ 
                           UI.setHpadding(10),
                           theme.center,
                           UI.setWidth(width*.2),
                      ]}
                  >
                      <VectorIcon 
                          name = {this.itemList[key].icon} 
                          size = {30} 
                          color = {"#fff"} 
                      />
                  </View>
                  <View
                      style = {[
                          theme.center,
                      ]}
                  >
                      <View>
                          <Text
                              style = {[
                                UI.setColor("#fff"),
                                UI.setFont(20),
                                UI.setBorderBottom(1,'#ccc'),
                              ]}
                          >
                              { this.itemList[key].title }
                          </Text>
                          <Text
                              style ={[
                                  UI.setFont(14),
                                  UI.setColor("#f2f2f2"),
                              ]}
                          >
                              { this.itemList[key].details }
                          </Text>
                      </View>
                  </View>
              </TouchableOpacity>
          );
      }

      return mArr;
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
              title = {"Welcome Admin"}
              onMenuTouch = {this.onMenuNavigation.bind(this)}
          />
          <ScrollView
              style = {[
                UI.setHeight(height - 100),
              ]}
          >
              <View
                  style = {[ theme.center ]}
              >
                { this.renderItems() }
              </View>
          </ScrollView>
      
              
          <ThemeModal ref={"modal"}/> 
        </View>
      </Drawer>
    );
  }
}