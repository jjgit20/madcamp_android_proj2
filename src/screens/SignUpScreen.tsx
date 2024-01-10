import {StackScreenProps} from '@react-navigation/stack';
import {PlansClose} from '@src/components/PlansScreenComponents/PlansClose';
import {
  StyledPressable,
  StyledPressableView,
} from '@src/components/StyledComponents/StyledButton';
import {
  BLACK,
  BLUE,
  BLUE_PRESSED,
  WHITE,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import axiosInstance from '@src/utils/axiosService';
import React, {useState} from 'react';
import {Text} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AuthContext} from '../../App';
import {MainStackParamsList} from '../../types';

type Props = StackScreenProps<MainStackParamsList, 'SignUpScreen'>;

const SignUpScreen = ({route, navigation}: Props) => {
  const {signup} = React.useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    kakaoId: route.params.kakaoId,
    username: 'tester',
    password: 'testpwd',
    nickname: route.params.nickname,
    email: route.params.email,
    image: route.params.image,
  });

  const handleSignUpButton = async () => {
    try {
      const signUpResponse = await axiosInstance.post(
        `/auth/kakao/signup`,
        userInfo,
      );
      if (signUpResponse.data.signedUp === true) {
        await EncryptedStorage.setItem(
          'user_session',
          JSON.stringify({
            token: signUpResponse.data.token,
            userId: signUpResponse.data.userId,
          }),
        );
        signup(signUpResponse.data.token);
      }
      console.log(signUpResponse.data);

      console.log(signUpResponse.data);
    } catch (error) {
      console.log('signup error: ', error);
    }
  };
  return (
    <React.Fragment>
      <PlansClose color={BLACK} />
      <SafeAreaView
        style={{
          flex: 1,
          gap: 10,
          alignItems: 'center',
          paddingHorizontal: 50,
          paddingVertical: 130,
        }}>
        {/* <StyledInputView
              style={{
                height: 100,
                alignItems: 'flex-start',
                overflow: 'hidden',
              }}>
              <StyledTextInput
                multiline={true}
                style={{
                  height: '100%',
                  marginHorizontal: 10,
                  textAlignVertical: 'top',
                }}
                value={userInfo.nickname}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                  setUserInfo('selfReview', e.nativeEvent.text)
                }
              />
            </StyledInputView> */}

        <StyledPressableView style={{marginTop: 'auto'}}>
          <StyledPressable
            onPress={handleSignUpButton}
            android_ripple={{color: BLUE_PRESSED}}
            style={{backgroundColor: BLUE}}>
            <Text style={[globalStyles.h4, {color: WHITE}]}>회원가입</Text>
          </StyledPressable>
        </StyledPressableView>
      </SafeAreaView>
    </React.Fragment>
  );
};
export default SignUpScreen;
