import React from "react";
import {View, TextInput, Image, ScrollView} from 'react-native';
import { apiCall } from "../api/apiAction";
import ChnContext from "../context/ChnContext";
import commonStyle from "../css/commonStyle";
import MyButton from "./libs/MyButton";
import MyText from "./libs/MyText";

const PayNow = (props)=> {
    const contextOption = React.useContext(ChnContext);
    const [payload, setPayload] = React.useState({
        "PAYMENT_MODE": "Live",
        "MERCHANT_LOGIN_ID": "2JyJz79Sz", //"56PAsUn83jFC"
        "MERCHANT_TRANSACTION_KEY": "96z9854YeBw327WY", //"94tgD3KFU8B556m7"
    });
    const payUrl = payload.PAYMENT_MODE == "Live" ? 'https://api.authorize.net/xml/v1/request.api' : 'https://apitest.authorize.net/xml/v1/request.api';
    const options = {
        "method": "POST",
        "headers": { 
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": UI.accessKey(),
        }
    }
    const _data = props?.route?.params || {};

    const onSend = () => {
        const createTransactionRequest = {
            "merchantAuthentication": {
                "name": payload.MERCHANT_LOGIN_ID,
                "transactionKey":  payload.MERCHANT_TRANSACTION_KEY,
            },
            "refId": "ref"+ Date.now(),
            "transactionRequest": {
                "transactionType": "authCaptureTransaction",
                "amount": _data.payAmt || 1,
                "payment": {
                    "creditCard": {
                        "cardNumber": payload.cardNumber,
                        "expirationDate": `${payload.exp_year}-${payload.exp_month}`,
                        "cardCode": payload.cvv
                    }
                }
        
            },
        }
        payApi(createTransactionRequest).then((res)=> {
            res = JSON.parse(res.trim());
            const transRes = res.transactionResponse;
            if ( res.messages?.resultCode == "Ok" && transRes?.transId) {
                const transactionMessage = transRes?.messages?.[0]
                const _obj = {
                    "eid": contextOption.user?.patient_id,
                    "refId": res.refId,
                    "transId": transRes.transId,
                    "amount": _data.payAmt || 1,
                    "authCode": transRes.authCode,
                    "responseCode": transRes.responseCode,
                    "messageCode": 1,
                    "description": transactionMessage.description,
                }
                apiCall("/transaction", {method: "POST"}, _obj).then((_transRes)=> {
                    console.log({_transRes});
                    if (_transRes.status) {
                        showInfoModal(Lang("appointment.paid"));
                    } else {
                        showInfoModal(Lang("appointment.failedPay"));
                    }
                }).catch((err)=> {
                    console.log(err);
                    showInfoModal(Lang("appointment.failedPay"));
                })
            } else {
                const errorText = transRes?.errors?.[0].errorText;
                const message = res?.messages?.message?.[0]; 
                showInfoModal(errorText || message.text);
            }
        }).catch((err)=> {
            console.log({transaction: err});
            showInfoModal();
        })
        
    }

    const payApi = async (createTransactionRequest) => {
        options.body = JSON.stringify({createTransactionRequest});
        try {
            const res = await fetch(payUrl, options);
            //console.log({payRes: res})
            return res.text()
            //return res.json();
        } catch (err) {
            Promise.reject(err);
        }
    }

    const handleInput = (type, str)=> {
        setPayload({...payload, ...{[type]: str}});
    }

    return (
        <ChnContext.Consumer>
            {context=>
                <ScrollView>
                    <View style={[UI.setPadding(5,5,5,5, '%')]}>
                        <View style={[UI.setBg("#692264"), commonStyle.pMd, UI.setRadius(5)]}>
                            <View style={[UI.setPaddingLeft(32, '%')]}>
                                <Image
                                    source={require("../images/cards-logo.png")}
                                    style={[
                                        //UI.setWidth(70, '%'),
                                        commonStyle.imgContain
                                    ]}
                                />
                            </View>
                            <View style={[UI.setHeight(60)]}>
                                <MyText title={"Name"} theme="white" style={[commonStyle.mb]} />
                                <TextInput
                                    placeholder="Enter your name"
                                    placeholderTextColor={"#000"}
                                    onChangeText={handleInput.bind(this, "owner")}
                                    style={[commonStyle.fs5]}
                                />
                            </View>
                            <View style={[UI.setHeight(60)]}>
                                <MyText title={"Card No."} theme="white" style={[commonStyle.mb]}/>
                                <TextInput
                                    placeholder="XXXX-XXXX-XXXX-XXXX"
                                    placeholderTextColor={"#000"}
                                    maxLength={16}
                                    onChangeText={handleInput.bind(this, "cardNumber")}
                                    style={[commonStyle.fs5]}
                                />
                            </View>
                            <View style={[commonStyle.row]}>
                                <View style={[UI.setHeight(60), UI.setPaddingRight(20)]}>
                                    <MyText title={"Expiry Date"} theme="white" style={[commonStyle.mb]}/>
                                    <View style={[commonStyle.row, commonStyle.vCenter]}>
                                        <TextInput
                                            placeholder={"MM"}
                                            placeholderTextColor={"#000"}
                                            maxLength={2}
                                            onChangeText={handleInput.bind(this, "exp_month")}
                                            style={[commonStyle.fs5]}
                                        />
                                        <MyText title={" / "} style={[UI.setColor("#000"), commonStyle.fs5]}/>
                                        <TextInput
                                            placeholder={"YYYY"}
                                            placeholderTextColor={"#000"}
                                            maxLength={4}
                                            keyboardType={"number-pad"}
                                            onChangeText={handleInput.bind(this, "exp_year")}
                                            style={[commonStyle.fs5]}
                                        />
                                    </View>
                                </View>
                                <View style={[UI.setHeight(60)]}>
                                    <MyText title={"CVV"} theme="white" style={[commonStyle.mb]}/>
                                    <TextInput
                                        placeholder={"CVV"}
                                        maxLength={3}
                                        placeholderTextColor={"#000"}
                                        onChangeText={handleInput.bind(this, "cvv")}
                                        style={[commonStyle.fs5]}
                                    />
                                </View>
                            </View>
                        </View>
                        <MyButton
                            theme={true}
                            title={`Pay Now - ${_data.payAmt} USD`}
                            style={[
                                commonStyle.fullWidth, 
                                UI.setHeight(40),
                                commonStyle.mt
                            ]}
                            textStyle={[commonStyle.fs4]}
                            onPress={onSend}
                        />
                    </View>
                </ScrollView>
            }
        </ChnContext.Consumer>
    )
}

export default PayNow;