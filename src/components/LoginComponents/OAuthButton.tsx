import {
  getProfile,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import KakaoIcon from '@src/assets/icons/oauth_kakao.svg';
import globalStyles from '@src/styles/style';
import axiosInstance from '@src/utils/axiosService';
import {AxiosError} from 'axios';
import React from 'react';
import {Text, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import {AuthContext} from '../../../App';
import {MainStackParamsList} from '../../../types';
import {
  StyledPressable,
  StyledPressableView,
} from '../StyledComponents/StyledButton';

const OAuthButton = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamsList>>();
  const {login} = React.useContext(AuthContext);

  const handleKakaoButton = async () => {
    try {
      const kakaoLoginResponse = await loginWithKakaoAccount();
      const kakaoProfileResponse = await getProfile(
        kakaoLoginResponse.accessToken,
      );
      const loginResponse = await axiosInstance.post(`/auth/kakao/login`, {
        kakaoId: kakaoProfileResponse.id,
      });
      if (loginResponse.data.signedUp === true) {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 1);
        await EncryptedStorage.setItem(
          'user_session',
          JSON.stringify({
            token: loginResponse.data.token,
            userId: loginResponse.data.userId,
            expiration: expiry.getTime(),
          }),
        );
        login(loginResponse.data.token);
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
      console.log(
        'login error: ',
        error,
        (error as AxiosError).message,
        (error as AxiosError).cause,
      );
    }
  };

  return (
    <StyledPressableView style={{marginTop: 'auto'}}>
      <StyledPressable
        onPress={handleKakaoButton}
        android_ripple={{color: '#EFD604'}}
        style={{
          backgroundColor: '#FFE400',
          justifyContent: 'flex-start',
          gap: 20,
        }}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <KakaoIcon width={25} height={25} />
        </View>
        <Text
          style={[
            globalStyles.h4,
            {
              flex: 2,
              alignItems: 'flex-start',
            },
          ]}>
          카카오 로그인
        </Text>
      </StyledPressable>
    </StyledPressableView>
  );
};
export default OAuthButton;
