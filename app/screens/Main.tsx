import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
import {GetBreastFeeding} from '../api/breastFeeding';
import {getBabyInfo} from '../api/baby.api';

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

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const dayOfWeek = getKoreanDay(date.getDay());
  return `${year}.${month}.${day} (${dayOfWeek})`;
};

const formatTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours % 12 || 12;
  return `${period} ${formattedHours}시 ${minutes}분`;
};

type Props = {
  navigation: {
    openDrawer(): void;
    navigate: (name: string, params?: {babyName: string}) => void;
  };
};

function Main({navigation}: Props) {
  const [tmp, setTmp] = useState(null);
  const [hm, setHm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [intake, setIntake] = useState<getIntake>({
    yesterday_amount: 0,
    today_amount: 0,
  });
  const [amount, setAmount] = useState<getAmount>({
    yesterday_intake: 0,
    today_intake: 0,
  });
  const [time, setTime] = useState({
    today_time: 0,
    yesterday_time: 0,
  });
  const [babies, setBabies] = useState<Baby[]>([]);

  const compIntake = () => {
    const comp = intake.yesterday_amount - intake.today_amount;
    if (comp == 0) {
      return '섭취량이 어제와 같습니다.';
    }
    if (comp > 0) {
      return `어제보다 ${Math.abs(comp)}ml 덜 섭취했습니다.`;
    }
    if (comp < 0) {
      return `어제보다 ${Math.abs(comp)}ml 더 섭취했습니다.`;
    }
  };

  const compAmount = () => {
    const comp = amount.yesterday_intake - amount.today_intake;
    if (comp == 0) {
      return '유축량이 어제와 같습니다.';
    }
    if (comp > 0) {
      return `어제보다 ${Math.abs(comp)}ml 덜 유축했습니다.`;
    }
    if (comp < 0) {
      return `어제보다 ${Math.abs(comp)}ml 더 유축했습니다.`;
    }
  };

  const compTime = () => {
    console.log(time.today_time, ' ', time.yesterday_time);
    const comp = time.yesterday_time - time.today_time;
    if (comp == 0) {
      return '수유시간이 어제와 동일합니다.';
    }
    if (comp > 0) {
      return `어제보다 ${Math.abs(comp)}분 덜 수유했습니다.`;
    }
    if (comp < 0) {
      return `어제보다 ${Math.abs(comp)}분 더 수유했습니다.`;
    }
  };

  const [babyName, setBabyName] = useState('');

  useEffect(() => {
    getBabyInfo({
      setBabies: babyData => {
        setBabies(babyData);
        if (babyData.length > 0) {
          setBabyName(babyData[0].baby_name);
        }
      },
    });
  }, []);

  useEffect(() => {
    getTmp();
    GetAmount({setAmount, babyName});
    GetIntake({setIntake, babyName});
    GetBreastFeeding({setTime, babyName});
  }, [babyName]);

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
      image: require('../assets/images/icons/MainCarousel/Baby.png'),
    },
    {
      date: currentDateFormatted,
      time: currentTimeFormatted,
      day: hm !== null ? `${hm}` : '-',
      unit: '%',
      image: require('../assets/images/icons/MainCarousel/humidity.png'),
    },
    {
      date: currentDateFormatted,
      time: currentTimeFormatted,
      day: tmp !== null ? `${tmp}` : '-',
      unit: '°C',
      image: require('../assets/images/icons/MainCarousel/Temp.png'),
    },
  ];

  const screenWidth = Math.round(Dimensions.get('window').width);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.header}>
          <HeaderLeft
            babyName={babyName}
            onPress={() => setModalVisible(true)}
          />
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
          {isBuffering && <ActivityIndicator size="large" color="#0000ff" />}
          {isConnected ? (
            <VLCPlayer
              style={styles.vlcPlayer}
              videoAspectRatio="16:9"
              source={{uri: 'rtsp://louk342.iptime.org:8554/live.sdp'}}
              onError={() => {
                console.log('VLC 오류');
                setIsConnected(false);
              }}
              onBuffering={buffering => {
                console.log('버퍼링 중:', buffering);
              }}
              onPlaying={() => setIsBuffering(false)}
            />
          ) : (
            <Text style={styles.errorMessage}>모빌 연결 후 사용해주세요.</Text>
          )}
        </View>
        <Text style={styles.title}>오늘의 수유시간, 유축량, 섭취량은?</Text>
        <View style={styles.end}>
          <TouchableOpacity
            style={styles.TouchInput}
            onPress={() => {
              navigation.navigate('BreastFeeding', {babyName});
            }}>
            <View style={styles.endLeft}>
              <Image
                style={styles.inputImage}
                source={require('../assets/images/mom.png')}
              />
              <Text style={styles.inputLeftText}>{compTime()}</Text>
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
              navigation.navigate('Amount', {babyName});
            }}>
            <View style={styles.endLeft}>
              <Image
                style={styles.inputImage}
                source={require('../assets/images/feedingBottle.png')}
              />
              <Text style={styles.inputLeftText}>{compAmount()}</Text>
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
              navigation.navigate('Intake', {babyName});
            }}>
            <View style={styles.endLeft}>
              <Image
                style={styles.inputImage}
                source={require('../assets/images/baby.png')}
              />
              <Text style={styles.inputLeftText}>{compIntake()}</Text>
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
        onSelectBaby={setBabyName}
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
    width: '90%',
    height: 235,
    borderRadius: 10,
    marginBottom: 11,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    justifyContent: 'center',
    color: '#a6a6a6',
    fontSize: 16,
  },
  vlcPlayer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginBottom: 11,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
    transform: [{rotate: '180deg'}],
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
