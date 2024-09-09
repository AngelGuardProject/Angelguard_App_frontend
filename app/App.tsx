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
          component={TabNavi}
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
          name="Amount"
          component={Amount}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="BreastFeeding"
          component={BreastFeeding}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Intake"
          component={Intake}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
