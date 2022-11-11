import {
    BP550BTModule,
    BG5SModule,
    HS2SModule,
    BP3LModule,
    PO3Module
} from '@ihealth/ihealthlibrary-react-native';
export const iHealthCertificate = UI.ios ? 'org_communityHealth_CHN_ios.pem' : 'com_chn_android.pem';

export const iHelathDevices = {
    'AM3S': "", 
    'AM4': "",
    'BG1': "", 
    'BG1S': "", 
    'BG5': "", 
    'BG5S': {
        type: "BG5S",
        label: "Gluco+ (BG5S)",
        cat: "glucometer",
        resultType: 1,
        Event_Notify: BG5SModule.Event_Notify,
        //readData: BG5SModule.getOfflineData,
        startMeasure: BG5SModule.startMeasure,
        disconnect: BG5SModule.disConnect,
        getAllConnected: BG5SModule.getAllConnectedDevices
    },
    'BP3L': {
        type: "BP3L",
        label: "BP Measure (BP3L)",
        cat: "bloodPressure",
        Event_Notify: BP3LModule.Event_Notify,
        startMeasure: BP3LModule.startMeasure,
        stopMesure: BP3LModule.stopMeasure,
        disconnect: BP3LModule.disconnect,
        getAllConnected: BP3LModule.getAllConnectedDevices
    }, 
    'BP5': "", 
    'BP5S': "", 
    'BP7': "", 
    'BP7S': "", 
    'KN550': {
        type: "KN550",
        cat: "bloodPressure",
        label: "iHealth Track (KN550)",
        Event_Notify: BP550BTModule.Event_Notify,
        readData: BP550BTModule.getOffLineData,
        disconnect: BP550BTModule.disconnect,
        getAllConnected: BP550BTModule.getAllConnectedDevices
    },
    'HS2': "", 
    'HS4': "", 
    'HS4S': "", 
    'HS6': "",
    'PO1': "", 
    'PO3': {
        type: "PO3",
        cat: "pulseOxymetry",
        label: "Pulse Meter (PO3)",
        Event_Notify: PO3Module.Event_Notify,
       // readData: PO3Module.startMeasure,
        startMeasure: PO3Module.startMeasure,
        disconnect: PO3Module.disconnect,
        getAllConnected: PO3Module.getAllConnectedDevices
    },
    'ECG3': "", 
    'ECG3USB': "",
    'FDIR_V3': "",
    'TS28B': "",
    'NT13B': "", 
    'PT3SBT': "",
    'HS2S': {
        type: "HS2S",
        cat: "weight",
        label: "Weight (HS2S)",
        Event_Notify: HS2SModule.Event_Notify,
        readData: HS2SModule.getAnonymousMemoryData,
        disconnect: HS2SModule.disconnect,
        cleanData: HS2SModule.deleteAnonymousMemoryData,
    }
}

export const manualVitalConfig = {
    "glucometer": [
        {
            "label": "Mg",
            "name": "mg"
        },
        {
            "label": "Dl",
            "name": "dl"
        }
    ],
    "weight": [
        {
            "label": "weight",
            "name": "weight"
        }
    ],
    "bloodPressure": [
        {
            "label": "Sys",
            "name": "sys",
        },
        {
            "label": "Arrhythmia",
            "name": "arrhythmia",
        },
        {
            "label": "Dia",
            "name": "dia",
        },
        {
            "label": "Heart",
            "name": "heartRate",
        },
    ],
    "pulseOxymetry": [
        {
            "label": "Pulse Strength",
            "name": "pulsestrength"
        },
        {
            "label": "Pulse Wave",
            "name": "pulseWave"
        },
        {
            "label": "Heart Rate",
            "name": "heartrate"
        },
        {
            "label": "PI",
            "name": "pi"
        },
        {
            "label": "Blood Oxygen",
            "name": "bloodoxygen"
        }
    ],
    "mood": [
        {
            "label": "Mood",
            "name": "mood"
        }
    ],
    "periodTracker": [
        
    ]
}