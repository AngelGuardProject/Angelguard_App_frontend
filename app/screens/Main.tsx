import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function Main() {
  const [tmp, setTmp] = useState(null);
  const [hm, setHm] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    // getTmp();
  }, [isFocused]);

  // const getTmp = () => {
  //   axios
  //     .get('http://louk342.iptime.org:3010/data?uuid=0')
  //     .then(res => {
  //       console.log(res.data);
  //       setTmp(res.data.temp);
  //       setHm(res.data.hm);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  setInterval(() => {
    // getTmp();
  }, 1000);

  const data = {};

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.header}>
          <View style={styles.headerL}>
            <Text>예빈이</Text>
            <Image
              style={styles.Arrow}
              source={require('../assets/images/Arrow.png')}
            />
          </View>
          <View>
            <Image
              style={styles.headerR}
              source={require('../assets/images/hamburgerBar.png')}
            />
          </View>
        </View>
        <View style={styles.slider}>
          <View style={styles.sliderL}>
            <Text style={{fontSize: 10, fontWeight: 'regular'}}>
              2024.09.10 (화요일)
            </Text>
            <Text style={{fontSize: 10, fontWeight: 'regular'}}>
              오후 11시 30분
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{fontSize: 36, fontWeight: 'semibold', color: 'black'}}>
                31
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'semibold',
                  color: 'black',
                  marginTop: 15,
                  marginLeft: 3,
                }}>
                %
              </Text>
            </View>
          </View>
          <View>
            <Image
              style={styles.img}
              source={require('../assets/images/humidity.png')}
            />
          </View>
        </View>
        <Text style={styles.title}>우리 아기 한눈에 보기</Text>
        <View style={styles.stream}></View>
        <Text style={styles.title}>오늘의 수유시간, 유축량, 섭취량은?</Text>
        <View style={styles.end}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '90%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
    marginTop: 10,
  },
  headerL: {
    flexDirection: 'row',
  },
  Arrow: {
    width: 9,
    height: 9,
    marginVertical: 'auto',
    marginHorizontal: 8,
  },
  headerR: {
    width: 14,
    height: 13,
  },
  slider: {
    backgroundColor: '#fff',
    borderColor: 'endregion',
    width: '90%',
    height: 101,
    borderRadius: 10,
    marginBottom: 26,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderL: {
    marginTop: 17,
    marginLeft: 21,
  },
  img: {
    width: 70,
    height: 70,
    marginTop: 14,
    marginRight: 26,
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
    width: '90%',
    fontWeight: 'regular',
    color: 'black',
  },
  stream: {
    backgroundColor: '#fff',
    borderColor: 'endregion',
    width: '90%',
    height: 235,
    borderRadius: 10,
    marginBottom: 11,
  },
  end: {
    backgroundColor: '#fff',
    borderColor: 'endregion',
    width: '90%',
    height: 168,
    borderRadius: 10,
  },
});

export default Main;
