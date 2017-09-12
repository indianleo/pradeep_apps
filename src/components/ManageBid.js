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
export default class ManageBid extends React.Component {

  constructor(){
    super();
    this.state ={
      menu : 0,
      load : false,
      reload : 0,
    };
    _this = this;
    this.itemList = {};
    this.proxy = "";
    this.item_name = "";
    this.bid_info = "";
    this.bid_state = "";
    this.item_image = "";
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


  delete_bidItem( id ) {
      let data = {
      table : "bid_items",
      id : id,
      action : "bid_mobile_delete",
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

  store( field, char ) {
      switch( field ) {
         case 'item_name' : this.item_name = char;
         break;
         case 'image' : this.item_image = char;
         break;
         case 'state' : this.bid_state = char;
         break;
         case 'info' : this.bid_info = char;
         break;
         case 'proxy' : this.proxy = char;
         break;
         default : alert("Field Does't Match");
         break;
      }
  }

  show_editor( item ) {
      let data = (
        <View>
            <Text>Hello Pradeep </Text>
        </View>
      );
      let msgData = {
        ui          : true,
        children    : data,
      };
      _this.refs.modal.show(msgData);
  }

  edit_bidItem( id ) {
      let data = {
        table     : "bid_items",
        proxy     : this.proxy,
        item_name : this.item_name,
        image     : this.item_image,
        item_info : this.item_info,
        bid_state : this.bid_state,
        id        : id,
        action    : "bidItem_mobile_edit",
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
      table : "bid_items",
      action : "view_mobile_bidsItems",
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
                            <Pic
                                uri = {UI.server + this.itemList[key].item_pic }
                                height = {100}
                                width = { 100 }
                            />
                        </View>
                        <View>
                            <Button
                                label = {"Edit"}
                                theme = {"btnWarning"}
                                height= {30}
                                width = {70}
                                margin= {10}
                                onTouch = {()=>{ this.show_editor(this.itemList[key]) } }
                            />
                            <Button
                                label = {"Delete"}
                                theme = {"btnDanger"}
                                height= {30}
                                width = {70}
                                margin= {10}
                                onTouch = {()=>{ this.delete_bidItem(this.itemList[key].id) } }
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
                                Name : { this.itemList[key].item_name }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Proxy : { this.itemList[key].proxy }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Total Bids : { this.itemList[key].total_bid }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Total Earn : { this.itemList[key].total_bid_amt }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Max Bid : { this.itemList[key].bid_max }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Min Bid : { this.itemList[key].bid_min }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Bid State : { this.itemList[key].bid_state }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Bid Winner : { this.itemList[key].bid_winner }
                            </Text>
                          </View>
                          <View>
                            <Text
                                style = {[
                                  UI.setColor('#fff'),
                                  UI.setFont(20),
                                ]}
                            >
                                Product : { this.itemList[key].item_info }
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
                UI.setHeight(height - 200),
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