import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
interface PropsType {
  setBabies: (babies: Baby[]) => void;
}

export const getBabyInfo = async ({setBabies}: PropsType) => {
  const id = await AsyncStorage.getItem('id');
  const token = await AsyncStorage.getItem('token');

  axios
    .get(`http://louk342.iptime.org:3000/mypage/baby/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      console.log(res.data.babies);
      setBabies(res.data.babies);
    });
};

interface addBaby {
  name: String;
  sex: String;
  height: String;
  weight: String;
  birth: String;
}

export const addBaby = async ({name, sex, height, weight, birth}: addBaby) => {
  const id = await AsyncStorage.getItem('id');

  axios
    .post('http://louk342.iptime.org:3000/mypage/babycreate', {
      user_login_id: id,
      baby_sex: sex,
      baby_birth: birth,
      baby_weight: weight,
      baby_height: height,
      baby_name: name,
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
