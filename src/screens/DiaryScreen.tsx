import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, StyleSheet, View} from 'react-native';

import {RootStackNavigationProp} from './RootStack';
import Empty from '../components/Empty';
import PetList from '../components/PetList';

export default function DiaryScreen() {
  const [pets] = useState([
    {id: 1, name: 'test1', adoptionDate: '2023-6-1', weight: 160},
    {id: 2, name: 'test2', adoptionDate: '2023-6-2', weight: 170},
    {id: 3, name: 'test3', adoptionDate: '2023-6-3', weight: 180},
    {id: 4, name: 'test4', adoptionDate: '2023-6-4', weight: 190},
    {id: 5, name: 'test5', adoptionDate: '2023-6-5', weight: 200},
    {id: 6, name: 'test6', adoptionDate: '2023-6-6', weight: 210},
  ]);
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPress = () => {
    navigation.navigate('Create');
  };

  const isEmpty = pets.length === 0;
  return (
    <>
      <View style={styles.block}>
        {isEmpty ? (
          <Empty />
        ) : (
          <>
            <PetList pets={pets} />
            <Button title="개체 등록하기" onPress={onPress} />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: 'red'},
});
