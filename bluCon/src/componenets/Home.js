import React from 'react';
import { 
    View, 
    Text,
    ScrollView, 
    TouchableOpacity, 
    NativeModules,
    NativeEventEmitter,  
    PermissionsAndroid,
    Platform
} from 'react-native';
import style from '../css/style';
import InfoModal from '../libs/InfoModal'
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Home = (props)=> {
    const [visibleModal, showModal] = React.useState(false);
    const [layout, setLayout] = React.useState(null);
    const [isScanning, setIsScanning] = React.useState(false);
    const peripherals = new Map();
    const [list, setList] = React.useState([]);

    const startScan = () => {
        if (!isScanning) {
          BleManager.scan([], 3, true).then((results) => {
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
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    }
    
    const retrieveConnected = () => {
        BleManager.getConnectedPeripherals([]).then((results) => {
          if (results.length == 0) {
            console.log('No connected peripherals')
          }
          console.log(results);
          for (var i = 0; i < results.length; i++) {
            var peripheral = results[i];
            peripheral.connected = true;
            peripherals.set(peripheral.id, peripheral);
            setList(Array.from(peripherals.values()));
          }
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
    
    const testPeripheral = (peripheral) => {
    if (peripheral){
        if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
        }else{
        BleManager.connect(peripheral.id).then(() => {
            let p = peripherals.get(peripheral.id);
            if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            setList(Array.from(peripherals.values()));
            }
            console.log('Connected to ' + peripheral.id);


            setTimeout(() => {

            /* Test read current RSSI value */
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
                console.log('Retrieved peripheral services', peripheralData);

                BleManager.readRSSI(peripheral.id).then((rssi) => {
                console.log('Retrieved actual RSSI value', rssi);
                let p = peripherals.get(peripheral.id);
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

       // BleManager.start({showAlert: false});

        // bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
        // bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
        // bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
        // bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

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
            // bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
            // bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan );
            // bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
            // bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
        })
    }, []);

    const renderItem = (item) => {
        const color = item.connected ? 'green' : '#fff';
        return (
          <TouchableHighlight onPress={() => testPeripheral(item) }>
            <View style={[style.row, {backgroundColor: color}]}>
              <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
              <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
              <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
            </View>
          </TouchableHighlight>
        );
      }

    const renderDevices = ()=> {
        return (
            <View>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                >
                    {global.HermesInternal == null ? null : (
                        <View style={styles.engine}>
                        <Text style={styles.footer}>Engine: Hermes</Text>
                        </View>
                    )}
                    <View style={styles.body}>
                        
                        <View style={{margin: 10}}>
                        <Button 
                            title={'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}
                            onPress={() => startScan() } 
                        />            
                        </View>

                        <View style={{margin: 10}}>
                        <Button title="Retrieve connected peripherals" onPress={() => retrieveConnected() } />
                        </View>

                        {(list.length == 0) &&
                        <View style={{flex:1, margin: 20}}>
                            <Text style={{textAlign: 'center'}}>No peripherals</Text>
                        </View>
                        }
                    
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
 
    const getLayout = ()=> {
        switch(layout) {
            default: return null;
        }
    }

    return(
        <View style={[style.center]}>
            {renderDevices()}
            <InfoModal isVisible={visibleModal} external={true}>
                {getLayout()}
            </InfoModal> 
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
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

export default Home;