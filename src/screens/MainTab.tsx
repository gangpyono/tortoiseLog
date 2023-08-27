import React from 'react';

import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import DiaryScreen from './diaryScreen/DiaryScreen';
import {RootStackNavigationProp} from './RootStack';
import MyProfileScreen from './MyProfileScreen';

export type MainTabParamList = {
  Diary: undefined;
  MyProfile: undefined;
};

// CompositeNavigationProp
// 하단 탭 내비게이션에서 상위에 있는 RootStack의 DetailScreen등에 접근하기위함
export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;

// RootStack 내부 화면에서
// navigation.navigate("MainTab",{screen : 'Info'})가 가능하게 해줌
export type MainTabNavigationScreenParams =
  NavigatorScreenParams<MainTabParamList>;

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#6200ee',
      }}
      initialRouteName="Diary">
      <Tab.Screen
        name="Diary"
        component={DiaryScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
