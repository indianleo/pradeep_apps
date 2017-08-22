import React from 'react';
import {  
  Text, 
  View, 
} from 'react-native';

import {
  ActionList,
} from './ThemeAction';
import theme from '../css/theme';
import {
  Button,
  Title,
  Menu,
  TextBox,
  Navbar,
  Pic,
  ThemeModal,
  Loader,
} from './';

const UI = ActionList();
let width = UI.width;
let height = UI.height;
let _this;
export default class Join extends React.Component {

  constructor(){
    super();
    this.state ={
      menu : 0,
      isOpen : false,
    };
    _this = this;
    this.name = "";
    this.email = "";
    this.contact = "";
    this.job = "";
  }

  onMenuNavigation() {
    this.openModal("Login to ")
  }

  openModal( msg ){
    let msgData = {
      'modalType' : 'notify',
      'msg'       : msg,
    };
    this.refs.modal.show(msgData);
  }

  send(){
    let data = {
      name : this.name,
      email : this.email,
      contact : this.contact,
      job : this.job,
    };

    let call = new XMLHttpRequest();
    call.onreadystatechange = function()
    {
      if(call.readyState==4 && call.status==200)
      {
         //console.log("data = ",call.responseText);
         _this.openModal("!! Registration Successfull !!"); 
        _this.setState({ isOpen : false }); 
      }
      else
      {
           _this.setState({ isOpen : true });
      }
    }
    call.open( "GET", UI.server + "action.php?data=" + JSON.stringify(data), true );
    call.send(); 
  }

  store( field, char ) {
      switch( field ) {
         case 'name' : this.name = char;
         break;
         case 'email' : this.email = char;
         break;
         case 'contact' : this.contact = char;
         break;
         case 'job' : this.job = char;
         break;
         default : alert("Field Does't Match");
         break;
      }
  }

  render(){

    return(
      <View
           style={[
               UI.setScreen(width,height),
           ]}
        >
            <Navbar
              title = {"Registration"}
              onMenuTouch = {this.onMenuNavigation.bind(this)}
            />
            <View>
                <Pic
                   source = {require('../image/join.png')}
                   height = {150}
                />
            </View>

            <View style={[theme.center]}>
          
                <View>
                    <TextBox 
                        height = {50}
                        placeholder= {"Name"}
                        onType = {( char )=>{ this.store('name', char ) }}
                    />
                </View>

                
                <View>
                    <TextBox 
                        height = {50}
                        placeholder= {"Email"}
                        onType = {( char )=>{ this.store('email',char ) }}
                    />
                </View>

                <View>
                    <TextBox 
                        height = {50}
                        placeholder= {"Contact No."}
                        onType = {( char )=>{ this.store('contact', char ) }}
                    />
                </View>

                <View>
                    <TextBox 
                        height = {50}
                        placeholder= {"Occupation"}
                        onType = {( char )=>{ this.store('job', char ) }}
                    />
                </View>
                <View
                    style = {[ theme.row, theme.center, ]}
                >
                    <Button
                      height={30}
                      width={70}
                      label={"Submit"}
                      theme={"btnSuccess"}
                      onTouch = { ()=>{ this.send() }}
                    />
                    <Button
                      height={30}
                      width={70}
                      style = {[ UI.setMarginLeft(5), ]}
                      label={"Back"}
                      theme={"btnDanger"}
                      onTouch = { ()=>{ UI.location('Home') }}
                    />
                </View>
                
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