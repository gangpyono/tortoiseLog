import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';

interface Props {
  onPress: () => void;
  title: string;
}

export default function CustomButton({onPress, title}: Props) {
  return (
    <View style={styles.block}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.button,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
        ]}
        android_ripple={{
          color: '#ffffff',
        }}>
        <Text>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    overflow: Platform.select({android: 'hidden'}),
    flex: 1,
    borderRadius: 8,
  },
  button: {
    height: 44,
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5CB15A',
  },
});
