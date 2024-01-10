import CloseIcon from '@src/assets/icons/icon-close.svg';
import {
  StyledRoundPressable,
  StyledRoundPressableView,
} from '@src/components/StyledComponents/StyledButton';
import {StyledMoneyInput} from '@src/components/StyledComponents/StyledInput';
import {BLACK_PRESSED, ROUND_ICON_SIZE} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import React from 'react';
import {Text, View} from 'react-native';

import PlaceIcon from './PlaceIcon';

const PlansPlace = ({
  name,
  type,
  cash,
  planPlaceId,
  openModal,
  changeCash,
}: {
  name: string;
  type: string;
  cash: number;
  planPlaceId: number;
  openModal: (id: number) => void;
  changeCash: (planPlaceId: number, money: number) => void;
}) => {
  const removePlanPlace = async () => {
    openModal(planPlaceId);
  };

  return (
    <React.Fragment>
      <View style={{flexDirection: 'row'}}>
        <StyledRoundPressableView
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 9,
          }}>
          <StyledRoundPressable
            onPress={removePlanPlace}
            android_ripple={{
              color: BLACK_PRESSED,
              foreground: true,
            }}>
            <CloseIcon width={ROUND_ICON_SIZE} height={ROUND_ICON_SIZE} />
          </StyledRoundPressable>
        </StyledRoundPressableView>
        <View style={{padding: 20, justifyContent: 'center'}}>
          <PlaceIcon type={type} customSize={20} />
        </View>
        <View
          style={{
            padding: 20,
            gap: 10,
            justifyContent: 'center',
            flex: 1,
          }}>
          <Text style={globalStyles.body1}>{name}</Text>
          <StyledMoneyInput
            money={cash}
            changeCash={(money: number) => changeCash(planPlaceId, money)}
          />
        </View>
      </View>
    </React.Fragment>
  );
};
export default React.memo(PlansPlace);
