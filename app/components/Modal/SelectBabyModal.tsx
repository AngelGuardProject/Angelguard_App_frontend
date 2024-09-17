import React, {useEffect, useRef} from 'react';
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
} from 'react-native';

const SelectBabyModal = (props: any) => {
  const {modalVisible, setModalVisible} = props;
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
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

  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
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
            <View style={styles.item}>
              <Image
                style={styles.img}
                source={require('../../assets/images/hamster.png')}
              />
              <Text style={styles.text}>예빈이</Text>
            </View>
            <View style={styles.item}>
              <Image
                style={styles.img}
                source={require('../../assets/images/hamster.png')}
              />
              <Text style={styles.text}>예빈이</Text>
            </View>
            <View style={styles.itemEnd}>
              <Image
                style={styles.img}
                source={require('../../assets/images/icons/check_icon.png')}
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
