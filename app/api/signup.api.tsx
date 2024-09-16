import axios from 'axios';
import {ToastAndroid} from 'react-native';

export const SignUpHandler = (
  username: string,
  user_login_id: string,
  pw: string,
  navigation: {navigate: (name: string) => void},
) => {
  axios
    .post('http://louk342.iptime.org:3000/user/signUp', {
      username: username,
      user_login_id: user_login_id,
      pw: pw,
    })
    .then(res => {
      if (res.status === 200) {
        navigation.navigate('Login');
      }
    })
    .catch(err => {
      if (err.status == 402) {
        ToastAndroid.show('이미 존재하는 아이디입니다.', ToastAndroid.SHORT);
      }
      if (err.status == 403) {
        ToastAndroid.show('정보를 모두 입력해주세요.', ToastAndroid.SHORT);
      }
    });
};
