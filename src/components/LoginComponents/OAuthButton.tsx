import {BACKEND_URL} from '@env';
import {
  getProfile,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import KakaoIcon from '@src/assets/icons/oauth_kakao.svg';
import globalStyles from '@src/styles/style';
import axios from 'axios';
import React from 'react';
import {Text} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import {MainStackParamsList} from '../../../types';
import {
  StyledPressable,
  StyledPressableView,
} from '../StyledComponents/StyledButton';

const OAuthButton = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamsList>>();
  const handleKakaoButton = async () => {
    try {
      const kakaoLoginResponse = await loginWithKakaoAccount();
      const kakaoProfileResponse = await getProfile(
        kakaoLoginResponse.accessToken,
      );
      const loginResponse = await axios.post(
        `${BACKEND_URL}/auth/kakao/login`,
        {
          kakaoId: kakaoProfileResponse.id,
        },
      );
      if (loginResponse.data.signedUp === true) {
        await EncryptedStorage.setItem(
          'user_session',
          JSON.stringify({
            token: loginResponse.data.token,
          }),
        );
      } else {
        console.log(kakaoProfileResponse);
        navigation.navigate('SignUpScreen', {
          kakaoId: kakaoProfileResponse.id,
          email: kakaoProfileResponse.email,
          nickname: kakaoProfileResponse.nickname,
          image: kakaoProfileResponse.profileImageUrl,
        });
      }
      console.log(loginResponse.data);
    } catch (error) {
      console.log('login error: ', error);
    }
  };

  return (
    <StyledPressableView>
      <StyledPressable
        onPress={handleKakaoButton}
        android_ripple={{color: '#EFD604'}}
        style={{
          backgroundColor: '#FFE400',
          justifyContent: 'flex-start',
        }}>
        <KakaoIcon width={25} height={25} />
        <Text style={globalStyles.h2}>카카오 로그인</Text>
      </StyledPressable>
    </StyledPressableView>
  );
};
export default OAuthButton;
