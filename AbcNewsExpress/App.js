import React from 'react';
import {  
	Text, 
	View,
  ActivityIndicator,
} from 'react-native';

import {Router, Route, Schema, Scene, Reducer, Actions, ActionConst } from 'react-native-router-flux';
import {
  Home,
  Welcome,
  WelcomeAdmin,
  FreshNews,
  International,
  National,
  State,
  Entertainments,
  Sports,
  Join,
  Login,
  Education,
  Business,
  Bid,
  User,
  AddBid,
  Upload,
  Invite,
  ManageBid,
  ManageUsers,
  BidUpdate,
  BidReq,
} from './src/components/';

const reducerCreate = params => {
      const defaultReducer = new Reducer(params);
      return (state, action) => {
        console.log('ACTION:', action);
        return defaultReducer(state, action);
      };
  };

var _this;
export default class App extends React.Component {

  constructor(){
    super();
    _this = this;
  }

  render () {
    let isLoggedIn = 1;
    let isLoading = false;
    //setActionState(isLoggedIn ? 'welcome' : 'login' );
    if(isLoading){
      return <ActivityIndicator style={styles.activator} color="gray" size="large" />
    }
    return(
      <Router createReducer={reducerCreate} scenes={this.createAppScene(isLoggedIn)} hideNavBar={true}></Router> 
    );
  }


  createAppScene(isLoggedIn) {
      var  actionsVar = Actions.create(
        <Scene key="root">
            <Route panHandlers={null} duration={10}  key="Home" component={Home} initial={isLoggedIn ==1 ? false : true}/>
            <Route panHandlers={null} duration={10}  key="Welcome" component={Welcome} title="Welcome" />
            <Route panHandlers={null} duration={10}  key="FreshNews" component={FreshNews} title="Fresh News" />
            <Route panHandlers={null} duration={10}  key="International" component={International} title="International News" />
            <Route panHandlers={null} duration={10}  key="National" component={National} title="National News" />
            <Route panHandlers={null} duration={10}  key="State" component={State} title="State News" />
            <Route panHandlers={null} duration={10}  key="Entertainments" component={Entertainments} title="Entertainments" />
            <Route panHandlers={null} duration={10}  key="Sports" component={Sports} title="Sports" />
            <Route panHandlers={null} duration={10}  key="Join" component={Join} title="Join" />
            <Route panHandlers={null} duration={10}  key="Login" component={Login} title="Login" />
            <Route panHandlers={null} duration={10}  key="Education" component={Education} title="Education" />
            <Route panHandlers={null} duration={10}  key="Business" component={Business} title="Business" />
            <Route panHandlers={null} duration={10}  key="Bid" component={Bid} title="Live Bid" />
            <Route panHandlers={null} duration={10}  key="User" component={User} title="User" />
            <Route panHandlers={null} duration={10}  key="AddBid" component={AddBid} title="Add Bid" />
            <Route panHandlers={null} duration={10}  key="Upload" component={Upload} title="Upload News" />
            <Route panHandlers={null} duration={10}  key="Invite" component={Invite} title="Invite Others" />
            <Route panHandlers={null} duration={10}  key="WelcomeAdmin" component={WelcomeAdmin} title="Welcome Admin" />
            <Route panHandlers={null} duration={10}  key="ManageUsers" component={ManageUsers} title="Manage Users" />
            <Route panHandlers={null} duration={10}  key="ManageBid" component={ManageBid} title="Manage Bid Products" />
            <Route panHandlers={null} duration={10}  key="BidReq" component={BidReq} title="Bid Request" />
            <Route panHandlers={null} duration={10}  key="BidUpdate" component={BidUpdate} title="Bid Prodcuts Update" />
        </Scene>
      );
    return actionsVar;
  }


}
