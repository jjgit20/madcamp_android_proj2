import FavoritIcon from '@src/assets/icons/Favorite_fill.svg';
import ForkIcon from '@src/assets/icons/fork_icon.svg';
import {BLACK_PRESSED, WHITE} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import {dateFormatter} from '@src/utils/dateFormatter';
import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {ImageType, PersonalPlansDetailedResponseType} from '../../../../types';

export const PlansViewImage = React.memo(
  ({
    image,
    plan,
    handlePressLike,
    handlePressFork,
  }: {
    image: ImageType;
    plan: PersonalPlansDetailedResponseType | null;
    handlePressLike: () => Promise<void>;
    handlePressFork: () => Promise<void>;
  }) => {
    const iconSize = 24;

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
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              gap: 10,
              bottom: 15,
              right: 15,
            }}>
            <TouchableOpacity
              onPress={handlePressLike}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
                gap: 10,
              }}>
              <FavoritIcon
                width={iconSize}
                height={iconSize}
                style={{color: WHITE}}
              />
              <Text style={[globalStyles.h6, {color: WHITE}]}>
                {plan?.likes?.length}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePressFork}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
                gap: 10,
              }}>
              <ForkIcon
                width={iconSize}
                height={iconSize}
                style={{color: '#ffffff'}}
              />
              <Text style={[globalStyles.h6, {color: WHITE}]}>
                {plan?.forks?.length}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  },
);
