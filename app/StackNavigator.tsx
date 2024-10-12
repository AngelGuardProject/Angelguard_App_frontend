import {createStackNavigator} from '@react-navigation/stack';
import Main from './screens/Main';
import Amount from './screens/FeedingRecord/Amount';
import {Image, TouchableOpacity} from 'react-native';
import BreastFeeding from './screens/FeedingRecord/BreastFeeding';
import Intake from './screens/FeedingRecord/Intake';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Amount"
        component={Amount}
        options={{
          headerShown: true,
          title: '유축량 입력',
          headerTitleAlign: 'center',
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
        name="BreastFeeding"
        component={BreastFeeding}
        options={{
          headerShown: true,
          title: '모유 수유량 입력',
          headerTitleAlign: 'center',
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
        name="Intake"
        component={Intake}
        options={{
          headerShown: true,
          title: '섭취량 입력',
          headerTitleAlign: 'center',
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
  );
};

export {MainStackNavigator};
