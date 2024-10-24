import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

interface PropsType {
  setBabies?: (babies: Baby[]) => void; // 선택적으로 setBabies를 사용할 수 있도록
}

export const getBabyInfo = async ({setBabies}: PropsType = {}) => {
  const id = await AsyncStorage.getItem('id');
  const token = await AsyncStorage.getItem('token');

  try {
    const res = await axios.get(`http://34.47.76.73:3000/mypage/baby/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (setBabies) {
      setBabies(res.data.babies);
    }

    return res.data.babies; // 아기 정보를 반환
  } catch (error) {
    console.error(error);
    return [];
  }
};

interface AddBabyProps {
  name: string;
  sex: string;
  height: number | null; // Change to number or null
  weight: number | null; // Change to number or null
  birth: string;
  navigation: any;
}

export const addBaby = async ({
  name,
  sex,
  height,
  weight,
  birth,
  navigation,
}: AddBabyProps) => {
  try {
    const id = await AsyncStorage.getItem('id');
    const response = await axios.post(
      'http://34.47.76.73:3000/mypage/babycreate',
      {
        user_login_id: id,
        baby_sex: sex,
        baby_birth: birth,
        baby_weight: weight, // Ensure this is a number
        baby_height: height, // Ensure this is a number
        baby_name: name,
      },
    );

    console.log(response.data);
    navigation.navigate('BabyList');
  } catch (err) {
    console.log(err);
  }
};

interface UpdateBabyProps {
  babyId: number; // ID of the baby to update
  name: string;
  sex: string;
  height: number | null; // Height can be a number or null
  weight: number | null; // Weight can be a number or null
  birth: string;
  navigation: any; // Navigation prop
}

export const updateBaby = async ({
  babyId,
  name,
  sex,
  height,
  weight,
  birth,
  navigation,
}: UpdateBabyProps) => {
  try {
    const userId = await AsyncStorage.getItem('id'); // Get the user ID from AsyncStorage
    const response = await axios.post(
      `http://34.47.76.73:3000/mypage/babyupdate/${userId}/${babyId}`,
      {
        baby_sex: sex,
        baby_birth: birth,
        baby_weight: weight,
        baby_height: height,
        baby_name: name,
      },
    );

    console.log(response.data); // Log the response
    if (response.status === 200) {
      // Navigate back to the BabyList if the update is successful
      navigation.navigate('BabyList');
    } else {
      console.error('Failed to update baby info:', response.data.message);
      // Handle any error messages returned by the server
    }
  } catch (err) {
    console.error('Error updating baby info:', err);
    // Handle the error as needed
  }
};
