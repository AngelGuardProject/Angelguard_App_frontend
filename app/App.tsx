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
import BabyList from './screens/Information/BabyList';
import Amount from './screens/FeedingRecord/Amount';
import MyInfo from './screens/Information/MyInfo';
import BabyInfo from './screens/Information/BabyInfo';
import AddBaby from './screens/Information/AddBaby';

type RemoteMessageData = {
  title: string;
  body: string;
};

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      } else {
        console.warn('Permission not granted');
      }
    };

    const createNotificationChannel = () => {
      PushNotification.createChannel(
        {
          channelId: 'angel-guard-channel',
          channelName: 'Angel Guard Channel',
          channelDescription: 'A channel for Angel Guard notifications',
          playSound: true,
          soundName: 'default',
          importance: Importance.HIGH,
          vibrate: true,
        },
        created => console.log(`createChannel returned '${created}'`),
      );
    };

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification) {
        Alert.alert('새 알림!', remoteMessage.notification.body);
      } else {
        const data = remoteMessage.data as RemoteMessageData;
        PushNotification.localNotification({
          channelId: 'angel-guard-channel',
          title: data.title,
          message: data.body,
          playSound: true,
          soundName: 'default',
        });
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage.data);
      const data = remoteMessage.data as RemoteMessageData;

      PushNotification.localNotification({
        channelId: 'angel-guard-channel',
        title: data.title,
        message: data.body,
        playSound: true,
        soundName: 'default',
        priority: 'high',
        smallIcon: 'ic_notification',
      });
    });

    requestUserPermission();
    createNotificationChannel();
    return unsubscribe;
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
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DiaryList"
          component={DiaryList}
          options={{
            headerShown: true,
            title: '육아일지',
            headerTitleAlign: 'center',
            headerStyle: {
              height: 45,
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontSize: 14,
              fontWeight: 'regular',
            },
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
          name="Amount"
          component={Amount}
          options={{
            headerShown: true,
            title: '유축량 입력',
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <Image
                  style={{width: 9, height: 17, marginLeft: 24}}
                  source={require('../app/assets/images/icons/LeftArrow.png')}
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
                  source={require('../app/assets/images/icons/LeftArrow.png')}
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
                  source={require('../app/assets/images/icons/LeftArrow.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="BabyList"
          component={BabyList}
          options={{
            headerShown: true,
            title: '아이 정보',
            headerTitleAlign: 'left',
            headerStyle: {
              height: 45,
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontSize: 14,
              fontWeight: 'regular',
            },
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <Image
                  style={{width: 9, height: 17, marginLeft: 24}}
                  source={require('../app/assets/images/icons/LeftArrow.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="MyInfo"
          component={MyInfo}
          options={{
            headerShown: true,
            title: '내 정보',
            headerTitleAlign: 'left',
            headerStyle: {
              height: 45,
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontSize: 14,
              fontWeight: 'regular',
            },
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <Image
                  style={{width: 9, height: 17, marginLeft: 24}}
                  source={require('../app/assets/images/icons/LeftArrow.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="BabyInfo"
          component={BabyInfo}
          options={{
            headerShown: true,
            title: '아이 정보',
            headerTitleAlign: 'left',
            headerStyle: {
              height: 45,
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontSize: 14,
              fontWeight: 'regular',
            },
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <Image
                  style={{width: 9, height: 17, marginLeft: 24}}
                  source={require('../app/assets/images/icons/LeftArrow.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="AddBaby"
          component={AddBaby}
          options={{
            headerShown: true,
            title: '아이 추가',
            headerTitleAlign: 'left',
            headerStyle: {
              height: 45,
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontSize: 14,
              fontWeight: 'regular',
            },
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <Image
                  style={{width: 9, height: 17, marginLeft: 24}}
                  source={require('../app/assets/images/icons/LeftArrow.png')}
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
