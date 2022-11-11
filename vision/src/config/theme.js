/**
 *  File Name   : theme.js
 *  Author      : Pradeep Yadav
 *  Description : Theme Action Definitions 
 *  Version     : 2.0
 *  Package     : Theme Components
 *  Last update : 17 May 2022
 */
 import {
	Dimensions,
	Platform,
	BackAndroid,
	LayoutAnimation,
    StatusBar,
	Alert,
	StyleSheet
} from 'react-native';
import { getStoreData, googleApiKey, storeData } from '../api/apiAction';

import Geocoder from 'react-native-geocoding';
let { height, width } = Dimensions.get('window');
const localStorage = {};
const statusBarHeight = ()=> (Platform.OS === 'ios' ? 0 : StatusBar.currentHeight);
const base_unit = 16;

const textColor = {
	borderDefault: '#3f5873',
	borderSuccess: '#1ab394',
	borderPrimary: '#22aadd',
	borderInfo: '#55c3e4',
	borderWarning: '#f0ad4e',
	borderDanger: '#D64937',
	borderCorrect: '#55ad1f',
	borderIncorrect: '#af2517',
	btnDefault: '#fff',
	btnSuccess: '#fff',
	btnPrimary: '#fff',
	btnInfo: '#fff',
	btnWarning: '#fff',
	btnDanger: '#fff',
	btnGray: '#fff',
	basic: '#000'
};

const uiTheme = {
	default: {
		theme: 'default',
		fontFamily: 'arial',
		fontSize: { heading: 18, title: 17, content: 16, subContent: 14, },
		fontScale: { maxScale: 7, minScale: 40 },
		body: { bgColor: '#fff', color: '#000', child: '#fff' },
		bgColor: { heading: '#34485E', title: '#fff', content: '#fff' },
		color: { 
			heading: '#000', 
			title: '#34485E', 
			content: '#000',
			navBgColor: '#3f5873',
			topBar: '#34485E',
			navColor: '#fff',
			navSelected: '#2d3f52',
			navBorder: '#6b8bae', 	
			childColor: '#444',
			dangerColor: '#b0281a',
			warningColor: '#faebcc',
			infoColor: '#22b1dd', 
		},
		border: { 
			heading: '#34485E', 
			title: '#34485E', 
			content: '#34485E', 
			borderColor: '#6b8bae', 
		},
		fade: {
			fadeBg: '#ced8e4',
			fadeBgText: '',
			fadeColor: '#676767',
			fadeBorder: '#8ca5c0',
			fadeBorderSet: '#3f5873',
		},
		shadow: { 
			shadowBg: '',
			shadowColor: '',
			shadowBorder: '',
		},
		panel: {
			panelHeader: '#6b8bae',
			panelBorder: '#6b8bae',
			panelBody: '#fff',
			panelText: '#000',
			panelHeading: '#000',
		},
	},
};

const CSS = StyleSheet.create({
	setZindex: function (n) {
		return {
			zIndex: Number(n),
		};
	},
	setBg: function (c) {
		return {
			backgroundColor: c,
		};
	},
	setOpacity: function (n) {
		return {
			opacity: Number(n),
		};
	},
	getFontSize: function (inf) {
		let props = inf['props'];
		let minScale = (inf['minScale'] / 100);
		let maxScale = (inf['maxScale'] / 100);
		let _width = inf['width'];
		let _height = inf['height'];
		let size;

		if (props.fontSize) {
			size = props.fontSize;
		} else if (_height < 35) {
			let dim = (_height) * .5;
			size = dim;
		} else if (_height < 100) {
			let dim = (_height) * minScale;
			size = dim;
		} else {
			let dim = (_width) * maxScale;
			size = dim;
		}
		return +scale(size);
	},
	setFont: function (n) {
		return {
			fontSize: +scale(n),
		};
	},
	getFont : function (n) {
		return +scale(n);
	},
	convertRatio: function (r) {
		return scale(r);
	},
	setFontWeight: function (n) {
		return {
			fontWeight: n,
		};
	},
	getRatio : function (num) {
		return scale(num);	
	},
	setColor: function (col) {
		return {
			color: col,
		};
	},
	getRadius: function (size) {
		return (size / 2);
	},
	setRound: function (size) {
		return {
			height: +size,
			width: +size,
			borderRadius: +(size / 2),
		};
	},
	setRadius: function (size) {
		return {
			borderRadius: +size,
		};
	},
	setRadiusOn: function (size, place) {
		switch(place) {
			case 'topLeft': return ({ borderTopLeftRadius: size, });
			case 'topRight': return ({ borderTopRightRadius: size });
			case 'bottomLeft': return ({ borderBottomLeftRadius: size, });
			case 'bottomRight': return ({ borderBottomRightRadius: size, });
			case 'topStart': return ({ borderTopStartRadius: size, });
			case 'bottomStart': return ({ borderBottomStartRadius: size, });
			case 'topEnd': return ({ borderTopEndRadius: size, });
			case 'bottomEnd': return ({ borderBottomEndRadius: size, });
			default: return ({borderRadius: size, });
		}
	},
	setRadiusAll: function (topL, topR, bottomL, bottomR) {
		return {
			borderTopLeftRadius: Number(topL),
			borderTopRightRadius: Number(topR),
			borderBottomLeftRadius: Number(bottomL),
			borderBottomRightRadius: Number(bottomR),
		};
	},
	setMargin: function (top, left, bottom, right, isPercent) {
		if (isPercent) {
			return {
				marginTop: `${(top || 0)}%`,
				marginLeft: `${(left || 0)}%`,
				marginRight: `${(right || 0)}%`,
				marginBottom: `${(bottom || 0)}%`,
			};
		} else {
			return {
				marginTop: Number(top || 0),
				marginLeft: Number(left || 0),
				marginRight: Number(right || 0),
				marginBottom: Number(bottom || 0)
			};
		}
		
	},
	setMarginAll: function (n, isPercent) {
		return {
			margin: isPercent ? `${n}%` : n,
		};
	},
	setMarginTop: function (n, isPercent) {
		return {
			marginTop: isPercent ? `${n}%` : n,
		};
	},
	setMarginLeft: function (n, isPercent) {
		return {
			marginLeft: isPercent ? `${n}%` : n,
		};
	},
	setMarginBottom: function (n, isPercent) {
		return {
			marginBottom: isPercent ? `${n}%` : n,
		};
	},
	setMarginRight: function (n, isPercent) {
		return {
			marginRight: isPercent ? `${n}%` : n,
		};
	},
	setPadding: function (top = 0, left = 0, bottom = 0, right = 0, isPercent = false) {
		return {
			paddingTop: isPercent ? `${top}%` : top,
			paddingLeft: isPercent ? `${left}%` : left,
			paddingRight: isPercent ? `${right}%` : right,
			paddingBottom: isPercent ? `${bottom}%` : bottom,
		};
	},
	setPaddingAll: function (n, isPercent) {
		return {
			padding: isPercent ? `${n}%` : n,
		};
	},
	setPaddingTop: function (n, isPercent) {
		return {
			paddingTop: isPercent ? `${n}%` : n,
		};
	},
	setPaddingLeft: function (n, isPercent) {
		return {
			paddingLeft: isPercent ? `${n}%` : n,
		};
	},
	setPaddingRight: function (n, isPercent) {
		return {
			paddingRight: isPercent ? `${n}%` : n,
		};
	},
	setPaddingBottom: function (n, isPercent) {
		return {
			paddingBottom: isPercent ? `${n}%` : n,
		};
	},
	setVmargin: function (n, isPercent) {
		return {
			marginVertical: isPercent ? `${n}%` : n,
		};
	},
	setHmargin: function (n,isPercent) {
		return {
			marginHorizontal: isPercent ? `${n}%` : n,
		};
	},
	setHpadding: function (n, isPercent) {
		return {
			paddingHorizontal: isPercent ? `${n}%` : n,
		};
	},
	setVpadding: function (n, isPercent) {
		return {
			paddingVertical: isPercent ? `${n}%` : n,
		};
	},
	setBorder: function (n, color) {
		return {
			borderWidth: n,
			borderColor: color,
		};
	},
	setAllBorder: function (n, color) {
		return {
			borderLeftWidth: n,
			borderLeftColor: color,
			borderTopWidth: n,
			borderTopColor: color,
			borderRightWidth: n,
			borderRightColor: color,
			borderBottomWidth: n,
			borderBottomColor: color,
		};
	},
	setBorderTop: function (n, color) {
		return {
			borderTopWidth: n,
			borderTopColor: color,
		};
	},
	setBorderLeft: function (n, color) {
		return {
			borderLeftWidth: n,
			borderLeftColor: color,
		};
	},
	setBorderRight: function (n, color) {
		return {
			borderRightWidth: n,
			borderRightColor: color,
		};
	},
	setBorderBottom: function (n, color) {
		return {
			borderBottomWidth: n,
			borderBottomColor: color,
		};
	},
	setScreen: function (_width, _height, isPercent) {
		return {
			width: isPercent ? _width + '%' : (_width || width),
			height: isPercent ? _height + '%' : (_height || height),
		}
	},
	setWidth: function (n, isPercent) {
		return {
			width: isPercent ? n + '%' : (n || width),
		};
	},
	setHeight: function (n, isPercent) {
		return {
			height: isPercent ? n + '%' : (n || height),
		};
	},
	setAuto: function(type) {
		switch (type) {
			case 'height': return { height : 'auto' };
			case 'width': return { width: 'auto' };
			default: return { width: '100%', height : 'auto' };
		}

	},
	setHeightRatio: function (n) {
		return {
			height: n
		};
	},
	setMinMaxHeight: function (min, max) {
		return {
			minHeight: min,
			maxHeight: max,
		};
	},
	setMinMaxWidth: function (min, max) {
		return {
			minWidth: min,
			maxWidth: max,
		};
	},
	setMinWidth: function (n) {
		return {
			minWidth: n,
		};
	},
	setMinHeight: function (n) {
		return {
			minHeight: n,
		};
	},
	setMaxWidth: function (n) {
		return {
			maxWidth: n,
		};
	},
	setMaxHeight: function (n) {
		return {
			maxHeight: n,
		};
	},
	setFlex: function (_value) {
		return {
			flex: _value
		};
	},
	setTop: function (top, isPercent) {
		return {
			top: isPercent ? top + '%' : Number(top),
		};
	},
	setLeft: function (left, isPercent) {
		return {
			left: isPercent ? left + '%' : Number(left),
		};
	},
	setRight: function (right, isPercent) {
		return {
			right: isPercent ? right + '%' : Number(right),
		};
	},
	setBottom: function (bottom, isPercent) {
		return {
			bottom: isPercent ? bottom + '%' : Number(bottom),
		};
	},
	setPosition: function (top, left, isPercent) {
		return {
			top: isPercent ? top + '%' : Number(top),
			left: isPercent ? left + '%' : Number(left),
		};
	},
	setLineHeight: function (n) {
		return {
			lineHeight: n,
		};
	},
	setCenter: function (type) {
		let css;
		switch (type) {
			case 'v': css = { alignItems: 'center' };
				break;
			case 'h': css = { justifyContent: 'center' };
				break;
			case 'self': css = { alignSelf: 'center' };
				break;
			default: css = { alignItems: 'center', justifyContent: 'center' };
				break;
		};
		return css;
	},
	setItem: function (type) {
		let css;
		switch (type) {
			case 'hStart': css = { alignItems: 'flex-start' };
				break;
			case 'hEnd': css = { alignItems: 'flex-end' };
				break;
			case 'vCenter': css = { alignItems: 'center' };
				break;
			case 'hStretch': css = { alignItems: 'stretch' };
				break;
			case 'vStart': css = { justifyContent: 'flex-start' };
				break;
			case 'vEnd': css = { justifyContent: 'flex-end' };
				break;
			case 'vCenter': css = { justifyContent: 'center' };
				break;
			case 'vGap': css = { justifyContent: 'space-between' };
				break;
			case 'vAround': css = { justifyContent: 'space-around' };
				break;
			case 'selfStart': css = { alignSelf: 'flex-start' };
				break;
			case 'selfEnd': css = { alignSelf: 'flext-end' };
				break;
			case 'selfCenter': css = { alignSelf: 'center' };
				break;
			case 'selfStretch': css = { alignSelf: 'stretch' };
				break;
			default: css = { alignItems: 'center', justifyContent: 'center' };
				break;
		};
		return css;
	},
	setTextAlign: function (type) {
		// type - 'auto', 'top', 'bottom', 'center', 'justify'
		return ({
			textAlign: type,
		})
	},
	charSpace: function (num) {
		return ({
			letterSpacing: +num,
		});
	},
})

export const Libs = {
	initGeoCoading: function() {
		Geocoder.init(googleApiKey);
	},
	geoFrom: function(cord) {
		return Geocoder.from(cord);
	},
} 

export const UI = {
	createError: function(res="Data not found", errKey = "reqInfo") {
		let _err = res?.error || res?.message || res;
		if (typeof _err == "string") {
			let tempKey =  (typeof res == "object") ? (res.error || res.message) : res;
			_err = {[errKey]: [tempKey]};
		}

		return _err;
	},
	getError: function(errObj) {
		if (typeof errObj == "object") {
			let result = "";
			for (let key in errObj) {
				result += errObj[key][0] + "\n";
			}
			return result;
		} else {
			return errObj;
		}
	},
	logError: function(origin, err) {
		console.log({origin, err});
	},
	ask: function(data) {
		Alert.alert(
			data.title,
			data.msg,
			[
				{
					text: "OK",
					onPress: data.onOk,
					style: "ok",
				},
				{
					text: "Cancel",
					onPress: data.onCancel,
					style: "cancel",
				},
			],
			{
				cancelable: true,
				onDismiss: data.onDismiss || data.onCancel,
			}
		);
	},
	mergeArray: function(oldArray, newData) {
		if (!oldArray && !newData) {
			return [];
		}
		return Array.isArray(newData) ? [ ...oldArray, ...newData] : [...oldArray, newData];
	},
	getDataIndex: function(list, selected) {
		if (list && selected != null) {
			let result = list.findIndex( (x) => x.data == selected);
			return result == -1 ? 0 : result;
		} else {
			return false;
		}
	},
	updateDim : function (_width,_height){
		height = _height;
		width = _width;
	},
	isValid: function (data, type) {
		if (data && data != "undefined" && data != undefined && data != "" && data != null) {
			return type ? (typeof data == type ? true : false) : true;
		} else {
			return false;
		}
	},
	empty: function (data) {
		let result;
		if (data && data != "undefined" && data != undefined && data != "" && data != null) {
			if (typeof data == "object") {
				if (Array.isArray(data) && !data.length) {
					result = true;
				} else if (!Object.keys(data).length) {
					result = true;
				} else {
					result = false;
				}
			} else {
				result = false;
			}
		} else {
			result = true;
		}
		return result;
	},
	array_flip: function(trans) {
		let tmp_ar = {};
		for (let key in trans ) {
			if (trans.hasOwnProperty(key)) {
				tmp_ar[trans[key]] = key;
			}
		}
		return tmp_ar;
	},
	filterObjKeys: function (obj, keys = '') {
		let retObj = {};
		keys = keys.split(',');
		for (let key in obj) {
			retObj[key] = {};
			if (keys.length == 1) {
				retObj[key] = obj[key][keys[0]];
			} else {
				for (let i of keys) {
					retObj[key][i] = obj[key][i];
				}
			}
		}
		return retObj;
	},
	setData: function(arg, val) {
		localStorage[arg] = val;
		return localStorage[arg];
	},
	getData: function(arg) {
		return localStorage[arg];
	},
	animate: function(obj, type) {
		if (['easeInEaseOut', "linear", "spring"].includes(type)) {
			LayoutAnimation.configureNext(LayoutAnimation.Presets[type]);
		} else if (['scaleX', "scaleY", "scaleXY"].includes(type)) {
			LayoutAnimation.configureNext(LayoutAnimation.create(
				300,
				LayoutAnimation.Types.linear,
				LayoutAnimation.Properties[type],)
			);
		} else {
			LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		}
		if (this.setState) {
			this.setState(obj);
		}
	},
	jsonToFormData(obj) {
		let formData = new FormData();
		for (let key in obj) {
			formData.append(key, obj[key]);
		}
		return formData;
	},
	accessKey: function(newToken) {
		return new Promise((resolve)=> {
			if (newToken) {
				localStorage['accessKey'] = newToken;
				storeData("accessKey", newToken);
				resolve(newToken);
			} else if (localStorage['accessKey']) {
				resolve(localStorage['accessKey']);
			} else {
				getStoreData('accessKey').then((res)=> {
					localStorage['accessKey'] = res;
					resolve(res);
				})
			}
		});
	},
	checkBack: function (action) {
		BackAndroid.addEventListener('hardwareBackPress', action);
	},
	clearBack: function () {
		BackAndroid.removeEventListener('hardwareBackPress');
	},
	ios: Platform.OS === 'ios' ? true : false,
	osType: Platform.OS,
	width: ()=> Dimensions.get('window').width,
	height: ()=> Dimensions.get('window').height - statusBarHeight(),
	statusBarHeight,

	//--------------------  CSS -----------------//
	...CSS
};

function scale(value, type) {
    //const ratio = UI.ios ? ( width < 550 ? ( width < 430 ? ( width < 375 ? (width < 320 ? 0.75 : 0.875) : 1 ) : 1.125 ) : 1.25 ) : 1;
    //const em = (base_unit * ratio) * 1;
    //console.log(PixelRatio.getPixelSizeForLayoutSize(1), ratio);
    //return (value * ratio);
	return value;
}