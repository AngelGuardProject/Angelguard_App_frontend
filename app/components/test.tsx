import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Bluetooth from '../screens/bluetooth/Bluetooth';
function test() {
  return (
    /*컨트롤러 페이지에 있던 bluetooth연결 import 코드 */
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> </Text>
        <Bluetooth />
      </View>
    </SafeAreaView>
  );
}

export default test;
