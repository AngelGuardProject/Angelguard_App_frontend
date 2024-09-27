import {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getBabyInfo} from '../../api/baby.api';

interface PropsType {
  navigation: {navigate: (name: string) => void};
}

const BabyList = ({navigation}: PropsType) => {
  const [babies, setBabies] = useState<Baby[]>([]);
  useEffect(() => {
    getBabyInfo({setBabies});
  }, []);
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={{width: '90%'}}>
        {babies.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => navigation.navigate('BabyInfo')}>
            <Image
              style={styles.img}
              source={require('../../assets/images/hamster.png')}
            />
            <View>
              <Text style={{marginTop: 9, fontSize: 14, color: '#666662'}}>
                {item.baby_name}
              </Text>
              <Text style={{marginTop: 5, fontSize: 12, color: '#a6a6a6'}}>
                {item.baby_birth}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => navigation.navigate('BabyInfo')}
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
