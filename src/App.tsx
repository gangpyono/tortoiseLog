import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {AuthContextProvider} from './context/AuthContext';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <RootStack />
      </AuthContextProvider>
    </NavigationContainer>
  );
}

export default App;
