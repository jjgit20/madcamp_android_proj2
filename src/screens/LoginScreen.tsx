import OAuthButton from '@src/components/LoginComponents/OAuthButton';
import {BLACK, BLUE} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import React from 'react';
import {Image, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        gap: 10,
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 130,
      }}>
      <Text style={[globalStyles.h2, {color: BLACK}]}>짐을 싸서 떠나봐요,</Text>
      <Text style={[globalStyles.h2, {color: BLUE, marginBottom: 'auto'}]}>
        travelov
      </Text>

      <Image
        source={require('@src/assets/images/default_image_large.png')}
        style={{
          width: '60%',
          height: 300,
        }}
        resizeMode={'contain'}
      />
      <OAuthButton />
    </SafeAreaView>
  );
};
export default LoginScreen;
