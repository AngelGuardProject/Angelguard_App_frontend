import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

function Controller() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>우리 아이 모빌 등록하기</Text>
          <View style={styles.subTextContainer}>
            <Text style={styles.subText}>
              이곳에서 모빌을 등록하고, 모빌을 움직이고 아이에게 음성을 전달할
              수 있어요.
            </Text>
          </View>
        </View>
        <View style={styles.connectContainer}>
          <Text style={styles.connectTitle}>Baby Mobile Connect</Text>
          <View style={styles.connectBox}>
            <Text style={styles.connectStatus}>연결된 기기가 없습니다.</Text>
            <View style={styles.connectButtonContainer}>
              <TouchableOpacity
                style={styles.connectButton}
                // onPress={() => {
                //  navigation.navigate('ConnectMobile');
                // }}
              >
                <Text style={styles.connectButtonText}>Connect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.iconBox}>
            <Text style={styles.iconText}>Mobile</Text>
            <TouchableOpacity style={styles.iconTouchable}>
              <Image
                style={styles.iconImage}
                source={require('../../assets/images/icons/BabyMobile.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconBox}>
            <Text style={styles.iconText}>Voice</Text>
            <TouchableOpacity style={styles.iconTouchable}>
              <Image
                style={styles.iconImage}
                source={require('../../assets/images/icons/microphone.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
//큰 폰에서 다시 켜보기
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  header: {
    width: '90%',
    marginTop: 30,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    fontFamily: 'SUITE',
  },
  subTextContainer: {
    marginTop: 12,
  },
  subText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#666662',
    fontFamily: 'SUITE',
  },
  connectContainer: {width: '90%', marginBottom: 15},
  connectTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333333',
    marginBottom: 18,
    fontFamily: 'SUITE',
  },
  connectBox: {
    width: '100%',
    height: height * 0.4,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectStatus: {
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 14,
    color: '#a6a6a6',
    marginBottom: 21,
    fontFamily: 'SUITE',
  },
  connectButtonContainer: {
    alignItems: 'center',
  },
  connectButton: {
    alignItems: 'center',
    width: 160,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: '#FFEDCC',
    borderRadius: 10,
  },
  connectButtonText: {
    fontSize: 16,
    color: '#666662',
    fontWeight: '600',
    fontFamily: 'SUITE',
  },
  iconContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '300',
    marginBottom: 8,
    fontFamily: 'SUITE',
    textAlign: 'left',
  },
  iconBox: {
    width: '50%',
    height: height * 0.2,
  },
  iconTouchable: {
    width: '95%',
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2}, // 그림자 오프셋
    shadowOpacity: 0.2, // 그림자 투명도
    shadowRadius: 3, // 그림자 반경
    elevation: 3,
  },
  iconImage: {
    width: 100,
    height: 100,
  },
});

export default Controller;
