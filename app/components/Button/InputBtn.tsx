import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const InputBtn = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>저장하기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 312,
    height: 36,
    borderRadius: 30,
    backgroundColor: '#FFF4D6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 61,
  },
  text: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
});

export default InputBtn;
