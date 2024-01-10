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

import PlansPlace from './PlansPlace';
import {PlanPlace} from '../../../../types';

export const PlansEditDays = React.memo(
  ({
    day,
    date,
    places,
    openModal,
    openNewModal,
    changeCash,
  }: {
    day: number;
    date: number;
    places: PlanPlace[];
    openModal: (id: number) => void;
    openNewModal: (orderInDay: number, visitDate: number) => void;
    changeCash: (planPlaceId: number, money: number) => void;
  }) => {
    const handleNewPlace = () => {
      openNewModal(places.length + 1, date);
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
        {places.map((place, index) => (
          <PlansPlace
            key={index}
            name={place.place.name}
            type={place.place.placeType}
            cash={place.money}
            planPlaceId={place.planPlaceId}
            openModal={openModal}
            changeCash={changeCash}
          />
        ))}
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
  },
);
