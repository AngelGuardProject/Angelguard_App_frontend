import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ToastAndroid} from 'react-native';

interface PropsType {
  setIntake: (babyInfo: getIntake) => void;
}

export const IntakeHandler = async (amount: number) => {
  console.log(amount);
  const token = await AsyncStorage.getItem('token');
  axios
    .post(
      'http://34.47.76.73:3000/eat/babyeating',
      {
        amount: amount,
        baby_name: 'hayoung',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
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

export const GetIntake = async ({setIntake}: PropsType) => {
  const token = await AsyncStorage.getItem('token');
  const baby_name = 'hayoung';

  axios
    .get(`http://34.47.76.73:3000/eat/selecteat/${baby_name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setIntake(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
