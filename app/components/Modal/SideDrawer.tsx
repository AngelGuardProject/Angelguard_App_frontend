import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

const SideDrawer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.img}
          source={require('../../assets/images/hamster.png')}
        />
        <View>
          <Text style={{fontSize: 16, fontWeight: 'medium', color: 'black'}}>
            혜림맘
          </Text>
          <Text style={{fontSize: 11, fontWeight: 'medium', color: '#666662'}}>
            hyerim
          </Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.list}>
        <TouchableOpacity style={styles.item}>
          <Image
            style={styles.icon}
            source={require('../../assets/images/icons/Person.png')}
          />
          <Text style={styles.listText}>내 정보 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image
            source={require('../../assets/images/icons/Baby.png')}
            style={styles.icon}
          />
          <Text style={styles.listText}>아이 정보 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image
            source={require('../../assets/images/icons/Logout.png')}
            style={styles.icon}
          />
          <Text style={styles.listText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  img: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginLeft: 29,
  },
  line: {
    width: 233,
    height: 0.5,
    backgroundColor: '#d9d9d9',
    marginHorizontal: 'auto',
  },
  list: {},
  item: {
    height: 36,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 29,
    marginRight: 6,
  },
  listText: {
    fontSize: 13,
    fontWeight: 'regular',
    color: 'black',
  },
});

export default SideDrawer;
