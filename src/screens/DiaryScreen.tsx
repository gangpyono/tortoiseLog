import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, View} from 'react-native';

import {RootStackNavigationProp} from './RootStack';

export default function DiaryScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPress = () => {
    navigation.navigate('Create');
  };

  return (
    <View>
      <Button title="개체 등록하기" onPress={onPress} />
    </View>
  );
}
