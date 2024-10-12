import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Calendar} from 'react-native-calendars';

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (startDate: string, endDate: string) => void; // 날짜 선택 시 처리 함수
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onClose,
  onDateSelect,
}) => {
  const [startDate, setStartDate] = useState<string | null>(null); // 시작 날짜
  const [endDate, setEndDate] = useState<string | null>(null); // 종료 날짜

  const getMarkedDatesBetween = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dates: {[key: string]: {color: string}} = {};

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().split('T')[0];
      dates[formattedDate] = {color: '#FFF4D6'};
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const handleDayPress = (day: {dateString: string}) => {
    if (!startDate || (startDate && endDate)) {
      // 시작 날짜 선택
      setStartDate(day.dateString);
      setEndDate(null); // Clear the end date if it was selected
    } else {
      // 종료 날짜 선택
      setEndDate(day.dateString);
      if (startDate && endDate) {
        onDateSelect(startDate, endDate); // Notify parent component of date selection
        onClose();
      }
    }
  };

  // Format date function
  const formatDate = (date: string, includeDayOfWeek: boolean = true) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = new Date(date).toLocaleDateString('ko-KR', options);

    if (includeDayOfWeek) {
      const dayOfWeek = new Date(date).toLocaleDateString('ko-KR', {
        weekday: 'long',
      });
      return `${formattedDate} ${dayOfWeek}`;
    }
    return formattedDate;
  };

  // Extract day number from date string
  const getDayNumber = (date: string) => {
    return new Date(date).getDate(); // Extract the day of the month
  };

  // Get today's date
  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.calendarModalBackground}
        activeOpacity={1}
        onPressOut={onClose}>
        <View style={styles.calendarContainer}>
          <View style={styles.dateContainer}>
            <View style={styles.dateInfo}>
              <Text
                style={[
                  styles.label,
                  startDate ? styles.selectedLabel : styles.unselectedLabel,
                ]}>
                시작
              </Text>
              <View style={styles.dateTextContainer}>
                <Text
                  style={[
                    styles.dayNumber,
                    startDate
                      ? styles.selectedDayNumber
                      : styles.unselectedDayNumber,
                  ]}>
                  {startDate ? getDayNumber(startDate) : getDayNumber(today)}
                </Text>
                <View style={styles.fullDateContainer}>
                  <Text
                    style={[
                      styles.fullDate,
                      startDate
                        ? styles.selectedFullDate
                        : styles.unselectedFullDate,
                    ]}>
                    {startDate
                      ? formatDate(startDate, false)
                      : formatDate(today, false)}
                  </Text>
                  <Text
                    style={[
                      styles.dayOfWeek,
                      startDate
                        ? styles.selectedDayOfWeek
                        : styles.unselectedDayOfWeek,
                    ]}>
                    {startDate
                      ? ` ${
                          formatDate(startDate, true).split(' ').slice(-1)[0]
                        }`
                      : formatDate(today, true).split(' ').slice(-1)[0]}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.dateInfo}>
              <Text
                style={[
                  styles.label,
                  endDate ? styles.selectedLabel : styles.unselectedLabel,
                ]}>
                종료
              </Text>
              <View style={styles.dateTextContainer}>
                <Text
                  style={[
                    styles.dayNumber,
                    endDate
                      ? styles.selectedDayNumber
                      : styles.unselectedDayNumber,
                  ]}>
                  {endDate ? getDayNumber(endDate) : getDayNumber(today)}
                </Text>
                <View style={styles.fullDateContainer}>
                  <Text
                    style={[
                      styles.fullDate,
                      endDate
                        ? styles.selectedFullDate
                        : styles.unselectedFullDate,
                    ]}>
                    {endDate
                      ? formatDate(endDate, false)
                      : formatDate(today, false)}
                  </Text>
                  <Text
                    style={[
                      styles.dayOfWeek,
                      endDate
                        ? styles.selectedDayOfWeek
                        : styles.unselectedDayOfWeek,
                    ]}>
                    {endDate
                      ? ` ${formatDate(endDate, true).split(' ').slice(-1)[0]}`
                      : formatDate(today, true).split(' ').slice(-1)[0]}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Calendar
            onDayPress={handleDayPress}
            markingType={'period'}
            markedDates={{
              [startDate!]: {startingDay: true, color: '#FFF4D6'},
              ...(startDate &&
                endDate && {
                  ...getMarkedDatesBetween(startDate, endDate),
                  [endDate!]: {endingDay: true, color: '#FFF4D6'},
                }),
            }}
            style={styles.calendar}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.closeText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (startDate && endDate) {
                  onDateSelect(startDate, endDate);
                  onClose();
                }
              }}
              style={styles.confirmButton}>
              <Text style={styles.closeText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  calendarModalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 어두운 배경
  },
  background: {
    flex: 1,
  },
  calendarContainer: {
    width: '90%',
    height: '60%',
    padding: 15,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dateContainer: {
    paddingLeft: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around', // 변경
    marginBottom: 10,
  },
  dateInfo: {
    marginRight: 10,
    flex: 1,
  },
  label: {
    fontSize: 14,
  },
  dateTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  dayNumber: {
    fontSize: 30,
    fontWeight: '600',
  },
  fullDateContainer: {
    textAlign: 'left',
    marginLeft: 10,
  },
  fullDate: {
    fontSize: 12,
    fontWeight: '400',
  },
  dayOfWeek: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
  },
  selectedDayNumber: {
    color: '#007BFF',
  },
  unselectedDayNumber: {
    color: '#A6A6A6',
  },
  selectedFullDate: {
    color: '#007BFF',
  },
  selectedDayOfWeek: {
    color: '#007BFF',
  },
  selectedLabel: {
    color: '#007BFF',
  },
  unselectedDayOfWeek: {
    color: '#A6A6A6',
  },
  unselectedLabel: {
    color: '#A6A6A6',
  },
  unselectedFullDate: {
    color: '#A6A6A6',
  },
  calendar: {
    height: '50%',
  },
  buttonContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 100,
  },
  cancelButton: {
    marginRight: 20,
  },
  confirmButton: {},
  closeText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default CalendarModal;
