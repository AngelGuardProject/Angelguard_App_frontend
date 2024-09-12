import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';

// Define the navigation prop types
type DiaryWriteNavigationProp = StackNavigationProp<any, any>;

const DiaryWrite: React.FC<{navigation: DiaryWriteNavigationProp}> = ({
  navigation,
}) => {
  const currentDate = '6월 22일 수요일';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/icons/back.png')}
            style={styles.cancelIcon}
          />
        </TouchableOpacity>
        {/* <View style={styles.headerTitleContainer}>
          <Text style={styles.headerText}>{currentDate}</Text>
        </View> */}
        <TouchableOpacity>
          <Text style={styles.headerButton}>완료</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.currentDate}>2024년 8월 24일 토요일</Text>
        </View>
        <View>
          <Text style={styles.contentTitle}>오늘의 하루는 어떠셨나요?</Text>
        </View>
        <View>
          <TextInput
            style={styles.mainTextInput}
            placeholder=" 오늘 하루를 제목으로 표현주세요 "
            placeholderTextColor="#666662"
            multiline
          />
        </View>
        <View style={styles.depContainer}>
          <TextInput
            style={[
              styles.depInput,
              {
                height: 60,
                paddingVertical: 10,
                textAlignVertical: 'center',
                fontWeight: '300',
              },
            ]}
            placeholder="오늘도 소중한 하루, 아기의 모든 순간을 기록해보세요."
            placeholderTextColor="#666662"
          />
        </View>
        <View style={styles.uploadTextBox}>
          <Text style={styles.uploadText}>사진 업로드</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/images/icons/PhotoPlus.png')}
            style={styles.photoFrame}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'SUITE',
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  cancelIcon: {
    width: 16,
    height: 16,
  },
  headerButton: {
    fontFamily: 'SUITE',
    fontSize: 16,
    fontWeight: '300',
    color: '#666662',
  },
  currentDate: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 8,
  },
  contentTitle: {
    marginBottom: 30,
    fontSize: 20,
    color: '#000000',
    fontWeight: '700',
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  mainTextInput: {
    paddingBottom: 20,
    marginBottom: 15,
    height: 50,
    fontSize: 14,
    fontWeight: '300',
    color: '#666662',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  depContainer: {
    height: '48%',
  },
  depInput: {
    fontFamily: 'SUITE',
    fontSize: 14,
    fontWeight: '300',
    color: '#666662',
  },
  uploadTextBox: {
    marginBottom: 15,
  },
  uploadText: {
    marginTop: 15,
    fontSize: 16,
    color: '#000000',
    fontWeight: '700',
    fontFamily: 'SUITE',
    marginBottom: 5,
  },
  photoFrame: {
    width: 70,
    height: 70,
    marginBottom: 29,
  },
});

export default DiaryWrite;
