import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ToastAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const LoginHandler = async (
  id: string,
  pw: string,
  navigation: {navigate: (name: string) => void},
) => {
  console.log(id, pw);

  const fcmToken = await messaging().getToken();

  try {
    const res = await axios.post('http://34.47.76.73:3000/user/login', {
      user_login_id: id,
      pw: pw,
      user_device: fcmToken,
    });

    if (res.status === 200) {
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('fcmToken', fcmToken);
      await AsyncStorage.setItem('id', res.data.data.user_login_id);
      navigation.navigate('Main');
    }
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err) && err.response) {
      // 에러 응답이 있는 경우
      if (err.response.status === 405) {
        ToastAndroid.show('사용자를 찾을 수 없습니다.', ToastAndroid.SHORT);
      }
      if (err.response.status === 406) {
        ToastAndroid.show('비밀번호가 일치하지 않습니다.', ToastAndroid.SHORT);
      }
      if (err.response.status === 403) {
        ToastAndroid.show('정보를 모두 입력해주세요.', ToastAndroid.SHORT);
      }
      if (err.response.status === 500) {
        ToastAndroid.show('에러가 발생했습니다.', ToastAndroid.SHORT);
      }
    } else {
      // Axios 에러가 아닌 경우
      ToastAndroid.show('네트워크 오류가 발생했습니다.', ToastAndroid.SHORT);
    }
  }
};
