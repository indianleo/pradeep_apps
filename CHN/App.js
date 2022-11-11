/**
 * File: App.js
 * Description: CHN App.js is an entry point
 * Author: Pradeep Yadav
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Drawer from 'react-native-drawer'
import SplashScreen from 'react-native-splash-screen';
import {ChnProvider} from './src/context/ChnContext';
import InfoModal from './src/components/InfoModal';
import i18n from './src/config/i18n';
import en from './locales/en.json';

import Home from  './src/components/Home';
import Login from './src/components/login';
import SidePane from './src/components/SidePane';
import Education from './src/components/Education';
import Contact from './src/components/Contact';
import Services from './src/components/Services';
import Portal from './src/components/Portal';
import ServiceInfo from './src/components/ServiceInfo';
import Enrollment from './src/components/Enrollment';
import MakeAppointment from './src/components/MakeAppointment';
import Account from './src/components/Account';
import HealthRecords from './src/components/HealthRecords';
import HeaderTitle from './src/nav/HeaderTitle';
import HeaderRight from './src/nav/HeaderRight';
import HeaderLeft from './src/nav/HeaderLeft';
import HeaderBackground from './src/nav/HeaderBackground';
import {themeAction} from './src/config/theme';
import Vitals from './src/components/Vitals';
import Location from './src/components/Location';
import PersonProvider from './src/components/PersonProvider';
import ChangeLang from './src/components/ChangeLang';
import ImageSlider from './src/components/ImageSlider';
import ProviderBio from './src/components/ProviderBio';
import VitalsInfo from './src/components/VitalsInfo';
import RefillReq from './src/components/RefillReq';
import { apiCall, getStoreData } from './src/api/apiAction';
import Registration from './src/components/Registration';
import MyProvider from './src/components/MyProvider';
import ArticleInfo from './src/components/ArticleInfo';
import HealthRecordInfo from './src/components/HealthRecordInfo';
import { requestLocation } from './src/config/chnConfig';
import MyAppointments from './src/components/MyAppointments';
import ArticleList from './src/components/AtrticleList';
import Profile from './src/components/Profile';
import ScheduleAppo from './src/components/ScheduleAppo';
import PayNow from './src/components/PayNow';
import Messages from './src/components/Messages';

const Stack = createStackNavigator();
global.UI = themeAction();

const App = () => {
	const _drawer = React.useRef();
	const infoModalRef = React.useRef();
	const navigationRef = React.useRef();
	const [showIntro, updateIntro] = React.useState(true);
	const [showLang, updateShowLang] = React.useState(false); // Need to set false
	const [_user, setUser] = React.useState("");
	const [_needEnroll, setEnroll] = React.useState(false);
	const [drawerState, setDrawer] = React.useState(false);
	const [langSeq, setLangSeq] = React.useState(1);

	useEffect(async ()=> {
		if (!UI.ios) requestLocation();
		UI.initGeoCoading();
		let langCode = await getStoreData("appLangCode");
		console.log({langCode})
		getStoreData("intro").then((res)=> {
			if (UI.isValid(res)) {
				updateIntro(false);
			}
			getStoreData("appLangJson").then((jsonRes)=> {
				if (UI.isValid(jsonRes)) {
					UI.setData("langId", langCode?.lang || 1);
					i18n.translations = {en: {...jsonRes} };
					closeSplash();
				} else {
					UI.setData("langId", 1);
					apiCall("/page-labels-keyVal/1/null?token=046af8f913b19b3befdf67f29657f2d6").then((pages)=> {
						i18n.translations = {en: {...pages.labels} };
					}).catch((err)=> {
						console.log({page: "app.js", langApiErr: err});
						showInfoModal();
					}).finally(()=> {
						console.log("finaly on app.js")
						closeSplash();
					});
				}
			})
		})
	}, []);

	const closeSplash = ()=> {
		SplashScreen.hide();
	}

	global.Lang = (text, _data, newLangJson)=> {
		if (typeof _data == 'string') {
			setLangSeq(langSeq+1);
			newLangJson && (i18n.translations = {en: {...newLangJson} });
			//i18n.locale = _data;
			return;
		}
		if (_data) {
			return i18n.t(text, _data);
		} else {
			return i18n.t(text);
		}
	}

	const onSkipIntro = React.useCallback(()=> {
		updateIntro(false);
	}, [])

	const setLang = React.useCallback((newLang) => {
		apiCall(`/page-labels-keyVal/${newLang}/null?token=046af8f913b19b3befdf67f29657f2d6`).then((pages)=> {
			i18n.translations = {en: {...pages.labels} };
		}).catch((err)=> {
			console.log({page: "app.js", langApiErr: err});
			showInfoModal();
		}).finally(()=> {
			updateShowLang(true);
		});
	}, []);

	global.showInfoModal = React.useCallback((data) => {
		infoModalRef.current.showInfoModal(data);
	}, [])

	global.closeInfoModal = React.useCallback(()=> { infoModalRef.current.close() }, [])

	global.handleLoginAction = React.useCallback((action, data)=> {
		switch(action) {
			case 'reg':
				setEnroll(true);
			break;
			case 'logout': 
				closeDrawer();
				setUser("");
			break;
			case 'back': 
				setEnroll(false);
			break;
			case 'login': 
			case 'guest': 
				setUser(action);
				setEnroll(false);
			break;
		}
	}, []);

	const loginPage = React.useMemo(() => {
		return (
			<View style={{paddingTop: UI.ios ? 50 : 0}}>
				{_needEnroll 
					? <Registration handleAction={handleLoginAction} />
					: <Login handleAction={handleLoginAction} closeSplash={closeSplash} />
				}
			</View>
		)
	}, [_needEnroll])

	const loadDefault = React.useMemo(()=> {
		if (!showLang) {
			return(<View style={{paddingTop: 50}}><ChangeLang setLang={setLang} callApi={showIntro} /></View>);
		} else {
			return(
			<View style={{paddingTop: '10%'}}>
				<ImageSlider
					onSkip={onSkipIntro}
					hideOnSlide={3}
					logo={require('./src/images/1024x/logo.png')}
					uri={false}
					data={[
						{
							src: require('./src/images/intro1.png'),
							info: Lang("home.slide1"),
						},
						{
							src: require('./src/images/intro2.png'),
							info: Lang('home.slide2'),
						},
						{
							src: require('./src/images/intro3.png'),
							info: Lang('home.slide3'),
						},
					]}
				/>
			</View>
			)
		}
	}, [showLang])

	const openDrawer = React.useCallback(()=> {
		_drawer.current.open();
		setDrawer(true);
	}, [])

	const closeDrawer = React.useCallback(()=> {
		_drawer.current.close();
		setDrawer(false);
	}, []);

	const loadStack = React.useMemo(()=> {
		return(
			[
			<Stack.Navigator 
				key={"stackNav"}
				screenOptions = {(_navData) => ({
					headerBackground: props => <HeaderBackground {...props} />,
					headerTitle: props => <HeaderTitle {...props} {..._navData} />,
					headerRight: props => <HeaderRight {...props} {..._navData} />,
					headerLeft: props => <HeaderLeft {...props} {..._navData} hideBack={true} openDrawer={openDrawer} closeDrawer={closeDrawer} drawerState={drawerState} />,
				})}
			>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{title: Lang('app 212.appName')}}
				/>
				<Stack.Screen
					name="ChangeLang"
					component={ChangeLang}
					options={{title: Lang('app 212.appName')}}
				/>
				<Stack.Screen 
					name="Portal" 
					component={Portal} 
					options= {{title: Lang('portal.title') }}
				/>
				<Stack.Screen 
					name="Profile" 
					component={Profile}
					options= {{title: Lang('profile.title') }}
				/>
				<Stack.Screen 
					name="MyAppointments" 
					component={MyAppointments} 
					options= {{title: Lang('appointment.title') }}
				/>
				<Stack.Screen 
					name="RefillReq" 
					component={RefillReq} 
					options= {{title: Lang('refillReq.title') }}
				/>
				<Stack.Screen 
					name="Account" 
					component={Account}
					options= {{title: Lang('account.title') }}
				/>
				<Stack.Screen 
					name="HealthRecords" 
					component={HealthRecords}
					options= {{title: Lang('healthRecords.title') }}
				/>
				<Stack.Screen
					name="HealthRecordInfo"
					component={HealthRecordInfo}
					options={{title: Lang('healthRecords.title')}}
				/>
				<Stack.Screen 
					name="Vitals" 
					component={Vitals}
					options= {{title: Lang('vitals.title') }}
				/>
				<Stack.Screen 
					name="VitalsInfo" 
					component={VitalsInfo}
					options= {{title: Lang('vitals.title') }}
				/>
				<Stack.Screen 
					name="Education" 
					component={Education}
					options= {{title: Lang('education.title') }}
				/>
				<Stack.Screen 
					name="ArticleList" 
					component={ArticleList}
					options= {{title: "" }}
				/>
				<Stack.Screen
					name="ArticleInfo"
					component={ArticleInfo}
					options={{title: Lang("education.title")}}
				/>
				<Stack.Screen 
					name="Contact" 
					component={Contact}
					options= {{title: Lang('contact.title') }}
				/>
				<Stack.Screen 
					name="Services" 
					component={Services}
					options= {{title: Lang('services.title') }}
				/>
				<Stack.Screen 
					name="ServiceInfo" 
					component={ServiceInfo}
					options= {{title: Lang('services.title') }}
				/>
				<Stack.Screen 
					name="Enrollment" 
					component={Enrollment}
					options= {{title: Lang('enrollment.title') }}
				/>
				<Stack.Screen 
					name="MakeAppointment" 
					component={MakeAppointment} 
					options={{title: Lang('appointment.title') }}
				/>
				<Stack.Screen
					name="ScheduleAppo"
					component={ScheduleAppo}
					options={{title: Lang('appointment.title') }}
				/>
				<Stack.Screen
					name="ProviderBio"
					component={ProviderBio}
					options= {{title: Lang("personProvider.providerBio") }}
				/>
				<Stack.Screen
					name="PayNow"
					component={PayNow}
					options={{title: "Payment"}}
				/>
				<Stack.Screen 
					name="PersonProvider" 
					component={PersonProvider} 
					options= {{title: Lang('personProvider.title') }}
				/>
				<Stack.Screen
					name="MyProvider"
					component={MyProvider}
					options={{title: "MyProvider"}}
				/>
				<Stack.Screen 
					name="Location" 
					component={Location} 
					options= {{title: Lang('location.title') }}
				/>
				<Stack.Screen
					name="Messages"
					component={Messages}
					options={{title: Lang("msg.title")}}
				/>
			</Stack.Navigator>
			]
		)
	}, [langSeq])

	return (
		<ChnProvider>
			<NavigationContainer ref={navigationRef}>
				<Drawer
					type="overlay"
					tapToClose={true}
					ref={_drawer}
					content={<SidePane navRef={navigationRef.current} closeDrawer={closeDrawer} handleLoginAction={handleLoginAction} />}
					openDrawerOffset={0.2}
					panCloseMask={0.2}
					closedDrawerOffset={-3}
					tweenHandler={(ratio) => ({
						main: { opacity:(2-ratio)/2 }
					})}
					onClose={()=> setDrawer(false)}
				>
					{ showIntro ? loadDefault : ( _user ? loadStack : loginPage) }
					<InfoModal ref={infoModalRef} key="intorModal" />
				</Drawer>
			</NavigationContainer>
		</ChnProvider>
	);
};

export default App;
