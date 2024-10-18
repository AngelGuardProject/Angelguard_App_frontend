import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView, // Import KeyboardAvoidingView
  Platform, // Import Platform to determine the OS
} from 'react-native';
import CalendarModal from '../Modal/CalendarModal';
import ColorPickerModal from '../Modal/ColorPickerModal';
import {createScheduler, updateScheduler} from '../../api/calendar.api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SchedulerInputModalProps {
  visible: boolean;
  onClose: (title: string, color: string, date: string | null) => void;
  selectedDate: string | null;
  event?: {
    scheduler_content: string;
    scheduler_color: string;
    scheduler_date: string;
    scheduler_id: string;
  };
}

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    weekday: 'long',
  };
  return new Date(date).toLocaleDateString('ko-KR', options);
};

const SchedulerInputModal: React.FC<SchedulerInputModalProps> = ({
  visible,
  onClose,
  selectedDate,
  event,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState('#FF0000');
  const [eventTitle, setEventTitle] = useState('');
  const [selectedDateState, setSelectedDateState] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (event) {
      setEventTitle(event.scheduler_content);
      setColor(event.scheduler_color);
      setSelectedDateState(event.scheduler_date);
    } else {
      setEventTitle('');
      setColor('#FF0000');
      setSelectedDateState(selectedDate);
    }
  }, [event, selectedDate]);

  const handleOpenCalendar = () => {
    setShowCalendar(true);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDateState(date);
    setShowCalendar(false);
  };

  const handleOpenColorPicker = () => {
    setShowColorPicker(true);
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
    setShowColorPicker(false);
  };

  const handleCancel = () => {
    onClose('', '', null);
  };

  const handleSave = async () => {
    if (!eventTitle) {
      ToastAndroid.show('일정 제목을 입력해주세요.', ToastAndroid.SHORT);
      return;
    }

    const schedulerDate = selectedDateState || selectedDate;

    if (!schedulerDate) {
      ToastAndroid.show('날짜를 선택해주세요.', ToastAndroid.SHORT);
      return;
    }

    const userId = await AsyncStorage.getItem('id');

    if (!userId) {
      ToastAndroid.show(
        '사용자 ID를 가져오는 데 실패했습니다.',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (event) {
      await updateScheduler(
        event.scheduler_id,
        eventTitle,
        schedulerDate,
        userId,
        color,
      );
    } else {
      await createScheduler(eventTitle, schedulerDate, color);
    }

    onClose(eventTitle, color, selectedDateState);
  };

  const displayDate = selectedDateState
    ? formatDate(selectedDateState)
    : '날짜 선택';

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleCancel}>
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPressOut={handleCancel}>
        <KeyboardAvoidingView
          style={styles.modalWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Use padding for iOS
          keyboardVerticalOffset={20} // Adjust this value as needed
        >
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{displayDate}</Text>
          </View>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.headerContainer}>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={styles.cancelButton}>
                  <Image
                    source={require('../../assets/images/icons/cancel.png')}
                    style={styles.cancelIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSave}
                  style={styles.saveButton}>
                  <Image
                    source={require('../../assets/images/icons/check_icon.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="일정 제목"
                  placeholderTextColor="#A6A6A6"
                  style={styles.eventInput}
                  value={eventTitle}
                  onChangeText={setEventTitle}
                />
                <View style={styles.colorBarContainer}>
                  <TouchableOpacity onPress={handleOpenColorPicker}>
                    <View style={[styles.colorBar, {backgroundColor: color}]}>
                      <Text style={styles.colorBarText}>컬러</Text>
                      <Image
                        source={require('../../assets/images/icons/bottom.png')}
                        style={styles.arrowIcon}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleOpenCalendar}>
                  <Text style={styles.dateTextSmall}>{displayDate}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableOpacity>
      <CalendarModal
        visible={showCalendar}
        onClose={handleCloseCalendar}
        onDateSelect={handleDateSelect}
      />
      <ColorPickerModal
        visible={showColorPicker}
        onClose={handleCloseColorPicker}
        onColorSelect={handleColorSelect}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  modalContainer: {
    width: '90%',
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    padding: 5,
  },
  saveButton: {
    padding: 5,
  },
  cancelIcon: {
    width: 15,
    height: 15,
  },
  icon: {
    width: 15,
    height: 15,
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
  },
  eventInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    fontSize: 20,
    fontWeight: '400',
    color: '#A6A6A6',
    marginBottom: 10,
  },
  colorBarContainer: {
    marginVertical: 10,
  },
  colorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  colorBarText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '300',
  },
  arrowIcon: {
    width: 10,
    height: 10,
    marginLeft: 5,
  },
  dateTextSmall: {
    fontSize: 14,
    color: 'black',
  },
  dateContainer: {
    width: '90%',
    marginBottom: 15,
    marginLeft: 10,
  },
  dateText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    textAlign: 'left',
  },
});

export default SchedulerInputModal;
