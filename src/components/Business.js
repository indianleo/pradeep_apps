import React from 'react';
import {  
  Text, 
  View 
} from 'react-native';

import {
  ActionList,
} from './ThemeAction';
import Drawer         from 'react-native-drawer';
import theme from '../css/theme';
import {
  Button,
  Title,
  Menu,
  Navbar,
  Pic,
} from './';

var UI = ActionList();
var width = UI.width;
var height = UI.height;
var _this;
export default class Business extends React.Component {

  constructor(){
    super();
    this.state ={
      menu : 0,
    };
    _this = this;
  }

  onMenuNavigation() {
    this.refs.drawer.open();
    this.setState({ menu : 0 });
  }

  render(){
    var sidePane = <Menu />;
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
          <View>
            <Navbar
              title = {"Business News"}
              onMenuTouch = {this.onMenuNavigation.bind(this)}
            />

            <View>
                <View
                    style = {[
                        theme.center,
                        UI.setHeight(40),
                        UI.setBg('rgba(51, 153, 255, 0.63)')
                    ]}
                >
                    <Text>Fresh News</Text>
                </View>
                <View
                    style = {[
                        theme.center,
                    ]}
                >
                    <Text>
                        Here we will provie fresh news which load latest news data from the database.
                    </Text>
                </View>
            </View>
          </View>
        </View>
      </Drawer>
    );
  }
}