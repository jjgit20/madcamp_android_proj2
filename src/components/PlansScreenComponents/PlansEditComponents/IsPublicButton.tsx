import ViewIcon from '@src/assets/icons/View.svg';
import {
  StyledRoundPressable,
  StyledRoundPressableView,
} from '@src/components/StyledComponents/StyledButton';
import {ROUND_ICON_SIZE, WHITE_PRESSED} from '@src/styles/globalStyleVariables';
import React from 'react';

const IsPublicButton = () => {
  return (
    <StyledRoundPressableView
      style={{
        position: 'absolute',
        top: 10,
        right: 110,
        zIndex: 9,
      }}>
      <StyledRoundPressable
        // onPress={handleEditImage}
        android_ripple={{color: WHITE_PRESSED, foreground: true}}>
        <ViewIcon
          width={ROUND_ICON_SIZE}
          height={ROUND_ICON_SIZE}
          style={{color: '#ffffff'}}
        />
      </StyledRoundPressable>
    </StyledRoundPressableView>
  );
};

export default React.memo(IsPublicButton);
