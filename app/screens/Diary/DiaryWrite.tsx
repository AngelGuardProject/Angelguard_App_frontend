import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';

type DiaryWriteNavigationProp = StackNavigationProp<any, any>;

const DiaryWrite: React.FC<{navigation: DiaryWriteNavigationProp}> = ({
  navigation,
}) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/icons/back.png')} // Replace with your icon path
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.header}>육아일지</Text>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}>등록</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.dateText}>2024년 8월 24일 토요일</Text>
          <Text style={styles.questionText}>오늘의 하루는 어떠셨나요?</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="오늘 하루를 제목으로 표현주세요."
            placeholderTextColor="#666662"
          />
          <TextInput
            style={styles.depInput}
            placeholder="오늘도 소중한 하루, 아기의 모든 순간을 기록해봐요!."
            placeholderTextColor="#666662"
          />
        </View>
        <View style={styles.photoContainer}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/icons/camera.png')} // Replace with your camera icon path
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 15,
    height: 15,
  },
  header: {
    fontFamily: 'SUITE',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  registerButton: {
    padding: 10,
  },
  registerText: {
    fontFamily: 'SUITE',
    fontSize: 16,
    fontWeight: '300',
    color: '#a6a6a6',
  },
  inputContainer: {
    width: '90%',
    height: '80%',
    marginTop: 30,
  },
  dateText: {
    width: '100%',
    fontFamily: 'SUITE',
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 10,
  },
  questionText: {
    width: '100%',
    fontFamily: 'SUITE',
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 10,
  },
  titleInput: {
    width: '100%',
    height: 70,
    fontFamily: 'SUITE',
    fontSize: 16,
    color: '#666662',
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
  },
  depInput: {
    width: '100%',
    marginTop: 10,
    height: 70,
    fontWeight: '300',
    fontFamily: 'SUITE',
    fontSize: 14,
    color: '#666662',
  },
  photoContainer: {
    padding: 10,
    paddingLeft: 20,
    borderTopColor: '#d5d5d5',
    borderTopWidth: 0.8,
    width: '100%',
    height: '10%',
  },
  cameraIcon: {
    width: 30,
    height: 30,
  },
});

export default DiaryWrite;
