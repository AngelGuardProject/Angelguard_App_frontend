import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface AddBreast {
  time: number;
  babyName: string;
}

export const AddBreastFeeding = async ({time, babyName}: AddBreast) => {
  const token = await AsyncStorage.getItem('token');

  axios
    .post(
      'http://34.47.76.73:3000/eat/insertms',
      {
        time: time,
        baby_name: babyName,
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
  babyName: string;
}

export const GetBreastFeeding = async ({setTime, babyName}: PropsType) => {
  const token = await AsyncStorage.getItem('token');

  axios
    .get(`http://34.47.76.73:3000/eat/selectms/${babyName}`, {
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
