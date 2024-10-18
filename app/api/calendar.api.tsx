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
    console.log(user_login_id);
    if (user_login_id != null) {
      const response = await fetch('http://34.47.76.73:3000/scheduler', {
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
      });

      if (response.status === 200) {
        const result = await response.json();
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
        return result;
      } else if (response.status === 400) {
        const error = await response.json();
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      } else if (response.status === 403) {
        ToastAndroid.show('서버문제로 실패했습니다.', ToastAndroid.SHORT);
      }
    }
  } catch (error) {
    console.error(error);
    ToastAndroid.show('일정 등록에 실패했습니다.', ToastAndroid.SHORT);
  }
};

//특정 날짜 조회
export const fetchEventsForDate = async (date: string) => {
  if (!date) {
    ToastAndroid.show('날짜를 입력해 주세요.', ToastAndroid.SHORT);
    return {success: false, message: '날짜가 필요합니다.'};
  }
  try {
    // 날짜를 ISO 포맷으로 변환
    const isoDate = new Date(date).toISOString().split('T')[0];
    console.log(isoDate);
    const response = await fetch(
      `http://34.47.76.73:3000/scheduler/${isoDate}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      const result = await response.json();
      if (result.data) {
        return {success: true, data: result.data};
      } else {
        return {success: false, message: result.message};
      }
    } else if (response.status === 400) {
      const error = await response.json();
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      return {success: false, message: error.message};
    } else if (response.status === 403) {
      ToastAndroid.show('서버문제로 실패했습니다.', ToastAndroid.SHORT);
      return {success: false, message: '서버문제'};
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    ToastAndroid.show('일정 조회에 실패했습니다.', ToastAndroid.SHORT);
    return {success: false, message: 'Failed to fetch events.'};
  }
};

export const deleteEvent = async (schedulerId: string) => {
  try {
    const user_login_id = await AsyncStorage.getItem('id');

    if (user_login_id != null) {
      const response = await fetch(
        `http://34.47.76.73:3000/scheduler/${schedulerId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user_login_id}`, // Add auth token if necessary
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
          error.message || '일정 삭제에 실패했습니다.',
          ToastAndroid.SHORT,
        );
      }
    }
  } catch (error) {
    console.error(error);
    ToastAndroid.show('일정 삭제에 실패했습니다.', ToastAndroid.SHORT);
  }
};
export const updateScheduler = async (
  schedulerId: string,
  content: string,
  date: string,
  userId: string,
  color: string,
) => {
  try {
    const response = await fetch(
      `http://34.47.76.73:3000/scheduler/${schedulerId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scheduler_content: content,
          scheduler_date: date,
          user_login_id: userId,
          scheduler_color: color,
        }),
      },
    );

    // response.ok 확인 후 json 처리
    if (response.ok) {
      const result = await response.json();
      ToastAndroid.show(
        result.message || '스케줄이 성공적으로 수정되었습니다.',
        ToastAndroid.SHORT,
      );
    } else {
      if (response.status === 400) {
        ToastAndroid.show(
          '값을 입력해 주세요. (수정할 스케줄 내용이나 날짜가 누락되었을 때)',
          ToastAndroid.SHORT,
        );
      } else if (response.status === 403) {
        ToastAndroid.show('스케줄 수정 실패', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('서버 오류가 발생했습니다.', ToastAndroid.SHORT);
      }
    }
  } catch (error) {
    ToastAndroid.show(
      '네트워크 오류가 발생했습니다. 다시 시도해 주세요.',
      ToastAndroid.SHORT,
    );
    console.log('업데이트 에러', error);
  }
};
