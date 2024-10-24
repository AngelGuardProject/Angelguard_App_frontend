import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DiaryWrite from './screens/Diary/DiaryWrite';
import DiaryDetail from './screens/Diary/DiaryDetail';
import DiaryList from './screens/Diary/DiaryList';
import DrawerNavigator from './DrawerNavigator';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import BreastFeeding from './screens/FeedingRecord/BreastFeeding';
import Intake from './screens/FeedingRecord/Intake';
import {Alert, Image, TouchableOpacity} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';

// 1. RemoteMessageData 타입 정의
type RemoteMessageData = {
  title: string; // 알림의 제목
  body: string; // 알림의 내용
};

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    // 사용자 권한 요청 함수
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission(); // 권한 요청
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL; // 권한 상태 확인

      if (enabled) {
        console.log('Authorization status:', authStatus); // 권한 부여 상태 로그
      } else {
        console.warn('Permission not granted'); // 권한이 거부된 경우 경고
      }
    };

    // 알림 채널 생성 함수
    const createNotificationChannel = () => {
      PushNotification.createChannel(
        {
          channelId: 'angel-guard-channel', // 채널 ID
          channelName: 'Angel Guard Channel', // 채널 이름
          channelDescription: 'A channel for Angel Guard notifications', // 채널 설명
          playSound: true, // 소리 재생 여부
          soundName: 'default', // 기본 소리 사용
          importance: Importance.HIGH, // 중요도 설정
          vibrate: true, // 진동 여부
        },
        created => console.log(`createChannel returned '${created}'`), // 채널 생성 결과 로그
      );
    };

    // 메시지 수신 대기
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // 포그라운드에서 수신한 메시지 처리
      if (remoteMessage.notification) {
        Alert.alert('새 알림!', remoteMessage.notification.body); // 알림 표시
      } else {
        const data = remoteMessage.data as RemoteMessageData; // 데이터 타입 캐스팅
        PushNotification.localNotification({
          channelId: 'angel-guard-channel', // 채널 ID
          title: data.title, // 알림 제목
          message: data.body, // 알림 내용
          playSound: true, // 소리 재생 여부
          soundName: 'default', // 기본 소리 사용
        });
      }
    });
    // 백그라운드 메시지 처리
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage.data); // 백그라운드에서 처리된 메시지 로그
      const data = remoteMessage.data as RemoteMessageData; // 데이터 타입 캐스팅

      PushNotification.localNotification({
        channelId: 'angel-guard-channel', // 채널 ID
        title: data.title, // 알림 제목
        message: data.body, // 알림 내용
        playSound: true, // 소리 재생 여부
        soundName: 'default', // 기본 소리 사용
        priority: 'high',
        smallIcon: 'ic_notification',
      });
    });

    requestUserPermission(); // 사용자 권한 요청
    createNotificationChannel(); // 알림 채널 생성
    return unsubscribe; // 언섭스크라이브 반환
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{headerShown: false}}>
          {props => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DiaryList"
          component={DiaryList}
          options={{
            headerShown: true,
            title: '육아일지',
            headerTitleAlign: 'center',
            headerStyle: {height: 45},
            headerTintColor: 'black',
            headerTitleStyle: {fontSize: 14, fontWeight: 'regular'},
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="DiaryWrite"
          component={DiaryWrite}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DiaryDetail"
          component={DiaryDetail}
          options={{
            headerShown: true,
            title: '육아일지',
            headerTitleAlign: 'center',
            headerStyle: {height: 45},
            headerTintColor: 'black',
            headerTitleStyle: {fontSize: 14, fontWeight: 'regular'},
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <Image
                  style={{width: 9, height: 17, marginLeft: 24}}
                  source={require('./assets/images/icons/LeftArrow.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="BreastFeeding"
          component={BreastFeeding}
          options={{
            headerShown: true,
            title: '모유 수유량 입력',
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <Image
                  style={{width: 9, height: 17, marginLeft: 24}}
                  source={require('./assets/images/icons/LeftArrow.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Intake"
          component={Intake}
          options={{
            headerShown: true,
            title: '섭취량 입력',
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <Image
                  style={{width: 9, height: 17, marginLeft: 24}}
                  source={require('./assets/images/icons/LeftArrow.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
