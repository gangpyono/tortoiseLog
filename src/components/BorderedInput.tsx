import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

interface Props extends TextInputProps {}

function BorderedInput({...props}: Props, ref: React.Ref<TextInput>) {
  return <TextInput style={[styles.input]} ref={ref} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    justifyContent: 'center',
    borderColor: '#bdbdbd',
    borderWidth: 1,
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
});

export default React.forwardRef(BorderedInput);
