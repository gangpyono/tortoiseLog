import React from 'react';

import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';

import DiaryScreen from './DiaryScreen';
import EncyclopediaScreen from './EncyclopediaScreen';
import QnaScreen from './QnaScreen';
import {RootStackNavigationProp} from './RootStack';

export type MainTabParamList = {
  Diary: undefined;
  Encyclopedia: undefined;
  QnA: undefined;
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
    <Tab.Navigator>
      <Tab.Screen name="Encyclopedia" component={EncyclopediaScreen} />
      <Tab.Screen name="Diary" component={DiaryScreen} />
      <Tab.Screen name="QnA" component={QnaScreen} />
    </Tab.Navigator>
  );
}
