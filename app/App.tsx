import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DiaryWrite from './screens/Diary/DiaryWrite';
import DiaryDetail from './screens/Diary/DiaryDetail';

import TabNavi from './components/TabNavi';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Amount from './screens/FeedingRecord/Amount';
import BreastFeeding from './screens/FeedingRecord/BreastFeeding';
import Intake from './screens/FeedingRecord/Intake';
import {Image, Text, TouchableOpacity} from 'react-native';
import DrawerNavigator from './DrawerNavigator';
import MyInfo from './screens/Information/MyInfo';
import BabyInfo from './screens/Information/BabyInfo';
import {HeaderLeft, HeaderRight} from './components/Header/MainHeader';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{headerShown: false}}>
          {props => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DiaryWrite"
          component={DiaryWrite}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DiaryDetail"
          component={DiaryDetail}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Amount"
          component={Amount}
          options={{
            headerShown: true,
            title: '유축량 입력',
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <Image
                  style={{width: 9, height: 17, marginLeft: 24}}
                  source={require('../app/assets/images/icons/LeftArrow.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="BreastFeeding"
          component={BreastFeeding}
          options={{
            headerShown: true,
            title: '모유 수유량 입력',
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <Image
                  style={{width: 9, height: 17, marginLeft: 24}}
                  source={require('../app/assets/images/icons/LeftArrow.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Intake"
          component={Intake}
          options={{
            headerShown: true,
            title: '섭취량 입력',
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <Image
                  style={{width: 9, height: 17, marginLeft: 24}}
                  source={require('../app/assets/images/icons/LeftArrow.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="MyInfo"
          component={MyInfo}
          options={{headerShown: true}}
        />
        <Stack.Screen name="BabyInfo" component={BabyInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
