/**
 * File: chnConfig.js
 * Desciption: Contains config and related functions
 * Author: Pradeep Yadav
 */

import {PermissionsAndroid} from 'react-native';

export const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
export const weeks = ["Mon", "Tues", "Wed", "Thus", "Fri", "Sat", "Sun"];
export const defaultArticleImg = 'https://www.maxlifeinsurance.com/content/dam/corporate/images/Health%20Insurance%20Policy%20in%20India%201.png';

export function getMonthName(n, showDay, currentDate, withYear = false) {
    let result = "";
    if (currentDate?.month) {
        result = months[currentDate.month-1] + " " + currentDate.day;
    } else {
        let d = typeof currentDate == "string" ?  new Date(currentDate) : new Date();
        let _dd = months[n] || months[d.getMonth()];
        result = (showDay ? _dd + " " + d.getDate() : _dd) + (withYear ? " " +d.getFullYear() : "");
    }
    return result;
}

export function checkBlank(_data, keys) {
    let result = keys.find((item)=> !_data[item]);

    return result;
}

export function createTimeList (shift="") {
    let result = [];
    for (let i = 1; i< 13; i++) {
        let str = i < 10 ? `0${i} ${shift}` : `${i} ${shift}`;
        result.push(
            {
                label: str,
                value: str,
                "color": "black"
            }
        )
    }

    return result
}

export const requestLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location access for Booking",
          message:
            "This app is required to access location to find destination and pickup points.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the Location.");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn({permissionError: err});
    }
};

export async function checkBluetooth() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Bluetooth Permission',
        message: 
          'In the next dialogue, Android will ask for permission for this ' +
          'App to access your location. This is needed for being able to ' +
          'use Bluetooth to scan your environment for peripherals.',
        buttonPositive: 'OK'
        },
    )
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('BleManager.scan will *NOT* detect any peripherals!')
    } else {
        console.log("Bluetooth Permission Granted");
    }
}

export const getItem = (data, index) => {
    return data[index];
}

export const getItemCount = (listData) => {
    return listData.length;
}

export const legendColors = ["#336699", "#e26a00", "#008060", "#804600", "#999966"];

export const warnMsg = {
    "onDate": "Please Select Date",
    "duration": "Please select category",
    "reason": "Please Select reason (problem)",
}