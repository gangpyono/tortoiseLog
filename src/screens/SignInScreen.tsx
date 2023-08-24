import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';
import {color} from '../theme/style';
import {EMAIL_ERROR_MESSAGE} from '../utils/error';
import {emailPattern} from '../utils/regex';
import {RootStackNavigationProp} from './RootStack';

export default function SignInScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [form, setForm] = useState({email: '', password: ''});
  const [formError, setFormError] = useState('');
  const passwordRef = useRef<TextInput | null>(null);

  const createChangeTextHandler = (name: string) => (value: string) => {
    setForm({...form, [name]: value});
    setFormError('');
  };

  const focusPasswordInput = () => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  };

  const emailValidate = (value: string) => {
    return emailPattern.test(value);
  };

  const onSubmitEditingEmail = () => {
    emailValidate(form.email)
      ? focusPasswordInput()
      : setFormError(EMAIL_ERROR_MESSAGE);
  };

  const onSubmit = async () => {};

  const goSignUpScreen = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.block}>
        <View style={styles.form}>
          <BorderedInput
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="이메일을 입력하세요"
            returnKeyType="next"
            value={form.email}
            onChangeText={createChangeTextHandler('email')}
            onSubmitEditing={onSubmitEditingEmail}
            onBlur={onSubmitEditingEmail}
          />
          <BorderedInput
            ref={passwordRef}
            placeholder="비밀번호를 입력하세요"
            secureTextEntry
            returnKeyType="done"
            value={form.password}
            onChangeText={createChangeTextHandler('password')}
            onSubmitEditing={onSubmit}
          />
          {formError && <Text style={styles.errorMessage}>{formError}</Text>}
          <View style={styles.buttonsBlock}>
            <CustomButton title="로그인" onPress={onSubmit} />
            <CustomButton title="회원가입" onPress={goSignUpScreen} />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  block: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    gap: 16,
    paddingHorizontal: 16,
  },
  buttonsBlock: {
    gap: 4,
  },
  errorMessage: {
    alignContent: 'center',
    fontSize: 12,
    color: color.error,
  },
});
