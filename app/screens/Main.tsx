import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainCarousel from '../components/Carousel/MainCarousel';
import {HeaderLeft, HeaderRight} from '../components/Header/MainHeader';
import SelectBabyModal from '../components/Modal/SelectBabyModal';
import YoutubeIframe from 'react-native-youtube-iframe';

type Props = {
  navigation: {
    openDrawer(): void;
    navigate: (name: string) => void;
  };
};

function Main({navigation}: Props) {
  const [tmp, setTmp] = useState(null);
  const [hm, setHm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    // getTmp();
  }, [isFocused]);

  // const getTmp = () => {
  //   axios
  //     .get('http://louk342.iptime.org:3010/data?uuid=0')
  //     .then(res => {
  //       console.log(res.data);
  //       setTmp(res.data.temp);
  //       setHm(res.data.hm);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  setInterval(() => {
    // getTmp();
  }, 1000);

  const pages = [
    {
      date: '2024.09.16 (월요일)',
      time: '오후 2시 33분',
      day: '+103',
      unit: '',
      image: require('../assets/images/humidity.png'),
    },
    {
      date: '2024.09.16 (월요일)',
      time: '오후 2시 33분',
      day: '31',
      unit: '%',
      image: require('../assets/images/humidity.png'),
    },
    {
      date: '2024.09.16 (월요일)',
      time: '오후 2시 33분',
      day: '29',
      unit: 'C',
      image: require('../assets/images/humidity.png'),
    },
  ];

  const screenWidth = Math.round(Dimensions.get('window').width);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.header}>
          <HeaderLeft onPress={() => setModalVisible(true)} />
          <HeaderRight onPress={() => navigation.openDrawer()} />
        </View>
        <MainCarousel
          gap={13}
          offset={10}
          pageWidth={screenWidth - (13 + 10) * 2}
          pages={pages}
        />

        <Text style={styles.title}>우리 아기 한눈에 보기</Text>
        <View style={styles.stream}>
          <YoutubeIframe
            width={353}
            height={400}
            play={true}
            videoId="c6ujwBpQ-XI"
          />
        </View>
        <Text style={styles.title}>오늘의 수유시간, 유축량, 섭취량은?</Text>
        <View style={styles.end}>
          <TouchableOpacity
            style={styles.TouchInput}
            onPress={() => {
              navigation.navigate('BreastFeeding');
            }}>
            <View style={styles.endLeft}>
              <Image
                style={styles.inputImage}
                source={require('../assets/images/mom.png')}
              />
              <Text style={styles.inputLeftText}>
                어제보다 30분 빨리 수유했어요.
              </Text>
            </View>
            <View style={styles.endRight}>
              <Text style={styles.inputText}>입력하기</Text>
              <Image
                style={{width: 10, height: 10, marginLeft: 3, marginRight: 16}}
                source={require('../assets/images/icons/ArrowRight.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.TouchInput}
            onPress={() => {
              navigation.navigate('Amount');
            }}>
            <View style={styles.endLeft}>
              <Image
                style={styles.inputImage}
                source={require('../assets/images/feedingBottle.png')}
              />
              <Text style={styles.inputLeftText}>
                어제보다 20ml 더 많이 유축했어요.
              </Text>
            </View>

            <View style={styles.endRight}>
              <Text style={styles.inputText}>입력하기</Text>
              <Image
                style={{width: 10, height: 10, marginLeft: 3, marginRight: 16}}
                source={require('../assets/images/icons/ArrowRight.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.TouchInput}
            onPress={() => {
              navigation.navigate('Intake');
            }}>
            <View style={styles.endLeft}>
              <Image
                style={styles.inputImage}
                source={require('../assets/images/baby.png')}
              />
              <Text style={styles.inputLeftText}>
                어제보다 50ml 더 많이 먹었어요.
              </Text>
            </View>
            <View style={styles.endRight}>
              <Text style={styles.inputText}>입력하기</Text>
              <Image
                style={{width: 10, height: 10, marginLeft: 3, marginRight: 16}}
                source={require('../assets/images/icons/ArrowRight.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <SelectBabyModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '90%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
    marginTop: 10,
  },

  slider: {
    backgroundColor: '#fff',
    borderColor: 'endregion',
    width: '90%',
    height: 101,
    borderRadius: 10,
    marginBottom: 26,

    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: {width: 0, height: 2}, // 그림자 오프셋
    shadowOpacity: 0.2, // 그림자 투명도
    shadowRadius: 3, // 그림자 반경
    elevation: 3,
  },
  sliderL: {
    marginTop: 17,
    marginLeft: 21,
  },
  img: {
    width: 70,
    height: 70,
    marginTop: 14,
    marginRight: 26,
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
    width: '90%',
    fontWeight: 'regular',
    color: 'black',
  },
  stream: {
    backgroundColor: '#fff',
    borderColor: 'endregion',
    width: '90%',
    height: 235,
    borderRadius: 10,
    marginBottom: 11,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    paddingTop: 20,
  },
  end: {
    backgroundColor: '#fff',
    borderColor: 'endregion',
    width: '90%',
    height: 168,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  TouchInput: {
    width: '100%',
    height: 56,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  endLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  endRight: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    color: '#666662',
    fontSize: 10,
  },
  inputImage: {
    width: 27,
    height: 28,
    marginRight: 14,
    marginLeft: 23,
  },
  inputLeftText: {
    fontSize: 11,
    color: 'black',
    fontWeight: 'medium',
  },
});

export default Main;
