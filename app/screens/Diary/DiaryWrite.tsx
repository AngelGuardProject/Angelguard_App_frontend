import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {launchImageLibrary} from 'react-native-image-picker';
import {createDiary, updateDiary} from '../../api/diary.api';

type DiaryWriteNavigationProp = StackNavigationProp<any, any>;

const DiaryWrite: React.FC<{
  navigation: DiaryWriteNavigationProp;
  route: any;
}> = ({navigation, route}) => {
  const {title, content, image, diaryId} = route.params || {};

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  );
  const [titleState, setTitle] = useState(title || '');
  const [contentState, setContent] = useState(content || '');

  const handleSubmit = async () => {
    if (!titleState || !contentState) {
      ToastAndroid.show('제목과 내용을 입력해주세요.', ToastAndroid.SHORT);
      return;
    }

    try {
      if (diaryId) {
        //diaryId 있을 때 (육아일지 수정시 )
        await updateDiary(
          diaryId,
          titleState,
          contentState,
          selectedImage,
          navigation,
        );
        navigation.navigate('DiaryDetail', {babyBoardId: diaryId});
      } else {
        //diaryId 없을 때 (육아일지 생성시 )
        await createDiary(titleState, contentState, selectedImage, navigation);
        navigation.navigate('Diary');
      }
    } catch (error) {
      console.error('Error saving diary:', error);
      ToastAndroid.show('저장 중 오류가 발생했습니다.', ToastAndroid.SHORT);
    }
  };

  const handleImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      quality: 1,
    });

    if (!result.didCancel && result.assets) {
      const imageUri = result.assets[0]?.uri;
      if (imageUri) {
        setSelectedImage(imageUri);
      }
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (diaryId) {
      setTitle(title);
      setContent(content);
      setSelectedImage(image || null);
    }
  }, [diaryId, title, content, image]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/icons/LeftArrow.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.header}>육아일지</Text>
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.registerButton}>
            <Text style={styles.registerText}>{diaryId ? '수정' : '등록'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.dateText}>{currentDate}</Text>
          <Text style={styles.questionText}>오늘의 하루는 어떠셨나요?</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="오늘 하루를 제목으로 표현해주세요."
            placeholderTextColor="#666662"
            value={titleState}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.depInput}
            placeholder="오늘도 소중한 하루, 아기의 모든 순간을 기록해봐요!"
            placeholderTextColor="#666662"
            value={contentState}
            onChangeText={setContent}
          />
          {selectedImage && (
            <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={removeImage}
                style={styles.removeImageButton}>
                <Text style={styles.removeImageText}>X</Text>
              </TouchableOpacity>
              <Image
                source={{uri: selectedImage}}
                style={styles.imagePreview}
              />
            </View>
          )}
        </View>
        <View style={styles.photoContainer}>
          <TouchableOpacity onPress={handleImagePicker}>
            <Image
              source={require('../../assets/images/icons/camera.png')}
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
    marginVertical: 10,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 9,
    height: 17,
  },
  header: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
  },
  registerButton: {},
  registerText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#a6a6a6',
  },
  inputContainer: {
    width: '90%',
    height: '80%',
    marginTop: 30,
  },
  dateText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 10,
  },
  titleInput: {
    width: '100%',
    height: 70,
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
  imageContainer: {
    position: 'relative', // Position for the emoji
  },
  imagePreview: {
    width: '100%',
    height: '70%',
    marginTop: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1, // Make sure the emoji is on top
  },
  removeImageText: {
    fontSize: 30, // Adjust size as needed
    color: 'white',
  },
});

export default DiaryWrite;
