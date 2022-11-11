import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { UI } from '../config/theme';
export const BaseUrl = "https://dw.mychn.org:2009";
const baseApiUrl = `${BaseUrl}/api`;
export const allowedToken = "token=046af8f913b19b3befdf67f29657f2d6";
const API = {
    call: async function (url: string, options: any, _data: any) {
        if (options && _data) {
            options.body = JSON.stringify(_data) // body data type must match "Content-Type" header
        }
        if ( options && !options.headers) {
            options.headers = { 
                "Content-Type": "application/json",
                "Authorization": await UI.accessKey(),
            };
        }
        try {
            let netState = await NetInfo.fetch();
            if (netState.isConnected) {
                const res = await fetch(baseApiUrl + url, options);
                return res.json();
            } else {
                return Promise.reject(503);
            }
              
        } catch(err) {
            return Promise.reject(err);
        }
    },
    getStoreData: async function(name: string) {
        try {
            const _jsonValue:any = await AsyncStorage.getItem(name);
            try {
                return JSON.parse(_jsonValue)
            } catch(err) {
                return _jsonValue;
            }
        } catch (e) {
            // saving error
            UI.logError("getStoreData", e);
        }
    },
    storeData: async function (name: string, data: object) {
        try {
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem(name, jsonValue);
          } catch (e) {
            // saving error
            UI.logError("storeData", e);
        }
        
    },
    checkRules: function (input: any, value: any) {
        let result = "";
        switch (input.rule) {
            case 'email': {
                let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                let res = reg.test(value);
                if (!res) {
                    result = "Please enter a valid email";
                }
            }
            break;
            case 'number': {
                if (isNaN(value)) {
                    result = "Please enter numbers only."
                }
            }
            break;
        }
        
        return result;
    },
    googleApiKey: "",
}

export default API;