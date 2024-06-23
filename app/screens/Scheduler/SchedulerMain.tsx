import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function SchedulerMain() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>스케쥴러페이지</Text>
      </View>
    </SafeAreaView>
  );
}

export default SchedulerMain;
