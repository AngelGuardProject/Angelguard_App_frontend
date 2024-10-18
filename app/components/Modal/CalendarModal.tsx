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
  onDateSelect: (date: string) => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onClose,
  onDateSelect,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDayPress = (day: {dateString: string}) => {
    setSelectedDate(day.dateString);
  };

  const handleOutsidePress = () => {
    if (selectedDate) {
      onDateSelect(selectedDate); // Apply the selected date
    }
    onClose(); // Close the modal
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.calendarModalBackground}
        activeOpacity={1}
        onPressOut={handleOutsidePress}>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate!]: {
                selected: true,
                selectedColor: '#FFF4D6',
                selectedTextColor: 'red',
              },
            }}
            style={styles.calendar}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.closeText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (selectedDate) {
                  onDateSelect(selectedDate);
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  calendarContainer: {
    width: '85%',
    height: '50%',
    padding: 15,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  calendar: {
    height: '50%',
  },
  buttonContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 150,
  },
  cancelButton: {
    marginRight: 20,
  },
  confirmButton: {},
  closeText: {
    fontWeight: '300',
    fontSize: 15,
    color: '#007BFF',
  },
});

export default CalendarModal;
