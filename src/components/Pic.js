import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
} from 'react-native';

import theme from '../css/theme';
import { ActionList } from './ThemeAction';
import {
	Button,
	Loader,
} from './';

const UI = ActionList();
var width = UI.width;
var height = UI.height;
export default class Pic extends React.Component{
	constructor(){
		super();
		this.state = {
			loading : true,
			error : false,
		}
	}

	render(){
		let props = this.props;
		let imageSource = "../image/" + props.source;
		return(
			<View
	              style = {[
	                  UI.setBg(props.bg || 'transparent'),
	                  UI.setHeight(props.height || 200),
	                  UI.setWidth(props.width ? props.width : width),
	                  props.style,
	              ]}
	          >
	          	{
	          		props.uri 
		          		?
				              <Image
				                resizeMode = {'stretch'}
				                style = {[
				                    UI.setHeight(props.height || 200),
				                    UI.setWidth(props.width ? props.width : width),
				                    props.picStyle,
				                    theme.center,
				                ]}
				                source={{ uri : props.uri }}
				                onLoad = { (e) => this.setState({ loading : false }) }
				                onError = { (e) => this.setState({ error : true }) }
				              >
				              	{
				              		this.state.loading && !this.state.error
							             ?
							              	<Loader
							              		animating = {this.state.loading}
							              		width = {props.width || width}
							              		height = {props.height || 200}
							              		color = {'#dc143c'}
							              	/>
						              	: 
						              	  this.state.error 
						              	  		?
						              	  			<Button
						              	  				icon = {"exclamation-triangle"}
						              	  				size = {30}
						              	  				height = {100}
						              	  				width = {100}
						              	  			/>
						              	  		:
						              	  		   null
					             }
				              </Image>
				        :
				        	<Image
				                resizeMode = {'stretch'}
				                style = {[
				                    UI.setHeight(props.height || 200),
				                    UI.setWidth(props.width ? props.width : width),
				                    props.picStyle,
				                ]}
				                source={ props.source }
				            />

	             }
	          </View>
		);
	}
}