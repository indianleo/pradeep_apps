import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

import { ActionList } from './ThemeAction';
import theme from '../css/theme';
import {
	Button,
	Pic,
	ThemeModal,
} from './';

var _this;
const UI =  ActionList();
var height = UI.height;
var width = UI.width;
export default class BidItem extends React.Component{
	constructor(){
		super();
		this.state = {
			timer : 60,
			bid : false,
		};
		_this = this;
		this.watch  =  "";
		this.time = 60;
	}

	openModal(data){
		 let msgData = {
		      'modalType' : 'notify',
		      'msg'       : data,
	    };
	    this.refs.modal.show(msgData);
	}

	bidRequest(){
		let data = {
	      bid_coins : 10,
	      email : this.props.userEmail,
	      action : "bid_req_user",
	    };

	    let call = new XMLHttpRequest();
	    call.onreadystatechange = function()
	    {
	      if(call.readyState==4 && call.status==200)
	      {
	         let data = call.responseText;
	         _this.openModal(data); 
	      }
	      else
	      {
	          
	      }
	    }
	    call.open( "GET", UI.server + "action.php?data=" + JSON.stringify(data), true );
	    call.send();
	}
	
	counting(){
		let local = this;
		if(local.time >= 0){
			local.setState({ timer : local.time-- });
			console.log(local.time);
		} 
		else{
			clearInterval(local.watch);
			local.time = 60;
		}
	}

	setBid(item){
		let local = this;
		if(local.props.bidCoins > 5) {
			local.setState({ bid : true });
			local.watch = setInterval(function(){
						local.counting();
					},6000);
		} 
		else{
			let msg = `Please Purchase Bid first. You have not enough Bid Coins. Go to Add Bid in menu and purchase from there in your account. Click on Yes button to go to purchase Bids.`;
			let msgData = {
		      'modalType' : 'feedback',
		      'msg'       : msg,
		      onConfirm   : ()=>{ _this.bidRequest() },
		    };
		    this.refs.modal.show(msgData);
		}
		
	} 

	render(){
		let props = this.props;
		return(
			<View
				style = {[ theme.center ]}
			>
				<Pic
						height = {150}
						width = {width-30}
						uri = {props.image}
					/>
					<View
			            style = {[
			                theme.row,
			                theme.center,
			            ]}
			          >
			              <Button
			                  label = { props.label ? props.label : "Rs. 100" }
			                  theme = {'borderInfo'}
			                  border = {1}
			                  height = {40}
			                  width = {(width-30)/2}
			                  onTouch = { ()=>{ this.setBid('item') } }
			              />
			              <Button
			                  label = { this.state.bid ? this.state.timer : "Timer" }
			                  theme = {'borderSuccess'}
			                  border = {1}
			                  height = {40}
			                  width = {(width-30)/2}
			              />
         			 </View>
					<View
			            style = {[
			                theme.row,
			                theme.center,
			            ]}
			          >
			              <Button
			                  label = {"Bid Item"}
			                  theme = {'btnInfo'}
			                  border = {1}
			                  height = {40}
			                  width = {(width-30)/2}
			                  onTouch = { ()=>{ this.setBid('item') } }
			              />
			              <Button
			                  label = {"Item Info"}
			                  theme = {'btnSuccess'}
			                  border = {1}
			                  height = {40}
			                  width = {(width-30)/2}
			                  onTouch = { ()=>{ this.openModal(props.info) } }
			              />
         			 </View>
         			<ThemeModal ref={"modal"} />
			</View>
		);
	}
}