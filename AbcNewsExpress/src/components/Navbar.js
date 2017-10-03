import React from 'react';
import {
	Text,
	View,
} from 'react-native';

import theme from '../css/theme';
import { ActionList } from './ThemeAction';
import{
	Button,
} from './';

var UI = ActionList();
var height = UI.height;
var width = UI.width;
export default class Navbar extends React.Component{
	constructor(){
		super();
		this.enable = false;
	}

	render(){
		let props = this.props;
		return(
			<View>
				{ this.enable ? <View style={[ UI.setHeight(25),UI.setBg('rgba(2, 83, 105, 0.61)')]} /> : null }
				<View
		            style = {[
		                UI.setHeight(props.height || 50),
		                UI.setBg('#025271'),
		                theme.center,
		                theme.row,
		            ]}
	            >
		            <View
		                style={[ theme.absolute,UI.setLeft(5)]}
		            >
		                <Button
		                    height={30}
		                    width = {30}
		                    icon = {"bars"}
		                    size = {30}
		                    textColor = {"#fff"}
		                    onTouch = {this.props.onMenuTouch}
		                />
		            </View>
		            <Text
		                style={[
		                    UI.setColor('#fff'),
		                    UI.setFont(20),
		                ]}
		            >
		                {this.props.title}
		            </Text>
	            </View>
	        </View>

		);
	}
}