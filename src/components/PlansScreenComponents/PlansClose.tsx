import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import BackIcon from '@src/assets/icons/icon-back.svg';
import {
  StyledRoundPressable,
  StyledRoundPressableView,
} from '@src/components/StyledComponents/StyledButton';
import {
  BLACK_PRESSED,
  ROUND_ICON_SIZE,
  WHITE,
  WHITE_PRESSED,
} from '@src/styles/globalStyleVariables';
import React from 'react';

import {MainStackParamsList} from '../../../types';

export const PlansClose = ({color}: {color: string}) => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamsList>>();
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <StyledRoundPressableView
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 9,
      }}>
      <StyledRoundPressable
        onPress={handleBack}
        android_ripple={{
          color: color === WHITE ? WHITE_PRESSED : BLACK_PRESSED,
          foreground: true,
        }}>
        <BackIcon
          width={ROUND_ICON_SIZE}
          height={ROUND_ICON_SIZE}
          fill={color}
          stroke={color}
        />
      </StyledRoundPressable>
    </StyledRoundPressableView>
  );
};
