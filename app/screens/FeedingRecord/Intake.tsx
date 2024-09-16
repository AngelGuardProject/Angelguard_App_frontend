import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Intake = () => {
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <View style={{width: '90%'}}>
        <Text
          style={{
            marginTop: 50,
            fontSize: 20,
            fontWeight: 'semibold',
            color: '#666662',
            marginBottom: 6,
          }}>
          아이의 섭취량을 기록합니다.
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'regular',
            color: '#a6a6a6',
            marginBottom: 46,
          }}>
          어제 아이의 섭취량과 비교하여 아이 건강관리에 도움을 줍니다.
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>섭취량</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput style={styles.input} />
          <Text style={{marginTop: 30, marginLeft: 15}}>ml</Text>
        </View>
      </View>
      <View style={styles.addBtns}>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.BtnText}>+5ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.BtnText}>+10ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.BtnText}>+50ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.BtnText}>+100ml</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.MemoWrap}>
        <Text style={styles.memoTitle}>섭취량 메모</Text>
        <TextInput
          style={styles.Memo}
          placeholder="섭취 시 특이사항을 입력해주세요."
        />
      </View>
      <TouchableOpacity style={styles.wrapSaveBtn}>
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
  },
  MemoWrap: {
    marginTop: 62,
    width: '90%',
    height: '40%',
  },
  memoTitle: {
    fontSize: 14,
    color: '#666662',
  },
  Memo: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#666662',
    height: '80%',
    marginTop: 15,
    borderRadius: 10,
  },
  wrapSaveBtn: {
    width: '90%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF4D6',
    borderRadius: 10,
  },
  saveBtn: {
    color: '#666662',
    fontSize: 15,
  },
});

export default Intake;
