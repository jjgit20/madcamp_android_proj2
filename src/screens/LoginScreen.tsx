import OAuthButton from '@src/components/LoginComponents/OAuthButton';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = () => {
  return (
    <SafeAreaView>
      <OAuthButton />
    </SafeAreaView>
  );
};
export default LoginScreen;
