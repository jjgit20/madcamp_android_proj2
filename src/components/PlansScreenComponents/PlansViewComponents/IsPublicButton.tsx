import ViewIcon from '@src/assets/icons/View.svg';
import ViewHideIcon from '@src/assets/icons/View_hide.svg';
import {
  StyledRoundPressable,
  StyledRoundPressableView,
} from '@src/components/StyledComponents/StyledButton';
import {ROUND_ICON_SIZE, WHITE_PRESSED} from '@src/styles/globalStyleVariables';
import React from 'react';

const IsPublicButton = ({
  isPublic,
  onPress,
}: {
  isPublic: boolean | undefined;
  onPress: () => void;
}) => {
  return (
    <StyledRoundPressableView>
      <StyledRoundPressable
        onPress={onPress}
        android_ripple={{color: WHITE_PRESSED, foreground: true}}>
        {isPublic ? (
          <ViewIcon
            width={ROUND_ICON_SIZE}
            height={ROUND_ICON_SIZE}
            style={{color: '#ffffff'}}
          />
        ) : (
          <ViewHideIcon
            width={ROUND_ICON_SIZE}
            height={ROUND_ICON_SIZE}
            style={{color: '#ffffff'}}
          />
        )}
      </StyledRoundPressable>
    </StyledRoundPressableView>
  );
};

export default React.memo(IsPublicButton);
