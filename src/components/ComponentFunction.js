import {
	Dimensions,
	Platform
} from 'react-native';
var { height, width }  = Dimensions.get('window');

export function manageDimensions () {
	var dimensions = {'height' : height, 'width' : width};
	var _w = width;
	var _h = height;
	
	/*
	if ( height < width ) {
		dimensions['height'] = width;
		dimensions['width']  = _h;
	} */
	return dimensions;
}

var dimensions = manageDimensions();

export var height 		= dimensions['height'];
export var width  		= dimensions['width'];
export var deviceType 	= Platform.OS === 'ios' ? true : false ;