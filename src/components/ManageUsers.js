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
export default class ManageUsers extends React.Component {

  constructor(){
    super();
    this.state ={
      menu : 0,
      load : false,
      reload : 0,
    };
    _this = this;
    this.itemList = {};
  }

  onMenuNavigation() {
    this.refs.drawer.open();
    this.setState({ menu : 0 });
  }

  componentWillMount(){
    this.send();
  }

  reload(){
    _this.setState({ reload : _this.state.reload++ });
    _this.send();
  }

  set_userState( id, state, bid_req ){
    let data = {
      table : "users",
      user_state : state,
      user_id : id,
      bids : bid_req,
      action : "set_mobile_user_state",
    };

    let call = new XMLHttpRequest();
    call.onreadystatechange = function()
    {
      if(call.readyState==4 && call.status==200)
      {
         let res = call.responseText;
         let msgData = {
              modalType : 'notify',
              msg       : res,
              onClose   : ()=>{ _this.reload() }
            };
          _this.refs.modal.show(msgData);
      }
      else
      {
          
      }
    }
    call.open( "GET", UI.server + "action.php?data=" + JSON.stringify(data), true );
    call.send(); 
  }

  send(){
    let data = {
      table : "users",
      action : "view_mobile_users",
    };

    let call = new XMLHttpRequest();
    call.onreadystatechange = function()
    {
      if(call.readyState==4 && call.status==200)
      {
         _this.itemList = JSON.parse(call.responseText);
         _this.setState({ load : true }); 
      }
      else
      {
          
      }
    }
    call.open( "GET", UI.server + "action.php?data=" + JSON.stringify(data), true );
    call.send(); 
  }


  renderItems(){
      let mArr = [];
      if( this.state.load ) {
          for( let key in this.itemList ) {
              mArr.push(
                  <View
                      key = {key}
                      style = {[
                        UI.setWidth(width*.9),
                        theme.row,
                        UI.setMarginTop(10),
                      ]}
                  >
                      <View
                          style = {[
                              UI.setHeight(300),
                              UI.setWidth(width*.3),
                              theme.center,
                              theme.btnInfo,
                          ]}
                      >
                        <View>
                          {
                            this.itemList[key].gender == "Male"
                              ?
                                <Pic
                                    source = {require('../image/user_male.jpg')}
                                    height = {100}
                                    width = { 100 }
                                />
                              :
                                <Pic
                                    source = {require('../image/user_female.png')}
                                    height = {100}
                                    width = { 100 }
                                />
                          }
                        </View>
                        <View>
                            <Button
                                label = {"Active"}
                                theme = {"btnWarning"}
                                height= {30}
                                width = {70}
                                margin= {10}
                                onTouch = {()=>{ this.set_userState(this.itemList[key].id, 'Active', 0) } }
                            />
                            <Button
                                label = {"Block"}
                                theme = {"btnDanger"}
                                height= {30}
                                width = {70}
                                margin= {10}
                                onTouch = {()=>{ this.set_userState(this.itemList[key].id, 'Blocked', 0) } }
                            />
                            <Button
                                label = {"Approve"}
                                theme = {"btnSuccess"}
                                height= {30}
                                width = {70}
                                margin= {10}
                                onTouch = {()=>{ this.set_userState(this.itemList[key].id, 'bid_req', this.itemList[key].bid_req) } }
                            />
                        </View>
                      </View>

                      <View
                          style = {[
                              UI.setWidth(width*.6),
                              theme.btnDanger,
                              UI.setBg('gray'),
                              UI.setPaddingLeft(10),
                          ]}
                      >
                          <View>
                              <Text
                                  style = {[
                                    UI.setColor('#fff'),
                                    UI.setFont(20),
                                  ]}
                              >
                                  Id : { this.itemList[key].id }
                              </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Name : { this.itemList[key].name }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Email : { this.itemList[key].email }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Pass : { this.itemList[key].pass }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Contact : { this.itemList[key].contact }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                City : { this.itemList[key].city }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Gender : { this.itemList[key].gender }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Bids : { this.itemList[key].bids }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                State : { this.itemList[key].state }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Bid Request : { this.itemList[key].bid_req > 0 ? this.itemList[key].bid_req : "No" }
                            </Text>
                          </View>
                      </View>

                  </View>
              );
          }
        return mArr;
      } 
      else{
        return(
          <View
              style = {[ UI.setScreen(width,height),theme.center,]}
          >
              <Text style = {[ UI.setFont(18) ]} >Loading...</Text>
          </View>
        );
      }
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
              title = {"Manage Users"}
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