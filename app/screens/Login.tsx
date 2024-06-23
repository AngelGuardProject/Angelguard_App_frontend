import {useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {LoginHandler} from '../api/login.api';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type Props = {
  navigation: {navigate: (name: string) => void};
};

const Login = ({navigation}: Props) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const onChangeID = useCallback((text: string) => {
    setId(text);
  }, []);

  const onChangePW = useCallback((text: string) => {
    setPw(text);
  }, []);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>AngelGuard</Text>
        <Text style={styles.login}>Log In</Text>
        <KeyboardAvoidingView behavior={'padding'}>
          <TextInput
            style={styles.textInputID}
            placeholderTextColor="#d9d9d9"
            placeholder="아이디를 입력해주세요."
            value={id}
            onChangeText={onChangeID}
            autoFocus
          />
          <TextInput
            style={styles.textInputPW}
            placeholderTextColor="#d9d9d9"
            placeholder="비밀번호를 입력해주세요."
            value={pw}
            onChangeText={onChangePW}
            secureTextEntry
            autoFocus
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={() => {
            LoginHandler(id, pw, navigation);
          }}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.toSignup}>아이디가 없다면? 회원가입하러가기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    color: '#666662',
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 114,
  },
  textInputID: {
    marginTop: 31,
    width: 312,
    height: 40,
    color: '#d9d9d9',
    fontSize: 11,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
  },
  login: {
    width: 312,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 31,
  },
  textInputPW: {
    marginTop: 49,
    width: 312,
    height: 40,
    color: '#d9d9d9',
    fontSize: 11,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
  },
  loginBtn: {
    width: 312,
    height: 46,
    borderRadius: 30,
    backgroundColor: '#FFF4D6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 49,
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toSignup: {
    marginTop: 12,
    width: 312,
    textAlign: 'left',
    fontSize: 10,
    color: '#d9d9d9',
  },
});

export default Login;
