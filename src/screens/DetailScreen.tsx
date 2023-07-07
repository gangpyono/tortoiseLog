import React from 'react';
import {Text, View} from 'react-native';
import {RootStackParamList} from './RootStack';
import {RouteProp, useRoute} from '@react-navigation/native';

// useRoute 설정
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export default function DetailScreen() {
  const {params} = useRoute<DetailScreenRouteProp>();

  return (
    <View>
      <Text> Detail {params.id}</Text>
    </View>
  );
}
