import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import PlusIcon from '@src/assets/icons/icon-plus.svg';
import {
  BLUE,
  BLUE_PRESSED,
  ROUND_ICON_SIZE,
} from '@src/styles/globalStyleVariables';
import React from 'react';
import {StyleSheet} from 'react-native';

import {MainStackParamsList} from '../../../types';
import {
  StyledRoundPressable,
  StyledRoundPressableView,
} from '../StyledComponents/StyledButton';

export const PlansNewButton = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamsList>>();
  const handleNewPlan = () => {
    navigation.navigate('PlanEditScreen', {planId: 0});
  };

  return (
    <StyledRoundPressableView style={style.container}>
      <StyledRoundPressable
        onPress={handleNewPlan}
        android_ripple={{color: BLUE_PRESSED}}>
        <PlusIcon width={ROUND_ICON_SIZE} height={ROUND_ICON_SIZE} />
      </StyledRoundPressable>
    </StyledRoundPressableView>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: BLUE,
  },
});
