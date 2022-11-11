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
	LayoutAnimation,
    StatusBar,
	Alert,
	StyleSheet,
} from 'react-native';
import API from '../api';
import {AlertType, dim} from './types';

function statusBarHeight(): number {
	return (Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0);
}

const CSS = StyleSheet.create<any>({
	setZindex: function (n: number): any {
		return {
			zIndex: n,
		};
	},
	setBg: function (c: string): any {
		return {
			backgroundColor: c,
		};
	},
	setOpacity: function (n: number): any {
		return {
			opacity: n,
		};
	},
	setFont: function (n: number) {
		return {
			fontSize: n,
		};
	},
	getFont : function (n: number): number {
		return n;
	},
	setFontWeight: function (n: number) {
		return {
			fontWeight: n,
		};
	},
	setColor: function (col: string) {
		return {
			color: col,
		};
	},
	getRadius: function (size: number) {
		return (size / 2);
	},
	setRound: function (size: number) {
		return {
			height: size,
			width: size,
			borderRadius: (size / 2),
		};
	},
	setRadius: function (size: number) {
		return {
			borderRadius: size,
		};
	},
	setRadiusOn: function (size: number, place: string) {
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
	setRadiusAll: function (topL: number, topR: number, bottomL: number, bottomR: number) {
		return {
			borderTopLeftRadius: topL,
			borderTopRightRadius: topR,
			borderBottomLeftRadius: bottomL,
			borderBottomRightRadius: bottomR,
		};
	},
	setMargin: function (top: number, left: number, bottom: number, right: number, isPercent: string) {
		if (isPercent) {
			return {
				marginTop: `${(top || 0)}%`,
				marginLeft: `${(left || 0)}%`,
				marginRight: `${(right || 0)}%`,
				marginBottom: `${(bottom || 0)}%`,
			};
		} else {
			return {
				marginTop: (top || 0),
				marginLeft: (left || 0),
				marginRight: (right || 0),
				marginBottom: (bottom || 0)
			};
		}
		
	},
	setMarginAll: function (n: number, isPercent: string) {
		return {
			margin: isPercent ? `${n}%` : n,
		};
	},
	setMarginTop: function (n: number, isPercent: string) {
		return {
			marginTop: isPercent ? `${n}%` : n,
		};
	},
	setMarginLeft: function (n: number, isPercent: string) {
		return {
			marginLeft: isPercent ? `${n}%` : n,
		};
	},
	setMarginBottom: function (n: number, isPercent: string) {
		return {
			marginBottom: isPercent ? `${n}%` : n,
		};
	},
	setMarginRight: function (n: number, isPercent: string) {
		return {
			marginRight: isPercent ? `${n}%` : n,
		};
	},
	setPadding: function (top: number = 0, left: number = 0, bottom: number = 0, right: number = 0, isPercent:string|boolean = false) {
		return {
			paddingTop: isPercent ? `${top}%` : top,
			paddingLeft: isPercent ? `${left}%` : left,
			paddingRight: isPercent ? `${right}%` : right,
			paddingBottom: isPercent ? `${bottom}%` : bottom,
		};
	},
	setPaddingAll: function (n: number, isPercent: string) {
		return {
			padding: isPercent ? `${n}%` : n,
		};
	},
	setPaddingTop: function (n: number, isPercent: string) {
		return {
			paddingTop: isPercent ? `${n}%` : n,
		};
	},
	setPaddingLeft: function (n: number, isPercent: string) {
		return {
			paddingLeft: isPercent ? `${n}%` : n,
		};
	},
	setPaddingRight: function (n: number, isPercent: string) {
		return {
			paddingRight: isPercent ? `${n}%` : n,
		};
	},
	setPaddingBottom: function (n: number, isPercent: string) {
		return {
			paddingBottom: isPercent ? `${n}%` : n,
		};
	},
	setVmargin: function (n: number, isPercent: string) {
		return {
			marginVertical: isPercent ? `${n}%` : n,
		};
	},
	setHmargin: function (n: number, isPercent: string) {
		return {
			marginHorizontal: isPercent ? `${n}%` : n,
		};
	},
	setHpadding: function (n: number, isPercent: string) {
		return {
			paddingHorizontal: isPercent ? `${n}%` : n,
		};
	},
	setVpadding: function (n: number, isPercent: string) {
		return {
			paddingVertical: isPercent ? `${n}%` : n,
		};
	},
	setBorder: function (n: number, color: string) {
		return {
			borderWidth: n,
			borderColor: color,
		};
	},
	setAllBorder: function (n: number, color: string) {
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
	setBorderTop: function (n: number, color: string) {
		return {
			borderTopWidth: n,
			borderTopColor: color,
		};
	},
	setBorderLeft: function (n: number, color: string) {
		return {
			borderLeftWidth: n,
			borderLeftColor: color,
		};
	},
	setBorderRight: function (n: number, color: string) {
		return {
			borderRightWidth: n,
			borderRightColor: color,
		};
	},
	setBorderBottom: function (n: number, color: string) {
		return {
			borderBottomWidth: n,
			borderBottomColor: color,
		};
	},
	setScreen: function (_width: number, _height: number, isPercent: string) {
		return {
			width: isPercent ? _width + '%' : (_width || width),
			height: isPercent ? _height + '%' : (_height || height),
		}
	},
	setWidth: function (n: number, isPercent: string) {
		return {
			width: isPercent ? n + '%' : (n || width),
		};
	},
	setHeight: function (n: number, isPercent: string) {
		return {
			height: isPercent ? n + '%' : (n || height),
		};
	},
	setAuto: function(type: string) {
		switch (type) {
			case 'height': return { height : 'auto' };
			case 'width': return { width: 'auto' };
			default: return { width: '100%', height : 'auto' };
		}

	},
	setHeightRatio: function (n: number) {
		return {
			height: n
		};
	},
	setMinMaxHeight: function (min: number, max: number) {
		return {
			minHeight: min,
			maxHeight: max,
		};
	},
	setMinMaxWidth: function (min: number, max: number) {
		return {
			minWidth: min,
			maxWidth: max,
		};
	},
	setMinWidth: function (n: number) {
		return {
			minWidth: n,
		};
	},
	setMinHeight: function (n: number) {
		return {
			minHeight: n,
		};
	},
	setMaxWidth: function (n: number) {
		return {
			maxWidth: n,
		};
	},
	setMaxHeight: function (n: number) {
		return {
			maxHeight: n,
		};
	},
	setFlex: function (_value: number) {
		return {
			flex: _value
		};
	},
	setTop: function (top: number, isPercent: string) {
		return {
			top: isPercent ? top + '%' : top,
		};
	},
	setLeft: function (left: number, isPercent: string) {
		return {
			left: isPercent ? left + '%' : Number(left),
		};
	},
	setRight: function (right: number, isPercent: string) {
		return {
			right: isPercent ? right + '%' : Number(right),
		};
	},
	setBottom: function (bottom: number, isPercent: string) {
		return {
			bottom: isPercent ? bottom + '%' : Number(bottom),
		};
	},
	setPosition: function (top: number, left: number, isPercent: string) {
		return {
			top: isPercent ? top + '%' : Number(top),
			left: isPercent ? left + '%' : Number(left),
		};
	},
	setLineHeight: function (n: number) {
		return {
			lineHeight: n,
		};
	},
	setCenter: function (type: string) {
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
	setItem: function (type: string) {
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
	setTextAlign: function (type: string) {
		// type - 'auto', 'top', 'bottom', 'center', 'justify'
		return ({
			textAlign: type,
		})
	},
	charSpace: function (num: number) {
		return ({
			letterSpacing: +num,
		});
	},
})

// export const Libs = {
// 	initGeoCoading: function() {
// 		Geocoder.init(API.googleApiKey);
// 	},
// 	geoFrom: function(cord) {
// 		return Geocoder.from(cord);
// 	},
// } 

export const UI = {
	createError: function (res:any = "Data not found", errKey:string = "reqInfo") {
		let _err = res?.error || res?.message || res;
		if (typeof _err == "string") {
			let tempKey =  (typeof res == "object") ? (res.error || res.message) : res;
			_err = {[errKey]: [tempKey]};
		}

		return _err;
	},
	getError: function(errObj: any) {
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
	logError: function(origin: any, err: any) {
		console.log({origin, err});
	},
	ask: function(data: AlertType) {
		Alert.alert(
			data.title,
			data.msg,
			[
				{
					text: "OK",
					onPress: data.onOk,
					style: "default",
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
	mergeArray: function(oldArray: Array<any>, newData: Array<any>) {
		if (!oldArray && !newData) {
			return [];
		}
		return Array.isArray(newData) ? [ ...oldArray, ...newData] : [...oldArray, newData];
	},
	getDataIndex: function(list: Array<any>, selected: string|number|boolean) {
		if (list && selected != null) {
			let result = list.findIndex( (x) => x.data == selected);
			return result == -1 ? 0 : result;
		} else {
			return false;
		}
	},
	isValid: function (data: any, type?: string): boolean {
		if (data && data != "undefined" && data != undefined && data != "" && data != null) {
			return type ? (typeof data == type ? true : false) : true;
		} else {
			return false;
		}
	},
	empty: function (data: any): boolean {
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
	filterObjKeys: function (obj: any, keys: string = '') {
		let retObj:any = {};
		const keyList:Array<string> = keys.split(',');
		for (const key in obj) {
			retObj[key as keyof typeof retObj] = {};
			if (keyList.length == 1) {
				retObj[key] = obj[key as keyof typeof obj][keyList[0]];
			} else {
				for (let i of keys) {
					retObj[key][i] = obj[key as keyof typeof obj][i];
				}
			}
		}
		return retObj;
	},
	animate: function(obj: any, type: string) {
		if (['easeInEaseOut', "linear", "spring"].includes(type)) {
			LayoutAnimation.configureNext(LayoutAnimation.Presets[type as keyof typeof LayoutAnimation.Presets]);
		} else if (['scaleX', "scaleY", "scaleXY"].includes(type)) {
			LayoutAnimation.configureNext(LayoutAnimation.create(
				300,
				LayoutAnimation.Types.linear,
				LayoutAnimation.Properties[type as keyof typeof LayoutAnimation.Properties],)
			);
		} else {
			LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		}
		
		return obj;
	},
	jsonToFormData(obj: object) {
		let formData = new FormData();
		for (let key in obj) {
			formData.append(key, obj[key as keyof typeof obj]);
		}
		return formData;
	},
	accessKey: function(newToken: any) {
		return new Promise((resolve)=> {
			if (newToken) {
				API.storeData("accessKey", newToken);
				resolve(newToken);
			} else {
				API.getStoreData('accessKey').then((res: any)=> {
					resolve(res);
				})
			}
		});
	},
	clearBack: function () {
		BackAndroid.removeEventListener('hardwareBackPress');
	},
	ios: Platform.OS === 'ios' ? true : false,
	osType: Platform.OS,
	width: (reducePart:number)=> Dimensions.get('window').width - (reducePart || 0),
	height: (reducePart:number)=> Dimensions.get('window').height - (statusBarHeight() + (reducePart || 0)),
	statusBar: statusBarHeight(),

	//--------------------  CSS -----------------//
	...CSS
};