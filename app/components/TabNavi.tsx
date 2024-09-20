import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, ViewStyle, TextStyle} from 'react-native';
import Controller from '../screens/Hardware/Controller';
import Scheduler from '../screens/Scheduler/SchedulerMain';
import Diary from '../screens/Diary/DiaryList';
import Main from '../screens/Main';
import {MainStackNavigator} from '../StackNavigator';

const Tab = createBottomTabNavigator();

const TabNavi = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#666662',
        tabBarInactiveTintColor: '#d9d9d9',
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: '#FFFFFF',
          height: 56,
        } as ViewStyle, // Ensure correct typing for tabBarStyle
        tabBarIconStyle: {
          marginTop: 5,
        } as ViewStyle, // Ensure correct typing for tabBarIconStyle
        tabBarLabelStyle: {
          fontFamily: 'NotoSansKR-Regular',
          marginBottom: 5,
          fontSize: 10,
        } as TextStyle, // Ensure correct typing for tabBarLabelStyle
        tabBarIcon: ({focused}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('../assets/images/icons/Home.png')
              : require('../assets/images/icons/Home_un.png');
          } else if (route.name === 'Controller') {
            iconSource = require('../assets/images/icons/Mobile.png');
          } else if (route.name === 'Scheduler') {
            iconSource = focused
              ? require('../assets/images/icons/Scheduler.png')
              : require('../assets/images/icons/Scheduler_un.png');
          } else if (route.name === 'Diary') {
            iconSource = focused
              ? require('../assets/images/icons/Diary.png')
              : require('../assets/images/icons/Diary_un.png');
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#666662' : '#d9d9d9',
              }}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarLabel: 'home',
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Controller"
        component={Controller}
        options={{
          tabBarLabel: 'controller',
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Scheduler"
        component={Scheduler}
        options={{
          tabBarLabel: 'scheduler',
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Diary"
        component={Diary}
        options={{
          tabBarLabel: 'diary',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavi;
