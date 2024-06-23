import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function SchedulerMain() {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>스케쥴러</Text>
      </View>
      <View style={styles.container}>
        <Text>스케쥴러 페이지 입니다.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    height: 48,
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'SUITE',
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SchedulerMain;
