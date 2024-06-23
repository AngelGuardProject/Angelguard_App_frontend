import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function Main() {
  const [tmp, setTmp] = useState();
  const [hm, setHm] = useState();
  useEffect(() => {
    getTmp();
  }, []);
  const getTmp = () => {
    axios
      .get('http://louk342.iptime.org:3010/data?uuid=0')
      .then(res => {
        console.log(res.data);
        setTmp(res.data.temp);
        setHm(res.data.hm);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>메인페이지</Text>
        <Text>현재 온도 : {tmp}</Text>
        <Text>현재 습도 : {hm}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Main;
