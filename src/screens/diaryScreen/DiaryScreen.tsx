import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, StyleSheet, View} from 'react-native';

import {RootStackNavigationProp} from '../RootStack';
import Empty from '../../components/Empty';
import PetList from '../../components/PetList';

import auth from '@react-native-firebase/auth';
import {useAuth} from '../../context/AuthContext';
import ModalTriggerButton from './ModalTiggerButton';
import CustomButton from '../../components/CustomButton';

export default function DiaryScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {user: isLoggedIn} = useAuth();
  const [pets] = useState([
    {id: 1, name: 'test1', adoptionDate: '2023-6-1', weight: 160},
    {id: 2, name: 'test2', adoptionDate: '2023-6-2', weight: 170},
    {id: 3, name: 'test3', adoptionDate: '2023-6-3', weight: 180},
    {id: 4, name: 'test4', adoptionDate: '2023-6-4', weight: 190},
    {id: 5, name: 'test5', adoptionDate: '2023-6-5', weight: 200},
    {id: 6, name: 'test6', adoptionDate: '2023-6-6', weight: 210},
  ]);

  const goCreateScreen = () => {
    navigation.navigate('Create');
  };
  const goSignInScreen = () => {
    navigation.navigate('SignIn');
  };

  const logout = async () => {
    try {
      const res = await auth().signOut();
      console.log('res :>> ', res);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const isEmpty = pets.length === 0;
  return (
    <View style={styles.block}>
      {isEmpty ? <Empty /> : <PetList pets={pets} />}
      {isLoggedIn ? (
        <CustomButton title="개체 등록하기" onPress={goCreateScreen} />
      ) : (
        <ModalTriggerButton
          title="개체 등록하기"
          description="개체를 등록하기 위해선 로그인이 필요합니다."
          okTitle="로그인"
          onOk={goSignInScreen}
        />
      )}

      <Button title="로그 아웃" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: 'red'},
});
