import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCallback, useState} from 'react';
import {AddAmount} from '../../api/amount.api';

interface PropsType {
  navigation: {navigate: (name: string) => void};
  route: any;
}

const Amount = ({navigation, route}: PropsType) => {
  const [amount, setAmount] = useState(0);
  const {babyName} = route.params;

  const plusAmount = (addAmount: number) => {
    setAmount(amount + addAmount);
  };

  const onChangeAmount = useCallback((text: string) => {
    setAmount(parseInt(text));
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
      }}>
      <View style={{width: '90%'}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'semibold',
            color: '#666662',
            marginBottom: 6,
          }}>
          유축량을 기록합니다.
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'regular',
            color: '#a6a6a6',
            marginBottom: 46,
          }}>
          어제 유축량과 비교하여 산모의 건강관리에 도움을 줍니다.
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>유축량</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.input}
            value={amount.toString()}
            onChangeText={onChangeAmount}
            keyboardType="number-pad"
          />
          <Text style={{marginTop: 30, marginLeft: 15}}>ml</Text>
        </View>
      </View>
      <View style={styles.addBtns}>
        <TouchableOpacity
          onPress={() => {
            plusAmount(5);
          }}
          style={styles.addBtn}>
          <Text style={styles.BtnText}>+5ml</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            plusAmount(10);
          }}
          style={styles.addBtn}>
          <Text style={styles.BtnText}>+10ml</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            plusAmount(50);
          }}
          style={styles.addBtn}>
          <Text style={styles.BtnText}>+50ml</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            plusAmount(100);
          }}
          style={styles.addBtn}>
          <Text style={styles.BtnText}>+100ml</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          AddAmount({amount, babyName});
          navigation.navigate('Main');
        }}
        style={styles.wrapSaveBtn}>
        <Text style={styles.saveBtn}>저장하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addBtns: {
    flexDirection: 'row',
    marginTop: 32,
    justifyContent: 'space-between',
    width: '90%',
  },
  addBtn: {
    width: 65,
    height: 28,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 10,
    color: '#a6a6a6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtnText: {
    fontSize: 12,
    color: '#a6a6a6',
  },
  input: {
    width: 132,
    borderBottomWidth: 1,
    borderBottomColor: '#666662',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  wrapSaveBtn: {
    width: '90%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF4D6',
    borderRadius: 10,
    marginTop: 105,
  },
  saveBtn: {
    color: '#666662',
    fontSize: 15,
  },
});

export default Amount;
