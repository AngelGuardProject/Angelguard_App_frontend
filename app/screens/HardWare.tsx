// HardWare.js

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const HardWare = () => {
  return (
    <View style={styles.container}>
      <Text>하드웨어</Text>
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

export default HardWare;
