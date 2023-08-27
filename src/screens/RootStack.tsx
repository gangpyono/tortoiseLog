import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import MainTab, {MainTabNavigationScreenParams} from './MainTab';
import CreateScreen from './CreateScreen';
import DetailScreen from './DetailScreen';

// interfacer가 아닌 type으로 선언해야한다.
// useRoute를 사용하는 페이지를위해 export 해준다.
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  MainTab: MainTabNavigationScreenParams;
  Create: undefined;
  Detail: {
    id: number;
  };
};

// useNative를 사용하기위한 설정
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={MainTab}
        name="MainTab"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={CreateScreen}
        name="Create"
        options={{headerTitle: '개체등록'}}
      />
      <Stack.Screen component={DetailScreen} name="Detail" />
      <Stack.Screen
        component={SignInScreen}
        name="SignIn"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={SignUpScreen}
        name="SignUp"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
