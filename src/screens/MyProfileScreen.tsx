import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {RootStackNavigationProp} from './RootStack';
import {useNavigation} from '@react-navigation/native';

export default function MyProfileScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const goSignIn = () => {
    navigation.navigate('SignIn');
  };

  const logout = async () => {
    try {
      const res = await auth().signOut();
      goSignIn();
      console.log('res :>> ', res);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  return (
    <SafeAreaView style={styles.block}>
      <Text>내정보 페이지</Text>
      <Button title="로그 아웃" onPress={logout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
});
