import moment from 'moment';
import {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-gesture-handler';
import {addBaby} from '../../../api/baby.api';
import {useNavigation} from '@react-navigation/native';

const AddBaby = () => {
  const [name, setName] = useState<string>('');
  const [sex, setSex] = useState<string>('female');
  const [height, setHeight] = useState<number | null>(null); // Changed to number | null
  const [weight, setWeight] = useState<number | null>(null); // Changed to number | null
  const [birth, setBirth] = useState<string>('');
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
      <View>
        <View>
          <Image
            style={styles.img}
            source={
              sex === 'female'
                ? require('../../../assets/images/girl.png')
                : require('../../../assets/images/boy.png')
            }
          />
        </View>
        <KeyboardAvoidingView behavior={'height'}>
          <View style={styles.wrap}>
            {/* 아이 이름 입력 */}
            <View style={styles.form}>
              <Text style={styles.text}>아이 이름</Text>
              <TextInput
                style={styles.input}
                placeholder="이름을 입력하세요."
                placeholderTextColor={'#cfcfcf'}
                onChangeText={setName}
              />
            </View>

            {/* 생년월일 선택 */}
            <View style={styles.form}>
              <Text style={styles.text}>아이 생년월일</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setOpen(true)}>
                <Text>{birth}</Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                mode="date"
                date={new Date()}
                onConfirm={date => {
                  const birth =
                    date.getFullYear() +
                    '-' +
                    (date.getMonth() + 1) +
                    '-' +
                    date.getDate();
                  setOpen(false);
                  setBirth(birth);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
            <View style={styles.form}>
              <Text style={styles.text}>아이 성별</Text>
              <View style={{flexDirection: 'row', width: '90%'}}>
                <TouchableOpacity
                  onPress={() => setSex('female')}
                  style={sex == 'female' ? styles.ClickBtn : styles.btn}>
                  <Text>여아</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSex('male')}
                  style={sex == 'male' ? styles.ClickBtn : styles.btn}>
                  <Text>남아</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 신체 정보 입력 */}
            <View style={styles.form}>
              <Text style={styles.text}>아이 신체정보</Text>
              <View style={{flexDirection: 'row', width: '90%'}}>
                <TextInput
                  style={styles.inputBody}
                  placeholder="키"
                  placeholderTextColor={'#cfcfcf'}
                  keyboardType="number-pad"
                  onChangeText={text => setHeight(Number(text) || null)} // Convert input to number
                />
                <Text style={styles.unit}>cm</Text>
                <TextInput
                  style={styles.inputBody}
                  placeholder="몸무게"
                  placeholderTextColor={'#cfcfcf'}
                  keyboardType="number-pad"
                  onChangeText={text => setWeight(Number(text) || null)} // Convert input to number
                />
                <Text style={styles.unit}>kg</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>

      <TouchableOpacity
        onPress={() => {
          addBaby({name, sex, height, weight, birth, navigation});
        }}
        style={styles.wrapSaveBtn}>
        <Text style={styles.saveBtn}>저장하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 112,
    height: 112,
    borderRadius: 62,
    alignSelf: 'center',
    marginBottom: 23,
  },
  wrap: {
    width: '100%',
  },
  form: {
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    width: '90%',
    height: 46,
    borderColor: '#d9d9d9',
    borderBottomWidth: 0.8,
    paddingLeft: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: 'regular',
    color: '#666662',
    marginBottom: 13,
    width: '90%',
  },
  inputBody: {
    width: 80,
    height: 46,
    borderBottomWidth: 0.8,
    borderColor: '#d9d9d9',
    marginRight: 5,
  },
  btn: {
    width: 104,
    height: 36,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 19,
    borderColor: '#666662',
  },
  ClickBtn: {
    width: 104,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF4D6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 19,
  },
  wrapSaveBtn: {
    width: '90%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF4D6',
    borderRadius: 10,
    marginTop: 35,
    alignSelf: 'center',
  },
  saveBtn: {
    color: '#666662',
    fontSize: 15,
    fontWeight: 'semibold',
  },
  unit: {
    fontSize: 14,
    fontWeight: 'regular',
    color: '#cfcfcf',
    marginTop: 26,
    marginRight: 20,
  },
});

export default AddBaby;
