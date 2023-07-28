import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {color} from '../../theme/style';
import {RootStackNavigationProp} from '../screens/RootStack';

interface Props {
  title: React.ReactNode;
}

export default function Header({title}: Props) {
  const navigation = useNavigation<RootStackNavigationProp>();

  const goBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.block}>
      <Pressable>
        <Icon
          name="arrow-back"
          size={24}
          color={color.black}
          onPress={goBack}
        />
      </Pressable>
      <View style={styles.leftMargin}>
        <Text style={{color: color.black}}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftMargin: {marginLeft: 4},
});
