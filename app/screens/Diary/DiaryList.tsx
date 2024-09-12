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
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.header}>육아일지</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>전체일기 1</Text>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontFamily: 'SUITE',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  subtitle: {
    marginLeft: 10,
    fontFamily: 'SUITE',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginTop: 10,
    marginBottom: 10,
  },
  writeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'SUITE',
    fontSize: 14,
    fontWeight: '400',
    color: '#707070 ',
  },
  entryContainer: {
    marginTop: 10,
    textAlign: 'center',
  },
  entryItem: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
