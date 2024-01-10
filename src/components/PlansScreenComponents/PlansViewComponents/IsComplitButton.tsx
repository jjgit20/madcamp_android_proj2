import SendIcon from '@src/assets/icons/Send_fill.svg';
import {
  StyledRoundPressable,
  StyledRoundPressableView,
} from '@src/components/StyledComponents/StyledButton';
import {ROUND_ICON_SIZE, WHITE_PRESSED} from '@src/styles/globalStyleVariables';
import React from 'react';

const PlansComplit = ({onPress}: {onPress: () => void}) => {
  return (
    <StyledRoundPressableView>
      <StyledRoundPressable
        onPress={onPress}
        android_ripple={{color: WHITE_PRESSED, foreground: true}}>
        <SendIcon
          width={ROUND_ICON_SIZE}
          height={ROUND_ICON_SIZE}
          style={{color: '#ffffff'}}
        />
      </StyledRoundPressable>
    </StyledRoundPressableView>
  );
};
export default React.memo(PlansComplit);
