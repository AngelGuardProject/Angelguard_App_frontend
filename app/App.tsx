/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './screens/Main';
import Bluetooth from './screens/BlueTooth';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BlueTooth" component={Bluetooth}></Stack.Screen>
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}>
          {props => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
