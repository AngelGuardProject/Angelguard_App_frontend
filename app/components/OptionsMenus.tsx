import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type OptionsMenuProps = {
  visible: boolean;
  onClose: () => void;
  onEdit: (title: string, content: string, image: string | null) => void;
  onDelete: () => void;
  babyBoardId: string;
  title: string;
  content: string;
  image: string | null;
};

const deleteDiary = async (diaryId: string) => {
  try {
    const user_login_id = await AsyncStorage.getItem('id');

    if (user_login_id != null) {
      const response = await fetch(
        `http://34.47.76.73:3000/babyboard/${diaryId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user_login_id}`, // If you have an auth token
          },
        },
      );

      const result = await response.json(); // Ensure you read the result

      if (response.status === 200) {
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
        return result;
      } else if (response.status === 403) {
        ToastAndroid.show('서버문제로 실패했습니다.', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          result.message || '일기 삭제에 실패했습니다.',
          ToastAndroid.SHORT,
        );
      }
    }
  } catch (error) {
    console.error(error);
    ToastAndroid.show('일기 삭제에 실패했습니다.', ToastAndroid.SHORT);
  }
};

const OptionsMenu: React.FC<OptionsMenuProps> = ({
  visible,
  onClose,
  onEdit,
  onDelete,
  babyBoardId,
  title,
  content,
  image,
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  if (!visible) return null;

  const handleEdit = () => {
    onEdit(title, content, image);
    navigation.navigate('DiaryWrite', {
      title: title || '',
      content: content || '',
      image: image || null,
      diaryId: babyBoardId,
    });
    onClose();
  };

  const handleDelete = async () => {
    const result = await deleteDiary(babyBoardId);

    if (result && result.result) {
      ToastAndroid.show('삭제되었습니다.', ToastAndroid.SHORT);
      onDelete();
      navigation.navigate('DiaryList'); // Navigate to DiaryList after deletion
    } else {
      ToastAndroid.show('삭제 실패했습니다.', ToastAndroid.SHORT);
    }
    onClose();
  };

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={handleEdit} style={styles.menuItem}>
        <Text style={styles.menuText}>수정</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} style={styles.menuItem}>
        <Text style={styles.menuText}>삭제</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    right: 17,
    top: 80,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  menuText: {
    color: 'black',
  },
});

export default OptionsMenu;
