import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MaterialTabBarIcon from "../components/MaterialTabBarIcon";
import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <MaterialTabBarIcon focused={focused} name={"map"} />
  )
};

const UploadStack = createStackNavigator({
  Upload: UploadScreen,
});

UploadStack.navigationOptions = {
  tabBarLabel: 'Upload',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
    />
  ),
};


const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Gallery",
  tabBarIcon: ({ focused }) => (
    <MaterialTabBarIcon focused={focused} name={"view-day"} />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  UploadStack,
  SettingsStack,
});
