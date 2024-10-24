import React from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  body: string;
  navigation: {navigate: (screen: string) => void} | undefined;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  visible,
  onClose,
  title,
  body,
  navigation,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.body}>
            <Text style={styles.bodyTxt}>아이가 울고 있어요.</Text>
            <Text style={styles.bodyTxt}>{body}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.moveButton}
              onPress={() => {
                if (navigation) {
                  onClose(); // Close the modal first
                  navigation.navigate('Main'); // Navigate to Main
                }
              }}>
              <Text style={styles.moveButtonText}>이동</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.buttonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    height: '30%',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'left',
  },
  body: {
    marginBottom: 20,
    textAlign: 'left',
  },
  bodyTxt: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moveButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: '#F4F5F7',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
  },
  buttonText: {
    color: '#666662',
    fontWeight: '300',
    textAlign: 'center',
  },
  moveButtonText: {
    color: 'white',
    fontWeight: '300',
    textAlign: 'center',
  },
});

export default NotificationModal;
