import {Alert} from 'react-native';
export const handleMotorOperation = async (isRunning: boolean) => {
  const motorState = isRunning ? 1 : 0;
  try {
    const response = await fetch('http://louk342.iptime.org:3010/moter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uuid: 0,
        moter: motorState,
      }),
    });

    if (response.ok) {
      const message = isRunning
        ? '모빌 작동을 시작합니다.'
        : '모빌 작동을 멈춥니다.';
      Alert.alert('모빌 작동', message);
    } else {
      console.log('Response Status:', response.status);
      const errorResponse = await response.text();
      console.error('Error Response:', errorResponse);
    }
  } catch (error) {
    Alert.alert('Error', '잠시 모터가 작동이 안됩니다.');
    console.error('Error:', error);
  }
};
