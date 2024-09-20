import axios from 'axios';
import {ToastAndroid} from 'react-native';

export const IntakeHandler = (
  amount: number,
  name: string,
  navigation: {navigate: (name: string) => void},
) => {
  console.log(amount, name);
  axios
    .post('http://louk342.iptime.org:3000/eat/babyeating', {
      intake_amount: amount,
      baby_name: name,
    })
    .then(res => {
      if (res.status == 200) {
        console.log('성공');
      }
    })
    .catch(err => {
      console.log(err);
      if (err.status == 403) {
        ToastAndroid.show('입력에 실패했습니다.', ToastAndroid.SHORT);
      }
    });
};
