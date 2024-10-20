import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ToastAndroid} from 'react-native';

interface PropsType {
  setName: (name: string) => void;
  setId: (id: string) => void;
}

export const getMyInfo = async ({setName, setId}: PropsType) => {
  const id = await AsyncStorage.getItem('id');
  const token = await AsyncStorage.getItem('token');

  axios
    .get(`http://34.47.76.73:3000/user/myprofile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setName(res.data.data.user_nickname);
      setId(res.data.data.user_login_id);
    })
    .catch(err => console.log(err));
};

interface myInfo {
  pw: string;
  name: string;
  id: string;
}

export const editMyInfo = async ({pw, name, id}: myInfo) => {
  const token = await AsyncStorage.getItem('token');

  axios
    .post(
      `http://34.47.76.73:3000/user/update/${id}`,
      {pw: pw, username: name},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(res => {
      ToastAndroid.show('내 정보를 수정하였습니다.', ToastAndroid.SHORT);
    })
    .catch(err => {
      console.log(err);
      ToastAndroid.show('오류가 발생했습니다.', ToastAndroid.SHORT);
    });
};
