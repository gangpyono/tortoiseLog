import React, {useRef, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, spacing} from '../theme/style';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import {signUp} from '../lib/auth';
import {firebaseAuthErrorMessage, isNativeFirebaseError} from '../utils/error';

const EMAIL_ERROR_MESSAGE = '이메일 양식을 확인해주세요.';
const PASSWORD_ERROR_MESSAGE = '영문/숫자/특수문자 2가지 이상 조합(8~20자)';
const PASSWORD_COMMENT = '영문/숫자/특수문자 2가지 이상 조합(8~20자)';
const PASSWORD_CONFIRM_ERROR_MESSAGE = '비밀번호와 일치하지 않습니다.';

const emailPattern = /^[a-zA-z0-9._+-]+@[a-zA-Z0-9-]+\.[a-z.]+$/;
const alphabetPattern = /[a-zA-Z]/;
const numberPattern = /[0-9]/;
const specialCharacterPattern = /[\W]/;

const isCorrectLengthRange = (value: string) => {
  return value.length >= 8 && value.length <= 20;
};

const hasAlphabet = (value: string) => {
  return alphabetPattern.test(value);
};

const hasNumber = (value: string) => {
  return numberPattern.test(value);
};

const hasSpecialCharacter = (value: string) => {
  return specialCharacterPattern.test(value);
};

export default function SignUpScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const [loading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const createChangeTextHandler = (name: string) => (value: string) => {
    setForm(prev => ({...prev, [name]: value}));
  };

  const focusTextInput = (ref: React.MutableRefObject<TextInput | null>) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const emailValidate = (value: string) => {
    return emailPattern.test(value);
  };

  const onSubmitEditingEmail = () => {
    if (emailValidate(form.email)) {
      setFormErrors(prev => ({
        ...prev,
        email: '',
      }));
      focusTextInput(passwordRef);
    } else {
      setFormErrors(prev => ({
        ...prev,
        email: EMAIL_ERROR_MESSAGE,
      }));
    }
  };

  const passwordValidate = (value: string) => {
    if (!isCorrectLengthRange(value)) {
      return;
    }

    let score = 0;
    const inCrementScore = () => (score = score + 1);
    if (hasAlphabet(value)) {
      inCrementScore();
    }

    if (hasNumber(value)) {
      inCrementScore();
    }

    if (hasSpecialCharacter(value)) {
      inCrementScore();
    }

    return score >= 2;
  };

  const onSubmitEditingPassword = () => {
    if (passwordValidate(form.password)) {
      setFormErrors(prev => ({
        ...prev,
        password: '',
      }));
      focusTextInput(passwordConfirmRef);
    } else {
      setFormErrors(prev => ({
        ...prev,
        password: PASSWORD_ERROR_MESSAGE,
      }));
    }
  };

  const passwordConfirmValidate = (value: string) => {
    return value === form.password;
  };

  const onSubmitEditingPasswordConfirm = () => {
    if (passwordConfirmValidate(form.passwordConfirm)) {
      setFormErrors(prev => ({
        ...prev,
        passwordConfirm: '',
      }));
    } else {
      setFormErrors(prev => ({
        ...prev,
        passwordConfirm: PASSWORD_CONFIRM_ERROR_MESSAGE,
      }));
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await signUp({email: form.email, password: form.password});
    } catch (error) {
      if (isNativeFirebaseError(error)) {
        const msg = firebaseAuthErrorMessage[error.code] || '회원가입 실패';

        if (
          msg === EMAIL_ERROR_MESSAGE ||
          msg === '이미 가입된 이메일 입니다.'
        ) {
          setFormErrors(prev => ({...prev, email: msg}));

          return;
        }

        if (msg === PASSWORD_ERROR_MESSAGE) {
          setFormErrors(prev => ({...prev, password: msg}));

          return;
        }

        // sentry trigger
        Alert.alert('관리자에게 문의 주세요.', msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isActiveSubmitButton = () => {
    return (
      emailValidate(form.email) &&
      passwordValidate(form.password) &&
      passwordConfirmValidate(form.passwordConfirm)
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.block}>
        <Header title="회원가입" />

        <View style={styles.form}>
          <View style={styles.formFieldWrapper}>
            <View style={styles.formFieldLabelWrapper}>
              <View style={styles.formFieldLabelInner}>
                <Text>이메일(아이디)</Text>
              </View>
            </View>
            <View style={styles.formFieldInput}>
              <BorderedInput
                ref={emailRef}
                hasError={!!formErrors.email}
                value={form.email}
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                placeholder="이메일을 입력하세요."
                onChangeText={createChangeTextHandler('email')}
                onSubmitEditing={onSubmitEditingEmail}
                onBlur={onSubmitEditingEmail}
                returnKeyType="next"
              />
              <View style={styles.messageLayout}>
                {formErrors.email && (
                  <Text style={styles.errorMessage}>{formErrors.email}</Text>
                )}
              </View>
            </View>
          </View>

          <View style={styles.formFieldWrapper}>
            <View style={styles.formFieldLabelWrapper}>
              <View style={styles.formFieldLabelInner}>
                <Text>비밀번호</Text>
              </View>
            </View>
            <View style={styles.formFieldInput}>
              <BorderedInput
                ref={passwordRef}
                hasError={!!formErrors.password}
                value={form.password}
                placeholder="비밀번호를 입력하세요."
                secureTextEntry
                onChangeText={createChangeTextHandler('password')}
                onSubmitEditing={onSubmitEditingPassword}
                onBlur={onSubmitEditingPassword}
                textContentType="oneTimeCode" // ios "strong password" 방지
                returnKeyType="next"
              />
              <View style={styles.messageLayout}>
                {formErrors.password ? (
                  <Text style={styles.errorMessage}>{formErrors.password}</Text>
                ) : (
                  <Text style={styles.commentMessage}>{PASSWORD_COMMENT}</Text>
                )}
              </View>
            </View>
          </View>

          <View style={styles.formFieldWrapper}>
            <View style={styles.formFieldLabelWrapper}>
              <View style={styles.formFieldLabelInner}>
                <Text>비밀번호 확인</Text>
              </View>
            </View>
            <View style={styles.formFieldInput}>
              <BorderedInput
                ref={passwordConfirmRef}
                hasError={!!formErrors.passwordConfirm}
                value={form.passwordConfirm}
                placeholder="비밀번호를 다시한번 입력해주세요."
                secureTextEntry
                onChangeText={createChangeTextHandler('passwordConfirm')}
                onSubmitEditing={onSubmitEditingPasswordConfirm}
                onBlur={onSubmitEditingPasswordConfirm}
                textContentType="oneTimeCode" // ios "strong password" 방지
                returnKeyType="next"
              />
              <View style={styles.messageLayout}>
                {formErrors.passwordConfirm && (
                  <Text style={styles.errorMessage}>
                    {formErrors.passwordConfirm}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <CustomButton
            title="회원가입"
            onPress={onSubmit}
            loading={loading}
            disabled={!isActiveSubmitButton()}
          />
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
  form: {
    flex: 1,
    gap: 24,
  },
  formFieldWrapper: {flexDirection: 'row', gap: 10},
  formFieldLabelWrapper: {
    flexBasis: '26%',
    flexDirection: 'row',
  },
  formFieldLabelInner: {
    height: 44,
    justifyContent: 'center',
  },
  formFieldInput: {flex: 1},
  messageLayout: {marginTop: 4},
  errorMessage: {
    fontSize: 12,
    color: color.error,
  },

  commentMessage: {
    fontSize: 12,
    color: 'grey',
  },
});
