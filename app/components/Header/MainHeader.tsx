import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const HeaderLeft = ({onPress, babyName}: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.headerL}>
      <Text>{babyName}</Text>
      <Image
        style={styles.Arrow}
        source={require('../../assets/images/icons/Arrow.png')}
      />
    </TouchableOpacity>
  );
};

export const HeaderRight = ({onPress}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles.headerR}
        source={require('../../assets/images/icons/hamburgerBar.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerL: {
    flexDirection: 'row',
  },
  Arrow: {
    width: 9,
    height: 9,
    marginVertical: 'auto',
    marginHorizontal: 8,
  },
  headerR: {
    width: 14,
    height: 13,
  },
});
