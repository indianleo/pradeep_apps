import React from 'react';
import { View, Text, ScrollView, TextInput, Image } from 'react-native';
import ChnContext from '../context/ChnContext';
import commonStyle from '../css/commonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { apiCall, goHome } from '../api/apiAction';
import MyText from './libs/MyText';
import MyButton from './libs/MyButton';
import Select from './libs/Select';
import { selectDelivery, selectPharmacy } from '../config/chnConfig';
import ErrorZone from './libs/ErrorZone';
import ShowError from './ShowError';
const RefillReq = (props) => {
    const [formObj, setForm] = React.useState({});
    const [drugs, setDrugs] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [drugCheckbox, setCheckbox] = React.useState([]);
    const [pharmacyList, setPharmaList] = React.useState([{label: "Select Pharmacy", value: 0}]);
    const [isError, setError] = React.useState(false);
    const [errObj, setErrorObj] = React.useState({});

    React.useEffect(()=> {
        getData();
    }, []);

    const getData = () => {
        apiCall("/refill-prescription-data").then((res)=> {
            console.log(res);
            if (res.drugs?.length > 0) {
                setDrugs(res.drugs);
                setCheckbox([...[res.drugs[0].drug]])
                setStates( Object.keys(res.states).map((key)=> {return {label: res.states[key], value: key, "color": "black"} }) );
                handleInput("drug", [res.drugs[0].drug]);
            }
            filterPharmacy(res.pharmacies);
        }).catch((err)=> {
            console.log({drugErr: err});
            setError(true);
        })
    }

    const filterPharmacy = (pharmaList) => {
        if (pharmaList) {
            //const temp = [];
            const temp = Object.entries(pharmaList).map((item, index)=> ({
                label: item[1],
                value: index + 1,
                type: item[0],
                "color": "black"
            }))
            setPharmaList([...temp]);
        }
    }

    const handleInput = (type, value)=> { 
        setForm({ ...formObj,...{[type]: value} })
    }
    

    const handleCheckbox = (name) => {
        let temp = drugCheckbox;
        if (drugCheckbox.includes(name)) {
            temp.splice(drugCheckbox.indexOf(name), 1);
        } else {
            temp.push(name);
        }
        setCheckbox([...temp]);
        handleInput("drug", temp);
    }

    const onSubmit = () => {
        if (drugCheckbox.length == 0) {
            showInfoModal("Please select atleast one medication.")
            return false;
        } 
        showInfoModal({isLoading: true});
        apiCall("/refill-prescription-request", {method: "POST"}, formObj).then((res)=> {
            if (res.status) {
                showInfoModal({title: res.success, onOk: ()=> goHome(props.navigation)});
            } else {
                setErrorObj(UI.createError(res));
                showInfoModal("Please check required fields");
            }
        }).catch((err)=> {
            UI.logError("refill-prescription-data", err);
            showInfoModal();
        })
    }

    const getTitle = React.useCallback( (items) => {
        let title = items.drug;
        if (items.size && items.units && items.form) {
            title += ` (${items.size} ${items.units} ${items.form})`;
        }
        return title;
    }, []);

    const getMedCheck = ()=> {
        return (drugs.map((items, index)=> 
            <View key={index}>
                <MyButton
                    type="checkbox"
                    name={items.drug}
                    title={getTitle(items)}
                    iconName={"md-checkbox"}
                    iconSet={"ionicons"}
                    iconSize={20}
                    style={[UI.setHeight(30)]}
                    textStyle={[commonStyle.fs6]}
                    checked={drugCheckbox.includes(items.drug)}
                    onPress={handleCheckbox}
                />
            </View>
        ) )

        //return arr;
    }

    const newPharmacyForm = () => {
        if (formObj['pharm_option'] == "new") {
            return (
                <View>
                    <View style={[commonStyle.ptXLg]}>
                        <View style={[commonStyle.row]}>
                            <MyText
                                theme={"orange"}
                                title={Lang("refillReq.pharmaName")}
                                style={[commonStyle.pb]}
                            />
                            <Icon name="star" size={10} color="red" />
                        </View>
                        <View>
                            <TextInput
                                onChangeText={handleInput.bind(this, "rx_pharmacy")}
                                style={[commonStyle.themeTextBox, UI.setHeight(53)]}
                            />
                        </View>
                    </View>
                    <View style={[commonStyle.ptXLg]}>
                        <View style={[commonStyle.row]}>
                            <MyText
                                theme={"orange"}
                                title={Lang("refillReq.streetAdd")}
                                style={[commonStyle.pb]}
                            />
                            <Icon name="star" size={10} color="red" />
                        </View>
                        <View>
                            <TextInput
                                onChangeText={handleInput.bind(this, "rx_street")}
                                style={[commonStyle.themeTextBox, UI.setHeight(53)]}
                            />
                        </View>
                    </View>
                    <View style={[commonStyle.ptXLg]}>
                        <View style={[commonStyle.row]}>
                            <MyText
                                theme={"orange"}
                                title={Lang("refillReq.city")}
                                style={[commonStyle.pb]}
                            />
                            <Icon name="star" size={10} color="red" />
                        </View>
                        <View>
                            <TextInput
                                onChangeText={handleInput.bind(this, "rx_city")}
                                style={[commonStyle.themeTextBox, UI.setHeight(53)]}
                            />
                        </View>
                    </View>
                    <View style={[commonStyle.ptXLg]}>
                        <View style={[commonStyle.row]}>
                            <MyText
                                theme={"orange"}
                                title={Lang("refillReq.states")}
                                style={[commonStyle.pb]}
                            />
                            <Icon name="star" size={10} color="red" />
                        </View>
                        <View>
                            <Select
                                onChange={handleInput.bind(this, 'rx_state')}
                                list={states}
                                style={[commonStyle.flex1]}
                            />
                        </View>
                    </View>
                    <View style={[commonStyle.ptXLg]}>
                        <View style={[commonStyle.row]}>
                            <MyText
                                theme={"orange"}
                                title={Lang("refillReq.zip")}
                                style={[commonStyle.pb]}
                            />
                            <Icon name="star" size={10} color="red" />
                        </View>
                        <View>
                            <TextInput
                                onChangeText={handleInput.bind(this, "rx_zip")}
                                keyboardType="number-pad"
                                style={[commonStyle.themeTextBox, UI.setHeight(53)]}
                            />
                        </View>
                    </View>
                    <View style={[commonStyle.ptXLg]}>
                        <View style={[commonStyle.row]}>
                            <MyText
                                theme={"orange"}
                                title={Lang("refillReq.phone")}
                                style={[commonStyle.pb]}
                            />
                            <Icon name="star" size={10} color="red" />
                        </View>
                        <View>
                            <TextInput
                                onChangeText={handleInput.bind(this, "rx_phone")}
                                keyboardType="number-pad"
                                style={[commonStyle.themeTextBox, UI.setHeight(53)]}
                            />
                        </View>
                    </View>
                    <View style={[commonStyle.ptXLg]}>
                        <View style={[commonStyle.row]}>
                            <MyText
                                theme={"orange"}
                                title={Lang("refillReq.fax")}
                                style={[commonStyle.pb]}
                            />
                        </View>
                        <View>
                            <TextInput
                                onChangeText={handleInput.bind(this, "rx_fax")}
                                style={[commonStyle.themeTextBox, UI.setHeight(53)]}
                            />
                        </View>
                    </View>
                </View>
            )
        }
        return null;
    }

    if (isError) {
        return (
            <ErrorZone onClose={()=> setError(false)} tryAgain={getData} />
        )
    }    

    return(
        <ChnContext.Consumer>
            {context => (
                <ScrollView style={[commonStyle.themeBg, UI.setPadding(5,8,5,8, '%')]}>
                    <View 
                        style={[
                            commonStyle.vCenter, 
                            commonStyle.row, 
                            commonStyle.alignCorner,
                        ]}
                    >
                        <View style={[UI.setWidth(65, '%')]}>
                            <MyText
                                theme={"heading"}
                                title={Lang('refillReq.title')}
                            />
                        </View>
                        <Image
                            source={require('../images/1024x/refill.png')}
                            style={[commonStyle.pageIcons]}
                        />
                    </View>
                    {drugs.length == 0 
                        ?   <MyText title="No Prescription availbale." style={[UI.setColor("red")]}/>
                        :
                            <>
                                <View style={[commonStyle.ptXLg]}>
                                    <View style={[commonStyle.row]}>
                                        <MyText
                                            theme={"orange"}
                                            title={Lang("refillReq.selDel")}
                                            style={[commonStyle.pb]}
                                        />
                                        <Icon name="star" size={10} color="red" />
                                    </View>
                                    <View>
                                        <Select
                                            onChange={handleInput.bind(this, 'pharm_delivery')}
                                            list={selectDelivery}
                                            style={[commonStyle.flex1]}
                                            //selectProps={{value: "Delivery"}}
                                        />
                                        <ShowError data={errObj} type="pharm_delivery" />
                                    </View>
                                </View>
                                <View style={[commonStyle.ptXLg]}>
                                    <View style={[commonStyle.row]}>
                                        <MyText
                                            theme={"orange"}
                                            title={Lang("refillReq.selPharma")}
                                            style={[commonStyle.pb]}
                                        />
                                        <Icon name="star" size={10} color="red" />
                                    </View>
                                    <View>
                                        <Select
                                            onChange={(id)=> id && handleInput('pharm_option', pharmacyList[id-1]?.type)}
                                            list={pharmacyList}
                                            style={[commonStyle.flex1]}
                                            //selectProps={{value: "Current Pharmacy"}}
                                        />
                                        <ShowError data={errObj} type="pharm_option" />
                                    </View>
                                </View>
                                {newPharmacyForm()}
                                <View style={[commonStyle.ptXLg]}>
                                    <View style={[commonStyle.row]}>
                                        <MyText
                                            theme={"orange"}
                                            title={Lang("refillReq.selMedi")}
                                            style={[commonStyle.pb]}
                                        />
                                        <Icon name="star" size={10} color="red" />
                                    </View>
                                    {getMedCheck()}
                                </View>
                                <View style={[commonStyle.vPadLg, UI.setHeight(150)]}>
                                    <MyButton
                                        title={[Lang("app 212.submit")]}
                                        theme={true}
                                        style={[UI.setHeight(50)]}
                                        textStyle={[commonStyle.orangeFontSize]}
                                        onPress={onSubmit}
                                    />
                                </View>
                            </>

                    }
                </ScrollView>
            )}
        </ChnContext.Consumer>
    )
}

export default RefillReq;