import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AddBreastFeeding = async (time: number) => {
  const token = await AsyncStorage.getItem('token');

  axios
    .post(
      'http://34.47.76.73:3000/eat/insertms',
      {
        time: time,
        baby_name: 'hayoung',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

interface PropsType {
  setTime: (babInfo: GetTime) => void;
}

export const GetBreastFeeding = async ({setTime}: PropsType) => {
  const baby_name = 'hayoung';
  const token = await AsyncStorage.getItem('token');

  axios
    .get(`http://34.47.76.73:3000/eat/selectms/${baby_name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setTime(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
