import React from 'react'
import { 
    View, 
    Text,
    ScrollView, 
    TouchableOpacity, 
    TouchableHighlight,
    NativeModules,
    NativeEventEmitter,  
    PermissionsAndroid,
    Platform,
    StyleSheet,
    FlatList,
    RefreshControl
} from 'react-native';
import style from '../css/style';
import InfoModal from '../libs/InfoModal'
import BleManager from 'react-native-ble-manager';
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const Test = (props) => {
    const [visibleModal, showModal] = React.useState(false);
    const [layout, setLayout] = React.useState(null);
    const [isScanning, setIsScanning] = React.useState(false);
    const peripherals = new Map();
    const [list, setList] = React.useState([]);
    const [currentValue, setValue] = React.useState({'from':  "N/A", 'name': "N/A", value: "N/A"});

    const startScan = () => {
        if (!isScanning) {
          BleManager.scan([], 3, false).then((results) => {
            console.log('Scanning...');
            setIsScanning(true);
          }).catch(err => {
            console.error(err);
          });
        }    
    }
    
    const handleStopScan = () => {
        console.log('Scan is stopped');
        setIsScanning(false);
    }
    
    const handleDisconnectedPeripheral = (data) => {
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
            peripheral.connected = false;
            peripherals.set(peripheral.id, peripheral);
            setList(Array.from(peripherals.values()));
        }
        console.log('Disconnected from ' + data.peripheral);
    }

    const handleUpdateValueForCharacteristic = (data) => {
        console.log({'Received data from ':  data.peripheral, 'characteristic': data.characteristic, value: data.value});
        setValue({'from':  data.peripheral, 'name': data.characteristic, value: data.value});
    }
    
    const retrieveConnected = () => {
        BleManager.getConnectedPeripherals([]).then((results) => {
          if (results.length == 0) {
            console.log('No connected peripherals')
          }
          console.log(results);
          for (let peripheral of results) {
            peripheral.connected = true;
            peripherals.set(peripheral.id, peripheral);
            setList(Array.from(peripherals.values()));
          }
        }).catch((err)=> {
            console.log({retrueveError: err});
        });
    }

    const handleDiscoverPeripheral = (peripheral) => {
        console.log('Got ble peripheral', peripheral);
        if (!peripheral.name) {
            peripheral.name = 'NO NAME';
        }
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
    }

    const disconnectDevice = (peripheral) => {
        BleManager.disconnect(peripheral.id);
    }
    
    const testPeripheral = (peripheral) => {
        //console.log(peripheral);
        if (peripheral) {
            if (!peripheral.advertising.isConnectable) {
                console.log("Device not connectable");
                alert("It is not connectable")
                return;
            }
            if (peripheral.connected) {
                console.log("Device connected", peripheral.name)
                /* Test read current RSSI value */
                BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
                    console.log('Retrieved peripheral services', peripheralData);

                    BleManager.readRSSI(peripheral.id).then((deviceValue) => {
                        console.log('Retrieved actual RSSI value', deviceValue);
                        let p = peripherals.get(peripheral.id);
                        setValue({'from':  peripheral.id, 'name': peripheral.characteristic, value: deviceValue});
                        if (p) {
                            p.rssi = deviceValue;
                            peripherals.set(peripheral.id, p);
                            setList(Array.from(peripherals.values()));
                        }                
                    });                                          
                });
            } else {
                BleManager.connect(peripheral.id).then(() => {
                    let p = peripherals.get(peripheral.id);
                    console.log({pPre:p});
                    if (p) {
                        p.connected = true;
                        peripherals.set(peripheral.id, p);
                        setList(Array.from(peripherals.values()));
                    }
                    console.log('Connected to ' + peripheral.id);


                    setTimeout(() => {
                        console.log("Trying to retrieve");
                        /* Test read current RSSI value */
                        BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
                            console.log('Retrieved peripheral services', peripheralData);

                            BleManager.readRSSI(peripheral.id).then((rssi) => {
                            console.log('Retrieved actual RSSI value', rssi);
                            let p = peripherals.get(peripheral.id);
                            console.log({p});
                            if (p) {
                                p.rssi = rssi;
                                peripherals.set(peripheral.id, p);
                                setList(Array.from(peripherals.values()));
                            }                
                            });                                          
                        });
                    }, 900);
                }).catch((error) => {
                    console.log('Connection error', error);
                });
            }
        }

    }

    React.useEffect(()=> {

        BleManager.start({showAlert: false});
 
         bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
         bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
         bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
         bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
 
         if (Platform.OS === 'android' && Platform.Version >= 23) {
             PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                 if (result) {
                     console.log("Permission is OK");
                 } else {
                     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                     if (result) {
                         console.log("User accept");
                     } else {
                         console.log("User refuse");
                     }
                     });
                 }
             });
         }  
         
         return (() => {
             console.log('unmount');
             bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
             bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan );
             bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
             bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
         })
     }, []);

     const renderItem = (item) => {
        const color = item.connected ? 'green' : '#fff';
        return (
            <View style={[style.mblg, UI.setBorder(1, "orange")]}>
                <TouchableHighlight onPress={() => testPeripheral(item) }>
                    <View style={[style.row, {backgroundColor: color}]}>
                        <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>
                            {item.name}
                        </Text>
                        <View>
                            <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>
                                RSSI Value: {item.rssi}
                            </Text>
                            <Text style={{fontSize: 8, textAlign: 'center', color: 'purple', padding: 2, paddingBottom: 20}}>
                                {item.id}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                {item.connected ? 
                    <TouchableOpacity style={[style.bgCyan, UI.setHeight(30), style.center]} onPress={disconnectDevice.bind(this, item)}>
                        <Text style={[style.p]}>Disconnect</Text>
                    </TouchableOpacity>
                    : null
                }
            </View>
        );
      }

    return (
        <View style={[UI.setHeight()]}>
            <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={[style.bgWhite]}
                    refreshControl={
                        <RefreshControl
                          refreshing={isScanning}
                          onRefresh={()=> console.log("refreshed")}
                        />
                      }
                >
                    {global.HermesInternal == null ? null : (
                        <View style={styles.engine}>
                        <Text style={styles.footer}>Engine: Hermes</Text>
                        </View>
                    )}
                    <View style={[style.bgWhite]}>
                        
                        <View style={{margin: 10}}>
                            <TouchableOpacity
                                style={[style.btnSky, UI.setHeight(40)]}
                                onPress={startScan}
                            >
                                <Text style={[style.textWhite]}>{'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}</Text>
                            </TouchableOpacity>           
                        </View>

                        <View style={{margin: 10}}>
                            <TouchableOpacity
                                style={[style.btnSky, UI.setHeight(40)]}
                                onPress={retrieveConnected}
                            >
                                <Text style={[style.textWhite]}>Retrieve connected peripherals</Text>
                            </TouchableOpacity> 
                        </View>

                        {(list.length == 0) &&
                            <View style={{flex:1, margin: 20}}>
                                <Text style={{textAlign: 'center'}}>No peripherals</Text>
                            </View>
                        }
                        <View style={[style.btnSky, style.pLg]}>
                            <Text style={[style.textWhite]}>Recived from {currentValue.from}</Text>
                            <Text style={[style.textWhite]}>Name: {currentValue.name}</Text>
                            <Text style={[style.textWhite]}>Value: {currentValue.value}</Text>
                        </View>
                    
                    </View>              
                </ScrollView>
                <FlatList
                    data={list}
                    renderItem={({ item }) => renderItem(item) }
                    keyExtractor={item => item.id}
                /> 
        </View>
    )
}

const styles = StyleSheet.create({
    engine: {
      position: 'absolute',
      right: 0,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  });

export default Test;