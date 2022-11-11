import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
const server = {
    dev: "https://rstaging-portal.mychn.org/chn-mobile/public",
    prod: "https://dw.mychn.org:2009"
}
export const BaseUrl = server.prod;
const baseApiUrl = `${BaseUrl}/api`;
export const allowedToken = "token=046af8f913b19b3befdf67f29657f2d6";
export const googleApiKey = "AIzaSyBliDzXOZR9pvkFfMeIhCBvW7m2KuKw8Mc";

/*
 method: 'POST', // *GET, POST, PUT, DELETE, etc.
 mode: 'cors', // no-cors, *cors, same-origin
 cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
 credentials: 'same-origin', // include, *same-origin, omit//
 headers: {
 'Content-Type': 'application/json'
 // 'Content-Type': 'application/x-www-form-urlencoded || multipart/form-data || text/plain',
 },
 redirect: 'follow', // manual, *follow, error
 referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
 body: JSON.stringify(data) // body data type must match "Content-Type" header if form-data then pass in OBJ
 */

 export async function apiCall(url = "", options = {}, _data = false) {
    if (typeof options == 'object' && _data) {
        options.body = JSON.stringify(_data) // body data type must match "Content-Type" header
    }
    if (typeof options == 'object' && !options.headers) {
        options.headers = { 
            "Content-Type": "application/json",
            "Authorization": await UI.accessKey(),
        };
    }
    if (UI.getData('langId')) {
        url += `${url.includes('?') ? "&" : "?"}languageId=${UI.getData('langId')}`;
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
}   

export function checkAppointment(_context, _data) {
    return new Promise((resolve, reject)=> {
        let obj = {
            "appt_date": _data.onDate,
            "appt_time": _data.appoTime,
            "appt_facility": _data.facilityId || _data.facility_id,
            "appt_duration": _data.duration || _data.appt_duration,
            "appt_provider": _data.ref_provId,
            "appt_category": _data.am_category || _data.appt_category,
            "appt_department": _data.am_dept || _data.appt_department,
            "appt_line": _data.am_line || _data.appt_line,
            "appt_am_id": _data.am_id || _data.appt_am_id,
            "appt_visitType": _data.visitType == "virtual" ? "virtual" : "face",
            "appt_other_problem": ""
        };
        apiCall("/book-appointment", {method: "POST"}, obj).then((res)=> {
            if (res.status) {
                resolve(res);
            } else {
                reject(res);
            }
        }).catch((err)=> {
            reject(err);
        });  
    })
}

export async function storeData (_key, value) {
    try {
      const jsonValue = (typeof value == 'object') ? JSON.stringify(value) : value;
      await AsyncStorage.setItem(_key, jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
}

export async function getStoreData (_key) {
    try {
        const _jsonValue = await AsyncStorage.getItem(_key);
        try {
            return JSON.parse(_jsonValue)
        } catch(err) {
            return _jsonValue;
        }
    } catch (e) {
        // saving error
        console.log(e);
    }
}

export function goHome (navRef, islogout=false) {
    navRef.reset({
        index: 0,
        routes: [{name: 'Home'}]
    });
    islogout && handleLoginAction("logout");
}

export function checkRules (input, value) {
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
}