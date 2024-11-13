import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
import {StackNavigationProp} from '@react-navigation/stack';
import {fetchDiaryList} from '../../api/diary.api';

type DiaryListNavigationProp = StackNavigationProp<any, any>;

const DiaryList: React.FC = () => {
  const navigation = useNavigation<DiaryListNavigationProp>();
  const [diaries, setDiaries] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  const getDiaryList = async () => {
    const data = await fetchDiaryList(pageNum);
    if (data) {
      setDiaries(data.contents);
      setTotalCount(data.totalCount);
    }
  };

  // Use useFocusEffect to refresh diary list when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      getDiaryList(); // Fetch diary list when focused
    }, []),
  );

  const navigateToDiaryDetail = (babyBoardId: string) => {
    navigation.navigate('DiaryDetail', {babyBoardId});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.totalDiaryContainer}>
          <Text style={styles.totalDiaryCount}>전체일기 {totalCount}</Text>
        </View>

        <TouchableOpacity
          style={styles.writeButton}
          onPress={() => navigation.navigate('DiaryWrite')}>
          <Text style={styles.buttonText}>작성하기</Text>
        </TouchableOpacity>

        <ScrollView style={styles.entryContainer}>
          {diaries.map(diary => (
            <TouchableOpacity
              key={diary.baby_board_id}
              style={styles.entryItem}
              onPress={() => navigateToDiaryDetail(diary.baby_board_id)}>
              <View style={styles.entryContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{diary.baby_board_title}</Text>
                  <Text style={styles.description}>
                    {diary.baby_board_content}
                  </Text>
                  <Text style={styles.date}>{diary.baby_board_date}</Text>
                </View>
                {diary.baby_board_image && (
                  <Image
                    source={{
                      uri: `http://34.47.76.73:3000/uploads/${diary.baby_board_image
                        .split('/')
                        .pop()}`,
                    }}
                    style={styles.thumbnail}
                    onError={() =>
                      console.log('Image load failed', diary.baby_board_image)
                    }
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalDiaryContainer: {
    marginTop: 20,
    width: '90%',
  },
  totalDiaryCount: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  writeButton: {
    width: '90%',
    height: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#a6a6a6',
    textAlign: 'right',
  },
  entryContainer: {
    width: '90%',
    marginTop: 20,
  },
  entryItem: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  entryContent: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginTop: 2,
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666662',
    marginBottom: 10,
  },
  date: {
    fontSize: 10,
    fontWeight: '400',
    color: '#A6A6A6',
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginLeft: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default DiaryList;
