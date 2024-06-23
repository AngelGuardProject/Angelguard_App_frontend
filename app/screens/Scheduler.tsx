// Scheduler.js

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Scheduler = () => {
  return (
    <View style={styles.container}>
      <Text>스케쥴러</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Scheduler;
