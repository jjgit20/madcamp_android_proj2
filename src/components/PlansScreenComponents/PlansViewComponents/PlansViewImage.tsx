import {BLACK_PRESSED, WHITE} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import {dateFormatter} from '@src/utils/dateFormatter';
import React from 'react';
import {ImageBackground, Text, View} from 'react-native';

import {ImageType, PersonalPlansDetailedResponseType} from '../../../../types';

export const PlansViewImage = React.memo(
  ({
    image,
    plan,
  }: {
    image: ImageType;
    plan: PersonalPlansDetailedResponseType | null;
  }) => {
    return (
      <ImageBackground
        source={
          image.uri
            ? {uri: image.uri}
            : require('@src/assets/images/default_image.png')
        }
        style={{
          width: '100%',
          height: 240,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: BLACK_PRESSED,
            padding: 20,
          }}>
          <View style={{marginTop: 'auto'}} />
          {plan?.country && plan?.city && (
            <Text style={[globalStyles.h3, {color: WHITE}]}>
              {plan?.country}, {plan?.city}
            </Text>
          )}
          {plan?.startDate && plan?.endDate && (
            <Text style={[globalStyles.h6, {color: WHITE}]}>
              {plan?.startDate && dateFormatter(plan.startDate as string)}
              {` ~ `}
              {plan?.endDate && dateFormatter(plan.endDate as string)}
            </Text>
          )}
        </View>
      </ImageBackground>
    );
  },
);
