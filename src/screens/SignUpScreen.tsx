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
import {spacing} from '../../theme/style';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import RadioGroup, {RadioOptionType} from '../components/Radio';

const radioOptions = [
  {id: '1', label: '네이버 카페'},
  {id: '2', label: '카카오톡 오픈채팅'},
  {id: '3', label: '검색'},
  {id: '4', label: '기타'},
];

export default function SignUpScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);

  const [form, setForm] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    funnel: '',
  });

  const [errors, setErrors] = useState({
    username: '아이디오류',
    password: '비밀번호오류',
    passwordConfirm: '비밀번호 확인 오류',
    email: '이메일 오류',
  });

  const [isOpenFunnelTextInput, setIsOpenFunnelTextInput] = useState(false);

  const createChangeTextHandler = (name: string) => (value: string) => {
    setForm(prev => ({...prev, [name]: value}));
  };

  const handleRadioChange = (selected: RadioOptionType) => {
    selected.id === '4'
      ? setIsOpenFunnelTextInput(true)
      : setIsOpenFunnelTextInput(false);

    setForm(prev => ({...prev, funnel: selected.label}));
  };

  const focusTextInput = (ref: React.MutableRefObject<TextInput | null>) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const usernameValidate = () => {
    console.log('usernameValidate');
  };

  const passwordValidate = () => {
    console.log('passwordValidate');
  };

  const passwordConfirmValidate = () => {
    console.log('passwordConfirmValidate');
  };

  const emailValidate = () => {
    console.log('emailValidate');
  };

  const onSubmit = () => {
    console.log('form :>> ', form);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.block}>
        <Header title="회원가입" />

        <View style={styles.form}>
          <View>
            <View style={styles.formFieldWapper}>
              <Text style={styles.formFieldLabel}>아이디: </Text>
              <View style={styles.formFieldText}>
                <BorderedInput
                  value={form.username}
                  placeholder="아이디를 입력하세요."
                  onChangeText={createChangeTextHandler('username')}
                  onSubmitEditing={() => focusTextInput(passwordRef)}
                  onBlur={usernameValidate}
                />
              </View>
            </View>
            {errors.username && <Text>{errors.username}</Text>}
          </View>

          <View>
            <View style={styles.formFieldWapper}>
              <Text style={styles.formFieldLabel}>비밀번호: </Text>
              <View style={styles.formFieldText}>
                <BorderedInput
                  ref={passwordRef}
                  value={form.password}
                  placeholder="비밀번호를 입력하세요."
                  secureTextEntry
                  onChangeText={createChangeTextHandler('password')}
                  onSubmitEditing={() => focusTextInput(passwordConfirmRef)}
                  returnKeyType="next"
                  onBlur={passwordValidate}
                />
              </View>
            </View>
            {errors.password && <Text>{errors.password}</Text>}
          </View>

          <View>
            <View style={styles.formFieldWapper}>
              <Text style={styles.formFieldLabel}>비밀번호 확인: </Text>
              <View style={styles.formFieldText}>
                <BorderedInput
                  ref={passwordConfirmRef}
                  value={form.passwordConfirm}
                  placeholder="비밀번호를 다시한번 입력해주세요."
                  secureTextEntry
                  onChangeText={createChangeTextHandler('passwordConfirm')}
                  onSubmitEditing={() => focusTextInput(emailRef)}
                  returnKeyType="next"
                  onBlur={passwordConfirmValidate}
                />
              </View>
            </View>
            {errors.passwordConfirm && <Text>{errors.passwordConfirm}</Text>}
          </View>

          <View>
            <View style={styles.formFieldWapper}>
              <Text style={styles.formFieldLabel}>이메일: </Text>
              <View style={styles.formFieldText}>
                <BorderedInput
                  ref={emailRef}
                  value={form.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="이메일을 입력하세요."
                  onChangeText={createChangeTextHandler('email')}
                  onBlur={emailValidate}
                  returnKeyType="next"
                />
              </View>
            </View>
            {errors.email && <Text>{errors.email}</Text>}
          </View>
        </View>

        <View>
          <Text>알게된 경로를 선택해주세요.</Text>
          <View style={styles.radioGroupContainer}>
            <RadioGroup options={radioOptions} onPress={handleRadioChange} />
          </View>
          {isOpenFunnelTextInput && (
            <BorderedInput
              placeholder="기타 유입경로"
              onChangeText={createChangeTextHandler('funnel')}
            />
          )}
        </View>

        <View style={styles.buttonWrapper}>
          <CustomButton title="회원가입" onPress={onSubmit} />
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
    paddingHorizontal: spacing.Horizontal,
  },
  form: {marginTop: 10, gap: 20},

  formFieldWapper: {flexDirection: 'row', alignItems: 'center'},
  formFieldLabel: {flexBasis: '30%'},
  formFieldText: {flex: 1},

  wrapper: {flexDirection: 'row', gap: 8},
  inputWrapper: {
    flex: 1,
    flexBasis: '60%',
  },

  buttonWrapper: {
    height: 44,
  },

  radioGroupContainer: {},
});
