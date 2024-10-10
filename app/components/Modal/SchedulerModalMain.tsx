import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
} from 'react-native';
import SchedulerInputModal from '../Modal/SchedulerInputModal'; // SchedulerInputModal 컴포넌트 가져오기
import axios from 'axios'; // axios for API calls

interface SchedulerModalMainProps {
  visible: boolean;
  onClose: () => void;
  selectedDate: string | null;
}

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  return new Date(date).toLocaleDateString('ko-KR', options); // 날짜 포맷 설정
};

const SchedulerModalMain: React.FC<SchedulerModalMainProps> = ({
  visible,
  onClose,
  selectedDate,
}) => {
  const [addingEvent, setAddingEvent] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventColor, setEventColor] = useState('#FF0000');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]); // State to store fetched events

  // 일정 추가 버튼 클릭 시 모달 열기
  const handleAddInputEvent = () => {
    setAddingEvent(true);
  };

  // 입력 모달 닫기 및 상태 업데이트
  const handleInputModalClose = (
    title: string,
    color: string,
    start: string | null,
    end: string | null,
  ) => {
    setEventTitle(title);
    setEventColor(color);
    setStartDate(start);
    setEndDate(end);
    setAddingEvent(false);
  };

  // 모달 닫기
  const handleCancel = () => {
    onClose();
  };

  // Fetch events for the selected date
  const SchedulerShowHandler = async () => {
    if (selectedDate) {
      try {
        const response = await axios.get(`/scheduler/${selectedDate}`);
        if (response.data.result) {
          setEvents(response.data.data); // Update state with fetched events
        } else {
          // Handle error or no events case
          setEvents([]); // Clear events if not found
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
  };

  // Fetch events when the modal is opened and a date is selected
  useEffect(() => {
    if (visible && selectedDate) {
      SchedulerShowHandler();
    }
  }, [visible, selectedDate]);

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
        <View style={styles.modalWrapper}>
          {selectedDate && (
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
            </View>
          )}
          {!addingEvent ? (
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                {events.length > 0 ? (
                  events.map(event => (
                    <View key={event.scheduler_id} style={styles.infoContainer}>
                      <View
                        style={[
                          styles.redSquare,
                          {
                            backgroundColor:
                              event.scheduler_color || eventColor,
                          },
                        ]}
                      />
                      <View style={styles.textContainer}>
                        <Text style={styles.labelText}>
                          {event.scheduler_content}
                        </Text>
                        <Text style={styles.modalDateText}>
                          {formatDate(event.scheduler_date)}
                        </Text>
                      </View>
                      <Image
                        source={require('../../assets/images/icons/trash_icon.png')}
                        style={styles.trashIcon}
                      />
                    </View>
                  ))
                ) : (
                  <Text style={styles.noEventsText}>
                    아직 일정이 비어있습니다.
                  </Text>
                )}
                <TouchableOpacity onPress={handleAddInputEvent}>
                  <Text style={styles.plusModal}>+ 일정 추가하기</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <SchedulerInputModal
              visible={addingEvent}
              onClose={handleInputModalClose}
              selectedDate={selectedDate}
            />
          )}
        </View>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  redSquare: {
    width: 15,
    height: 15,
    borderRadius: 3,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalDateText: {
    fontSize: 13,
    color: '#A6A6A6',
  },
  trashIcon: {
    width: 20,
    height: 20,
  },
  plusModal: {
    fontSize: 16,
    color: '#a6a6a6',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '400',
  },
  noEventsText: {
    fontSize: 16,
    color: '#A6A6A6',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SchedulerModalMain;