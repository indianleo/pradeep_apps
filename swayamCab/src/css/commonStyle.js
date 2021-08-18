import {StyleSheet, StatusBar, Platform} from 'react-native';
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
	absolute: { position: 'absolute'},
    scrollView: { marginHorizontal: 20 },
	imgContain: { resizeMode: 'contain'},
	imgCover: { resizeMode: 'cover'},
	imgRepeat: { resizeMode: 'repeat'},
	imgStretch: { resizeMode: 'stretch'},
	imgCenter: { resizeMode: 'center'},
	wAuto: {width: 'auto'},
	hAuto: {height: 'auto'},
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
	introHeadingSize: {fontSize: 30 },
	orangeFontSize: {fontSize: 20 },
	runingFontSize: {fontSize: 12},
	placeHolderFont: { fontSize: 18 },
	inputTextFont: { fontSize: 20 },
	subHeading: { fontSize: 25 },
	backFontSize: {fontSize: 17},
	orangeTextBelowIcon: {fontSize: 15},
	textStyle: { fontFamily: 'Roboto'},
	textBold: {fontWeight: 'bold'},
	textLightBold: {fontWeight: '600'},
	textLight: { fontWeight: '500' },
	noBg: {backgroundColor: 'transparent'},
	bgDark: {backgroundColor: "#4d4d4d"},
	bgWhite: {backgroundColor: '#fff'},
	bgOffSky: {backgroundColor: "#336699"},
	bgLightSky: {backgroundColor: '#e0f0ff'},
	bgCyan: { backgroundColor: 'cyan' },
	bgDarkRed: {backgroundColor: '#990000'},
	themeBg: { backgroundColor: '#f2f2f2' },
	bgOrange: { backgroundColor: '#f15a24' },
	textOffSky: {color: "#2d5986"},
	textWhite: {color: '#fff'},
	textDark: { color: "#4d4d4d" },
	textBlack: {color: '#000' },
	textBlue: { color: '#223c99' },
	textPurple: { color: '#9e005d' },
	textOrange: { color: '#f15a24' },
	textOrangeDark: { color: '#d8440e'},
	textBoxBorderColor: {
		borderColor: '#b3cce6',
		borderWidth: 1,
		borderRadius: 2
	},
	themeHeadingText: {
		fontFamily: 'Roboto',
		fontSize: 30,
		fontWeight: 'bold',
		color: '#223c99'
	},
	themeOrangeText: {
		fontFamily: 'Roboto',
		fontSize: 20,
		fontWeight: '600',
		color: '#f15a24'
	},
	themeSkyText: {
		fontFamily: 'Roboto',
		fontSize: 20,
		fontWeight: '600',
		color: '#2d5986'
	},
	themeSkyTextSm: {
		fontFamily: 'Roboto',
		fontSize: 18,
		fontWeight: '600',
		color: '#2d5986'
	},
	themeNormalText: {
		fontFamily: 'Roboto',
		fontWeight: '500',
		fontSize: 15,
	},
	themeText: {
		fontFamily: 'Roboto',
		fontWeight: '600',
		fontSize: 17
	},
	themeSubText: {
		fontFamily: 'Roboto',
		fontWeight: '600',
		fontSize: 25
	},
	themeTextBox: {
		borderColor: '#b3cce6',
		borderWidth: 1,
		borderRadius: 2,
		fontFamily: 'Roboto',
		fontSize: 18,
		padding: 5,
	},
	themeBtnText: {
		color: "#fff",
		fontFamily: "Roboto",
		fontWeight: "600",
		fontSize: 18
	},
	themeBorder: {
		borderColor: '#b3cce6',
		borderWidth: 1,
	},
	btnSky: {
		borderRadius: 3,
		backgroundColor: '#336699',
		alignItems     : 'center',
		justifyContent : 'center',
		alignSelf      : 'center',
		paddingHorizontal: 15,
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4
	},
	pageIcons: {
		width: 110,
		height: 110,
	},
	brSm: { borderRadius: 3 },
	br: { borderRadius: 5 },
	brMd: { borderRadius: 10 },
	brLg: { borderRadius: 15 },
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
	inputBox: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        fontFamily: 'Roboto',
        fontSize: 18,
    },
	shadow: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,  
		elevation: 5
	}
});