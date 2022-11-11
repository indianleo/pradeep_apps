import {StyleSheet, StatusBar} from 'react-native';
import { cssConfig } from './cssConfig';
export default StyleSheet.create({
    safeContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
	flex1: {
		flex: 1,
	},
	centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
	headerBtn: {
		height:40,
		paddingHorizontal: 10,
		alignItems     : 'center',
		justifyContent : 'center',
		alignSelf      : 'center'
	},
	absolute: { position: 'absolute'},
    scrollView: { marginHorizontal: 20 },
	imgContain: { resizeMode: 'contain'},
	imgCover: { resizeMode: 'cover'},
	imgRepeat: { resizeMode: 'repeat'},
	imgStretch: { resizeMode: 'stretch'},
	imgCenter: { resizeMode: 'center'},
	wAuto: {width: 'auto'},
	hAuto: {height: 'auto'},
	fullWidth: {width: '100%'},
	fullHeight: {height: '100%'},
    center: {
		alignItems     : 'center',
		justifyContent : 'center',
		alignSelf      : 'center'
	},
	middle: { justifyContent  : 'center'},
    hCenter:{ alignSelf      : 'center'},
	vCenter: { alignItems: 'center'},
	row: { flexDirection: 'row' },
	alignCorner: { justifyContent: 'space-between'},
	alignStart: {justifyContent: 'flex-start'},
	alignEnd: { justifyContent: 'flex-end'},
	alignAround: { justifyContent: 'space-around'},
	alignEven: { justifyContent: 'space-evenly'},
	wrap: {flexWrap: 'wrap'},
    mbxm  : { marginBottom : 3 },
	mtxm  : { marginTop    : 3 },
	mrxm  : { marginRight  : 3 },
	mlxm  : { marginLeft   : 3 },
	mb    : { marginBottom : 5 },
	mt    : { marginTop    : 5 },
	mr    : { marginRight  : 5 },
	ml    : { marginLeft   : 5 },
	mbsm  : { marginBottom : 10 },
	mtsm  : { marginTop    : 10 },
	mrsm  : { marginRight  : 10 },
	mlsm  : { marginLeft   : 10 },
	mbmd  : { marginBottom : 20 },
	mtmd  : { marginTop    : 20 },
	mrmd  : { marginRight  : 20 },
	mlmd  : { marginLeft   : 20 },
	mblg  : { marginBottom : 30 },
	mtlg  : { marginTop    : 30 },
	mrlg  : { marginRight  : 30 },
	mllg  : { marginLeft   : 30 },
	mbxl  : { marginBottom : 40 },
	mtxl  : { marginTop    : 40 },
	mrxl  : { marginRight  : 40 },
	mlxl  : { marginLeft   : 40 },
	msm   : { margin       : 10 },
	pr: { paddingRight: 5 },
	prSm: { paddingRight: 3 },
	prMd: {paddingRight: 10 },
	pl: { paddingLeft: 5 },
	plSm: { paddingLeft: 3 },
	plMd: {paddingLeft:10 },
	pt: { paddingTop: 5 },
	ptSm: { paddingTop: 3 },
	ptMd: { paddingTop:10 },
    ptLg: { paddingTop:15 },
    ptXLg: { paddingTop:20 },
	pb: { paddingBottom: 5 },
	pbSm: { paddingBottom:3 },
	pbMd: { paddingBottom:10 },
	pbLg: { paddingBottom:15 },
	pbXLg: { paddingBottom:20 },
    vPadSm: {paddingVertical: 5 },
    vPadMd: {paddingVertical: 10 },
    vPadLg: {paddingVertical: 15 },
	hPadSm: {paddingHorizontal: 5 },
    hPadMd: {paddingHorizontal: 10 },
    hPadLg: {paddingHorizontal: 15 },
	pSm: {padding: 3},
	p: {padding: 5},
	pMd: {padding: 10},
	pLg: {padding: 15},
	pXlg: {padding: 20},
    textCenter : {textAlign: 'center'},
	textJustify: {textAlign: 'justify'},
	textRight: {textAlign: 'right'},
	textLeft: {textAlign: 'left'},
    fs6: {fontSize: 16},
    fs5: {fontSize: 18},
    fs4: {fontSize: 20},
    fs3: {fontSize: 22},
    fs2: {fontSize: 24},
    fs1: {fontSize: 26},
	fsH: {fontSize: 27},
	headingFont: {fontSize: 30 },
	subHeading: { fontSize: 25 },
	titalFont: { fontSize: 20 },
	placeHolderFont: { fontSize: 18 },
	runingFont: {fontSize: 12},
	inputTextFont: { fontSize: 20 },
	backFontSize: {fontSize: 17},
	iconBelowFont: {fontSize: 15},
	textLineSm: {lineHeight: 16 },
	textLineMd: {lineHeight: 20 },
	textStyle: { fontFamily: cssConfig.fontFamily },
	textBold: {fontWeight: 'bold'},
	textLightBold: {fontWeight: '600'},
	textLight: { fontWeight: '500' },
	noBg: {backgroundColor: 'transparent'},
	bgDark: {backgroundColor: "#4d4d4d"},
	bgWhite: {backgroundColor: '#fff'},
	bgCyan: { backgroundColor: 'cyan' },
	bgDarkRed: {backgroundColor: '#990000'},
	themeBg: { backgroundColor: cssConfig.whiteThemeBg },
	btnThemeBg: { backgroundColor: cssConfig.btnThemeBg },
	brSm: { borderRadius: 3 },
	br: { borderRadius: 5 },
	brMd: { borderRadius: 10 },
	brLg: { borderRadius: 15 },
	themeHeadingText: {
		fontFamily: cssConfig.fontFamily,
		fontSize: 30,
		fontWeight: 'bold',
		color: cssConfig.themeHeadingColor
	},
	themeTitleText: {
		fontFamily: cssConfig.fontFamily,
		fontSize: 20,
		fontWeight: '600',
		color: cssConfig.themeTitleColor
	},
	themeNormalText: {
		fontFamily: cssConfig.fontFamily,
		fontWeight: '500',
		fontSize: 15,
	},
	themeText: {
		fontFamily: cssConfig.fontFamily,
		fontWeight: '600',
		fontSize: 17
	},
	themeTextSm: {
		fontFamily: cssConfig.fontFamily,
		fontWeight: '600',
		fontSize: 12
	},
	themeSubText: {
		fontFamily: cssConfig.fontFamily,
		fontWeight: '600',
		fontSize: 25
	},
	themeTextBox: {
		borderColor: cssConfig.themeTextboxBorderColor,
		borderWidth: 1,
		borderRadius: 2,
		fontFamily: cssConfig.fontFamily,
		fontSize: 18,
		padding: 5,
	},
	textWhite: {color: cssConfig.white},
	textDark: { color: cssConfig.dark },
	textOffDark: {color: cssConfig.offDark},
	textBlack: {color: cssConfig.black },
	textBlue: { color: cssConfig.blue },
	textPurple: { color: cssConfig.purple },
	textOrange: { color: cssConfig.orange },
	textOrangeDark: { color: cssConfig.darkOrange},	
	textBoxBorderColor: {
		borderColor: cssConfig.themeTextboxBorderColor,
		borderWidth: 1,
		borderRadius: 2,
	},
	pageIcons: {
		width: 110,
		height: 110,
	},
	modalView: {
		backgroundColor: cssConfig.white,
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: cssConfig.shadow,
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	listItem: {
        padding:5, 
        marginBottom:20, 
        flexDirection:'row', 
        alignItems: 'center',
        borderRadius: 3
    },
	listImg: {
        width:80, 
        height:80
    },
	themeBtnText: {
		color: cssConfig.white,
		fontFamily: cssConfig.fontFamily,
		fontWeight: "600",
	},
	themeBtn: {
		borderRadius: 3,
		backgroundColor: cssConfig.btnThemeBg,
		alignItems     : 'center',
		justifyContent : 'center',
		alignSelf      : 'center',
		paddingHorizontal: 15,
		shadowColor: cssConfig.shadow,
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4
	},
	shadow: {
		shadowColor: cssConfig.shadow,
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4
	},
	disable: {
		opacity: 0.4,
	}
});