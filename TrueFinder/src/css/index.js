import {StyleSheet, StatusBar} from 'react-native';
import { colors, cssConfig, getDynamicStyle } from './cssConfig';

export default StyleSheet.create({
    safeContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    container: {
        flex: 1,
        padding: 10
    },
	flex1: {
		flex: 1,
	},
	centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
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
	fs10: {fontSize: 10},
	fs12: {fontSize: 12},
	fs14: {fontSize: 14},
    fs16: {fontSize: 16},
    fs18: {fontSize: 18},
    fs20: {fontSize: 20},
    fs22: {fontSize: 22},
    fs24: {fontSize: 24},
    fs26: {fontSize: 26},
	fs27: {fontSize: 27},
	introHeadingSize: {fontSize: 30 },
	orangeFontSize: {fontSize: 20 },
	runingFontSize: {fontSize: 12},
	placeHolderFont: { fontSize: 18 },
	inputTextFont: { fontSize: 20 },
	subHeading: { fontSize: 25 },
	backFontSize: {fontSize: 17},
	orangeTextBelowIcon: {fontSize: 15},
	textLineSm: {lineHeight: 16 },
	textLineMd: {lineHeight: 20 },
	textStyle: { fontFamily: cssConfig.fontFamily },
	textBold: {fontWeight: 'bold'},
	textLightBold: {fontWeight: '600'},
	textLight: { fontWeight: '500' },
	noBg: {backgroundColor: 'transparent'},
	bgDark: {backgroundColor: "#4d4d4d"},
	bgWhite: {backgroundColor: colors.white},
	bgCyan: { backgroundColor: 'cyan' },
	bgDarkRed: {backgroundColor: '#990000'},
	themeBg: { backgroundColor: colors.themeBg },
	bgOrange: { backgroundColor: colors.btnBgColor },
	brSm: { borderRadius: 3 },
	br: { borderRadius: 5 },
	brMd: { borderRadius: 10 },
	brLg: { borderRadius: 15 },
	themeHeadingText: {
		fontFamily: cssConfig.fontFamily,
		fontSize: 30,
		fontWeight: 'bold',
		color: colors.textColor
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
	themeBorder: {
		borderColor: colors.themeBorder,
		borderWidth: 1,
	},
	themeTextBox: {
		borderColor: colors.inputBorderColor,
		borderWidth: 1,
		borderRadius: 2,
		fontFamily: cssConfig.fontFamily,
		fontSize: 18,
		padding: 5,
	},
	textWhite: {color: colors.white},
	textDark: { color: "#4d4d4d" },
	textOffDark: {color: "#a6a6a6"},
	textBlack: {color: colors.black },
	textOrangeDark: { color: colors.orangeText},
	orangeBorder: {
		borderWidth: 1,
		borderColor: '#d8440e'
	},	
	textBoxBorderColor: {
		borderColor: '#707070',
		borderWidth: 1,
		borderRadius: 2,
	},
	pageIcons: {
		width: 110,
		height: 110,
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
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
		color: colors.btnTextColor,
		fontFamily: cssConfig.fontFamily,
		fontWeight: "600",
	},
	themeBtn: {
		borderRadius: 8,
		backgroundColor: cssConfig.themeBg,
		alignItems     : 'center',
		justifyContent : 'center',
		alignSelf      : 'center',
		paddingHorizontal: 15,
		shadowColor: colors.shadowColor,
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4
	},
	shadow: {
		shadowColor: colors.shadowColor,
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4
	},
	disable: {
		opacity: 0.4,
	},
	...getDynamicStyle
});