import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp} from '@react-navigation/native';
import axios from 'axios';
import {ToastAndroid} from 'react-native';

interface PropsType {
  setIntake: (babyInfo: getIntake) => void;
  babyName: string;
}

interface Intake {
  intake: number;
  babyName: string;
  navigation: {
    navigate: (name: string) => void;
  };
}

export const IntakeHandler = async ({intake, babyName, navigation}: Intake) => {
  const token = await AsyncStorage.getItem('token');
  axios
    .post(
      'http://34.47.76.73:3000/eat/babyeating',
      {
        amount: intake,
        baby_name: babyName,
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
        navigation.navigate('Main');
      }
    })
    .catch(err => {
      console.log(err);
      if (err.status == 403) {
        ToastAndroid.show('입력에 실패했습니다.', ToastAndroid.SHORT);
      }
    });
};

export const GetIntake = async ({setIntake, babyName}: PropsType) => {
  const token = await AsyncStorage.getItem('token');

  axios
    .get(`http://34.47.76.73:3000/eat/selecteat/${babyName}`, {
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
