import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';

interface SchedulerModalProps {
  visible: boolean; // 모달의 가시성 상태
  onClose: () => void; // 모달을 닫는 함수
  selectedDate: string | null; // 선택된 날짜
}

const SchedulerModal: React.FC<SchedulerModalProps> = ({
  visible,
  onClose,
  selectedDate,
}) => {
  const [addingEvent, setAddingEvent] = useState(false); // 일정 추가 상태

  // 선택된 날짜를 형식화하여 표시하는 함수
  const formatDate = (date: string) => {
    const options = {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return new Date(date).toLocaleDateString('ko-KR', options); //이거 왜 빨간줄 나냐 ㅠㅠ?
  };

  // 일정 추가 화면으로 전환하는 함수
  const handleAddEvent = () => {
    setAddingEvent(true);
  };

  // 일정 추가 화면 취소
  const handleCancel = () => {
    setAddingEvent(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.dateContainer}>
          {selectedDate && (
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          )}
        </View>
        {addingEvent ? (
          <View style={styles.eventContainer}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.cancelButton}>
                <Image
                  source={require('../assets/images/icons/cancel.png')}
                  style={styles.cancleicon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton}>
                <Image
                  source={require('../assets/images/icons/check_icon.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="일정 제목"
              placeholderTextColor="#A6A6A6"
              style={styles.eventInput}
            />
            <View style={styles.colorBarContainer}>
              <View style={styles.colorBar}>
                <Text style={styles.colorBarText}>컬러</Text>
                <Image
                  source={require('../assets/images/icons/bottom.png')}
                  style={styles.arrowIcon}
                />
              </View>
            </View>
            <Text style={styles.dateTextSmall}>
              {selectedDate && formatDate(selectedDate)}
            </Text>
          </View>
        ) : (
          <View style={styles.modalContainer}>
            <View style={styles.infoContainer}>
              <View style={styles.redSquare}></View>
              <View style={styles.textContainer}>
                <Text style={styles.labelText}>농담곰 팝업 스토어</Text>
                {selectedDate && (
                  <Text style={styles.modaldateText}>
                    {formatDate(selectedDate)}
                  </Text>
                )}
              </View>
              <Image
                source={require('../assets/images/icons/trash_icon.png')}
                style={styles.trashIcon}
              />
            </View>
            <TouchableOpacity onPress={handleAddEvent}>
              <Text style={styles.modalText}>+ 일정 추가하기</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 어두운 배경
  },
  dateContainer: {
    width: '100%', // 모달의 전체 너비
    marginBottom: 64,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // 흰색 글씨
    marginBottom: 10,
    textAlign: 'left', // 왼쪽 정렬
  },
  modalContainer: {
    width: '100%',
    height: 335,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  redSquare: {
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  labelText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },
  modaldateText: {marginTop: 3, fontSize: 14, color: 'black'},
  dateTextSmall: {
    marginTop: 11,
    fontSize: 14,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    paddingBottom: 15, // Adjust the padding if needed to align the text properly
  },
  trashIcon: {
    width: 27,
    height: 27,
    marginLeft: 10,
  },
  modalText: {
    color: '#666662',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 20,
  },
  eventContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 335,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  eventInput: {
    fontWeight: '600',
    width: '100%',
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 20,
  },
  colorBarContainer: {
    marginBottom: 10,
  },
  colorBar: {
    width: 70,
    height: 25,
    backgroundColor: 'red',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  colorBarText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '300',
    marginLeft: 2,
    marginBottom: 3,
  },
  arrowIcon: {
    marginLeft: 5,
    marginTop: 3,
    width: 10,
    height: 10,
  },
  saveButton: {
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    borderRadius: 5,
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  cancleicon: {
    width: 27,
    height: 27,
  },
});

export default SchedulerModal;
