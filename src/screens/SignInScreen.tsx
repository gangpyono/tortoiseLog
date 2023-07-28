import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BorderedInput from '../components/BorderedInput';
import {RootStackNavigationProp} from './RootStack';

interface Props {}

export default function SignInScreen({}: Props) {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [form, setForm] = useState({email: '', password: ''});

  const createChangeTextHandler = (name: string) => (value: string) => {
    setForm({...form, [name]: value});
  };

  const passwordRef = useRef<TextInput | null>(null);
  const focusPasswordInput = () => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  };

  const onSubmit = () => {
    console.log('form :>> ', form);
  };

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
            onSubmitEditing={focusPasswordInput}
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

          <View style={styles.buttonsBlock}>
            <Pressable onPress={onSubmit}>
              <Text>로그인</Text>
            </Pressable>
            <Pressable onPress={goSignUpScreen}>
              <Text>회원가입 </Text>
            </Pressable>
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
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 36,
  },
});
