import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
} from 'react-native';

import Drawer from 'react-native-drawer';
import theme from '../css/theme';
import { ActionList } from './ThemeAction';
import {
	Button,
	Navbar,
	Menu,
	AdminMenu,
	Pic,
	BidItem,
} from './';

const UI = ActionList();
var width = UI.width;
var height = UI.height;
let _this;
export default class Bid extends React.Component{
	constructor(){
		super();
		this.state = { 
			menu : 0, 
			bidCoins : 0,
			load : false,
		};
		_this = this;
		this.userDetails = "";
		this.bidItems = "";
		this.userName = "";

	}

	componentWillMount() {
	    this.send();
	    this.getBidItems();
	    UI.setBack();
	}

	send(){
	    let data = {
	      table : "users",
	      email : this.props.userEmail,
	      action : "view_mobile_user_records",
	    };

	    let call = new XMLHttpRequest();
	    call.onreadystatechange = function()
	    {
	      if(call.readyState==4 && call.status==200)
	      {
	         _this.userDetails = JSON.parse(call.responseText);
	         _this.userName = _this.userDetails[0].name;
	         _this.setState({ bidCoins : _this.userDetails[0].bids }); 
	      }
	      else
	      {
	          
	      }
	    }
	    call.open( "GET", UI.server + "action.php?data=" + JSON.stringify(data), true );
	    call.send(); 
	}

	getBidItems(){
	    let data = {
	      table : "users",
	      email : this.props.userEmail,
	      action : "view_mobile_bidItems",
	    };

	    let call = new XMLHttpRequest();
	    call.onreadystatechange = function()
	    {
	      if(call.readyState==4 && call.status==200)
	      {
	         _this.bidItems = JSON.parse(call.responseText);
	         _this.setState({ load : false }); 
	      }
	      else
	      {
	          
	      }
	    }
	    call.open( "GET", UI.server + "action.php?data=" + JSON.stringify(data), true );
	    call.send(); 
	}

	onMenuNavigation() {
	    this.refs.drawer.open();
	    this.setState({ menu : 0 });
	}

	renderBidItems(){
		let items = [];
		let i = 0;
		let bidItemList = _this.bidItems;
		let coin = this.state.bidCoins;
		if( _this.bidItems.length > 1 ){
			for( let key in bidItemList ) {
				let item = bidItemList[key];
				items.push(
					<View
						key = {i}
						style = {[
							UI.setHeight(250),
							UI.setHpadding(15),
							UI.setPaddingBottom(25),
							theme.center,
						]}
					>
						<BidItem
							user = {_this.userName}
							label = { item.item_rate}
							itemName = { item.item_name }
							image = { item.item_pic.startsWith("bid_image") ? UI.server + item.item_pic : item.item_pic}
							info = {item.item_info}
							bidCoins = {coin}
						/>
					</View>
				);
				i++;
			}
		}
		

		return items;
	}

	render(){
		let sidePane = ( this.props.user == "admin" ? <AdminMenu /> : <Menu  user={this.props.user} userEmail = {this.props.userEmail} /> );
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
		              style = {[
		              	UI.setFullScreen(width,height),
		              ]}
		        >
		        	<Navbar
		              title = {"Live Bid System"}
		              onMenuTouch = {this.onMenuNavigation.bind(this)}
		            />
		        	<ScrollView>
		        		{ this.renderBidItems()}
		        	</ScrollView>
		        </View>
		    </Drawer>
		);
	}
}