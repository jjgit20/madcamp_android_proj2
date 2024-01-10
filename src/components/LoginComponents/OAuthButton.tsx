import {
  getProfile,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import KakaoIcon from '@src/assets/icons/oauth_kakao.svg';
import globalStyles from '@src/styles/style';
import axiosInstance from '@src/utils/axiosService';
import React from 'react';
import {Text} from 'react-native';
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
        await EncryptedStorage.setItem(
          'user_session',
          JSON.stringify({
            token: loginResponse.data.token,
            userId: loginResponse.data.userId,
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
      console.log('login error: ', error);
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
        <KakaoIcon width={25} height={25} />
        <Text
          style={[
            globalStyles.h4,
            {
              flex: 1,
              textAlign: 'center',
            },
          ]}>
          카카오 로그인
        </Text>
      </StyledPressable>
    </StyledPressableView>
  );
};
export default OAuthButton;
