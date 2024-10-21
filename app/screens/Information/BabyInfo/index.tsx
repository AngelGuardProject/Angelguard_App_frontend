import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios'; // Ensure axios is imported if not already
import moment from 'moment';
import {useEffect, useState} from 'react';
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
import {getBabyInfo, updateBaby} from '../../../api/baby.api';

interface Baby {
  baby_id: number;
  baby_name: string;
  baby_sex: string;
  baby_birth?: string;
  baby_height?: number;
  baby_weight?: number;
  user_login_id?: string;
}

const BabyInfo = ({route, navigation}: any) => {
  const [sex, setSex] = useState<string>('female');
  const [birth, setBirth] = useState<string>(''); // State for birth
  const [open, setOpen] = useState(false);
  const [baby, setBaby] = useState<Baby | null>(null);
  const [height, setHeight] = useState<number | string>(''); // Change to number or string
  const [weight, setWeight] = useState<number | string>(''); // Change to number or string

  const {itemId} = route.params;

  useEffect(() => {
    const fetchBabyInfo = async () => {
      const babies = await getBabyInfo();
      const selectedBaby = babies.find(
        (b: {baby_id: any}) => b.baby_id === itemId,
      );
      if (selectedBaby) {
        setBaby(selectedBaby);
        setSex(selectedBaby.baby_sex);
        setBirth(moment(selectedBaby.baby_birth).format('YYYY-MM-DD'));
        setHeight(
          selectedBaby.baby_height ? Number(selectedBaby.baby_height) : '',
        );
        setWeight(
          selectedBaby.baby_weight ? Number(selectedBaby.baby_weight) : '',
        );
      }
    };

    fetchBabyInfo();
  }, [itemId]);

  const handleSave = async () => {
    if (baby) {
      await updateBaby({
        babyId: baby.baby_id,
        name: baby.baby_name,
        sex,
        height: height ? Number(height) : null,
        weight: weight ? Number(weight) : null,
        birth,
        navigation,
      });
    }
  };

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
            <View style={styles.form}>
              <Text style={styles.text}>아이 이름</Text>
              <TextInput
                style={styles.input}
                placeholder="이름을 입력하세요."
                placeholderTextColor={'#cfcfcf'}
                value={baby?.baby_name}
                onChangeText={text =>
                  setBaby(prev => (prev ? {...prev, baby_name: text} : null))
                }
              />
            </View>
            <View style={styles.form}>
              <Text style={styles.text}>아이 생년월일</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setOpen(true)}>
                <Text>{birth || '생년월일을 선택하세요.'}</Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                mode="date"
                date={birth ? new Date(birth) : new Date()}
                onConfirm={date => {
                  const formattedDate = moment(date).format('YYYY-MM-DD');
                  setOpen(false);
                  setBirth(formattedDate);
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
                  style={sex === 'female' ? styles.ClickBtn : styles.btn}>
                  <Text>여아</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSex('male')}
                  style={sex === 'male' ? styles.ClickBtn : styles.btn}>
                  <Text>남아</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.form}>
              <Text style={styles.text}>아이 신체정보</Text>
              <View style={{flexDirection: 'row', width: '90%'}}>
                <TextInput
                  style={styles.inputBody}
                  placeholder="키를 입력하세요."
                  placeholderTextColor={'#cfcfcf'}
                  keyboardType="number-pad"
                  value={height ? String(height) : ''}
                  onChangeText={text => setHeight(Number(text) || '')}
                />
                <Text style={styles.unit}>cm</Text>
                <TextInput
                  style={styles.inputBody}
                  placeholder="몸무게를 입력하세요."
                  placeholderTextColor={'#cfcfcf'}
                  keyboardType="number-pad"
                  value={weight ? String(weight) : ''}
                  onChangeText={text => setWeight(Number(text) || '')}
                />
                <Text style={styles.unit}>kg</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      <TouchableOpacity onPress={handleSave} style={styles.wrapSaveBtn}>
        <Text style={styles.saveBtn}>저장하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  img: {
    width: 112,
    height: 112,
    borderRadius: 62,
    marginHorizontal: 'auto',
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
    color: '#66662',
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
    marginHorizontal: 'auto',
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

export default BabyInfo;
