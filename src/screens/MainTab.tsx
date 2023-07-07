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
      <Tab.Screen
        name="Encyclopedia"
        component={EncyclopediaScreen}
        options={{
          title: '거북이 사전',
          tabBarIcon: ({color, size}) => (
            <Icon name="library-books" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Diary"
        component={DiaryScreen}
        options={{
          title: '다이어리',
          tabBarIcon: ({color, size}) => (
            <Icon name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="QnA"
        component={QnaScreen}
        options={{
          title: '질문 답변',
          tabBarIcon: ({color, size}) => (
            <Icon name="question-answer" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
