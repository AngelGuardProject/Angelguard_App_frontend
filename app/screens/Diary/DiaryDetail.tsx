import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type DiaryDetailProps = {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
};

const DiaryDetail: React.FC<DiaryDetailProps> = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/icons/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerText}>6월 2일 일요일</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>기분 최고였던 하루~</Text>
        <Text style={styles.description}>
          우리 아이가 좋아하는 이유식도 만들고, 이웃집이랑 인사도 나누었던
          하루였다. 육아에 대해서 더더욱 배우게 되었다. 좋은 하루였다. 언젠가는
          완벽한 부모가 되길 바라며.
        </Text>
        <Image
          source={require('../../assets/images/icons/diary1.png')} // 이미지 경로 설정
          style={styles.image}
          resizeMode="cover"
        />
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
  backIcon: {
    width: 15,
    height: 15,
  },
  goback: {
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    marginTop: 30,
  },
  title: {
    fontFamily: 'SUITE',
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
  },
  description: {
    fontFamily: 'SUITE',
    fontSize: 14,
    fontWeight: '400',
    color: '#666662',
    lineHeight: 20,
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: 350,
    borderRadius: 20,
  },
});

export default DiaryDetail;
