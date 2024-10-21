import {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getBabyInfo} from '../../api/baby.api';
import {useNavigation} from '@react-navigation/native';

interface PropsType {
  navigation: {
    navigate: (name: string, params?: object) => void;
  };
}

const BabyList = ({navigation}: PropsType) => {
  const [babies, setBabies] = useState<Baby[]>([]);

  useEffect(() => {
    getBabyInfo({setBabies});
  }, []);

  const formateDate = (date: string) => {
    const formate = new Date(date);
    const currentDate = new Date();

    const birth = formate.getFullYear() * 12 + formate.getMonth();
    const current = currentDate.getFullYear() * 12 + currentDate.getMonth();

    return current - birth;
  };

  const getBabyImage = (sex: string) => {
    return sex === 'male'
      ? require('../../assets/images/boy.png')
      : require('../../assets/images/girl.png');
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={{width: '90%'}}>
        {babies.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => {
              console.log(item.baby_id);
              navigation.navigate('BabyInfo', {itemId: item.baby_id});
            }}>
            <Image style={styles.img} source={getBabyImage(item.baby_sex)} />
            <View>
              <Text style={{marginTop: 9, fontSize: 14, color: '#666662'}}>
                {item.baby_name}
              </Text>
              <Text style={{marginTop: 5, fontSize: 12, color: '#a6a6a6'}}>
                {formateDate(item.baby_birth)} 개월
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => navigation.navigate('AddBaby')}
          style={styles.item}>
          <Image
            style={styles.plus}
            source={require('../../assets/images/icons/Plus.png')}
          />
          <Text style={{marginBottom: 4}}>아이 추가하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    borderTopWidth: 0.5,
    borderColor: '#ededed',
    height: 53,
  },
  plus: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  img: {
    width: 28,
    height: 28,
    marginRight: 10,
    marginTop: 15,
    borderRadius: 14,
  },
});

export default BabyList;
