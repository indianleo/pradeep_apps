import React from 'react';
import {  
  Text, 
  View,
  ScrollView,
  TouchableOpacity 
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
export default class International extends React.Component {

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

  renderNews(){
    let newsItems = [];
    let i = 0;
    let FreshNews = UI.getNews();
    for(let key in FreshNews){
      newsItems.push(
          <View
            key = {key+i}
            style = {[
                theme.center,
                theme.row,
            ]}
          >
              <View
                  style = {[
                    UI.setHeight(100),
                    theme.center,
                    UI.setBorder(1,'#ccc'),
                    UI.setWidth(width*.3),
                  ]}
              >
                  <Text>
                      {FreshNews[i].image}
                  </Text>
              </View>
              <TouchableOpacity
                  style = {[
                    UI.setHeight(100),
                    UI.setWidth(width*.6),
                    theme.center,
                    UI.setBorder(1,'#ccc'),
                  ]}
              >
                  <Text>
                      {FreshNews[i].heading}
                  </Text>
                  <Text>
                      {FreshNews[i].details}
                  </Text>
              </TouchableOpacity> 
          </View>
      );
      i++;
    }

    return newsItems;
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
              title = {"International"}
              onMenuTouch = {this.onMenuNavigation.bind(this)}
            />

            <ScrollView
                style = {[
                  UI.setHeight(height-75),
                ]}
            >
                <View
                  style = {[
                      theme.center,
                      UI.setHeight(170),
                      UI.setWidth(width),
                      UI.setBg('pink'),
                  ]}
                >
                    <Text>
                        Cover Image
                    </Text>
                </View>

                {this.renderNews()}
            </ScrollView>

          </View>
        </View>
      </Drawer>
    );
  }
}