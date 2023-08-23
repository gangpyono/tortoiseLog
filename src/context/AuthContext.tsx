import React, {createContext, useContext, useEffect, useState} from 'react';
import firebaseAuth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface AuthContextValue {
  user: FirebaseAuthTypes.User | null;
  setUser(user: FirebaseAuthTypes.User): void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthContextProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    // Handle user state changes
    const subscriber = firebaseAuth().onAuthStateChanged(setUser);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('AuthContextProvider is not used');
  }
  return auth;
}
