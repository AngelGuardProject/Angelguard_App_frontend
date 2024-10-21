import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Image,
  TouchableOpacity,
} from 'react-native';
import {getBabyInfo} from '../../api/baby.api';

const SelectBabyModal = (props: any) => {
  const [babies, setBabies] = useState<Baby[]>();
  const {modalVisible, setModalVisible, onSelectBaby} = props;
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  useEffect(() => {
    getBabyInfo({setBabies});
  }, []);

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };
  const getBabyImage = (sex: string) => {
    return sex === 'male'
      ? require('../../assets/images/boy.png')
      : require('../../assets/images/girl.png');
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{translateY: translateY}],
          }}
          {...panResponders.panHandlers}>
          <View style={styles.Bar}></View>
          <View style={styles.Wrap}>
            {babies &&
              babies.map(item => (
                <TouchableOpacity
                  key={item.baby_id}
                  style={styles.item}
                  onPress={() => {
                    onSelectBaby(item.baby_name);
                    closeModal();
                  }}>
                  <Image
                    style={styles.img}
                    source={getBabyImage(item.baby_sex)}
                  />
                  <Text style={styles.text}>{item.baby_name}</Text>
                </TouchableOpacity>
              ))}
            <View style={styles.itemEnd}>
              <Image
                style={styles.img}
                source={require('../../assets/images/icons/Plus.png')}
              />
              <Text style={styles.text}>아이추가하기</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: 174,
    width: '96%',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    marginBottom: 6,
    marginHorizontal: 'auto',
  },
  Bar: {
    width: 40,
    height: 3,
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
    marginTop: 11,
  },
  Wrap: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 22,
  },
  item: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#EDEDED',
  },
  itemEnd: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 18,
    marginRight: 14,
  },
  text: {
    fontSize: 10,
    color: '#666662',
  },
});

export default SelectBabyModal;
