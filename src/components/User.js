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
export default class User extends React.Component {

  constructor(){
    super();
    this.state ={
      menu : 0,
    };
    _this = this;
    this.userDetails = {
        name : 'Anamika Singh',
        email : 'singh.anamika.19.01@gmail.com',
        contact : '7310016892',
        job : 'Application Devleloper',
    };
  }

  onMenuNavigation() {
    this.refs.drawer.open();
    this.setState({ menu : 0 });
  }

  renderDetails(){
    let details = [];
    let i =0;
    for( let key in this.userDetails ) {
        details.push(
            <View
                key = {i}
                style = {[
                    theme.row,
                    theme.center,
                ]}
            >
                <View
                    style = {[
                      theme.borderInfo,
                      theme.border1,
                      UI.setWidth(width*.3),
                      UI.setHeight(40),
                      theme.center,
                    ]}
                >
                    <Text>
                        {key}
                    </Text>
                </View>
                <View
                    style = {[
                        theme.borderInfo,
                        theme.border1,
                        theme.center,
                        UI.setWidth(width*.6),
                        UI.setHeight(40),
                    ]}
                >
                    <Text>
                        { this.userDetails[key] }
                    </Text>
                </View>
            </View>
        );
        i++;
    }

    return details;
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
          <Navbar
              title = {"Profile"}
              onMenuTouch = {this.onMenuNavigation.bind(this)}
          />
    
          <ScrollView
              style = {[
                UI.setHeight(height-75),
              ]}
          >
              <View>

                  <View
                      style = {[
                          theme.center,
                          UI.setVmargin(20),
                      ]}
                  >
                      <Pic
                        source = {require('../image/user_male.jpg')}
                        height = {100}
                        width = {100}
                      />
                  </View>

                  <View
                      style = {[
                          theme.center,
                          theme.row,
                      ]}
                  >
                    <View>
                        <Button
                            label = {"Update Picture"}
                            theme = {'btnDanger'}
                            border = {1}
                            height = {40}
                            width = {width*.45}
                        />
                    </View>
                    <View>
                        <Button
                            label = {"Manage Account"}
                            theme = {'btnWarning'}
                            border = {1}
                            height = {40}
                            width = {width*.45}
                        />
                    </View>
                  </View>

                 { this.renderDetails() }

              </View>      
          </ScrollView>

        </View>
      </Drawer>
    );
  }
}