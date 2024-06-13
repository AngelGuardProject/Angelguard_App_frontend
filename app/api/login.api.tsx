import axios from 'axios';

export const LoginHandler = (
  id: string,
  pw: string,
  navigation: {navigate: (name: string) => void},
) => {
  console.log(id, pw);
  axios
    .post('http://louk342.iptime.org:3000/user/login', {
      user_login_id: id,
      pw: pw,
    })
    .then(res => {
      if (res.status == 200) {
        navigation.navigate('Main');
      }
    })
    .catch(err => {
      console.log(err);
    });
};
