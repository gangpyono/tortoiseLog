import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function CustomButton({
  onPress,
  title,
  disabled,
  loading,
}: Props) {
  if (loading) {
    return <ActivityIndicator size={32} color="#5CB15A" />;
  }

  return (
    <View style={styles.block}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({pressed}) => [
          styles.button,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
          disabled && styles.disabled,
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
    borderRadius: 8,
  },
  button: {
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5CB15A',
  },
  disabled: {
    backgroundColor: 'grey',
  },
});
