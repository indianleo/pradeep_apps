/**
 *  File Name   : ThemeAction.js
 *  Author      : Pradeep Yadav
 *  Description : Theme Action Definitions 
 *  Version     : 1.0
 *  Package     : Theme Components
 *  Last update : 15 May 2017
 */
import {
	Dimensions,
	Platform
} from 'react-native';
	
import Ratio						 	from '../css/DynamicDimension';
import Orientation 						from 'react-native-orientation';
import { Actions } 						from 'react-native-router-flux';

var { height, width }   = Dimensions.get('window');
var deviceType 			= Platform.OS === 'ios' ? true : false ;


//----------- change ip according to system if want to acces localhost server ------------
const localhostRoot = "http://192.168.1.183/shikharAgroTech/"; 

const textColor = {
		btnPrimary 		: "#fff",	
		btnDefault 		: "#fff",
		btnInfo    		: "#fff",
		btnDanger  		: "#fff",
		btnWarning 		: "#fff",	
		btnSuccess 		: "#fff",
		borderDefault 	: '#3f5873',
		borderSuccess 	: '#1ab394',
		borderPrimary 	: '#22aadd',
		borderInfo 	 	: '#55c3e4',
		borderWarning 	: '#f0ad4e',
		borderDanger  	: '#D64937',
		borderCorrect	: '#55ad1f',
		borderIncorrect	: '#af2517',
		btnDefault 	 	: '#fff',
		btnSuccess 	 	: '#fff',
		btnPrimary 	 	: '#fff',
		btnInfo 	 	: '#fff',
		btnWarning 	 	: '#fff',
		btnDanger   	: '#fff',
		btnGray			: '#fff',
		basic		 	: '#000'
};

export function ActionList() {
	let data = {
		deviceInfo : function( status, send =function(){} ) { 
			 Orientation.getOrientation((err,orientation)=> {
					if( status == true ) {
						if( (orientation == 'LANDSCAPE') || (orientation == 'PORTRAITUPSIDEDOWN') ) {
							let inf = {
								height : height,
								width  : width,
								type   : Platform.OS,
								view   : orientation,
								ios	   : deviceType,
							};
							send(inf);
						} else {
							let inf = {
								height : width,
								width  : height,
								type   : Platform.OS,
								view   : orientation,
								ios	   : deviceType,
							};
							send(inf);
						}
					} else {
						if( (orientation == 'LANDSCAPE') || (orientation == 'PORTRAITUPSIDEDOWN') ) {
							let inf = {
								height : width,
								width  : height,
								type   : Platform.OS,
								view   : orientation,
								ios	   : deviceType,
							};
							send(inf);
						} else {
							let inf = {
								height : height,
								width  : width,
								type   : Platform.OS,
								view   : orientation,
								ios	   : deviceType,
							};
							send(inf);
						}
					}
			});
		},
		
		lockToPortrait : function() {
			Orientation.lockToPortrait();
		},
		
		lockToLandscape : function() {
			Orientation.lockToLandscape();
		},
		
		unlockAll : function() {
			Orientation.unlockAllOrientations();
		},
		
		onSartApp : function(send =function(){}) {
			Orientation.getOrientation((err,orientation)=> {
				if( width > height) {
					send(true);
				} else {
					send(false);
				}
			});
		},
		
		ios : deviceType,
		
		type : Platform.OS,
		
		width : Dimensions.get('window').width,
		
		height : Dimensions.get('window').height,

		localhost : localhostRoot,

		imageStore : "http://www.abcnewsexpress.com/native_image/",
		server  : "http://www.abcnewsexpress.com/",
		
		display : function( attr ) {
			//Orientation.unlockAllOrientations();
			Orientation.addOrientationListener(attr.onChange);
		},
		
		setZindex : function(n) {
			let css = {
				zIndex : Number(n),
			};
			return css;
		},
		
		setBg : function( c ) {
			let css = {
				backgroundColor : c,
			};
			return css;
		},
		
		setColor : function( c ) {
			let css = {
				color	: c,
			};
			return css;
		},
		
		setOpacity : function( n ) {
			let css = {
				opacity	: Number(n),
			};
			return css;
		},
		
		getFontSize : function( inf ) {
				let props = inf['props'];
				let minScale = Number(inf['minScale']/100);
				let maxScale = Number(inf['maxScale']/100);
				let width = Number(inf['width']);
				let height = Number(inf['height']);
				let size = 18;
			
				if( props.fontSize ) {
					size = Ratio.em( Number(props.fontSize) / Ratio.UNIT );
				} else if( height < 35 ){
					let dim = ( height ) * .5;
					size = Ratio.em( dim / Ratio.UNIT );
				} else if( height < 100 ){
					let dim = ( height ) * minScale;
					size = Ratio.em( dim / Ratio.UNIT );
				} else {
					let dim = ( width ) * maxScale;
					size = Ratio.em( dim / Ratio.UNIT );
				}
				return size;
		},
		
		setFont : function(n){
			let size = Ratio.em( n / Ratio.UNIT );
			css ={
				fontSize : size,	
			};
			return css;
		},
		
		setFontRatio : function( r ) {
			let size = Ratio.em( r );
			css = {
				fontSize : Number(size),	
			};
			return css;
		},
		
		setFontWeight : function(n) {
			css ={
				fontWeight : n,	
			};
			return css;
		},
		
		getUi : function( props ) {
				let measureWidth = 0;
				if( props.fullWidth ) {
					measureWidth = props.width;
				} else if( props.width && props.width < width ){
					measureWidth = props.width;
				} else {
					measureWidth = width - 20;
				}
				let ui = {
						borderWidth  		: props.border 			|| 0,
						backgroundColor    	: props.background 		|| null,
						borderColor  		: props.borderColor 	|| null,
						color    	 		: props.textColor 		|| "#000",
						fontWeight   		: props.fontWeight    	|| 'normal',
						textAlign			: props.textAlign		|| null,
						height       		: props.height  		|| 50,
						width        		: measureWidth,
						margin				: props.margin			|| 0,
						padding				: props.padding			|| 0,
						borderRadius		: props.borderRadius 	|| 0,
					};
				return ui;
		},
		
		getThemeTextColor : function() {
				return textColor;
		},	
		
		setColorTheme : function( themeName ) {
				let css = {
						color : textColor[ themeName ],
				};
				return css;
		},
		
		setColor : function( col ) {
			let css = {
					color : col,
			};
			return css;
		},
			
		getRadius : function( size ) {
				return(size/2);
		},
			
		setRound : function( size ) {
				let css = {
						height    	 : Number(size),
						width		 : Number(size),
						borderRadius : Number(size/2)
				};
				return css;
		},
	
		setRadius : function( size ) {
				let css = {
						borderRadius : Number(size),
				};
				return css;
		},
		
		setRadiusAll : function( topL, topR, bottomL, bottomR ) {
			let css = {
					borderTopLeftRadius 	: Number(topL),
					borderTopRightRadius 	: Number(topR),
					borderBottomLeftRadius 	: Number(bottomL),
					borderBottomRightRadius : Number(bottomR),
			};
			return css;
		},
			
		setMargin : function( top, left, bottom, right ) {
				let css = {
						marginTop    : Number(top || 0),
						marginLeft   : Number(left || 0),
						marginRight  : Number(right || 0),
						marginBottom : Number(bottom || 0)
				};
				return css;
		},
		
		setMarginAll : function( n ) {
			let css = {
					margin    : Number(n),
			};
			return css;
		},
		
		setMarginTop : function( n ) {
			let css = {
					marginTop    : Number(n),
			};
			return css;
		},
		
		setMarginLeft : function( n ) {
			let css = {
					marginLeft    : Number(n),
			};
			return css;
		},
		
		setMarginBottom : function( n ) {
			let css = {
					marginBottom    : Number(n),
			};
			return css;
		},
		
		setMarginRight : function( n ) {
			let css = {
					marginRight    : Number(n),
			};
			return css;
		},
			
		setPadding : function( top, left, bottom, right ) {
				let css = {
						paddingTop    : Number(top || 0),
						paddingLeft   : Number(left || 0),
						paddingRight  : Number(right || 0),
						paddingBottom : Number(bottom || 0)
				};
				return css;
		},
		
		setPaddingAll : function( n ) {
			let css = {
					padding    : Number(n),
			};
			return css;
		},
		
		setPaddingTop : function( n ) {
			let css = {
					paddingTop    : Number(n),
			};
			return css;
		},
		
		setPaddingLeft : function( n ) {
			let css = {
					paddingLeft    : Number(n),
			};
			return css;
		},
		
		setPaddingRight : function( n ) {
			let css = {
					paddingRight    : Number(n),
			};
			return css;
		},
		
		setPaddingBottom : function( n ) {
			let css = {
					paddingBottom    : Number(n),
			};
			return css;
		},
			
		setVmargin : function( n ) {
				let css = {
						marginVertical : Number(n),
				};
				return css;
		},
			
		setHmargin : function( n ) {
				let css = {
						marginHorizontal : Number(n),
				};
				return css;
		},
			
		setHpadding : function( n ) {
				let css = {
						paddingHorizontal : Number(n),
				};
				return css;
		},
			
		setVpadding : function( n ) {
				let css = {
						paddingVertical : Number(n),
				};
				return css;
		},
			
		setBorder : function( n, color ) {
				let css = {
						borderWidth    : Number(n),
						borderColor    : color,
				};
				return css;
		},
		
		setBorderTop : function( n, color ) {
			let css = {
					borderTopWidth    : Number(n),
					borderTopColor	  : color,
			};
			return css;
	    },
	    
	    setBorderLeft : function( n, color ) {
			let css = {
					borderLeftWidth   : Number(n),
					borderLeftColor   : color,
			};
			return css;
	    },
	    
	    setBorderRight : function( n, color ) {
			let css = {
					borderRightWidth  : Number(n),
					borderRightColor  : color,
			};
			return css;
	    },
	    
	    setBorderBottom : function( n, color ) {
			let css = {
					borderBottomWidth : Number(n),
					borderBottomColor : color,
			};
			return css;
	    },
	    setScreen : function(_width ,_height) {
			let css = {
				width: +_width,
				height: +_height,
			}
			return css;
		},   	
		setWidth : function( n ) {
				let css = {
						width : Number( n ),
				};
				return css;
		},
			
		setHeight : function( n ) {
				let css = {
						height : Number( n ),
				};
				return css;
		},
		
		setMinWidth : function( n ) {
			let css = {
					minWidth : Number( n ),
			};
			return css;
		},
			
		setMinHeight : function( n ) {
				let css = {
						minHeight : Number( n ),
				};
				return css;
		},
		
		setMaxWidth : function( n ) {
			let css = {
					maxWidth : Number( n ),
			};
			return css;
		},
			
		setMaxHeight : function( n ) {
				let css = {
						maxHeight : Number( n ),
				};
				return css;
		},
		
		setFullScreen : function( width , height ) {
			let css = {
				height : Number( height ),
				width : Number( width ),
			};
			return css;
		},
			
		setTop : function(top) {
				let css = {
						top 	: Number( top ),
				};
				return css;
		},
			
		setLeft : function(left) {
				let css = {
						left 	: Number( left ),
				};
				return css;
		},
			
		setRight : function(right) {
				let css = {
						right 	: Number( right ),
				};
				return css;
		},
			
		setBottom : function(bottom) {
				let css = {
						bottom 	: Number( bottom ),
				};
				return css;
		},
			
		setPosition : function(top,left) {
				let css = {
						top 	: Number( top ),
						left 	: Number( left ),
				};
				return css;
		},
		
		setLineHeight : function(n) {
			let css = {
				lineHeight : Number( n ),
			};
			return css;
		},

		location : function( PageName ) {
       			Actions[PageName]();
  		},

		getNews : function(newsId){
		    let news = [
		      {
		        heading : "News Heading 1",
		        details : "News details",
		        image   : "News Image 1",
		      },
		      {
		        heading : "News Heading 2",
		        details : "News details",
		        image   : "News Image 2",
		      },
		      {
		        heading : "News Heading 3",
		        details : "News details",
		        image   : "News Image 3",
		      },
		      {
		        heading : "News Heading 4",
		        details : "News details",
		        image   : "News Image 4",
		      },
		      {
		        heading : "News Heading 5",
		        details : "News details",
		        image   : "News Image 5",
		      },
		    ];

		    return news;
		},
		bidItemList : function(){
			let item = [
		      {
		        name : "TV UHD",
		        itemImage : "tv.jpg",
		        info   : "UHD Tv",
		      },
		      {
		        name : "Mobile",
		        itemImage : "mobile.jpeg",
		        info   : "Samsung Galaxy",
		      },
		      {
		        name : "Cover",
		        itemImage : "mobile_cover.jpg",
		        info   : "Mobile cover which safe your mobile and look pretty.",
		      },
		      {
		        name : "Tab",
		        itemImage : "tab.png",
		        info   : "Tab which capable to do all your works.",
		      },
		      {
		        name : "Laptop",
		        itemImage : "laptop.jpg",
		        info   : "Awesome Performance Laptop which have great prcessor.",
		      },
		      {
		        name : "Refrigrator",
		        itemImage : "fridge.jpeg",
		        info   : "Best cooling Refrigrator which cool over 24 hours.",
		      },
		      
		    ];

		    return item;
		},
	};
	
	return data;
}
