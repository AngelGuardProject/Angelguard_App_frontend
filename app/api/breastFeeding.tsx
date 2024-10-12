import axios from 'axios';

export const AddBreastFeeding = () => {
  axios
    .post('http://34.47.76.73:3000/eat/insertms', {})
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
