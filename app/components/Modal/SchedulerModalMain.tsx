import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  ToastAndroid,
} from 'react-native';
import SchedulerInputModal from '../Modal/SchedulerInputModal';
import {deleteEvent, fetchEventsForDate} from '../../api/calendar.api';

interface SchedulerModalMainProps {
  visible: boolean;
  onClose: () => void;
  selectedDate: string | null;
}

interface EventType {
  scheduler_id: string;
  scheduler_content: string;
  scheduler_color: string;
  scheduler_date: string;
}

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  return new Date(date).toLocaleDateString('ko-KR', options);
};

const SchedulerModalMain: React.FC<SchedulerModalMainProps> = ({
  visible,
  onClose,
  selectedDate,
}) => {
  const [addingEvent, setAddingEvent] = useState(false);
  const [events, setEvents] = useState<EventType[]>([]);
  const [editEvent, setEditEvent] = useState<EventType | null>(null);

  const handleAddInputEvent = () => {
    setAddingEvent(true);
    setEditEvent(null);
  };

  const handleEditEvent = (event: EventType) => {
    setEditEvent(event); 
    setAddingEvent(true);
  };

  const handleInputModalClose = (title: string, color: string) => {
    loadEvents();
    setAddingEvent(false);
  };

  const handleCancel = () => {
    onClose();
  };

  const loadEvents = async () => {
    if (visible && selectedDate) {
      const result = await fetchEventsForDate(selectedDate);
      setEvents(result?.success ? result.data : []);
    }
  };

  const handleDeleteEvent = async (schedulerId: string) => {
    try {
      await deleteEvent(schedulerId);
      setEvents(events.filter(event => event.scheduler_id !== schedulerId));
      ToastAndroid.show('일정이 삭제되었습니다.', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('일정 삭제 실패', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    loadEvents();
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
                    <TouchableOpacity
                      key={event.scheduler_id}
                      onPress={() => handleEditEvent(event)}>
                      <View style={styles.infoContainer}>
                        <View
                          style={[
                            styles.redSquare,
                            {
                              backgroundColor:
                                event.scheduler_color || '#FF0000',
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
                        <TouchableOpacity
                          onPress={() => handleDeleteEvent(event.scheduler_id)}>
                          <Image
                            source={require('../../assets/images/icons/trash_icon.png')}
                            style={styles.trashIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
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
              event={editEvent || undefined}
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
    width: 20,
    height: 20,
    borderRadius: 3,
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
  modalDateText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#A6A6A6',
  },
  trashIcon: {
    width: 25,
    height: 25,
  },
  plusModal: {
    fontSize: 16,
    color: '#a6a6a6',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '300',
  },
  noEventsText: {
    fontSize: 16,
    color: '#A6A6A6',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SchedulerModalMain;
