import {PermissionsAndroid} from 'react-native';
import database from '@react-native-firebase/database';
export const gAPiKey = "AIzaSyCdmmRRO2G6kpwL5C601xFRouLd0g9MQLE";

export function addDb (dbPath, writeData) {
  return database().ref(dbPath).set(writeData);
}

export function updatDb (dbPath, newData) {
  return database().ref(dbPath).update(newData);
}

export function pushDb (dbPath, newData) {
  return new Promise((resolve)=> {
    const newReference = database().ref(dbPath).push();
    newData.id = newReference.key;
    newReference.set(newData).then(()=> {
      resolve(newReference.key);
    })
  });
}

export function removeDb(dbPath) {
  return database().ref(dbPath).remove();
}

export function getTableRef(dbPath) {
  return database().ref(dbPath);
}

export function dbOff(dbPath, funcRef) {
  database().ref(dbPath).off('value', funcRef);
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

export const getItem = (data, index) => {
  return data[index];
}

export const getItemCount = (listData) => {
  return listData.length;
}
  