import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import EditIcon from '@src/assets/icons/icon-edit.svg';
import {
  StyledRoundPressable,
  StyledRoundPressableView,
} from '@src/components/StyledComponents/StyledButton';
import {ROUND_ICON_SIZE, WHITE_PRESSED} from '@src/styles/globalStyleVariables';
import React from 'react';

import {MainStackParamsList} from '../../../../types';

const EditButton = ({planId}: {planId: number | undefined}) => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamsList>>();

  const onPress = () => {
    if (!planId) {
      return;
    }
    navigation.navigate('PlanEditScreen', {planId});
  };

  return (
    <StyledRoundPressableView>
      <StyledRoundPressable
        onPress={onPress}
        android_ripple={{color: WHITE_PRESSED, foreground: true}}>
        <EditIcon width={ROUND_ICON_SIZE - 3} height={ROUND_ICON_SIZE - 3} />
      </StyledRoundPressable>
    </StyledRoundPressableView>
  );
};
export default React.memo(EditButton);
