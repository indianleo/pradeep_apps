/**
 *  File Name   : Theme.js
 *  Author      : Pradeep Yadav
 *  Description : Theme CSS Defnintions
 *  Version     : 1.0
 *  Packege     : Theme Components
 *  Last update : 27 March 2017
 */

import { StyleSheet } from 'react-native';
import { height, width, deviceType } from '../components/ComponentFunction';
import Ratio from './DynamicDimension';
module.exports = StyleSheet.create({
	row : {
		flexDirection		:'row',
		flexWrap			:'wrap',
	},
	rowStyle : { 
		flexDirection   	: 'row',         
	},
	columnStyle  : { 
		flexDirection   	: 'column'      
	},
    columnStyle : { 
    	flexDirection   	: 'column',      
    },
    fullScreen : {
    	height				: height,
    	width				: width,
    },
    halfWidth : {
    	width 				: width/2,
    },
    radiusSm	: {
    	borderRadius		: 3,
    },
    radius : {
    	borderRadius		: 5,
    },
    radiusMd : {
    	borderRadius		: 10,
    },
    radiusLg : {
    	borderRadius		: 15,
    },
    radiusXl : {
    	borderRadius		: 20
    },
    forgot: {		
    	position			: 'relative',
    	right				: 0,
    },
    googleLog : {
    	color				: '#fff',
    	width				: 50,
        borderRadius		: 25,
        height				: 50,
        backgroundColor		: '#D44326',
        borderWidth			: 1,
        margin				: 6,
        marginTop			: 12,
        borderColor			: '#B7291B',
    },
    loginTab : {
		  borderTopColor	: deviceType ? '#34485E' : '#178484',
		  borderTopWidth	: 20
	},
	logButton : {
    	borderWidth			: 1,		
    	borderColor			: '#34485E',		
    	backgroundColor		: deviceType ? '#34485E' : '#178484',
    	shadowColor			: '#3f5873',
    },
    leftButton : {
    	position			:'absolute',
        left				: Ratio.em(1.0625),
        bottom 				: Ratio.em(0.5625),
        backgroundColor		:'#fff',
        overflow			:'hidden',
        borderRadius		: Ratio.em(0.9375),
        
    },
    rightButton: {
    	position			:'absolute',
        right				: Ratio.em(0.9375),
        bottom 				: Ratio.em(0.5625),
        backgroundColor		: '#fff',
        overflow			: 'hidden',
        borderRadius		: Ratio.em(0.9375),
        
    },
	loginLogo: {
   	 	//width				: (height <= 480) ? width/3.8 : (width/4)+5,
   	 	//height			: (height <= 480) ? width/3.8 : (width/4)+5,
   	 	//borderRadius		: (height <= 480) ? ((width/3.8)/2) : ((width/4)+5)/2,
  	    borderColor			:'#fff',
  		borderWidth			: 2,
    },
    undoSm : {
    	alignItems			: 'center',
        justifyContent		: 'center',
        alignSelf			: 'center',
    	top					: -9,
    	position			: 'absolute',
    	right				: -2,
    	borderColor 		: '#555',
        borderWidth 		: 1,
        borderRadius		: 11,
        width       		: 22,
        height      		: 22,
    	backgroundColor		: '#fff',
    },
    leftButton : {
        left				: Ratio.em(1.0625),
        bottom 				: Ratio.em(0.5625),
        position			: 'absolute',
        backgroundColor		: '#fff',
        overflow			: 'hidden',
        borderRadius		: Ratio.em(0.9375),
        
    },
    rightButton: {
        right: Ratio.em(0.9375),
        bottom : Ratio.em(0.5625),
        position:'absolute',
        backgroundColor:'#fff',
        overflow:'hidden',
        borderRadius: Ratio.em(0.9375),
        
    },
    nextButtonSM : {
    	bottom 				: 50,
    },
    navigationContainer:{
    	position        	: 'absolute',
    	//top             	: width/16.5, // do not change it
    	bottom				: 0,
    	//paddingTop			: width/8,
    	right				: 0,
    	left				: 0,
    },
    toolbarIcon : {
    	position			: 'absolute',
    	bottom				: 0,
    	left				: 0,
    	right				: 0,
    	height				: Ratio.em(3.1875),
    	borderTopWidth 		: 1,
    	borderTopColor 		: '#ccc',
    	backgroundColor		: '#fdfdfd',
    },
    toolbarReviewIndicator :{
        backgroundColor		: 'transparent',
    },
    testNavigationBody: {
		marginBottom		: 39,
		padding				: 12,
		paddingBottom		: 40,
    },
    navbar : {
		backgroundColor	    : deviceType ? '#3f5873' : '#178484',
		//position		    : 'absolute',
		//left         	    : 0,
		//right          	: 0,
		//top				: 20, 
		shadowColor			: '#888',
      //  width             : width,					//use ThemeAction
        shadowOpacity		: 0.8,
        shadowRadius		: 3,
        shadowOffset		: { height : 3, width : 0 },
        justifyContent		: 'center',
			
	},
	navbar2: {
		backgroundColor		: deviceType ? '#3f5873' : '#178484',
		position			: 'absolute',
		top					: 0,
		right				: 0,
		left				: 0,
		borderTopWidth		: deviceType ? 20 : 0,
		borderTopColor		: '#34485E',
        shadowColor         : '#888',
        //width               : width,						// Use ThemeAction
       // height              : ( width/7.6 ) + 20 ,		// Use ThemeAction
        justifyContent      : 'center',
    },
    navbarOuter : {
    	position			: 'absolute',
		top					: deviceType ? 20 : 0,
    },
	navTop: {
		position			: 'absolute',
		top					: 0,
		right				: 0,
		left				: 0,
	},
	navbarTitle : {
		color           	: '#fff',
		fontSize        	: Ratio.em(1.3618),
		fontWeight      	: "400",
		alignSelf       	: 'center',
		textAlign			: 'center',	
	},
	textInput : {
		//height				: height*.05,
		backgroundColor		: '#ffffff',
		borderWidth			: 1,
		borderColor			: '#ddd',
		color				: '#555555',
		borderRadius		: 3,
		padding				: 5,
	},
	welcomeContainer : {
    	height				: height - ((height/2.5)),
    	paddingTop			: height/9,
    },
    hide: {
    	opacity				: 0
    },
    userPic : {
    	height				: 55,		    		    	
	    width				: 55,				
    	borderRadius		: 28,	
    	borderWidth			: 1,
    	borderColor			: '#fcfcfc'
    },
    horizontal_line : {
    	height				: 1,
    	backgroundColor 	: '#ccc',
    	marginRight			: 12,
    	marginLeft			: 12,
    },
    innerContainer : {												// not chnaged yet written by husain
    	position        	: 'relative',
    	//top             	: 100,//height/5.5, // do not change it
    	bottom				: 0,
    	right				: 0,
    	left				: 0,
    	paddingTop			: Ratio.em(1.36184),
    },
    innerContainerSearch : {
    	position        	: 'relative',
    	//top             	: 80,							//width/5.5, 				// do not change it
    	paddingTop      	: Ratio.em(1.36184),       //width/19, // do not change it
    },
    innerContainerDb : {
    	position       	 	: 'absolute',
    	top            		: width/5.5, // do not change it
    	bottom				: 0,
    	paddingTop			: width/19,
    	right				: 0,
    	left				: 0,
    },
    roundCircle : {												// don't change on rotation also
		width				: (width/4)+10,
		height				: (width/4)+10,
		backgroundColor		: '#E9E9E9',
		borderRadius		: ((width/4)+10)/2,
		overflow			: 'hidden',
	},
	blankUser : {
		fontSize			: Ratio.em(7.09375),
		color				: '#ccc',
	},
	profile : {
   		width				: (width/4)+10,
   		height				: (width/4)+10,
   		borderRadius		: ((width/4)+10)/2,
   		backgroundColor		: '#1ab394',
  		borderColor			: '#fff',
  		borderWidth			: 2,
    },
	logSwitch:{
		right				: width/35,
		top					: 30,
		position			: 'absolute',
		alignSelf      		: 'center',
		justifyContent		: 'center',
		height				: (height*.1),
	},
	searchContainer: {		
    	alignItems			: 'center',
    	position			: 'absolute',
    	top					: 0,
		left           		: 0,
		right         		: 0,
    	borderTopWidth		: deviceType ? 20 : 0,
    	minHeight			: 67,
    	backgroundColor		: deviceType ? '#5a6d7d' : '#1fadad',
    	borderBottomWidth   : 2,
    	borderTopColor		: '#34485E',
        borderBottomColor   : deviceType ? '#3f5873' : '#178484',
    	shadowColor			: '#5a6d7d',
        shadowOpacity		: 1,
        shadowRadius		: 4,
        shadowOffset		: { height	: 3, width	: 3 },  
        overflow			: 'hidden',
    },	
    searchContainerGlossary : {  
        borderTopWidth 		: deviceType ? 20 : 0,
        backgroundColor		: deviceType ? '#5a6d7d' : '#1fadad',
        borderTopColor		:'#34485E',
        borderBottomWidth   : 1,
        borderBottomColor   : deviceType ? '#3f5873' : '#0f5757',
        shadowColor			: '#5a6d7d',
        shadowOpacity		: 1,
        shadowRadius		: 4,
        overflow			: 'hidden',
        shadowOffset		: { height : 3, width : 3, },
       // width				: width,								// use ThemeAction
    },
    searchLib: {		
    	//paddingLeft    	: width/8,						// use ThemeAction
    	//paddingBottom    	: width/100,						// use ThemeAction
    	//paddingRight     	: width/80,							// use ThemeAction
    	//paddingTop       	: width/70,							// use ThemeAction		
    	//height           	: width/7.68,						// use ThemeAction
    	marginRight			: -5,	
    	backgroundColor  	: deviceType ? '#fff' : 'transparent',
    	fontSize         	: Ratio.em(1.29375),
    	color				: '#5a6d7d',
    },
    searchLibAndroid : {
    	fontSize         	: Ratio.em(1.29375),
    	color				: '#fff',
    },
    serachBackBtn: {		
	    position			: 'absolute',		
	    left				: 10,		
	    top					: 0,
	    justifyContent		: 'center',
	   // height			:(height*.095),					// Use ThemeAction
	    backgroundColor		: '#fff',
    },
    serachBackBtnAndroid: {		
	    position			: 'absolute',		
	    right				: 10,		
	    top					: 0,
	    justifyContent		: 'center',
	   // height			:(height*.095),
	    backgroundColor		: 'transparent',
    },
    bg : { 
    	backgroundColor		: '#eee'
    },   		    		
    bg0	: { 
		backgroundColor		: '#A1897F'
	}, 		
	bg1 : { 
		backgroundColor		: '#F4A816'
	},  		   		  		
	bg2	: { 
		backgroundColor		: '#A7D5C1'
	},  		
	bg3	: { 
		backgroundColor		: '#F5D75F'
	},  		
	bg4	: { 
		backgroundColor		: '#B5CE34'
	},  		
	bg5	: { 
		backgroundColor		: '#DCB664'
	},   		
	bg6	: { 
		backgroundColor		: '#B06F50'
	}, 
	bg7 : { 
		backgroundColor		: '#F48FB1'
	},
	bg8 : { 
		backgroundColor 	: '#B0BFC6'
	},
	bg9	: { 
		backgroundColor		: '#FF5444'
	},   		
	bg10 : { 
		backgroundColor		: '#FE4A65'
	},
	bg11 : { 
		backgroundColor		: '#BA6089'
	}, 		  
	bg12 : { 
		backgroundColor		: '#66BB6A'
	},
	bg13 : { 
		backgroundColor		: '#E59689'
	},   		
	bg14 : { 
		backgroundColor		: '#CDC697'
	}, 
	bg15 : { 
		backgroundColor		: '#FADC60'
	},
	bg16 : { 
		backgroundColor		: '#FFA500',
	},		
	bg17 : { 
		backgroundColor		: '#0192FF'
	},   		
	bg18 : { 
		backgroundColor		:'#B9B299'
	},
	bg19 : { 
		backgroundColor		: 'goldenrod'
	}, 	
	bg20 : { 
    	backgroundColor		: '#F8F8F8',
    },
	bg21 : { 
		backgroundColor		: '#4489FE'
	},
	bg22 : { 
		backgroundColor		: '#19A966'
	},  		
	bg23 : { 
		backgroundColor		: '#FFC927'
	},  		
	bg24 : { 
		backgroundColor		: '#CDDC39'
	},  		
	bg25 : { 
		backgroundColor		: '#0C6667'
	},   		
	bg26 : { 
		backgroundColor		: '#CA8E7F'
	},  		
	bg27 : { 
		backgroundColor		: '#BFE1DB'
	},		
	bg28 : { 
		backgroundColor		: '#693AB8'
	},		
	cb29 : { 
		backgroundColor		: '#FF5534'
	},		
	bg30 : { 
		backgroundColor		: '#FADC60'
	}, 		   		
	bg31 : { 
		backgroundColor		: '#E57373'
	},
    bgTransparent : {
    	backgroundColor		: 'transparent',
    },
    bgShade : { 
    	backgroundColor		: '#F8F8F8',
    },
    bgGray : {
    	backgroundColor 	: '#808080',
    },
    bgRed : {
    	backgroundColor 	: '#D64937',
    },
    bgBlack : {
    	backgroundColor		: '#000',
    },
	bgWhite : {
		backgroundColor		: '#fff',
	},
	bgSuccess : {
		backgroundColor		: '#1ab394',
	},
	bgPrimary : {
		backgroundColor 	: '#22aadd',
	},
	bgDanger : {
		backgroundColor		: '#D64937',
	},
	bgWarning : {
		backgroundColor		: '#f0ad4e',
	},
	bgInfo : {
		backgroundColor		: '#55c3e4',
	},
	bgDefault : {
		backgroundColor		: '#3f5873',
	},
    selfCenter   : { 
    	alignSelf       	: 'center',     
    },
    selfStretch  : { 
    	alignSelf			: 'stretch',
    },
    selfStart   : { 
    	alignSelf       	: 'flex-start',     
    },
    selfEnd   : { 
    	alignSelf       	: 'flex-end',     
    },
	center : {
		alignItems      	: 'center',
		justifyContent		: 'center',
	},
	vCenter : {
		alignItems      	: 'center',
	},
	vStretch : {
		alignItems      	: 'stretch',
	},
	vStart : {
		alignItems      	: 'flex-start',
	},
	vEnd : {
		alignItems      	: 'flex-end',
	},
	hCenter : {
		justifyContent      : 'center',
	},
	hAround : {
		justifyContent      : 'space-around',
	},
	hBetween : {
		justifyContent      : 'space-between',
	},
	hEnd : {
		justifyContent		: 'flex-end',
	},
	hStart : {
		justifyContent		: 'flex-start',
	},
	fullWidth : {
		width 				: width,
	},
	fullHeight : {
		height 				: height,
	},
	hMargin : {
		marginHorizontal	: 10,
	},
	hMarginMd : {
		marginHorizontal	: 5,
	},
	hMarginMd : {
		marginHorizontal	: 3,
	},
	vMargin : {
		marginVertical		: 10,
	},
	vMarginMd : {
		marginVertical		: 5,
	},
	vMarginSm : {
		marginVertical		: 3,
	},
	hPadding : {
		paddingHorizontal	: 10,
	},
	hPaddingMd : {
		paddingHorizontal	: 5,
	},
	hPaddingSm : {
		paddingHorizontal	: 3,
	},
	vPadding : {
		paddingVertical	: 10,
	},
	vPaddingMd : {
		paddingVertical	: 5,
	},
	vPaddingSm : {
		paddingVertical	: 3,
	},
	flowHidden : {
		overflow			: 'hidden',
	},
	flowVisible : {
		overflow			: 'visible',
	},
	prepEngineIndicatorsPane:{
    	//width				: (width/1.25),					// use ThemeAction 
    	position			: 'absolute',
    	//top					: width/6.3, 				// use ThemeAction 
    	borderBottomWidth	: 1,
    	borderBottomColor	:'transparent',
    	//paddingBottom		: width/29,						// use ThemeAction 
    	//paddingTop			: width/32
    },
	activeTab:{
  		alignItems      	: 'center',
		justifyContent  	: 'center',
		backgroundColor		: deviceType ? '#2d4156' : '#006666',
	},
	normalTab:{
		alignItems      	: 'center',
		justifyContent  	: 'center',
	},
	disabled:{
    	opacity				: 0.4
    },
    title1: {
    	fontSize     		: Ratio.em(0.75),
    	fontWeight   		: 'bold'
    },
    title2: {
    	fontSize     		: Ratio.em(0.95833),
    	fontWeight   		: 'bold'
    },
    filterIcon: {
		width				: width/5,
		height				: height/20
	},
	listCounterEbook:{
    	width				: (width/18)+20,
    },
    linkColor : {
    	color				: '#b0281a',
    },	
    orContainer:{
     	//width				: width,
     	borderBottomWidth	: 1,
     	borderBottomColor	: '#ccc',
     //	marginTop			: (height <= 480) ? width/15 : width/5,
     //	marginBottom		: width/15,
    },
    androidSocialMedia:{
     	alignItems			: 'center',
         justifyContent		: 'center',
         alignSelf			: 'center',
    }, 
    shadow : {
        backgroundColor		: '#ffffff',
        shadowColor			: '#888',
        shadowOpacity		: 1,
        shadowRadius		: 5,
        shadowOffset		: { height: 1, width: 4 }
    },
    shadow2 : {
        backgroundColor		: '#ffffff',
        shadowColor			: '#888',
        shadowOpacity		: .5,
        shadowRadius		: 4,
        shadowOffset		: { height: 1, width: 1 }
    },
    width60 : { 
    	width 				: width-60        // husian sir's css
    },
    width30 : { 
    	width 				: (width/3)-5,    // husian sir's css
    },
    listCounterEbook:{
    	width				: (width/18)+20,  // husian sir's css
    },
    tocChapter : {
		backgroundColor		:'#fff',
		/*position			: 'relative',	  // husain sir's css
		top					: 10,
		paddingBottom		: 18,
		right				: 30,			
		paddingTop			: 10,*/
	},
	headerWidth : {
  		backgroundColor		: '#3f5873',
  	},
  	greyBorderBottom : {
  		borderBottomWidth	: 1,
  		borderColor			: '#ddd'
  	},
  	greyBorderTop : {
  		borderTopWidth		: 1,
  		borderColor			: '#ddd'
  	},
  	prepDots :{
		height				: 8,
		width				: 8, 
		borderRadius		: 5,
	},
  	sidepaneWidth : {
    	//width				: (width/1.25),   // use ThemeAction
    	borderTopWidth		: deviceType ? 20 : 0,
    	borderTopColor		: '#34485E',
    },
	tocList : {
		//borderLeftWidth		: 3,
		//borderLeftColor		:'#f1f1f1',
		//marginLeft			:  (width*.03),//deviceType ? (width*.06) : (width*.03),      use Themection
		//paddingLeft			: (width*.11),//deviceType ? (width*.06) : (width*.11),			 use Themection
		marginTop			: 25,
		marginBottom		: 60,
	},
	tocListBar : {
		borderLeftWidth		: 3,
		borderLeftColor		:'#f1f1f1',
		//marginLeft			: ((width*.1)/2)-2,								// use ThemeAction
		//paddingLeft			: (width*0),
		marginTop			: 20,
		marginBottom		: 60,
	},
	contentWidth : {
    	width				: (width*3)/4,
    },
    def_container : {
		borderWidth			: 1,
		borderColor			: '#ddd',
		borderRadius		: 5,
		marginLeft			: 5,
		marginRight			: 5,
		overflow			: 'hidden',
		backgroundColor		: '#fbfbfb',
	},
	toc_heading_multi: {
		color				:'#444',
		fontWeight			:'600',
	    fontSize			: Ratio.em(1.125),
	},
	toc_heading:{
	    color				:'#1ab394',
	    fontWeight			:'700',
	    fontSize			: Ratio.em(1.125),
	},
	tocBullet: {
		borderColor			: '#bdbdbd',
		borderWidth 		: 2,
		//borderRadius		: (width*.1)/2,        //use ThemeAction
		//width				: (width*.1),			//use ThemeAction
		//height			: (width*.1),			//use ThemeAction
		backgroundColor		: '#EEDC9D',
		opacity				: 1,
	},
	tocBulletTxt:{
		color				: '#999',
		fontWeight			: 'bold',
		fontSize			: Ratio.em(0.9241),
		backgroundColor		:'transparent',
	},
	alertSm : {	
        borderWidth 		: 1,
        borderLeftWidth		: 2,
        paddingVertical		: 1,
        paddingHorizontal	: 3,
    },
    alert : {		
        paddingVertical		: 7,
        paddingHorizontal	: 10,
        borderWidth 		: 1,
        borderLeftWidth		: 3,
    },
    alertWarning : {		
        backgroundColor		: '#fcf8e3',		
	    borderColor			: '#faebcc',
	    borderLeftColor		: '#f8ac59',
    },
    alertInfo : {		
        backgroundColor		: '#d9edf7',		
	    borderColor			: '#bce8f1',
	    borderLeftColor		: '#1ab394',
    },
    alertSuccess : {		
        backgroundColor		: '#dff0d8',		
	    borderColor			: '#d6e9c6',	
	    borderLeftColor		: '#46a546',
    },		
    alertDanger : {		
        backgroundColor		: '#f2dede',		
	    borderColor			: '#ebccd1',	
	    borderLeftColor		: '#ed5565',
    },
    alertPrimary : {     
        backgroundColor		: '#337ab7',     
        borderColor			: '#2e6da4', 
        borderLeftColor		: '#2cd6da',
    },
	bgTransparent: {
		backgroundColor		: 'transparent',
	},
	selectedItem: {
    	backgroundColor		:'#727272'
    },
    sidebarTab : {
		height				: 70,
		//paddingLeft			: width/50,
	},
	toc_content:{
	    color				:'#474747',
	    fontWeight			:'400',
	    fontSize			: Ratio.em(1.045),
	    //lineHeight			: height/30,				// use ThemeAction
	},
	pullLeft: {
    	position			: 'absolute',
    	left				: 0,
    },
    pullRight: {
    	position			: 'absolute',
    	right				: 0,
    },
    flowHidden : {
    	overflow			: 'hidden'
    },
	sidePaneSnippet: {
    	width				: width*.65,
    	//height			: width/18,
    	overflow			: 'hidden',
    },
    chapterName	: {
    	color				: '#b0281a',
    	fontSize			: Ratio.em(1.078125),
    },
	listCounter : {
    	width				: (width/18)+10,
    },
    border0 : {
    	borderWidth			: 0,
    },
    border1 : {
    	borderWidth			: 1,
    },
    border2 : {
    	borderWidth			: 2,
    },
    border3 : {
    	borderWidth			: 3,
    },
    borderGray : {
		borderColor	    	: '#ddd',
	},
	greyBorderBottom : {
  		borderBottomWidth	: 1,
  		borderColor			:'#ddd'
  	},
  	greyBorderTop : {
  		borderTopWidth		: 1,
  		borderColor			: '#ddd'
  	},
	borderDefault : {
		borderColor	    	: '#3f5873',
	},
	borderSuccess : {
		borderColor	    	: '#1ab394',
	},
	borderPrimary : {
		borderColor	    	: '#22aadd',
	},
	borderInfo : {
		borderColor	    	: '#55c3e4',
	},
	borderWarning : {
		borderColor	    	: '#f0ad4e',
	},
	borderDanger : {
		borderColor	    	: '#D64937',
	},
	borderCorrect : {
    	borderColor		  	:'#5bb720',
    },
    borderIncorrect : {
    	borderColor		  	:'#af2517',
    },
	textSharp : {
		fontWeight			: '400',
	},
	lightBold:{
    	fontWeight			: '500',
    },
    themeText : {
    	color				: '#5a6d7d',
    },
	textBold : {
		fontWeight			: 'bold',
	},
	textBlack : {
		color				: '#333'
	},
	textGray : { 
		color           	: '#676767'     
	},
	textDark : {
		color				: '#5e5e5e'
	},
	textGreen  : { 
    	color 				: '#00ff00',
    },
    textWhite : { 
    	color           	: '#ffffff'    
    },
    textCorrect : {
		color				: '#5bb720',
	},
	correctAns	: {
  		color				: '#5cb85c',
  	},
  	incorrectAns : {
  		color				: '#d44a44',
  	},
	textIncorrect  : {
		color				: '#af2517',
	},
	textSuccess : {
		color	    		: '#1ab394',
	},
	textDefault : {
		color	    		: '#3f5873',
	},
	textPrimary : {
		color	    		: '#1c89b0',
	},
	textInfo : {
		color	    		: '#22b1dd',
	},
	textWarning : {
		color	    		: '#d38312',
	},
	textDanger : {
		color	    		: '#be3927',
	},
	labTitleWidth : {
		//width				: width-(width/2.3),
		textAlign			:'left',
		//marginLeft			: -(width/4.5),
	},
	labelWarning : {
		backgroundColor		: '#f0ad4e',
	    borderRadius		: 2,
	    color				: '#fff',
	    padding				: 2,
	    marginTop			: 1,
	    fontWeight			: '600',
	    maxWidth			: 74,
	    minWidth			: 74,
	},
	labelDanger:{
		backgroundColor: '#D64937',
		borderRadius		: 2,
	    color				: '#fff',
	    padding				: 2,
	    marginTop			: 1,
	    fontWeight			: '600',
	    maxWidth			: 74,
	    minWidth			: 74,
	},
	labelSuccess:{
	    backgroundColor		: '#5cb85c',
	    borderRadius		: 2,
	    color				: '#fff',
	    padding				: 2,
	    marginTop			: 1,
	    fontWeight			: '600',
	    maxWidth			: 74,
	    minWidth			: 74,
	},
	labelInfo : {
	    backgroundColor		: '#337ab7',
	    borderRadius		: 2,
	    color				: '#fff',
	    padding				: 2,
	    marginTop			: 1,
	    fontWeight			: '600',
	    maxWidth			: 74,
	    minWidth			: 74,
	},
	smallButton : {
    	paddingTop			: 3, 
    	paddingBottom		: 3,
    	paddingLeft			: 7,
    	paddingRight		: 7,
    	borderRadius		: 3,
    },
    annotation : {
    	backgroundColor	    : '#cce6ff',
		borderWidth         : 1,
		borderColor		    : '#99ccff',
		shadowColor         : '#99ccff',
	    shadowOpacity       : 0.8,
	    shadowRadius        : 1,
	    shadowOffset        : { height : 0.9, width : 0.9, }
    },
	btnGray : {
		backgroundColor	    : '#808080',
		borderWidth         : 1,
		borderColor		    : '#999999',
		shadowColor         : '#999999',
	    shadowOpacity       : 0.8,
	    shadowRadius        : 1,
	    shadowOffset        : { height : 0.9, width : 0.9, }	
	},
	btnCorrect : {
		backgroundColor	    : '#55ad1f',
		borderWidth         : 1,
		borderColor		    : '#5bb720',
		shadowColor         : '#5bb720',
	    shadowOpacity       : 0.8,
	    shadowRadius        : 1,
	    shadowOffset        : { height : 0.9, width : 0.9, }	
	},
	btnIncorrect : {
		backgroundColor	    : '#cb2c1a',
		borderWidth         : 1,
		borderColor		    : '#af2517',
		shadowColor         : '#af2517',
	    shadowOpacity       : 0.8,
	    shadowRadius        : 1,
	    shadowOffset        : { height : 0.9, width : 0.9, }	
	},
	btnSuccess : { 
		backgroundColor	    : '#1ab394',
		borderWidth         : 1,
		borderColor		    : '#18a689',
		shadowColor         : '#18a689',
	    shadowOpacity       : 0.8,
	    shadowRadius        : 1,
	    shadowOffset        : { height : 0.9, width : 0.9, }	
	 },
	btnDefault : {
		backgroundColor	    : deviceType ? '#3f5873' : '#178484',
		borderWidth         :  1,
		borderColor		    : '#ccc',
		color               : '#333',
		shadowColor         : '#ccc',
	    shadowOpacity       : 0.8,
	    shadowRadius        : 1,
	    shadowOffset        : { height : 0.9, width : 0.9, }	
	  },
	 btnPrimary : {
	 	backgroundColor	    : '#22aadd',
	 	borderWidth         : 1,
	 	borderColor		    : '#1F99C7',
	 	color               : '#FFFFFF',
	 	shadowColor         : '#1F99C7',
	    shadowOpacity       : 0.8,
	    shadowRadius        : 1,
	    shadowOffset        : { height : 0.9, width : 0.9, }	
	 },
	 btnInfo : {
	 	backgroundColor	    : '#55c3e4',
	 	borderWidth         : 1,
	 	borderColor		    : '#46b8da',
	 	color               : '#FFFFFF',
	 	shadowColor         : '#1F99C7',
	    shadowOpacity       : 0.8,
	    shadowRadius        : 1,
	    shadowOffset        : { height : 0.9, width : 0.9, }	
	 },
	 btnWarning : {
		backgroundColor		: '#f0ad4e',
		borderWidth    		: 1,
		borderColor			: '#eea236',
		color           	: '#FFFFFF',
		shadowColor			: '#eea236',
	    shadowOpacity		: 0.8,
	    shadowRadius		: 1,
	    shadowOffset	    : { height : 0.9, width	: 0.9, }	
	 },
	 btnDanger : {
		backgroundColor		: '#D64937',
		borderWidth    		: 1,
		borderColor			: '#d43f3a',
		color           	: '#FFFFFF',
		shadowColor			: '#d43f3a',
	    shadowOpacity		: 0.8,
	    shadowRadius		: 1,
	    shadowOffset		: { height : 0.9, width : 0.9, }
	},
	xsmallFont : {
		fontSize			: Ratio.em(0.625)
	},
	smallFont : {
		fontSize			: Ratio.em(0.8087)
	},
	smallFont2 : {
		fontSize			: Ratio.em(0.892)
	},
	lhSm : {
		lineHeight			: 15
	},
	lhMd : {
		lineHeight			: 17
	},
	lhNormal : {
		lineHeight			: 21
	},
	lhLg : {
		lineHeight 			: 30
	},
	lhXl : {
		lineHeight          : 40
	},
	xsmallFont : {
		fontSize			: Ratio.em(0.625),
	},
	smallFont : {
		fontSize			: Ratio.em(0.8087),
	},
	smallFont2 : {
		fontSize			: Ratio.em(0.892),
	},
	normalFont : {
		fontSize			: Ratio.em(0.959),
	},
	middleFont : {
		fontSize			: Ratio.em(1.175),
	},
	headingFont : {
		fontSize			: Ratio.em(1.035),
	},
	headingFont2 : {
		fontSize			: Ratio.em(1.101),
	},
	heading : {
    	fontSize 			: Ratio.em(1.67109375),
    	fontWeight			: 'bold',
    },
    heading2 : { 
    	fontSize			: Ratio.em(2.157),
    },
	h1 : {
		fontSize 			: Ratio.em(2.15625),
	},
	h2 : {
		fontSize 			: Ratio.em(1.9904),
	},
	h3 : {
		fontSize 			: Ratio.em(1.8482),
	},
	h4 : {
		fontSize 			: Ratio.em(1.617),
	},
	h5 : {
		fontSize 			: Ratio.em(1.4375),
	},
	h6 : {
		fontSize 			: Ratio.em(1.29375),
	},
	h7 : {
		fontSize 			: Ratio.em(1.17614),
	},
	h8 : {
		fontSize 			: Ratio.em(1.078125),
	},
	h9 : {
		fontSize 			: Ratio.em(1),
	},
	h10 : {
		fontSize 			: Ratio.em(0.8),
	},
	hXl	: {
		fontSize			: Ratio.em(1.36)
	},
	hXl1 : {
		fontSize			: Ratio.em(1.4786)
	},
    hXl2 : {
    	fontSize            : Ratio.em(1.6172)
    },
	hXl3 : {
		fontSize            : Ratio.em(1.972)
	},
	btnText : {
    	color				: '#fff',
    	fontSize			: Ratio.em(1.4375),
    	fontWeight			: '500',
    	padding				: 2
    },
    bubles : { 
        //height			: Ratio.em(1.29375), 
        width				: Ratio.em(1.49375), 
        backgroundColor 	: '#1ab394', 
        marginLeft      	: Ratio.em(0.43125)
    },
    resultModal : {
    	position			: 'absolute',
        right				: 0,
        bottom				: 0,
        left				: 0,
       // width				: width+5,				// use ThemeAction
        backgroundColor		: '#F8F8F8',
    },
    modalBtnStyle1 : {
    	backgroundColor		: '#fcfcfc',
    	borderTopWidth		: 1,
    	borderTopColor		: '#e6e6e6',
    },
    modalBtn : {
    	fontSize			: Ratio.em(1.125),
    //	margin				: width/40,				// Use ThemeAction
    	fontWeight			: '400',
    //	lineHeight			:0,
    },
    timerText : {
    	fontWeight			:'500',
    	fontSize			: Ratio.em(1),
    	color				:'#fff'
    },
    gridViewIcon : {
		fontSize			: Ratio.em(2.3522),
	},
	questionList : {
    	borderColor			: '#ddd',
    	borderBottomWidth	: 1,
    	//height				: (width/5.8),    // Use ThemeAction
    	backgroundColor		: '#fefefe',
    },
    questionListLesson : {
    	borderBottomWidth	: 1,
    	borderBottomColor	: '#ddd',
    	//height				: (width/6),    // Use ThemeAction
    },
    resultIndicator : {
    	justifyContent 	    : 'center',
    	backgroundColor	    : '#1ab394',
    	alignItems       	: 'center',
    	padding			    : 2,
    	//height			    : width/13,     // Use themeaAction
    	//width				: width/13,         // use ThemeAction
    	//borderRadius	    : 150,              // use ThemeAction
    	marginLeft			: 2, 
    	alignSelf      		: 'center',
    	overflow		    : 'visible',
    },
    doubleBackSwitch : {
		//left          		: width/30,			// Use ThemeAction
		top			   		: 0,
		bottom				: 0,
		position	   		: 'absolute',
		alignSelf      		: 'center',
		justifyContent 		: 'center',
		//height        		: width/7.6,			// Use ThemeAction
		backgroundColor		:'transparent',
		marginTop	   		: deviceType ? 20 : 0,
		paddingRight   		: 15,
	},
    side : {
    	margin 				: 10,
    },
    sideSm : {
    	margin 				: 3,
    },
    sideMd : {
    	margin 				: 5,
    },
    sideTop : {
    	marginTop			: 10,
    },
    sideTopSm : {
    	marginTop 			: 3,
    },
    sideTopSm : {
    	marginTop 			: 3,
    },
    sideLeft : {
    	marginLeft 			: 10,
    },
    sideLeftSm : {
    	marginLeft 			: 3,
    },
    sideRightSm : {
    	marginRight 		: 3,
    },
    sideBottomSm : {
    	marginBottom 		: 3,
    },
    sideTopMd : {
    	marginTop 			: 5,
    },
    sideLeftMd : {
    	marginLeft 			: 5,
    },
    sideRightMd : {
    	marginRight 		: 5,
    },
    sideBottomMd : {
    	marginBottom 		: 5,
    },
    frame : {
    	padding 			: 10,
    },
    frameTop : {
    	paddingTop 			: 10,
    },
    frameLeft : {
    	paddingLeft 		: 10,
    },
    frameRight : {
    	paddingRight 		: 10,
    },
    frameBottom : {
    	paddingBottom 		: 10,
    },
    frameMd : {
    	padding				: 5,
    },
    frameTopMd : {
    	paddingTop			: 5,
    },
    frameBottomMd : {
    	paddingBottom		: 5,
    },
    frameRightMd : {
    	paddingRight		: 5,
    },
    frameLeftMd : {
    	paddingLeft			: 5,
    },
    frameSm : {
    	padding				: 3,
    },
    frameTopSm : {
    	paddingTop			: 3,
    },
    frameBottomSm : {
    	paddingBottom		: 3,
    },
    frameLeftSm : {
    	paddingLeft			: 3,
    },
    frameRightSm : {
    	paddingRight		: 3,
    },
    textCenter : {
    	textAlign			: 'center'
    },
	textJustify: {
		textAlign			: 'justify'
	},
	textRight: {
		textAlign			: 'right'
	},
	textLeft: {
		textAlign			: 'left'
	},
	normal: {
		fontWeight			: 'normal'
	},
	bold: {
		fontWeight			: 'bold'
	},
	absolute : {
		position 			: 'absolute', 
	},
	relative : {
		position 			: 'relative', 
	},
	pointCenter : {
		position 			: 'absolute', 
		left 				: 0,
		right 				: 0, 
		top 				: 0, 
		bottom 				: 0 
	},
	relativeCenter : {
		position			: 'relative',
		top					: 0,
		right				: 0,
		bottom				: 0,
		left				: 0 
	},
	lessonBox : {
    	//width				: width-20,				// Use ThemeAction
    	borderWidth			: 1,
    	borderColor			: '#ddd'
    },
	dbLeftIconsSize : {
		fontSize			: Ratio.em(2.875)
	},
	dbLeftIconsSizeMini : {
		fontSize			: Ratio.em(2.157)
	},
	listIcon : {
    	fontSize			: Ratio.em(1.29375),
    },
    iosTools:{
	  	backgroundColor 	: '#34485E',
	  	paddingTop			: deviceType ? 20 : 0,
	},
    dbArrow: {
	  	position			:'absolute',
    	right				: width/50,
    	top  				: height/15.8,
    	backgroundColor		: 'transparent',
    	
    },
    dbSmallText : {
    	fontSize			: Ratio.em(0.9175),
    	color				: '#333',
    	marginRight			: 10,
    	//lineHeight			: deviceType ? ( height * .025 ) : null,
    },
    dbContent : {
	    flex:1,
	    borderColor			: '#ddd',
	    marginLeft      	: width/42,
	    marginRight     	: width/40,
    },
    dbContentPost:{
	    flex				: 1,
	    borderColor			: '#ddd',
	    //marginLeft      	: width/50,   			// use ThemeAction
	    //marginTop			: width/40,   			// use ThemeAction
	    //marginBottom		: width/40,   			// use ThemeAction
	    padding				: 15,
	    justifyContent		:'center',
    },
    DashboardText : {
    	fontSize			: Ratio.em(1.1708),
    	fontWeight			: '500',
    	color				: '#222',
    },
    newDashboardTxt : {
    	fontSize			: Ratio.em(1.1708),
    	fontWeight			: '500',
    	color				: '#222',
    },
	dashboardTheme: {			
    	flexDirection		: 'row',
		//paddingHorizontal	: width * .02,
		//height				: height * .13,
	    flex				: 1,	
	    backgroundColor		: '#FFF',		   
    	borderTopColor		:'#dddddd',
    	borderRightColor	:'#dddddd',	
    	borderBottomColor   :'#dddddd',	
    	borderWidth			: 1,	
    	//borderRadius		: deviceType ? (width * .02) : 0,
    	//marginVertical		: height * .007,
    	//marginHorizontal	: width * .02,
    	borderLeftWidth 	: (width*.006), // (width/99)/1.5,
    	shadowColor			: '#666',
        shadowOpacity		: .2,
        shadowRadius		: 2,
        shadowOffset		: { height : 2, width : 2 },
    },
    newDashboard: {		
    	//paddingLeft         : width/36,		//use ThemeAction --  setHpadding
    	//paddingRight        : width/37,	
    	flexDirection		: 'row',
	    alignItems			: 'center',
	    flex				: 1,	
	    backgroundColor		: '#FFF',		   
    	borderTopColor		:'#dddddd',
    	borderRightColor	:'#dddddd',	
    	borderBottomColor   :'#dddddd',	
    	borderTopWidth		: 1,
    	borderLeftWidth		: 3,
    	borderRightWidth	: 1,
    	borderBottomWidth	: 1,
    	//borderRadius		: width/80,
    	//marginBottom    	: width/36,				    	
    	//marginLeft      	: width/39,
    	//marginRight     	: width/39,				// use ThemeAction --  setHmargin 
    	//borderLeftWidth 	: (width/99)/1.5,
    	shadowColor			: '#666',
        shadowOpacity		: .2,
        shadowRadius		: 2,
        shadowOffset		: { height : 2, width : 2 },
    },
    switchBtn : {
    	borderWidth			: 1,
    	borderColor			: '#ccc',
    	backgroundColor		: '#fff',
    	height				: width/15,
    	padding				: width/57,
    	justifyContent   	: 'center',
	    alignItems       	: 'center',
    },
    switchBtnLeft : { 
    	borderTopLeftRadius   : 3,
    	borderBottomLeftRadius: 3,
    },
    switchBtnRight : {
    	borderTopRightRadius   : 3,
    	borderBottomRightRadius: 3,
    },
    selectedRect : {
    	opacity				: 0.4,
    },
    noramlRect : {
    	opacity				: 0.9,
    },
    reviewText : {
    	color				: '#FFF',
    	fontWeight			: 'bold',
    },
    radioButtonOuter : {
    	borderWidth       	: 1,
    	//borderColor       : '#ccc',
    	alignItems        	: 'center',
    	justifyContent    	: 'center',
    	alignSelf		  	: 'center',
    	
    },
    testOptionTab : {
    	position		  	: 'absolute',
    	//left			 	: -(width/50),
    	top				  	: 0,
    	bottom			  	: 0,
    	borderRightWidth  	: 1,
    	borderRightColor  	: '#d3d3d3',
    	backgroundColor	  	: 'rgba(101, 97, 97, 0.76)',
    },
    testOption : {
    	borderWidth		 	: 1,
    	borderColor		  	: '#d3d3d3',
    	borderRadius	  	: 2,
    },
    optionCorrectMode : {
    	borderColor		  	:'#5bb720',
    },
    optionIncorrectMode :{ 
    	borderColor		   	:'#af2517',
    },
    testOptionCorrect : {
    	borderRightColor  	: '#5bb720',
    	backgroundColor	  	: '#65a00d',
    },
    testOptionIncorrect : {
    	borderRightColor  	: '#af2517',
    	backgroundColor	 	: '#e14747',
    },
    checkboxButton: {
    	height           	: width/22,
    	width             	: width/22,
    	borderWidth      	: 1,
    	borderColor      	: '#fff',
    	alignItems          : 'center',
    	justifyContent      : 'center',
    	alignSelf		  	: 'center',
    	marginTop		 	: -2,
    },
    listContent : {
    	flex				: 1
    },
    activatorLib : {
    	position    		: 'absolute',
        top         		: (height/2)-40,
        right       		: (width/9)-13,
    },
    imageDownload:{
    	fontWeight			:'bold',
    	fontSize			: Ratio.em(1.4871),
    	color				:'#16a765',
    	backgroundColor		:'transparent',
    	position			:'absolute',
    	bottom				: 0,
    	borderBottomWidth	: 1,
	},
    wrap : {
	   flexWrap				: 'wrap',
    },
    flexN : {
    	flex				: -1,
    },
    flex0 : {
    	flex				: 0,
    },
    flex1 : {
    	flex				: 1,
    },
    flex2 : {
    	flex				: 2,
    },
    title1 : {
    	fontSize     		: Ratio.em(0.75),
    	fontWeight   		: 'bold'
    },
    title2 : {
    	fontSize     		: Ratio.em(0.959),
    	fontWeight   		: 'bold'
    },
    title3 : {
    	fontSize     		: Ratio.em(1.078125),
    	fontWeight   		: 'bold'
    },
    title4 : {
        fontSize     		: Ratio.em(1.29375),
        fontWeight   		: 'bold'
    },
    libPic : {	
	    borderWidth			: 1,		
    	borderColor			: '#fff',
    },
    libLoading :{
    	position			: 'absolute', 
    	//top					: height/2-60,
    	left				: 10,
    	backgroundColor		: '#00000099',
    	borderWidth			: 1,
    	borderColor			: '#888',
    	borderRadius		: 3,
    	padding				: 15,
    	paddingTop			: 8,
    },
    link : {
    	color				: '#b0281a',
    },
    instruction : {
    	fontSize			: Ratio.em(1.1869),
    	//lineHeight			: width/18,
    	color				: '#333',
    	textAlign			: 'justify',
    	//marginLeft			: width/30,
    	//marginRight			: width/30,
    	//marginBottom		: width/13,
    },
    sectionTag:{
    	left				: -12,
    	top					: -8
    },
    courseBox: {
    	backgroundColor		: '#ffffff',		   
    	borderColor			:'#dddddd',		    
    	borderWidth			: 1,		    
    	//marginBottom	   	: -2,		    	
    	//flexDirection		: 'row',		    	
    	//width				: (width-15),		    	
    	//marginLeft  	    : 7,
    	//marginRight  	    : 7,
    	//padding				: width/32,
        // flexWrap			: 'nowrap'
    },
    courseBoxLA: {
    	backgroundColor		: '#ffffff',		   
    	borderColor			:'#dddddd',		    
    	borderWidth			: 1,		    	
    	flexDirection		: 'column',		    	
    	//padding				: (width/32)-3,
    	//marginLeft			: width/17,		
    	//marginRight			: width/17,		
    	//marginTop			: width/62,
    	//marginBottom		: width/35,
        // flexWrap			: 'nowrap'
    	borderLeftWidth		: 3,
    	borderLeftColor		:'#3f5873',
    	//borderRadius		: ((width/32)-3)/2,
    	shadowColor			: '#666',
        shadowOpacity		: .2,
        shadowRadius		: 2,
        shadowOffset		: { height : 2, width : 2 },
    },
    libPicCircle : {		
    	//height				: height*.11,	
    	//minHeight			: 70,
	    //width				: width*.27,		
	    borderWidth			: 0,		
    	padding				: 1,		
    	height				: ( width > 420 ) ? (height*.11) : (height*.1),		
	    width				: ( width > 420 ) ? (width*.27) : (width*.30),		
	    borderWidth			: 1,	
	    borderColor 		: '#dcdcdc',
    	padding				: 1,
    	marginTop			: ( width > 420 ) ? 0 : 2,
    	overflow			: 'hidden',		
    },
    libCrn	: {
    	fontSize			: Ratio.em(1)
    },
    lastAccessPlay:{										// fix while rotation
    	color				:'#fff',
    	transform			: [{rotate: '45deg'},],
    	opacity				: 0.8,
    	//height				: height*.08,
    	//width				: height*.08,
    	//borderRadius		: (height*.08)/2,
    	//marginTop			: (height*.08)/2, 	//(height*.02),   //(height*.025)-(width*.025),
    	backgroundColor		: '#ffffff90',
    	alignItems			: 'center',
        justifyContent		: 'center',
        alignSelf			: 'center',
        borderWidth			: 1,
        borderColor			: '#fefefe99'
    },
    lastAccess:{
    	fontSize			: Ratio.em(0.9513),
    	color				: '#b0281a',
    	backgroundColor		: 'transparent',
    },
    capsule: {		
    	//height				: (height*.1),
    	//borderRadius		: (height*.1)/2,	
    	borderWidth			: 1,		
    	borderColor			: '#34485E',		
    	backgroundColor		: ( deviceType ? '#3f5873' : '#178484' ),		
    	//marginLeft		: width/19,		
    	//marginRight		: width/19,		
    	//marginTop			: width/37,
    },	
    practiceTxt : {
   	 fontSize				: Ratio.em(1.101),
   	 fontWeight				: '500',
   	 //width					: 140,
   	 textAlign				: 'center',
   	 marginTop				: 4,
   	 backgroundColor		: 'transparent',
   	 color					: '#444',
   },
    practiceSlider : {
    	overflow			: 'visible',
    	backgroundColor		:'transparent',
		justifyContent  	: 'center',
    },
    
});
