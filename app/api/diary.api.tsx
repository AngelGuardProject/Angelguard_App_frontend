import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useState} from 'react';
import {ToastAndroid} from 'react-native';

interface FormData {
  baby_board_title: string;
  baby_board_content: string;
  baby_board_image: File;
  user_login_id: string;
}
export const createDiary = async (
  title: string,
  content: string,
  selectedImage: any,
  navigation: any,
) => {
  if (!title || !content) {
    ToastAndroid.show('제목과 내용을 입력해주세요.', ToastAndroid.SHORT);
    return;
  }

  try {
    const user_login_id = await AsyncStorage.getItem('id');
    console.log(user_login_id);

    if (user_login_id != null) {
      const formData = new FormData();
      formData.append('baby_board_title', title);
      formData.append('baby_board_content', content);
      formData.append('user_login_id', user_login_id);

      // Check if selectedImage is valid and append it to the form data
      if (selectedImage) {
        formData.append('baby_board_image', {
          uri: selectedImage.uri,
          type: selectedImage.type,
          name: selectedImage.fileName,
        });
      }
      console.log(selectedImage);
      const response = await fetch('http://34.47.76.73:3000/babyboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.status === 201) {
        const result = await response.json();
        navigation.navigate('DiaryList');
        return result;
      } else if (response.status === 403) {
        ToastAndroid.show('서버문제로 실패했습니다.', ToastAndroid.SHORT);
      }
    }
  } catch (error) {
    console.error(error);
    ToastAndroid.show('일기 등록에 실패했습니다.', ToastAndroid.SHORT);
  }
};

export const fetchDiaryList = async (pageNum: number) => {
  try {
    const user_login_id = await AsyncStorage.getItem('id');

    if (!user_login_id) {
      throw new Error('User login ID is not available');
    }

    const response = await fetch(
      `http://34.47.76.73:3000/babyboard/list/${user_login_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else if (response.status === 400) {
      ToastAndroid.show(
        '값을 입력해 주세요. (페이지 번호가 유효하지 않습니다)',
        ToastAndroid.SHORT,
      );
    } else if (response.status === 403) {
      ToastAndroid.show('일지 목록 조회에 실패했습니다.', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('서버 오류가 발생했습니다.', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.error(error);
    ToastAndroid.show('일기 목록 조회에 실패했습니다.', ToastAndroid.SHORT);
  }
};

export const getDiaryDetail = async (babyBoardId: string) => {
  try {
    const response = await fetch(
      `http://34.47.76.73:3000/babyboard/${babyBoardId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else if (response.status === 403) {
      ToastAndroid.show('일지 ID 조회 실패', ToastAndroid.SHORT);
      console.log(response.json);
    } else {
      ToastAndroid.show('서버 오류가 발생했습니다.', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.error(error);
    ToastAndroid.show('일지 조회에 실패했습니다.', ToastAndroid.SHORT);
  }
};

export const updateDiary = async (
  diaryId: string,
  title: string,
  content: string,
  selectedImage: any,
  navigation: any,
) => {
  if (!title || !content) {
    ToastAndroid.show('제목과 내용을 입력해주세요.', ToastAndroid.SHORT);
    return;
  }

  try {
    const user_login_id = await AsyncStorage.getItem('id');
    console.log(user_login_id);

    if (user_login_id != null) {
      const formData = new FormData();
      formData.append('baby_board_title', title);
      formData.append('baby_board_content', content);
      formData.append('user_login_id', user_login_id);

      if (selectedImage) {
        formData.append('baby_board_image', {
          uri: selectedImage.uri,
          type: selectedImage.type,
          name: selectedImage.fileName,
        });
      }

      const response = await fetch(
        `http://34.47.76.73:3000/babyboard/${diaryId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      if (response.status === 200) {
        const result = await response.json();
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
        navigation.navigate('DiaryDetail', {diaryId}); // Navigate to the Detail screen after update
        return result;
      } else if (response.status === 403) {
        ToastAndroid.show('서버문제로 실패했습니다.', ToastAndroid.SHORT);
      } else {
        const error = await response.json();
        ToastAndroid.show(
          error.message || '일기 수정에 실패했습니다.',
          ToastAndroid.SHORT,
        );
      }
    }
  } catch (error) {
    console.error(error);
    ToastAndroid.show('일기 수정에 실패했습니다.', ToastAndroid.SHORT);
  }
};

export const deleteDiary = async (diaryId: string) => {
  try {
    const user_login_id = await AsyncStorage.getItem('id');

    if (user_login_id != null) {
      const response = await fetch(
        `http://34.47.76.73:3000/babyboard/${diaryId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user_login_id}`, // If you have an auth token
          },
        },
      );

      if (response.status === 200) {
        const result = await response.json();
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
        return result;
      } else if (response.status === 403) {
        ToastAndroid.show('서버문제로 실패했습니다.', ToastAndroid.SHORT);
      } else {
        const error = await response.json();
        ToastAndroid.show(
          error.message || '일기 삭제에 실패했습니다.',
          ToastAndroid.SHORT,
        );
      }
    }
  } catch (error) {
    console.error(error);
    ToastAndroid.show('일기 삭제에 실패했습니다.', ToastAndroid.SHORT);
  }
};
