import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Bluetooth from './bluetooth/Bluetooth';

function Controller() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>컨트롤러</Text>
        <Bluetooth />
      </View>
    </SafeAreaView>
  );
}

export default Controller;
