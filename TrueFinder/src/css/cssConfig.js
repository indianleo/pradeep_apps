import { Dimensions } from "react-native";
const statusBarHeight = ()=> (Platform.OS === 'ios' ? 0 : StatusBar.currentHeight);

export const cssConfig = {
	ios: Platform.OS === 'ios' ? true : false,
	width: ()=> Dimensions.get('window').width,
	statusBarHeight,
	height: ()=> Dimensions.get('window').height - statusBarHeight(),
	fontFamily: "ROBOTO",
}

export const getDynamicStyle = {
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
	setFont: function (n) {
		return {
			fontSize: +n,
		};
	},
	getFont : function (n) {
		return +n;
	},
	setFontWeight: function (n) {
		return {
			fontWeight: n,
		};
	},
	setColor: function (col) {
		return {
			color: col,
		};
	},
	setRound: function (size) {
		return {
			height: +size,
			width: +size,
			borderRadius: +(size / 2),
		};
	},
	setRadius: function () {
		if (arguments.length > 2) {
			let [topL, topR, bottomL, bottomR] = arguments;
			return {
				borderTopLeftRadius: Number(topL),
				borderTopRightRadius: Number(topR),
				borderBottomLeftRadius: Number(bottomL),
				borderBottomRightRadius: Number(bottomR),
			};
		} else {
			let [size, place] = arguments;
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
		}
	},
	setMargin: function () {
		if (arguments.length > 3) {
			let [top, left, bottom, right, isPercent] = arguments;
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
		} else {
			let [n, isPercent, place] = arguments;
			switch(place) {
				case 'top': return {marginTop: isPercent ? `${n}%` : n}
				case 'left': return {marginLeft: isPercent ? `${n}%` : n}
				case 'right': return {marginRight: isPercent ? `${n}%` : n}
				case 'bottom': return {marginBottom: isPercent ? `${n}%` : n}
				default: return {margin: isPercent ? `${n}%` : n}
			}
		}
		
	},
	setPadding: function () {
		if (arguments.length > 3) {
			let [top, left, bottom, right, isPercent] = arguments;
			return {
				paddingTop: isPercent ? `${top}%` : top,
				paddingLeft: isPercent ? `${left}%` : left,
				paddingRight: isPercent ? `${right}%` : right,
				paddingBottom: isPercent ? `${bottom}%` : bottom,
			};
		} else {
			let [n, place, isPercent] = arguments;
			switch(place) {
				case 'top': return {paddingTop: isPercent ? `${n}%` : n};
				case 'left': return {paddingLeft: isPercent ? `${n}%` : n}
				case 'right': return {paddingRight: isPercent ? `${n}%` : n}
				case 'bottom': return {paddingBottom: isPercent ? `${n}%` : n}
				default: return {padding: isPercent ? `${n}%` : n}
			}
		}
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

	setBorder: function (n, color, place) {
		switch (place) {
			case 'top': return {
				borderTopWidth: n,
				borderTopColor: color,
			};
			case 'left': return {
				borderLeftWidth: n,
				borderLeftColor: color,
			};
			case 'right': return {
				borderRightWidth: n,
				borderRightColor: color,
			};
			case 'bottom': return {
				borderBottomWidth: n,
				borderBottomColor: color,
			};
			default: return {
				borderWidth: n,
				borderColor: color,
			};
		}
	},
	setAllBorder: function (n, color, type) {
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
		switch (type) {
			case 'v': return { alignItems: 'center' };
			case 'h': return { justifyContent: 'center' };
			case 'self': return { alignSelf: 'center' };
			default: return { alignItems: 'center', justifyContent: 'center' };
		};
	},

	setItem: function (type) {
		switch (type) {
			case 'hStart': return { alignItems: 'flex-start' };
			case 'hEnd': return { alignItems: 'flex-end' };
			case 'vCenter': return { alignItems: 'center' };
			case 'hStretch': return { alignItems: 'stretch' };
			case 'vStart': return { justifyContent: 'flex-start' };
			case 'vEnd': return { justifyContent: 'flex-end' };
			case 'vCenter': return { justifyContent: 'center' };
			case 'vGap': return { justifyContent: 'space-between' };
			case 'vAround': return { justifyContent: 'space-around' };
			case 'selfStart': return { alignSelf: 'flex-start' };
			case 'selfEnd': return { alignSelf: 'flext-end' };
			case 'selfCenter': return { alignSelf: 'center' };
			case 'selfStretch': return { alignSelf: 'stretch' };
			default: return { alignItems: 'center', justifyContent: 'center' };
		};
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
	}
}

export const colors = {
	textColor: "#3B4948",
	accent: '#ED8D6F',
	themeBg: '#71DAD2',
	lightThemeBgg: '#E8F3F3',
	btnBgColor: "#71DAD2",
	btnTextColor: '#FFF',
	shadowColor: "#000",
	bgWhite: '#f2f2f2',
	borderColor: "#BDF2EF",
	inputBorderColor: '#71DAD2',
	primary10: '#E8F3F3',
	primary20: '#BDF2EF',
	primary40: '#71DAD2',
	primary100: '#70ECE3',
	white: '#fff',
	black: '#000',
	orangeText: '#d8440e'
}