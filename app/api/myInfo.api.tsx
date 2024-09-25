import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface PropsType {
  setName: (name: string) => void;
  setId: (id: string) => void;
}

export const getMyInfo = async ({setName, setId}: PropsType) => {
  const id = await AsyncStorage.getItem('id');
  const token = await AsyncStorage.getItem('token');
  console.log(id);
  axios
    .get(`http://louk342.iptime.org:3000/user/myprofile/${id}`, {
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
