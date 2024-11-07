import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface PropsType {
  setAmount: (babyInfo: getAmount) => void;
  babyName: string;
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

export const GetAmount = async ({setAmount, babyName}: PropsType) => {
  const token = await AsyncStorage.getItem('token');
  axios
    .get(`http://34.47.76.73:3000/eat/selectpum/${babyName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      console.log(res.data);
      setAmount(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
