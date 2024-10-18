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
import {VLCPlayer} from 'react-native-vlc-media-player';
import {GetAmount} from '../api/amount.api';
import {GetIntake} from '../api/intake.api';

// 한국어로 반환
const getKoreanDay = (dayNumber: number) => {
  const days = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  return days[dayNumber];
};

// 날짜를 원하는 형식으로 변환하는 함수
const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString); // dateString을 Date 객체로 변환
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1해야함...
  const day = date.getDate().toString().padStart(2, '0');
  const dayOfWeek = getKoreanDay(date.getDay()); // 요일 구하기
  return `${year}.${month}.${day} (${dayOfWeek})`;
};

// 현재 시간을 한국어 형식으로 반환함~~~
const formatTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours % 12 || 12; // 12시간 형식으로 변환
  return `${period} ${formattedHours}시 ${minutes}분`;
};

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
  const [intake, setIntake] = useState({});
  const [amount, setAmount] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    getTmp();
    GetAmount({setAmount});
    GetIntake({setIntake});
  }, [isFocused]);

  const getTmp = () => {
    axios
      .get('http://louk342.iptime.org:3010/data?uuid=0')
      .then(res => {
        console.log('온습도 조회 데이터 : ', res.data);
        setTmp(res.data.temp);
        setHm(res.data.humidity);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const currentDateFormatted = formatDate(new Date());
  const currentTimeFormatted = formatTime();

  const pages = [
    {
      date: currentDateFormatted,
      time: currentTimeFormatted,
      day: '+103', // 아이 생일로 며칠째인지
      unit: '',
      image: require('../assets/images/humidity.png'),
    },
    {
      date: currentDateFormatted,
      time: currentTimeFormatted,
      day: hm !== null ? `${hm}` : '-',
      unit: '%',
      image: require('../assets/images/humidity.png'),
    },
    {
      date: currentDateFormatted,
      time: currentTimeFormatted,
      day: tmp !== null ? `${tmp}` : '-',
      unit: '°C',
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
          <VLCPlayer
            style={{width: '100%', height: '100%', borderRadius: 10}}
            videoAspectRatio="16:9"
            source={{uri: 'rtsp://louk342.iptime.org:8554/live.sdp'}}
            onError={error => console.log('VLC 오류: ', error)}
            onBuffering={buffering => console.log('버퍼링 중: ', buffering)}
            onPlaying={() => console.log('재생 중...')}
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
