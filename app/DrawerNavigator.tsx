import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavi from './components/TabNavi';
import MyInfo from './screens/Information/MyInfo';
import BabyInfo from './screens/Information/BabyInfo';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
      }}>
      <Drawer.Screen name="MainMenu" component={TabNavi} />
      <Drawer.Screen name="MyInfo" component={MyInfo} />
      <Drawer.Screen name="BabyInfo" component={BabyInfo} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;