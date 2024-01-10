import {StackScreenProps} from '@react-navigation/stack';
import {PlansClose} from '@src/components/PlansScreenComponents/PlansClose';
import {
  StyledPressable,
  StyledPressableView,
} from '@src/components/StyledComponents/StyledButton';
import {
  StyledInputViewSignUp,
  StyledTextInput,
} from '@src/components/StyledComponents/StyledInput';
import {
  BLACK,
  BLUE,
  BLUE_PRESSED,
  WHITE,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import axiosInstance from '@src/utils/axiosService';
import React, {useState} from 'react';
import {
  Image,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';

import {MainStackParamsList} from '../../types';

type Props = StackScreenProps<MainStackParamsList, 'SignUpScreen'>;

const SignUpScreen = ({route, navigation}: Props) => {
  // const {signup} = React.useContext(AuthContext);
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
        navigation.navigate('WelcomeScreen', {
          token: signUpResponse.data.token,
          userId: signUpResponse.data.userId,
          nickname: route.params.nickname,
        });
      }
    } catch (error) {
      console.log('signup error: ', error);
    }
  };
  return (
    <React.Fragment>
      <PlansClose color={BLACK} />
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          flex: 1,
          gap: 20,
          paddingHorizontal: 50,
          paddingVertical: 130,
        }}
        style={{}}>
        <View
          style={[
            {
              borderRadius: 400,
              overflow: 'hidden',
              marginBottom: 30,
            },
          ]}>
          <Image
            source={{uri: userInfo.image}}
            style={{
              height: 130,
              width: 130,
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <StyledInputViewSignUp
            style={{
              marginBottom: 'auto',
            }}>
            <StyledTextInput
              style={{marginHorizontal: 10, textAlign: 'center'}}
              value={userInfo.nickname}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                setUserInfo(prevState => ({
                  ...prevState,
                  nickname: e.nativeEvent.text,
                }))
              }
            />
          </StyledInputViewSignUp>
        </View>

        <View
          style={{
            flexDirection: 'row',
          }}>
          <StyledInputViewSignUp
            style={{
              marginBottom: 'auto',
            }}>
            <StyledTextInput
              style={{marginHorizontal: 10, textAlign: 'center'}}
              value={userInfo.email}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                setUserInfo(prevState => ({
                  ...prevState,
                  email: e.nativeEvent.text,
                }))
              }
            />
          </StyledInputViewSignUp>
        </View>

        <View style={{flex: 1, minHeight: 80}} />

        <StyledPressableView>
          <StyledPressable
            onPress={handleSignUpButton}
            android_ripple={{color: BLUE_PRESSED}}
            style={{backgroundColor: BLUE}}>
            <Text style={[globalStyles.h4, {color: WHITE}]}>회원가입</Text>
          </StyledPressable>
        </StyledPressableView>
      </ScrollView>
    </React.Fragment>
  );
};
export default SignUpScreen;
