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
import {deleteDiary} from '../api/diary.api';

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
    if (result?.result) {
      onDelete();
    }
    navigation.navigate('Diary');
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
