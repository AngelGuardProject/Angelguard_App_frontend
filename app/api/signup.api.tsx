import axios from 'axios';

export const SignUpHandler = (
  username: string,
  user_login_id: string,
  pw: string,
  navigation: {navigate: (name: string) => void},
) => {
  axios
    .post('http://louk342.iptime.org:3000/user/signUp', {
      username: username,
      user_login_id: user_login_id,
      pw: pw,
    })
    .then(res => {
      if (res.status === 200) {
        navigation.navigate('Main');
      }
    })
    .catch(err => {
      console.log('SignUp error:', err);
    });
};
