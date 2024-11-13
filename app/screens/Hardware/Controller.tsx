import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LiveAudioStream from 'react-native-live-audio-stream';
import {handleMotorOperation} from '../../api/hardware.api';
import {Buffer} from 'buffer';

function Controller() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMotorRunning, setIsMotorRunning] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const isAudioStreaming = useRef(false);

  useEffect(() => {
    return () => {
      stopStreaming();
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const onMobileConnect = async () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 1000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };
  // 모터조작 함수 모터는 처음에는 시작 두번째 누르면 멈춤
  const handleMotorPress = async () => {
    const newMotorState = !isMotorRunning;
    setIsMotorRunning(newMotorState);
    await handleMotorOperation(newMotorState);
  };

  // 스트리밍 관련 함수들
  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: '마이크 권한 요청',
          message: '이 앱이 마이크에 접근하도록 허용해주세요.',
          buttonNeutral: '나중에 묻기',
          buttonNegative: '취소',
          buttonPositive: '확인',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const startStreaming = async () => {
    try {
      LiveAudioStream.init({
        sampleRate: 44100,
        channels: 1,
        bufferSize: 8192,
        bitsPerSample: 16,
        wavFile: '',
      });

      LiveAudioStream.start();

      LiveAudioStream.on('data', (data: string) => {
        if (
          ws.current &&
          ws.current.readyState === WebSocket.OPEN &&
          isAudioStreaming.current
        ) {
          try {
            const audioBuffer = Buffer.from(data, 'base64');
            const littleEndianData = Buffer.from(audioBuffer.buffer);
            ws.current.send(littleEndianData);
          } catch (error) {
            console.error('오디오 데이터 전송 중 오류 발생:', error);
            Alert.alert('오류', '오디오 데이터 전송 중 오류가 발생했습니다.');
          }
        }
      });

      console.log('오디오 스트리밍이 시작되었습니다.');
    } catch (error) {
      console.error('오디오 스트림 시작 중 오류 발생:', error);
      Alert.alert('오류', '오디오 스트림 시작 중 오류가 발생했습니다.');
    }
  };

  const stopStreaming = async () => {
    try {
      await LiveAudioStream.stop();
      console.log('오디오 스트리밍이 중지되었습니다.');
      setIsStreaming(false);
      isAudioStreaming.current = false;
    } catch (error) {
      console.error('오디오 스트림 중지 중 오류 발생:', error);
    }
  };

  const handleAudioPressIn = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      Alert.alert(
        '권한 필요',
        '마이크 권한이 거부되었습니다. 설정에서 권한을 확인하세요.',
      );
      return;
    }

    ws.current = new WebSocket('ws://louk342.iptime.org:3020');

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
      isAudioStreaming.current = true;
      startStreaming();
      setIsStreaming(true);
    };

    ws.current.onclose = () => {
      console.log('연결이 종료되었습니다.');
      isAudioStreaming.current = false;
    };

    ws.current.onerror = error => {
      console.error('WebSocket error:', error.message);
      Alert.alert('WebSocket 오류', 'WebSocket 연결 중 오류가 발생했습니다.');
    };

    ws.current.onmessage = message => {
      console.log('음성 보내는 중');
    };
  };

  const handleAudioPressOut = async () => {
    if (ws.current) {
      ws.current.close();
      console.log('스트리밍 중단');
    }
    await stopStreaming();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>우리 아이 모빌 등록하기</Text>
          <View style={styles.subTextContainer}>
            <Text style={styles.subText}>
              이곳에서 모빌을 등록하고, 모빌을 움직이고 아이에게 음성을 전달할
              수 있어요.
            </Text>
          </View>
        </View>
        <View style={styles.connectContainer}>
          <Text style={styles.connectTitle}>Baby Mobile Connect</Text>
          <View style={styles.connectBox}>
            {isConnecting ? (
              <>
                <Text style={styles.connectingText}>연결 중 입니다...</Text>
                <ActivityIndicator size="large" color="#000000" />
              </>
            ) : isConnected ? (
              <>
                <Text style={styles.connectStatus}>
                  연결된 모빌: AngelGuard
                  {'\n'} UUID: 0 {'\n'} 연결된 날짜: 2024-10-17
                </Text>
                <TouchableOpacity
                  style={styles.connectButton}
                  onPress={handleDisconnect}>
                  <Text style={styles.connectButtonText}>Disconnect</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.connectStatus}>
                  연결된 모빌이 없습니다.
                </Text>
                <TouchableOpacity
                  style={styles.connectButton}
                  onPress={onMobileConnect}>
                  <Text style={styles.connectButtonText}>Connect</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.iconBox}>
            <Text style={styles.iconText}>Mobile</Text>
            <TouchableOpacity
              style={styles.iconTouchable}
              onPress={handleMotorPress}>
              <Image
                style={styles.iconImage}
                source={require('../../assets/images/icons/BabyMobile.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconBox}>
            <Text style={styles.iconText}>Voice</Text>
            <TouchableOpacity
              style={styles.iconTouchable}
              onPressIn={handleAudioPressIn}
              onPressOut={handleAudioPressOut}>
              <Image
                style={styles.iconImage}
                source={require('../../assets/images/icons/microphone.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  header: {
    width: '90%',
    marginTop: 30,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    fontFamily: 'SUITE',
  },
  subTextContainer: {
    marginTop: 12,
  },
  subText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#666662',
    fontFamily: 'SUITE',
  },
  connectContainer: {width: '90%', marginBottom: 15},
  connectTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333333',
    marginBottom: 18,
    fontFamily: 'SUITE',
  },
  connectBox: {
    width: '100%',
    height: height * 0.4,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectingText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    marginBottom: 50,
    fontFamily: 'SUITE',
  },
  connectStatus: {
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 16,
    color: '#a6a6a6a6',
    marginBottom: 21,
    fontFamily: 'SUITE',
    lineHeight: 25,
  },
  connectButtonContainer: {
    alignItems: 'center',
  },
  connectButton: {
    alignItems: 'center',
    width: 160,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: '#FFEDCC',
    borderRadius: 10,
  },
  connectButtonText: {
    fontSize: 16,
    color: '#666662',
    fontWeight: '600',
    fontFamily: 'SUITE',
  },
  iconContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '300',
    marginBottom: 8,
    fontFamily: 'SUITE',
    textAlign: 'left',
  },
  iconBox: {
    width: '50%',
    height: height * 0.2,
  },
  iconTouchable: {
    width: '95%',
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  iconImage: {
    width: 100,
    height: 100,
  },
});

export default Controller;
