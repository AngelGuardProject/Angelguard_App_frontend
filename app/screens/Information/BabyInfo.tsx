import {
  SafeAreaView,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const BabyInfo = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
      <View>
        <View>
          <Image
            style={styles.img}
            source={require('../../assets/images/hamster.png')}
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
              />
            </View>
            <View style={styles.form}>
              <Text style={styles.text}>아이 생년월일</Text>
              <TextInput
                style={styles.input}
                placeholder="이름을 입력하세요."
                placeholderTextColor={'#cfcfcf'}
              />
            </View>
            <View style={styles.form}>
              <Text style={styles.text}>아이 성별</Text>
              <View style={{flexDirection: 'row', width: '90%'}}>
                <TouchableOpacity style={styles.ClickBtn}>
                  <Text>여아</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text>남아</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.form}>
              <Text style={styles.text}>아이 신체정보</Text>
              <View style={{flexDirection: 'row', width: '90%'}}>
                <TextInput
                  style={styles.inputBody}
                  placeholderTextColor={'#cfcfcf'}
                />
                <Text style={styles.unit}>cm</Text>
                <TextInput
                  style={styles.inputBody}
                  placeholderTextColor={'#cfcfcf'}
                />
                <Text style={styles.unit}>kg</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      <TouchableOpacity style={styles.wrapSaveBtn}>
        <Text style={styles.saveBtn}>저장하기</Text>
      </TouchableOpacity>
    </View>
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
