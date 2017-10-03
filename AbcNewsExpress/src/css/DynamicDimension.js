import React from "react-native";

import { ActionList } from '../components/ThemeAction';
// Precalculate Device Dimensions for better performance
//import { height, width, deviceType } from '../components/ComponentFunction';

var UI = ActionList();
var height = UI.height;
var width = UI.width;

if( width > height ) {
	height = UI.width;
	width = UI.height;
}

// Calculating ratio from iPhone breakpoints
const ratioX = UI.ios ? ( width < 550 ? ( width < 430 ? ( width < 375 ? (width < 320 ? 0.75 : 0.875) : 1 ) : 1.125 ) : 1.25 ) : 1;
const ratioY = UI.ios ? ( height < 800 ? ( height < 640 ? ( height < 568 ? (height < 480 ? 0.75 : 0.875) : 1 ) : 1.125 ) : 1.25 ) : 1;

// We set our base font size value
const base_unit = 16;

// We're simulating EM by changing font size according to Ratio
const unit = base_unit * ratioX;

// We add an em() shortcut function 
function em(value) {
  return unit * value;
}
//console.log(unit, height, width, "Hi jarvis");
// Then we set our styles with the help of the em() function
export default Style = {
  
  // GENERAL
  DEVICE_WIDTH			: width,
  DEVICE_HEIGHT			: height,
  RATIO_X				: ratioX,
  RATIO_Y				: ratioY,
  UNIT					: em(1),
  PADDING				: em(1.25),
  MARGIN_TOP			: em(1.25),
  MARGIN_LEFT			: em(1.25),
  MARGIN_BOTTOM			: em(1.25),
  MARGIN_RIGHT			: em(1.25),

  // CARD
  CARD_WIDTH			: width - em(1.25) * 2,
  CARD_HEIGHT			: (width - em(1.25) * 2) * (3/5),
  CARD_PADDING_X		: em(1.875),
  CARD_PADDING_Y		: em(1.25),

  // FONT
  FONT_SIZE				: em(1),
  FONT_SIZE_SMALLER		: em(0.75),
  FONT_SIZE_SMALL		: em(0.875),
  FONT_SIZE_TITLE		: em(1.25),

  BORDER_RADIUS 		: em(2), 
  em 					: em
  
};

