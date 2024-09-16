import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const BreastFeeding = () => {
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
          모유 수유 시간을 기록합니다.
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'regular',
            color: '#a6a6a6',
            marginBottom: 46,
          }}>
          어제 모유수유한 시간과 비교한 결과를{'\n'} 알려주어 산모의 건강관리에
          도움을 줍니다.
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#666662', fontSize: 14, fontWeight: 'regular'}}>
          수유 시간대
        </Text>
        <View style={styles.Wrap}>
          <View>
            <Text
              style={{
                fontSize: 11,
                fontWeight: 'regular',
                color: '#a6a6a6',
              }}>
              시작시간
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.bigText}>오후</Text>
              <Text style={styles.bigText}>5:00</Text>
            </View>
            <Text
              style={{
                color: '#666662',
                fontSize: 14,
                fontWeight: 'regular',
                marginTop: 5,
              }}>
              2024년 9월 16일
            </Text>
          </View>
          <View>
            <Text
              style={{fontSize: 11, fontWeight: 'regular', color: '#a6a6a6'}}>
              종료시간
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.bigText}>오후</Text>
              <Text style={styles.bigText}>5:00</Text>
            </View>
            <Text
              style={{
                color: '#666662',
                fontSize: 14,
                fontWeight: 'regular',
                marginTop: 5,
              }}>
              2024년 9월 16일
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.MemoWrap}>
        <Text style={styles.memoTitle}>모유수유 메모</Text>
        <TextInput
          style={styles.Memo}
          placeholder="모유수유 시 특이사항을 입력해주세요."
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
  Wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35,
    width: '70%',
  },
  bigText: {
    color: '#666662',
    fontSize: 18,
    fontWeight: 'regular',
    marginTop: 13,
  },
});

export default BreastFeeding;
