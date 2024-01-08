import SaveIcon from '@src/assets/icons/icon-save.svg';
import {
  StyledRoundPressable,
  StyledRoundPressableView,
} from '@src/components/StyledComponents/StyledButton';
import {ROUND_ICON_SIZE, WHITE_PRESSED} from '@src/styles/globalStyleVariables';
import React from 'react';

const PlansSave = () => {
  return (
    <StyledRoundPressableView
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 9,
      }}>
      <StyledRoundPressable
        // onPress={handleEditImage}
        android_ripple={{color: WHITE_PRESSED, foreground: true}}>
        <SaveIcon width={ROUND_ICON_SIZE} height={ROUND_ICON_SIZE} />
      </StyledRoundPressable>
    </StyledRoundPressableView>
  );
};
export default React.memo(PlansSave);
