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

export function getVitalsObj(data) {
    const obj = {};
    vitalList.map((item)=> {
        obj[item.id] = data[item.historyKey];
    })

    return obj;
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

export const vitalHistoryFormat = (_data, _vitalData) => {
    if (!_vitalData) return "";
    return _data.postKeys?.reduce((acc, item, index)=> {
        console.log(_vitalData?.[item]);
        const range = _data.fieldName == "periodTracker" ? [0, 10] : [0, 5];
        let str = _vitalData?.[item]?.substring(range[0], range[1]) || "N/A";
        return [acc, str].join(index == 0 ? "" : " | ")
    }, "")
}

export const providerBioFileds = [
    {
        "id": "name",
        "label": "personProvider.name"
    },
    {
        "id": "education",
        "label": "personProvider.education"
    },
    {
        "id": "title",
        "label": "personProvider.titleStr"
    },
    {
        "id": "bioDescription",
        "label": "personProvider.bio"
    },
    {
        "id": "areasOfExpertise",
        "label": "personProvider.expertile"
    },
    {
        "id": "approach",
        "label": "personProvider.approach"
    },
    {
        "id": "language",
        "label": "personProvider.lang"
    }
];

export const vitalList = [
    {
        id : 1,
        vitalImg: require('../images/1024x/oxymeter.png'),
        vitalName: 'vitals.pOxymeter',
        apiName: "/pulse-oxymetry",
        fieldName: "pulseOxymetry",
        apiKeyName: "pulse",
        historyKey: "Pulse",
        historyField: "pulseOxymetry",
        dateName: "pulseDate",
        postKeys: ["pulsestrength", "pulseWave", "heartrate", "pi", "bloodoxygen"],
        legends: ["Heart Rate", "Blood Oxygen" ],
        showChartKeys: ["heartrate", "bloodoxygen"],
    },
    {
        id : 2,
        vitalImg: require('../images/1024x/weight.png'),
        vitalName: 'vitals.weight',
        apiName: "/weight",
        fieldName: "weight",
        historyKey: "Weight",
        historyField: "weight",
        apiKeyName: "weight",
        dateName: "weightDate",
        postKeys: ["weight"]
    },
    {
        id : 3,
        vitalImg: require('../images/1024x/glucometer.png'),
        vitalName: 'vitals.glucometer',
        apiName: "/glucometer",
        fieldName: "glucometer",
        apiKeyName: "glucometer",
        historyField: "glucoMeter",
        historyKey: "BMI",
        dateName: "glucometerDate",
        postKeys: ["mg", "dl"],
        legends: ["MG", "DL" ]
    },
    {
        id : 4,
        vitalImg: require('../images/1024x/blood-pressure.png'),
        vitalName: 'vitals.bp',
        apiName: "/blood-pressure",
        historyKey: "BP",
        historyField: "bloodPressure",
        fieldName: "bloodPressure",
        apiKeyName: "bloodPresure",
        type: "78",
        dateName: "bloodPressureDate",
        postKeys: ["sys", "arrhythmia", "heartRate", "dia"],
        legends:  ["SYS", "Arrhythima", "Heart Rate", "DIA"]
    },
    {
        id : 5,
        vitalImg: require('../images/1024x/mood.png'),
        vitalName: 'vitals.mood',
        moodQues: "vitals.moodQues",
        apiName: "/mymood",
        fieldName: "mood",
        apiKeyName: "mood",
        historyKey: "temp",
        historyField: "myMood",
        dateName: "moodDate",
        postKeys: ["moodType"],
        written: true,
        moodList: [
            {
                img: require('../images/1024x/happy.png'),
                name: "Happy",
            },
            {
                img: require('../images/1024x/neutral.png'),
                name: "Neutral",
            },
            {
                img: require('../images/1024x/sad.png'),
                name: "Sad",
            },
            {
                img: require('../images/1024x/anxious.png'),
                name: "Anxious",
            },
            {
                img: require('../images/1024x/tired.png'),
                name: "Tired",
            },
            {
                img: require('../images/1024x/angry.png'),
                name: "Angry",
            },
        ]
    },
    {
        id : 6,
        vitalImg: require('../images/1024x/schedule.png'),
        vitalName: 'vitals.pTracker',
        nextStart: "vitals.nextPeriodStart",
        insCurrent: "vitals.peroidStarted",
        apiName: "/period-tracker",
        fieldName: "periodTracker",
        apiKeyName: "periodTracker",
        historyKey: "Resp",
        historyField: "periodTracker",
        dateName: "periodStarted",
        postKeys: ["periodStarted", "nextExpectedDate"],
        written: true,
    },
];

export const vitalsIgnoreList = [
    "dataID", 
    "mac", 
    "date", 
    "ACTION_LIVEDA_PO", 
    "instruction_type",
    "body_building",
    "right_time",
    "gender",
    "impedance",
    "age",
    "user_num",
    "height",
    "measure_time"
]

export const legendColors = ["#336699", "#e26a00", "#008060", "#804600", "#999966"];

export const warnMsg = {
    "onDate": "Please Select Date",
    "duration": "Please select category",
    "reason": "Please Select reason (problem)",
}

export const moods = {
    "Happy": 60,
    "Neutral": 30,
    "Sad": 10,
    "Anxious": 50,
    "Tired": 20,
    "Angry": 40,
}

export const heakthRecordsList = [
    {
        id: 1,
        text: 'healthRecords.hDocs',
        apiName: "/health-documents",
        prefix: "hDocs_",
    },
    {
        id: 2,
        text: 'healthRecords.med',
        apiName: "/medications",
        prefix: "med_",
    },
    {
        id: 3,
        text: 'healthRecords.allergy',
        apiName: "/allergylist",
        prefix: "allergy_",
    },
    {
        id: 4,
        text: 'healthRecords.immun',
        apiName: "/immunizations",
        prefix: "immun_",
    },
    {
        id: 5,
        text: 'healthRecords.procedures',
        apiName: "/procedures",
        prefix: "procedures_",
    },
    {
        id: 6,
        text: 'healthRecords.labResult',
        apiName: "/labresults",
        prefix: "labResult_",
    },
    {
        id: 7,
        text: 'healthRecords.problems',
        apiName: "/problems",
        prefix: "problems_",
    },
    {
        id: 8,
        text: 'healthRecords.vitalHistory',
        apiName: "/vital-history",
        prefix: "vitalHistory_",
    },
    {
        id: 9,
        text: 'healthRecords.pastEnc',
        page: "bill",
        prefix: "pastEnc_",
        //apiName: "/past-encounters",
    },
    {
        id: 10,
        text: 'healthRecords.cda',
        page: "bill",
        prefix: "cda_",
       // apiName: "/cda-file-export",
    },
];

export const selectDelivery = [
    {
        label: "Please send my prescription to my home address.",
        value: "Delivery",
        "color": "black"
    },
    {
        label: "I will pick up my prescription at the pharmacy.",
        value: "Pickup",
        "color": "black"
    },
];

export const selectPharmacy = [
    {
        label: "Pharmacy Last Used",
        value: 1,
        type: "Current Pharmacy",
        "color": "black"
    },
    {
        label: "Specify New Pharmacy",
        value: 2,
        type: "new",
        "color": "black"
    },
    {
        label: "CHN Freeport Pharmacy",
        value: 3,
        type: "Scarsdale Pharmacy",
        "color": "black"
    },
    {
        label: "CHN Scarsdale Pharmacy",
        value: 4,
        type: "Current Pharmacy",
        "color": "black"
    },
    {
        label: "CHN Angleton Pharmacy",
        value: 5,
        type: "Angleton Pharmacy",
        "color": "black"
    }
]