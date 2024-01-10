import React from 'react';
import {View} from 'react-native';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import IsComplitButton from './IsComplitButton';
import IsPublicButton from './IsPublicButton';

export const PlansModifyButtonBar = ({
  isPublic,
  isComplete,
  planId,
  toggleModal,
  toggleOtherModal,
}: {
  isPublic: boolean | undefined;
  isComplete: boolean | undefined;
  planId: number | undefined;
  toggleModal: () => void;
  toggleOtherModal: () => void;
}) => {
  return (
    <React.Fragment>
      <View
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 9,
          flexDirection: 'row',
          gap: 5,
        }}>
        <DeleteButton onPress={toggleModal} />

        {isComplete ? (
          <IsPublicButton onPress={toggleOtherModal} isPublic={isPublic} />
        ) : (
          <IsComplitButton onPress={toggleOtherModal} />
        )}
        {!isComplete && <EditButton planId={planId} />}
      </View>
    </React.Fragment>
  );
};
export default React.memo(PlansModifyButtonBar);
