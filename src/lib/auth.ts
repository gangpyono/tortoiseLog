import auth from '@react-native-firebase/auth';

interface IUser {
  email: string;
  password: string;
}

export const signUp = ({email, password}: IUser) => {
  return auth().createUserWithEmailAndPassword(email, password);
};
