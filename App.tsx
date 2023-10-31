import React from 'react';
import {StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {ApplicationProvider, BottomNavigation, BottomNavigationTab,IconRegistry, Icon, IconElement} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { MaterialIconsPack } from './src/utilities/iconMapper';
import HomeScreen from './src/screens/HomeScreen';
import StationScreen from './src/screens/StationScreen';
import { RideScreen } from './src/screens/RideScreen';
import MoreScreen from './src/screens/MoreScreen';

const HomeIcon = (props:any): IconElement => (
  <Icon {...props} name='home-outline' />
);
const StationIcon = (props:any): IconElement => (
  <Icon {...props}  name='pin-outline' />
);
const RideIcon = (props:any): IconElement => (
  <Icon {...props} name='bicycle'  pack='material' />
);
const MoreIcon = (props:any): IconElement => (
  <Icon {...props} name='menu-outline' />
);

const BottomTab = createBottomTabNavigator();
const initialTabRoute: string = 'Home';
const BottomTabBar :  React.FC<BottomTabBarProps> = ({ navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Home' icon={HomeIcon} />
    <BottomNavigationTab title='Stations' icon={StationIcon}/>
    <BottomNavigationTab title='Ride' icon={RideIcon}/>
    <BottomNavigationTab title='More' icon={MoreIcon}/>
  </BottomNavigation>
);
const HomeTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    initialRouteName={initialTabRoute}  tabBar={props => <BottomTabBar {...props} />}>
    <BottomTab.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
    <BottomTab.Screen name='Stations' component={StationScreen} />
    <BottomTab.Screen name='Ride' component={RideScreen} />
    <BottomTab.Screen name='More' component={MoreScreen} />
  </BottomTab.Navigator>
  );
export default function App() {
  return (
    <>
      <IconRegistry icons={[EvaIconsPack,MaterialIconsPack]} />
      <ApplicationProvider {...eva} theme={{...eva.light}}>
        <NavigationContainer>
          <HomeTabsNavigator/>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});
