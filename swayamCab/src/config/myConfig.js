import {PermissionsAndroid} from 'react-native';
export const gAPiKey = "AIzaSyCdmmRRO2G6kpwL5C601xFRouLd0g9MQLE";
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
  