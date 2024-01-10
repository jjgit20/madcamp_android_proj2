import {StackScreenProps} from '@react-navigation/stack';
import {
  StyledPressable,
  StyledPressableView,
} from '@src/components/StyledComponents/StyledButton';
import {
  BLACK,
  BLUE,
  BLUE_LIGHT,
  BLUE_LIGHT_PRESSED,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import React from 'react';
import {Image, Text} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AuthContext} from '../../App';
import {MainStackParamsList} from '../../types';

type Props = StackScreenProps<MainStackParamsList, 'WelcomeScreen'>;

const WelcomeScreen = ({route, navigation}: Props) => {
  const {signup} = React.useContext(AuthContext);

  const handleSignUpButton = async () => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);

    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify({
        token: route.params.token,
        userId: route.params.userId,
        expiration: expiry.getTime(),
      }),
    );
    signup(route.params.token);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        gap: 10,
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 130,
      }}>
      <Text style={[globalStyles.h2, {color: BLACK}]}>환영합니다,</Text>
      <Text style={[globalStyles.h2, {color: BLUE, marginBottom: 'auto'}]}>
        {route.params.nickname}님
      </Text>

      <Image
        source={require('@src/assets/images/welcome_image.webp')}
        style={{
          width: '60%',
          height: 300,
        }}
        resizeMode={'contain'}
      />
      <StyledPressableView style={{marginTop: 'auto'}}>
        <StyledPressable
          onPress={handleSignUpButton}
          android_ripple={{color: BLUE_LIGHT_PRESSED}}
          style={{backgroundColor: BLUE_LIGHT}}>
          <Text style={[globalStyles.h4, {color: BLUE}]}>시작하기</Text>
        </StyledPressable>
      </StyledPressableView>
    </SafeAreaView>
  );
};
export default WelcomeScreen;
