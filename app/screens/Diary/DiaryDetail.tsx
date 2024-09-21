import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {HeaderLeft, HeaderRight} from '../../components/Header/MainHeader';
import SelectBabyModal from '../../components/Modal/SelectBabyModal';

type DiaryDetailProps = {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
};

const DiaryDetail: React.FC<DiaryDetailProps> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.header}>
          <HeaderLeft onPress={() => setModalVisible(true)} />
          <HeaderRight onPress={() => navigation.openDrawer()} />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>9월 첫주 일기</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>2024. 9. 13. 14:10</Text>
            <Image
              source={require('../../assets/images/icons/dotmenuBar.png')}
              style={styles.icon}
            />
          </View>
        </View>

        <View style={styles.depContainer}>
          <Text style={styles.depText}>가을이 오고있어요</Text>
          <Image
            source={require('../../assets/images/hamster.png')}
            style={styles.hamsterImage}
          />
        </View>
      </View>
      <SelectBabyModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '90%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
    marginTop: 10,
  },
  titleContainer: {
    marginTop: 10,
    paddingTop: 15,
    width: '90%',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    paddingBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    textAlign: 'left',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  date: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'right',
    marginRight: 7,
  },
  icon: {
    width: 15,
    height: 16,
  },

  // New styles for depContainer
  depContainer: {
    width: '90%',
    marginTop: 21,
  },
  depText: {
    textAlign: 'left',
    fontSize: 15,
    color: 'black',
    marginBottom: 21,
  },
  hamsterImage: {
    width: '100%',
    height: 310,
    resizeMode: 'cover',
  },
});

export default DiaryDetail;
