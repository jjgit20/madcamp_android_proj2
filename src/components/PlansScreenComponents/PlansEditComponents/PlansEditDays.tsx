import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  StyledPressable,
  StyledPressableView,
} from '@src/components/StyledComponents/StyledButton';
import {
  BLACK,
  BLUE,
  BLUE_LIGHT,
  BLUE_LIGHT_PRESSED,
  HEADING_VERTICAL_MARGIN,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import React from 'react';
import {Text} from 'react-native';

import {MainStackParamsList} from '../../../../types';

export const PlansEditDays = ({day}: {day: number}) => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamsList>>();
  const handleNewPlace = () => {
    navigation.navigate('SearchPlaceScreen');
  };
  return (
    <React.Fragment>
      <Text
        style={[
          globalStyles.h4,
          {color: BLACK, marginTop: HEADING_VERTICAL_MARGIN},
        ]}>
        {day}일차
      </Text>
      <StyledPressableView>
        <StyledPressable
          onPress={handleNewPlace}
          android_ripple={{color: BLUE_LIGHT_PRESSED}}
          style={{backgroundColor: BLUE_LIGHT}}>
          <Text style={[globalStyles.h5, {color: BLUE}]}>추가하기</Text>
        </StyledPressable>
      </StyledPressableView>
    </React.Fragment>
  );
};
