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
import {TextInput} from 'react-native-gesture-handler';
import {editMyInfo, getMyInfo} from '../../api/myInfo.api';

const MyInfo = () => {
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  useEffect(() => {
    getMyInfo({setName, setId});
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
      <View>
        <View style={{alignItems: 'center'}}>
          <Image
            style={styles.img}
            source={require('../../assets/images/hamster.png')}
          />
          <Text>예빈맘</Text>
        </View>
        <KeyboardAvoidingView behavior={'height'}>
          <View style={styles.wrap}>
            <View style={styles.form}>
              <Text style={styles.text}>이름</Text>
              <TextInput
                style={styles.input}
                value={name}
                placeholderTextColor={'#cfcfcf'}
                onChangeText={name => {
                  setName(name);
                }}
              />
            </View>
            <View style={styles.form}>
              <Text style={styles.text}>아이디</Text>
              <TextInput
                style={styles.input}
                value={id}
                placeholderTextColor={'#cfcfcf'}
              />
            </View>
            <View style={styles.form}>
              <Text style={styles.text}>비밀번호</Text>
              <TextInput
                style={styles.input}
                placeholder="*********"
                placeholderTextColor={'#cfcfcf'}
                value={pw}
                onChangeText={pw => {
                  setPw(pw);
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      <TouchableOpacity
        onPress={() => {
          editMyInfo({pw, name, id});
        }}
        style={styles.wrapSaveBtn}>
        <Text style={styles.saveBtn}>수정하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    marginTop: 50,
    marginHorizontal: 'auto',
  },
  saveBtn: {
    color: '#666662',
    fontSize: 15,
    fontWeight: 'semibold',
  },
});

export default MyInfo;
