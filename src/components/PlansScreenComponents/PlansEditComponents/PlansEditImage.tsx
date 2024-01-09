import EditIcon from '@src/assets/icons/icon-edit.svg';
import {
  StyledRoundPressable,
  StyledRoundPressableView,
} from '@src/components/StyledComponents/StyledButton';
import {
  BLACK_PRESSED,
  ROUND_ICON_SIZE,
  WHITE,
  WHITE_PRESSED,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import {dateFormatter} from '@src/utils/dateFormatter';
import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

import {ImageType, PersonalPlansDetailedResponseType} from '../../../../types';

export const PlansEditImage = React.memo(
  ({
    image,
    setImage,
    plan,
  }: {
    image: ImageType;
    setImage: (uri: string, type: string, fileName: string) => void;
    plan: PersonalPlansDetailedResponseType | null;
  }) => {
    const handleEditImage = () => {
      const option: ImageLibraryOptions = {
        mediaType: 'photo',
        selectionLimit: 1,
      };
      launchImageLibrary(option, (response: ImagePickerResponse) => {
        if (
          response.assets &&
          response.assets.length >= 0 &&
          response.assets[0] &&
          response.assets[0].uri &&
          response.assets[0].type &&
          response.assets[0].fileName
        ) {
          setImage(
            response.assets[0].uri,
            response.assets[0].type,
            response.assets[0].fileName,
          );
          // console.log(response.assets[0]);
        }
      });
    };

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

          <StyledRoundPressableView
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
            }}>
            <StyledRoundPressable
              onPress={handleEditImage}
              android_ripple={{color: WHITE_PRESSED, foreground: true}}>
              <EditIcon width={ROUND_ICON_SIZE} height={ROUND_ICON_SIZE} />
            </StyledRoundPressable>
          </StyledRoundPressableView>
        </View>
      </ImageBackground>
    );
  },
);
