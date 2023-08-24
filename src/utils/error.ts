import {ReactNativeFirebase} from '@react-native-firebase/app';

export const EMAIL_ERROR_MESSAGE = '이메일 양식을 확인해주세요.';
export const PASSWORD_ERROR_MESSAGE =
  '영문/숫자/특수문자 2가지 이상 조합(8~20자)';
export const PASSWORD_COMMENT = '영문/숫자/특수문자 2가지 이상 조합(8~20자)';
export const PASSWORD_CONFIRM_ERROR_MESSAGE = '비밀번호와 일치하지 않습니다.';
export const USER_NOT_FOUND = '존재하지 않는 계정입니다.';

export const UNEXPECTED_ERROR =
  '알 수 없는 에러가 발생했습니다. 관리자에게 문의 주세요.';

export const TOO_MANY_REQUESTS =
  '요청이 너무 잦습니다. 잠시후 다시 시도해 주세요.';

export const firebaseAuthErrorMessage: {[key: string]: string} = {
  'auth/email-already-in-use': '이미 가입된 이메일 입니다.',
  'auth/invalid-email': EMAIL_ERROR_MESSAGE,
  'auth/invalid-password': PASSWORD_ERROR_MESSAGE,
  'auth/weak-password': PASSWORD_ERROR_MESSAGE,
  'auth/user-not-found': USER_NOT_FOUND,
  'auth/wrong-password': '비밀번호가 일치하지 않습니다.',
  'auth/too-many-requests': TOO_MANY_REQUESTS,
};

export function isNativeFirebaseError(
  error: unknown,
): error is ReactNativeFirebase.NativeFirebaseError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'nativeErrorCode' in error
  );
}
