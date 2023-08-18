import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {color} from '../theme/style';

interface Props extends TextInputProps {
  hasError?: boolean;
}

function BorderedInput({hasError, ...props}: Props, ref: React.Ref<TextInput>) {
  return (
    <TextInput
      style={[styles.input, hasError && styles.errorBorder]}
      ref={ref}
      {...props}
    />
  );
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
  errorBorder: {
    borderColor: color.error,
  },
});

export default React.forwardRef(BorderedInput);
