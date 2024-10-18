import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import {ScrollView} from 'react-native-gesture-handler';

const Bluetooth = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState();
  const [dataToSend, setDataToSend] = useState('');
  const [isConnected, setIsConnected] = useState('');

  useEffect(() => {
    getBondedDevices();
  }, []);

  //휴대폰에 등록되어있는 블루투스 기기를 가져옴
  const getBondedDevices = async () => {
    try {
      const bondedDevices = await RNBluetoothClassic.getBondedDevices();
      setDevices(bondedDevices);
    } catch (error) {
      console.error('Error getting bonded devices:', error);
    }
  };

  //기기 연결
  const connectToDevice = async device => {
    device
      .connect()
      .then(() => {
        console.log('connected Success');
        console.log(device);
        setConnectedDevice(device);
        setIsConnected(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //기기 연결 끊기
  const disconnectDevice = async () => {
    if (connectedDevice) {
      try {
        await connectedDevice.disconnect();
        setConnectedDevice(null);
        setIsConnected(false);
        console.log('devcies disconnected');
      } catch (error) {
        console.error('Error disconnecting device:', error);
      }
    }
  };

  //데이터 전송
  const sendData = async () => {
    if (connectedDevice && dataToSend) {
      try {
        await connectedDevice
          .write(dataToSend)
          .then(() => {
            console.log('Data sent:', dataToSend);
          })
          .catch(err => {
            console.log(err);
          });
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  };

  return (
    <View style={[styles.mainBody]}>
      <Text
        style={{
          fontSize: 30,
          textAlign: 'center',
          borderBottomWidth: 1,
        }}>
        블루투스 연결하기
      </Text>
      <ScrollView>
        {!isConnected && (
          <>
            <TouchableOpacity
              onPress={() => {
                getBondedDevices();
              }}
              style={[styles.deviceButton]}>
              <Text style={[styles.scanButtonText]}>SCAN</Text>
            </TouchableOpacity>

            <Text style={{margin: 10}}>휴대폰에 등록되어있는 기기 :</Text>
            {devices.map((pair, i) => (
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
                    isConnected ? disconnectDevice() : connectToDevice(pair)
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
        {connectedDevice && isConnected && (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <View style={styles.deviceItem}>
                <Text style={styles.deviceName}>{connectedDevice.name}</Text>
                <Text style={styles.deviceInfo}>
                  {connectedDevice.id}, rssi: {connectedDevice.rssi}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  isConnected
                    ? disconnectDevice()
                    : connectToDevice(connectedDevice)
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
                value={dataToSend}
                onChangeText={text => setDataToSend(text)}
              />
              <TouchableOpacity
                onPress={() => sendData()}
                style={[styles.sendButton]}>
                <Text style={[styles.scanButtonText]}>SEND</Text>
              </TouchableOpacity>
            </View>
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

export default Bluetooth;
