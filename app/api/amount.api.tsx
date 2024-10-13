import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface PropsType {
  setAmount: (babyInfo: getAmount) => void;
}

export const AddAmount = async (feedAmount: number) => {
  const token = await AsyncStorage.getItem('token');
  console.log(feedAmount);
  axios
    .post(
      'http://34.47.76.73:3000/eat/pumping',
      {
        intake: feedAmount,
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

export const GetAmount = async ({setAmount}: PropsType) => {
  const token = await AsyncStorage.getItem('token');
  const baby_name = 'hayoung';
  axios
    .get(`http://34.47.76.73:3000/eat/selectpum/${baby_name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setAmount(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
