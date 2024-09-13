import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function ConnectMobile() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Image
            source={require('../../assets/images/icons/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.DepContent}>
        <View style={styles.bluetoothContainer}>
          <Text style={styles.bluetoothText}>Bluetooth</Text>
        </View>
        <View>
          <Text style={styles.bluetoothDep}>
            근처에 모빌이 켜져 있는지 확인해주세요.
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.scanButton}>
        <Text style={styles.scanButtonText}>Scan</Text>
      </TouchableOpacity>
      <View style={styles.mobileContent}>
        <Text style={styles.mobileName}>BabyMobile1</Text>
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mobileContent}>
        <Text style={styles.mobileName}>BabyMobile1</Text>
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mobileContent}>
        <Text style={styles.mobileName}>BabyMobile1</Text>
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  backImage: {
    width: 16,
    height: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333333',
    flex: 1,
  },
  DepContent: {
    marginTop: 33,
    marginBottom: 35,
  },
  bluetoothContainer: {
    marginBottom: 8,
  },
  bluetoothText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#666666',
    textAlign: 'center',
  },
  bluetoothDep: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    textAlign: 'center',
  },
  scanButton: {
    marginBottom: 30,
    width: 170,
    height: 50,
    alignItems: 'center',
    backgroundColor: '#FFEDCC',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignSelf: 'center',
  },
  scanButtonText: {
    fontSize: 16,
    color: '#666662',
    fontWeight: '400',
  },
  mobileContent: {
    flexDirection: 'row', // 가로 정렬
    justifyContent: 'space-between', // 왼쪽과 오른쪽 끝으로 정렬
    alignItems: 'center', // 세로 정렬
    marginTop: 20, // 여백 추가
    borderBottomWidth: 1, // 하단 테두리 두께
    borderBottomColor: '#E4E4E4', // 하단 테두리 색상
    paddingBottom: 15, // 하단 여백
  },
  mobileName: {
    fontSize: 16,
    fontWeight: '300',
    color: '#000000',
  },
  connectButton: {
    borderColor: '#d9d9d9',
    borderWidth: 0.5,
    borderRadius: 15, // 수정된 부분: 반경을 20으로 설정
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  connectButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
  },
});

export default ConnectMobile;
