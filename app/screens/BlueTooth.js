/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * https://github.com/innoveit/react-native-ble-manager
 * https://blog.logrocket.com/using-react-native-ble-manager-mobile-app/
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  Text,
  TextInput,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
  Button,
} from 'react-native';
import BleManager, {Peripheral} from 'react-native-ble-manager';
import {Buffer} from 'buffer';

let serviceid = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
let caracid = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

const BluetoothBLETerminal = () => {
  const [devices, setDevices] = useState([]);
  const [paired, setPaired] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState();
  const [messageToSend, setMessageToSend] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [intervalId, setIntervalId] = useState();
  const [isScanning, setIsScanning] = useState(false);

  //휴대폰 기기 내 블루투스 기능이 켜져있는지 확인
  const checkBluetoothEnabled = async () => {
    try {
      BleManager.enableBluetooth().then(() => {
        console.log('블루투스가 연결되어있습니다.');
      });
    } catch (error) {
      console.error('블루투스가 켜져있지 않습니다. ');
    }
  };

  //스캔 진행
  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 5, true)
        .then(() => {
          console.log('Scanning...');
          setIsScanning(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  //현재 연결 가능한 기기 스캔
  const handleGetConnectedDevices = () => {
    BleManager.getDiscoveredPeripherals().then(results => {
      if (results.length == 0) {
        console.log('현재 연결 가능한 기기가 없습니다. ');
        startScan();
      } else {
        const allDevices = results.filter(item => item.name !== null);
        console.log(allDevices); // 연결 가능한 모든 기기를 콘솔에 찍음
        setDevices(allDevices);
      }
    });
  };

  //현재 휴대폰에 등록되어있는 블루투스 기기 검색하여 가져옴
  const startDeviceDiscovery = async () => {
    BleManager.getBondedPeripherals().then(results => {
      console.log('Bonded peripherals: ' + results.length);
      console.log(results); // 휴대폰에 등록되어있는 기기 정보를 콘솔에 찍음
      setPaired(results);
    });
  };

  //휴대폰에 기기를 연결
  const connectToDevice = async device => {
    console.log(device);

    try {
      await BleManager.connect(device.id);
      console.log('Connected');
      setSelectedDevice(device);
      setIsConnected(true);

      const deviceInfo = BleManager.retrieveServices(device.id);
      console.log('Device info:', deviceInfo);
    } catch (err) {
      console.log('Connection error:', err);
    }
  };

  // 연결되어있는 기기 && 선택되어있는 기기에 값 전송하기
  const sendMessage = async () => {
    if (selectedDevice && isConnected) {
      try {
        const buffer = Buffer.from(messageToSend);
        BleManager.write(
          selectedDevice.id,
          serviceid,
          caracid,
          buffer.toJSON().data,
        )
          .then(() => {
            // Success code
            console.log('Write: ' + buffer.toJSON().data);
          })
          .catch(error => {
            // Failure code
            console.log(error);
          });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // 데이터 읽기
  const readData = async () => {
    if (selectedDevice && isConnected) {
      BleManager.read(selectedDevice.id, serviceid, caracid)
        .then(readData => {
          // Success code
          console.log('Read: ' + readData);
          const message = Buffer.from(readData);
          //const sensorData = buffer.readUInt8(1, true);
          if (receivedMessage.length > 300) {
            setReceivedMessage('');
          }
          setReceivedMessage(
            receivedMessage => receivedMessage + message + '\n',
          );
          console.log('receivedMessage length', receivedMessage.length);
        })
        .catch(error => {
          // Failure code
          console.log('Error reading message:', error);
        });
    }
  };

  // 휴대폰에서 기기를 연결 해제
  const disconnectFromDevice = device => {
    BleManager.disconnect(device.id)
      .then(() => {
        setSelectedDevice(undefined);
        setIsConnected(false);
        setReceivedMessage('');
        clearInterval(intervalId);
        console.log('Disconnected from device');
      })
      .catch(error => {
        // Failure code
        console.log('Error disconnecting:', error);
      });
  };

  useEffect(() => {
    checkBluetoothEnabled();

    //안드로이드 휴대폰 권한 허가
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, // 스캔 권한
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT, // 연결 권한
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, //위치 권한
      ]).then(result => {
        if (
          (result['android.permission.BLUETOOTH_SCAN'] &&
            result['android.permission.BLUETOOTH_CONNECT'] &&
            result['android.permission.ACCESS_FINE_LOCATION'] === 'granted') ||
          (result['android.permission.BLUETOOTH_SCAN'] &&
            result['android.permission.BLUETOOTH_CONNECT'] &&
            result['android.permission.ACCESS_FINE_LOCATION'] ===
              'never_ask_again')
        ) {
          console.log('User accepted');
        } else {
          console.log('User refused');
        }
      });
    }

    BleManager.start({showAlert: false})
      .then(() => {
        console.log('BleManager 초기화');
        startDeviceDiscovery();
        handleGetConnectedDevices();
      })
      .catch(error => {
        // Failure code
        console.log('BLE manager 초기화 실패:', error);
      });

    BleManager.checkState().then(state =>
      console.log(`current BLE state = '${state}'.`),
    );

    BleManager.getConnectedPeripherals([]).then(peripheralsArray => {
      // Success code
      console.log('Connected peripherals: ' + peripheralsArray.length);
    });

    BleManager.getBondedPeripherals().then(bondedPeripheralsArray => {
      // Each peripheral in returned array will have id and name properties
      console.log('Bonded peripherals: ' + bondedPeripheralsArray.length);
      //setBoundedDevices(bondedPeripheralsArray);
    });

    BleManager.getDiscoveredPeripherals().then(peripheralsArray => {
      // Success code
      console.log('Discovered peripherals: ' + peripheralsArray.length);
    });

    return () => {};
  }, []);

  return (
    <View style={[styles.mainBody]}>
      <Text
        style={{
          fontSize: 30,
          textAlign: 'center',
          borderBottomWidth: 1,
        }}>
        AC BLE Terminal
      </Text>
      <ScrollView>
        {!isConnected && (
          <>
            <TouchableOpacity
              onPress={() => {
                handleGetConnectedDevices();
              }}
              style={[styles.deviceButton]}>
              <Text style={[styles.scanButtonText]}>SCAN</Text>
            </TouchableOpacity>

            <Text style={{margin: 10}}>현재 주변 연결 가능한 기기 :</Text>
            {devices.map((device, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 2,
                }}>
                <View style={styles.deviceItem}>
                  <Text style={styles.deviceName}>{device.name}</Text>
                  <Text style={styles.deviceInfo}>
                    {device.id}, rssi: {device.rssi}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    isConnected
                      ? disconnectFromDevice(device)
                      : connectToDevice(device)
                  }
                  style={styles.deviceButton}>
                  <Text
                    style={[
                      styles.scanButtonText,
                      {fontWeight: 'bold', fontSize: 12},
                    ]}>
                    {isConnected ? 'Disconnect' : 'Connect'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

            <Text style={{margin: 10}}>휴대폰에 등록되어있는 기기 :</Text>
            {paired.map((pair, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 2,
                }}>
                <View style={styles.deviceItem}>
                  <Text style={styles.deviceName}>{pair.name}</Text>
                  <Text style={styles.deviceInfo}>
                    {pair.id}, rssi: {pair.rssi}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    isConnected
                      ? disconnectFromDevice(pair)
                      : connectToDevice(pair)
                  }
                  style={styles.deviceButton}>
                  <Text
                    style={[
                      styles.scanButtonText,
                      {fontWeight: 'bold', fontSize: 12},
                    ]}>
                    {isConnected ? 'Disconnect' : 'Connect'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
        {selectedDevice && isConnected && (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <View style={styles.deviceItem}>
                <Text style={styles.deviceName}>{selectedDevice.name}</Text>
                <Text style={styles.deviceInfo}>
                  {selectedDevice.id}, rssi: {selectedDevice.rssi}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  isConnected
                    ? disconnectFromDevice(selectedDevice)
                    : connectToDevice(selectedDevice)
                }
                style={styles.deviceButton}>
                <Text style={styles.scanButtonText}>
                  {isConnected ? 'Disconnect' : 'Connect'}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <TextInput
                style={{
                  backgroundColor: '#888888',
                  margin: 2,
                  borderRadius: 15,
                  flex: 3,
                }}
                placeholder="Enter a message"
                value={messageToSend}
                onChangeText={text => setMessageToSend(text)}
              />
              <TouchableOpacity
                onPress={() => sendMessage()}
                style={[styles.sendButton]}>
                <Text style={[styles.scanButtonText]}>SEND</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <Text style={{textAlignVertical: 'center'}}>
                Received Message:
              </Text>
              <TouchableOpacity
                onPress={() => readData()}
                style={[styles.deviceButton]}>
                <Text style={[styles.scanButtonText]}>READ</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              editable={false}
              multiline
              numberOfLines={20}
              maxLength={300}
              style={{
                backgroundColor: '#333333',
                margin: 10,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: '#EEEEEE',
                textAlignVertical: 'top',
              }}>
              {receivedMessage}
            </TextInput>
          </>
        )}
      </ScrollView>
    </View>
  );
}; //end of component

//https://medium.com/supercharges-mobile-product-guide/reactive-styles-in-react-native-79a41fbdc404
export const theme = {
  smallPhone: 0,
  phone: 290,
  tablet: 750,
};

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    height: windowHeight,

    ...Platform.select({
      ios: {
        fontFamily: 'Arial',
      },

      android: {
        fontFamily: 'Roboto',
      },
    }),
  },

  scanButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  noDevicesText: {
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  deviceItem: {
    marginBottom: 2,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  deviceInfo: {
    fontSize: 8,
  },
  deviceButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
    margin: 2,
    paddingHorizontal: 20,
  },
  sendButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 15,
    margin: 2,
    paddingHorizontal: 20,
  },
});

export default BluetoothBLETerminal;
