import {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const Memo = () => {
  return (
    <View style={styles.MemoWrap}>
      <Text style={styles.memoTitle}>유축량 메모</Text>
      <TextInput
        // multiline={true}
        onFocus={() => console.log('Input focused')}
        style={styles.Memo}
        placeholder="유축 시 특이사항을 입력해주세요."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MemoWrap: {
    marginTop: 62,
    width: '90%',
    marginBottom: 25,
  },
  memoTitle: {
    fontSize: 14,
    color: '#666662',
  },
  Memo: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#666662',
    height: 157,
    marginTop: 15,
    borderRadius: 10,
    textAlignVertical: 'top',
  },
});

export default Memo;
