import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
// Define the navigation prop types
type DiaryListNavigationProp = StackNavigationProp<any, any>;

const DiaryList: React.FC = () => {
  const navigation = useNavigation<DiaryListNavigationProp>();

  const navigateToDiaryDetail = () => {
    navigation.navigate('DiaryDetail');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>육아일지</Text>
        </View>

        <View style={styles.totalDiaryContainer}>
          <Text style={styles.totalDiaryCount}>전체일기 1</Text>
        </View>

        <TouchableOpacity
          style={styles.writeButton}
          onPress={() => navigation.navigate('DiaryWrite')}>
          <Text style={styles.buttonText}>작성하기</Text>
        </TouchableOpacity>

        <View style={styles.entryContainer}>
          <TouchableOpacity
            style={styles.entryItem}
            onPress={navigateToDiaryDetail}>
            <View style={styles.entryContent}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>오늘 기분 최상이다.</Text>
                <Text style={styles.description}>
                  우리 아이가 좋아하는 이유식도 만들고, 이웃집이랑 인 사도
                  나누었던 하루였다...
                </Text>
                <Text style={styles.date}>2024년 6월 2일</Text>
              </View>
              <Image
                source={require('../../assets/images/icons/diary1.png')}
                style={styles.thumbnail}
              />
            </View>
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
    marginBottom: 10,
  },
  header: {
    fontFamily: 'SUITE',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  totalDiaryContainer: {
    marginTop: 20,
    width: '90%',
    height: 30,
    textAlign: 'left',
    flexDirection: 'row',
  },
  totalDiaryCount: {
    fontFamily: 'SUITE',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  writeButton: {width: '90%', height: 20, marginTop: 20},
  buttonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#a6a6a6',
    textAlign: 'right',
  },
  entryContainer: {width: '90%', marginTop: 20, textAlign: 'center'},
  entryItem: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
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
    fontFamily: 'SUITE',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginTop: 2,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'SUITE',
    fontSize: 12,
    fontWeight: '400',
    color: '#666662',
    marginBottom: 5,
  },
  date: {
    fontFamily: 'SUITE',
    fontSize: 10,
    fontWeight: '400',
    color: '#A6A6A6',
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginLeft: 10,
  },
});

export default DiaryList;
