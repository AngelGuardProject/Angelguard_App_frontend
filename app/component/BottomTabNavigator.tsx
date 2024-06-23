import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Text} from 'react-native';

import HomeScreen from '../screens/Main';
import DiaryList from '../screens/DiaryList';
import HardWare from '../screens/HardWare';
import Scheduler from '../screens/Scheduler';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const tabBarOptions = {
    activeTintColor: '#FFF4D6',
    inactiveTintColor: '#D9D9D9',
    labelStyle: {
      fontSize: 10,
    },
    style: {
      height: 60, // Adjust as needed
    },
  };
  // @ts-ignore
  const screenOptions = ({route}) => ({
    // @ts-ignore
    tabBarLabel: ({focused}) => {
      let label = '';
      switch (route.name) {
        case 'Home':
          label = 'home';
          break;
        case 'Mobile':
          label = 'controller';
          break;
        case 'Scheduler':
          label = 'scheduler';
          break;
        case 'Diary':
          label = 'diary';
          break;
        default:
          break;
      }
      return (
        <Text
          style={[
            styles.tabLabel,
            {
              color: focused
                ? tabBarOptions.activeTintColor
                : tabBarOptions.inactiveTintColor,
            },
          ]}>
          {label}
        </Text>
      );
    }, // @ts-ignore
    tabBarIcon: ({focused}) => {
      let iconName = '';
      switch (route.name) {
        case 'Home':
          iconName = focused
            ? require('../assets/imgaes/icons/Home.png')
            : require('../assets/imgaes/icons/Home_un.png');
          break;
        case 'Mobile':
          iconName = focused
            ? require('../assets/imgaes/icons/Mobile.png')
            : require('../assets/imgaes/icons/Mobile_un.png');
          break;
        case 'Scheduler':
          iconName = focused
            ? require('../assets/imgaes/icons/Scheduler.png')
            : require('../assets/imgaes/icons/Scheduler_un.png');
          break;
        case 'Diary':
          iconName = focused
            ? require('../assets/imgaes/icons/Diary.png')
            : require('../assets/imgaes/icons/Diary_un.png');
          break;
        default:
          break;
      }
      return (
        <Image // @ts-ignore
          source={iconName}
          style={[
            styles.tabIcon,
            {
              tintColor: focused
                ? tabBarOptions.activeTintColor
                : tabBarOptions.inactiveTintColor,
            },
          ]}
        />
      );
    },
  });

  return (
    // @ts-ignore
    <Tab.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Mobile"
        component={HardWare}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Scheduler"
        component={Scheduler}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Diary"
        component={DiaryList}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
  },
  tabLabel: {
    fontSize: 10,
  },
});

export default BottomTabNavigator;
