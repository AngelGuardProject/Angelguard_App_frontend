import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DiaryWrite from './screens/Diary/DiaryWrite';
import DiaryDetail from './screens/Diary/DiaryDetail';
import DiaryList from './screens/Diary/DiaryList';
import TabNavi from './components/TabNavi';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Amount from './screens/FeedingRecord/Amount';
import BreastFeeding from './screens/FeedingRecord/BreastFeeding';
import Intake from './screens/FeedingRecord/Intake';
import {Image, Text, TouchableOpacity} from 'react-native';
import DrawerNavigator from './DrawerNavigator';
import MyInfo from './screens/Information/MyInfo';
import BabyInfo from './screens/Information/BabyInfo/index';
import {HeaderLeft, HeaderRight} from './components/Header/MainHeader';
import BabyList from './screens/Information/BabyList';
import AddBaby from './screens/Information/AddBaby';

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
          name="DiaryList"
          component={DiaryList}
          options={{
            headerShown: true,
            title: '육아일지',
            headerTitleAlign: 'center',
            headerStyle: {height: 45},
            headerTintColor: 'black',
            headerTitleStyle: {fontSize: 14, fontWeight: 'regular'},
            headerLeft: () => null,
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
          options={{
            headerShown: true,
            title: '육아일지',
            headerTitleAlign: 'center',
            headerStyle: {height: 45},
            headerTintColor: 'black',
            headerTitleStyle: {fontSize: 14, fontWeight: 'regular'},
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <Image
                  style={{width: 9, height: 17, marginLeft: 24}}
                  source={require('./assets/images/icons/LeftArrow.png')}
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
          name="BabyList"
          component={BabyList}
          options={{
            headerShown: true,
            title: '아이 정보',
            headerTitleAlign: 'left',
            headerStyle: {
              height: 45,
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontSize: 14,
              fontWeight: 'regular',
            },
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
          options={{
            headerShown: true,
            title: '내 정보',
            headerTitleAlign: 'left',
            headerStyle: {
              height: 45,
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontSize: 14,
              fontWeight: 'regular',
            },
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
          name="BabyInfo"
          component={BabyInfo}
          options={{
            headerShown: true,
            title: '아이 정보',
            headerTitleAlign: 'left',
            headerStyle: {
              height: 45,
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontSize: 14,
              fontWeight: 'regular',
            },
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
          name="AddBaby"
          component={AddBaby}
          options={{
            headerShown: true,
            title: '아이 추가',
            headerTitleAlign: 'left',
            headerStyle: {
              height: 45,
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontSize: 14,
              fontWeight: 'regular',
            },
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
