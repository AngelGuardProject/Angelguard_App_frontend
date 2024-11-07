import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const createScheduler = async (
  scheduler_content: string,
  scheduler_date: string,
  scheduler_color: string,
) => {
  if (!scheduler_content || !scheduler_date) {
    ToastAndroid.show('스케줄 내용과 날짜를 입력해주세요.', ToastAndroid.SHORT);
    return;
  }

  try {
    const user_login_id = await AsyncStorage.getItem('id');
    if (user_login_id != null) {
      console.log('Creating scheduler with:', {
        scheduler_content,
        scheduler_date,
        scheduler_color,
        user_login_id,
      });

      const response = await fetch(
        `http://34.47.76.73:3000/scheduler/${user_login_id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            scheduler_content,
            scheduler_date,
            user_login_id,
            scheduler_color,
          }),
        },
      );

      const result = await response.json();
      console.log('Create scheduler response:', result);

      if (response.status === 200 && result.result) {
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
        return result;
      } else if (response.status === 400) {
        ToastAndroid.show('값을 입력해 주세요.', ToastAndroid.SHORT);
      } else if (response.status === 403) {
        ToastAndroid.show('실패!! (스케줄 생성 실패)', ToastAndroid.SHORT);
      }
    }
  } catch (error) {
    console.error('Error in createScheduler:', error);
    ToastAndroid.show('일정 등록에 실패했습니다.', ToastAndroid.SHORT);
  }
};

// 특정 날짜 조회
export const fetchEventsForDate = async (scheduler_date: string) => {
  if (!scheduler_date) {
    ToastAndroid.show('날짜를 입력해 주세요.', ToastAndroid.SHORT);
    return {success: false, message: '날짜가 필요합니다.'};
  }

  try {
    const user_login_id = await AsyncStorage.getItem('id');
    if (user_login_id) {
      const response = await fetch(
        `http://34.47.76.73:3000/scheduler/${user_login_id}/${scheduler_date}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const result = await response.json();
      if (response.status === 200 && result.data) {
        return {success: true, data: result.data};
      } else if (response.status === 400) {
        ToastAndroid.show('날짜 형식이 잘못되었습니다.', ToastAndroid.SHORT);
        return {success: false, message: '날짜 형식 오류'};
      } else if (response.status === 403) {
        ToastAndroid.show('해당 날짜에 스케줄이 없습니다.', ToastAndroid.SHORT);
        return {success: false, message: '해당 날짜에 스케줄이 없습니다.'};
      }
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    ToastAndroid.show('일정 조회에 실패했습니다.', ToastAndroid.SHORT);
    return {success: false, message: 'Failed to fetch events.'};
  }
};

// 스케줄 삭제
export const deleteEvent = async (schedulerId: string) => {
  const user_login_id = await AsyncStorage.getItem('id');
  if (!user_login_id) return;

  try {
    console.log('Deleting event with ID:', schedulerId);

    const response = await fetch(
      `http://34.47.76.73:3000/scheduler/${user_login_id}/${schedulerId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();
    console.log('Delete event response:', result);

    if (response.status === 200 && result.result) {
      ToastAndroid.show(result.message, ToastAndroid.SHORT);
      return result;
    } else if (response.status === 400) {
      ToastAndroid.show('스케줄 ID를 찾을 수 없습니다.', ToastAndroid.SHORT);
    } else if (response.status === 403) {
      ToastAndroid.show('스케줄 삭제 실패', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.error('Error in deleteEvent:', error);
    ToastAndroid.show('일정 삭제에 실패했습니다.', ToastAndroid.SHORT);
  }
};

// 스케줄 수정
export const updateScheduler = async (
  schedulerId: string,
  content: string,
  date: string,
  color: string,
) => {
  const user_login_id = await AsyncStorage.getItem('id');
  if (!user_login_id) return;

  try {
    console.log('Updating scheduler with:', {
      schedulerId,
      content,
      date,
      color,
      user_login_id,
    });

    const response = await fetch(
      `http://34.47.76.73:3000/scheduler/${user_login_id}/${schedulerId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scheduler_content: content,
          scheduler_date: date,
          user_login_id,
          scheduler_color: color,
        }),
      },
    );

    const result = await response.json();
    console.log('Update scheduler response:', result);

    if (response.status === 200 && result.result) {
      ToastAndroid.show(result.message, ToastAndroid.SHORT);
    } else if (response.status === 400) {
      ToastAndroid.show('값을 입력해 주세요.', ToastAndroid.SHORT);
    } else if (response.status === 403) {
      ToastAndroid.show('스케줄 수정 실패', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('서버 오류가 발생했습니다.', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.error('Error in updateScheduler:', error);
    ToastAndroid.show('네트워크 오류가 발생했습니다.', ToastAndroid.SHORT);
  }
};
