import {BACKEND_URL} from '@env';
import {StackScreenProps} from '@react-navigation/stack';
import {
  StyledPressable,
  StyledPressableView,
} from '@src/components/StyledComponents/StyledButton';
import {BLUE, BLUE_PRESSED} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import axios from 'axios';
import React from 'react';
import {Text} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MainStackParamsList} from '../../types';

type Props = StackScreenProps<MainStackParamsList, 'SignUpScreen'>;

const SignUpScreen = ({route, navigation}: Props) => {
  const handleSignUpButton = async () => {
    try {
      const signUpResponse = await axios.post(
        `${BACKEND_URL}/auth/kakao/signup`,
        {
          kakaoId: route.params.kakaoId,
          username: 'tester',
          password: 'testpwd',
          nickname: route.params.nickname,
          email: route.params.email,
          image: route.params.image,
        },
      );
      if (signUpResponse.data.signedUp === true) {
        await EncryptedStorage.setItem(
          'user_session',
          JSON.stringify({
            token: signUpResponse.data.token,
          }),
        );
        navigation.navigate('MainTabs');
      }
      console.log(signUpResponse.data);

      console.log(signUpResponse.data);
    } catch (error) {
      console.log('signup error: ', error);
    }
  };
  return (
    <SafeAreaView>
      <StyledPressableView>
        <StyledPressable
          onPress={handleSignUpButton}
          android_ripple={{color: BLUE_PRESSED}}
          style={{backgroundColor: BLUE}}>
          <Text style={globalStyles.h2}>회원가입</Text>
        </StyledPressable>
      </StyledPressableView>
    </SafeAreaView>
  );
};
export default SignUpScreen;
