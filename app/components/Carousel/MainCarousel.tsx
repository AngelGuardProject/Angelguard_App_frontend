import {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  offset: number;
  gap: number;
  pageWidth: number;
  pages: any;
}

const MainCarousel = ({offset, gap, pageWidth, pages}: Props) => {
  const [page, setPage] = useState(0);

  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };

  function renderItem({item}: any) {
    return (
      <View
        style={[
          styles.slider,
          {width: pageWidth, marginHorizontal: gap / 2, marginTop: 3},
        ]}>
        <View style={styles.sliderL}>
          <Text style={{fontSize: 10, fontWeight: 'regular'}}>{item.date}</Text>
          <Text style={{fontSize: 10, fontWeight: 'regular'}}>{item.time}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 36,
                fontWeight: 'semibold',
                color: 'black',
              }}>
              {item.day}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'semibold',
                color: 'black',
                marginTop: 15,
                marginLeft: 3,
              }}>
              {item.unit}
            </Text>
          </View>
        </View>
        <View>
          <Image style={styles.img} source={item.image} />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        height: 127,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    backgroundColor: '#fff',
    borderColor: 'endregion',
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
});

export default MainCarousel;
