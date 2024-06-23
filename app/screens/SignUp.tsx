import React, {useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {SignUpHandler} from '../api/signup.api';
type Props = {
  navigation: {navigate: (name: string) => void};
};

const SignUp = ({navigation}: Props) => {
  const [nickname, setNickname] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onChangeId = useCallback((text: string) => {
    setId(text);
  }, []);

  const onChangeNickname = useCallback((text: string) => {
    setNickname(text);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPw(text);
  }, []);

  const onChangeConfirmPassword = useCallback((text: string) => {
    setConfirmPassword(text);
  }, []);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.signup}>Sign Up</Text>
        <KeyboardAvoidingView behavior={'padding'} style={styles.form}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#d9d9d9"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChangeText={onChangeNickname}
            autoFocus
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#d9d9d9"
            placeholder="아이디를 입력해주세요."
            value={id}
            onChangeText={onChangeId}
            autoFocus
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#d9d9d9"
            placeholder="비밀번호를 입력해주세요."
            value={pw}
            onChangeText={onChangePassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#d9d9d9"
            placeholder="비밀번호를 다시 입력해주세요."
            value={confirmPassword}
            onChangeText={onChangeConfirmPassword}
            secureTextEntry
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={() => {
            SignUpHandler(nickname, id, pw, navigation);
          }}
          style={styles.signupBtn}>
          <Text style={styles.signupText}>Sign Up</Text>
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
    justifyContent: 'center',
  },
  signup: {
    width: 312,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 49,
  },
  form: {
    width: '100%',
  },
  input: {
    width: 312,
    height: 40,
    color: '#d9d9d9',
    fontSize: 11,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
    marginBottom: 49,
  },
  signupBtn: {
    width: 312,
    height: 46,
    borderRadius: 30,
    backgroundColor: '#FFF4D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    color: 'blue',
  },
});

export default SignUp;
