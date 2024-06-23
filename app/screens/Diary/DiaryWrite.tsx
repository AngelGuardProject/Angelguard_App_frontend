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
          <Text>X</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{currentDate}</Text>
        <TouchableOpacity>
          <Text>작성</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.uploadTextBox}>
          <Text style={styles.uploadText}>사진 업로드</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/images/icons/PhotoPlus.png')}
            style={styles.photoFrame}
          />
        </View>
        <View>
          <TextInput
            style={styles.mainTextInput}
            placeholder=" 오늘 하루를 제목으로 표현주세요 "
            placeholderTextColor="#666662"
            multiline
          />
        </View>
        <View>
          <TextInput
            style={styles.depInput}
            placeholder="울딸혜리미님의 오늘은 어떤 하루였나요? "
            placeholderTextColor="#666662"
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
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    marginTop: 8,
  },
  headerText: {
    fontFamily: 'SUITE',
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
  },
  uploadTextBox: {
    marginBottom: 15,
  },
  uploadText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
    fontFamily: 'SUITE',
    marginBottom: 10,
  },
  photoFrame: {
    width: 67,
    height: 67,
    marginBottom: 29,
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  mainTextInput: {
    marginBottom: 33,
    height: 50,
    fontSize: 16,
    fontWeight: '500',
    color: '#666662',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  depInput: {
    fontFamily: 'SUITE',
    fontSize: 14,
    fontWeight: '400',
    color: '#666662',
  },
});

export default DiaryWrite;
