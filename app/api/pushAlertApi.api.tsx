import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ToastAndroid} from 'react-native';

export const pushAlert = async () => {
  try {
    const id = await AsyncStorage.getItem('id');
    if (!id) {
      console.log('사용자 ID를 찾을 수 없습니다.');
      return null;
    }

    const notificationData = {
      title: '아이 울음 감지',
      body: '아이 상태를 확인해주세요!',
    };

    const response = await axios.post(
      `http://34.47.76.73:3000/push/send/${id}`,
      notificationData,
    );

    console.log(response.data);
    console.log('Title:', notificationData.title);
    console.log('Body:', notificationData.body);

    return notificationData; // Change here to return the notificationData
  } catch (err) {
    console.error('푸시 알림 전송 실패:', err);
  }
};
