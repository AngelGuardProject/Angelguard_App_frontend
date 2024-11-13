import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {SafeAreaView} from 'react-native-safe-area-context';
import SchedulerMainModal from '../../components/Modal/SchedulerModalMain'; // 모달 컴포넌트 임포트
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the Event type
interface Event {
  scheduler_id: number;
  scheduler_date: string; // Assume the date is in 'YYYY-MM-DD' format
  scheduler_content: string; // 일정 내용 추가
  scheduler_color: string; // 색상 추가
}

LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

LocaleConfig.defaultLocale = 'kr';

function SchedulerMain() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const user_login_id = await AsyncStorage.getItem('id');
    console.log(user_login_id);
    try {
      const response = await axios.get(
        `http://34.47.76.73:3000/scheduler/${user_login_id}/${year}/${month}`,
      );
      if (response.data && response.data.data) {
        setEvents(response.data.data);
      } else {
        console.log('No events found');
      }
    } catch (error) {
      console.error('Error 스케쥴러 월 조회:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const onDayPress = (day: {dateString: string}) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const getMarkedDates = () => {
    const markedDates: {[key: string]: any} = {};
    events.forEach(event => {
      const date = event.scheduler_date.split('T')[0];
      if (!markedDates[date]) {
        markedDates[date] = {
          dots: [{key: 'event', color: event.scheduler_color || 'blue'}],
        };
      } else {
        markedDates[date].dots.push({
          key: 'event',
          color: event.scheduler_color || 'blue',
        });
      }
    });

    return markedDates;
  };

  const handleSave = () => {
    fetchEvents(); // 일정이 저장될 때마다 일정을 다시 로드
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          monthFormat={'M월'}
          renderArrow={(direction: string) => (
            <TouchableOpacity>
              <Text style={styles.arrowText}>
                {direction === 'left' ? '‹' : '›'}
              </Text>
            </TouchableOpacity>
          )}
          firstDay={0}
          onDayPress={onDayPress}
          markedDates={{
            [today]: {
              customStyles: {
                container: {},
                text: {
                  color: 'red',
                },
              },
            },
            [selectedDate || '']: {
              customStyles: {
                container: {
                  backgroundColor: '#FFF4D6',
                },
                text: {
                  color: 'black',
                },
              },
            },
            ...getMarkedDates(),
          }}
          markingType={'multi-dot'}
          theme={{
            textDayFontFamily: 'SUITE',
            textMonthFontFamily: 'SUITE',
            textDayHeaderFontFamily: 'SUITE',
            textDayHeaderFontSize: 15,
            textMonthFontSize: 16,
            textMonthFontWeight: 'bold',
            textDayFontSize: 14,
            todayTextColor: 'red',
            dayHeaderTextColor: '#808080',
            'stylesheet.calendar.header': {
              monthText: {
                marginTop: 10,
                fontSize: 20,
                fontWeight: 'normal',
                color: 'black',
              },
              arrow: {marginTop: 10, size: 26, color: 'black'},
              dayHeader: {
                marginTop: 50,
                marginBottom: 20,
                color: '#808080',
                fontSize: 14,
              },
            },
            'stylesheet.calendar.main': {
              dayContainer: {
                width: 40,
                height: 80,
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingBottom: 10,
              },
              dayText: {
                fontSize: 15,
                textAlign: 'center',
                lineHeight: 30,
              },
            },
          }}
          renderDay={(
            date: {
              dateString: any;
              day:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            },
            state: string,
          ) => {
            const dateString = date.dateString;
            const markedDate = getMarkedDates()[dateString];

            return (
              <View style={styles.dayContainer}>
                <Text
                  style={[
                    styles.dayText,
                    markedDate?.customStyles.text,
                    state === 'today' && styles.todayText,
                  ]}>
                  {date.day}
                </Text>
                {markedDate && markedDate.eventContent ? (
                  <Text style={styles.eventText}>
                    {markedDate.eventContent}
                  </Text>
                ) : null}
              </View>
            );
          }}
        />
        <SchedulerMainModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          selectedDate={selectedDate}
          onSave={handleSave} // 일정 저장 시 호출
        />
      </View>
    </SafeAreaView>
  );
}

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  container: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    width: width * 0.9,
    height: height * 0.8,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  arrowText: {
    fontSize: 30,
    color: '#808080',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 80,
  },
  dayText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 30,
  },
  todayText: {
    color: 'red',
  },
  eventText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
  },
});

export default SchedulerMain;
