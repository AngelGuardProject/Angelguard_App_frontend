import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const BreastFeeding = () => {
  console.log(new Date());
  const date = new Date();
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startTime, setStartTime] = useState(
    `${date.getHours()} : ${date.getMinutes()}`,
  );
  const [endTime, setEndTime] = useState(
    `${date.getHours()} : ${date.getMinutes()}`,
  );
  const [pm, setPm] = useState<String>(
    `${date.getHours() >= 12 ? '오후' : '오전'}`,
  );
  const [pm1, setPm1] = useState<String>(
    `${date.getHours() >= 12 ? '오후' : '오전'}`,
  );
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
            <TouchableOpacity
              onPress={() => setStartOpen(true)}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.bigText}>{pm}</Text>
              <Text style={styles.bigText}>{startTime}</Text>
              <DatePicker
                modal
                open={startOpen}
                mode="time"
                date={new Date()}
                onConfirm={time => {
                  const startTime =
                    time.getHours() +
                    ':' +
                    (time.getMinutes() < 10
                      ? '0' + time.getMinutes()
                      : time.getMinutes());
                  setPm(time.getHours() >= 12 ? '오후' : '오전');
                  setStartOpen(false);
                  setStartTime(startTime);
                }}
                onCancel={() => {
                  setStartOpen(false);
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#666662',
                fontSize: 14,
                fontWeight: 'regular',
                marginTop: 5,
              }}>
              {date.getFullYear() +
                '년 ' +
                (date.getMonth() + 1) +
                '월 ' +
                date.getDate() +
                '일 '}
            </Text>
          </View>
          <View>
            <Text
              style={{fontSize: 11, fontWeight: 'regular', color: '#a6a6a6'}}>
              종료시간
            </Text>
            <TouchableOpacity
              onPress={() => setEndOpen(true)}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.bigText}>{pm1}</Text>
              <Text style={styles.bigText}>{endTime}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={endOpen}
              mode="time"
              date={new Date()}
              onConfirm={time => {
                const endTime =
                  time.getHours() +
                  ':' +
                  (time.getMinutes() < 10
                    ? '0' + time.getMinutes()
                    : time.getMinutes());
                setPm1(time.getHours() >= 12 ? '오후' : '오전');
                setEndOpen(false);
                setEndTime(endTime);
              }}
              onCancel={() => {
                setEndOpen(false);
              }}
            />
            <Text
              style={{
                color: '#666662',
                fontSize: 14,
                fontWeight: 'regular',
                marginTop: 5,
              }}>
              {date.getFullYear() +
                '년 ' +
                (date.getMonth() + 1) +
                '월 ' +
                date.getDate() +
                '일 '}
            </Text>
          </View>
        </View>
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
    marginTop: 105,
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
