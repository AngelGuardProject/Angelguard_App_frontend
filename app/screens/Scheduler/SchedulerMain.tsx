import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {SafeAreaView} from 'react-native-safe-area-context';
import SchedulerModal from '../../components/SchedulerModal'; // 모달 컴포넌트 임포트

// 한국어로 로케일 설정
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
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 'YYYY-MM-DD' 형식으로 설정
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택된 날짜 상태
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태

  // 날짜를 선택했을 때 호출되는 함수
  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString); // 선택된 날짜 저장
    setModalVisible(true); // 모달 표시
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
          onDayPress={onDayPress} // 날짜를 클릭했을 때 호출
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
                  backgroundColor: '#FFF4D6', // 선택된 날짜의 배경색
                },
                text: {
                  color: 'black',
                },
              },
            },
          }}
          markingType={'custom'}
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
                height: 67,
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingBottom: 10,
              },
              dayText: {
                fontSize: 15,
                textAlign: 'center',
                lineHeight: 20,
              },
            },
          }}
        />
        <SchedulerModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          selectedDate={selectedDate} // 선택된 날짜를 모달에 전달
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
    backgroundColor: '#f4f4f4',
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
});

export default SchedulerMain;
