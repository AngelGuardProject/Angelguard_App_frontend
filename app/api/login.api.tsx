import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ToastAndroid} from 'react-native';

export const LoginHandler = (
  id: string,
  pw: string,
  navigation: {navigate: (name: string) => void},
) => {
  console.log(id, pw);
  axios
    .post('http://louk342.iptime.org:3000/user/login', {
      user_login_id: id,
      pw: pw,
    })
    .then(async res => {
      if (res.status == 200) {
        await AsyncStorage.setItem('token', res.data.token);
        await AsyncStorage.setItem('id', res.data.data.user_login_id);
        navigation.navigate('Main');
      }
    })
    .catch(err => {
      if (err.status == 405) {
        ToastAndroid.show('사용자를 찾을 수 없습니다.', ToastAndroid.SHORT);
      }
      if (err.status == 406) {
        ToastAndroid.show('비밀번호가 일치하지 않습니다.', ToastAndroid.SHORT);
      }
      if (err.status == 403) {
        ToastAndroid.show('정보를 모두 입력해주세요.', ToastAndroid.SHORT);
      }
      if (err.status == 500) {
        ToastAndroid.show('에러가 발생했습니다.', ToastAndroid.SHORT);
      }
    });
};
