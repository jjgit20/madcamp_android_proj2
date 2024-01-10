import {BLACK, HEADING_VERTICAL_MARGIN} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import React from 'react';
import {Text} from 'react-native';

import PlansPlace from './PlansPlace';
import {PlanPlace} from '../../../../types';

export const PlansViewDays = React.memo(
  ({day, date, places}: {day: number; date: number; places: PlanPlace[]}) => {
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
          />
        ))}
      </React.Fragment>
    );
  },
);
