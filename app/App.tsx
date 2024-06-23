/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BlueTooth from './screens/BlueTooth';
import BottomTabNavigator from './component/BottomTabNavigator';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import DiaryWrite from './screens/DiaryWrite';
import DiaryDetail from './screens/DiaryDetail';
import Scheduler from './screens/Scheduler';
import HardWare from './screens/HardWare';
import DiaryList from './screens/DiaryList';
const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BlueTooth" component={BlueTooth} />

        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}>
          {props => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DiaryList"
          component={DiaryList}
          options={{headerShown: false}}
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
          name="Scheduler"
          component={Scheduler}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HardWare"
          component={HardWare}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
