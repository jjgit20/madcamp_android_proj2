import {
  BLUE,
  BLUE_LIGHT,
  BLUE_LIGHT_PRESSED,
  WHITE,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import axiosInstance from '@src/utils/axiosService';
import React from 'react';
import {Text, View} from 'react-native';
import {Modal} from 'react-native-paper';

import {
  StyledCardPressableView,
  StyledPressable,
  StyledPressableView,
} from '../../StyledComponents/StyledButton';

export const PlansPlaceDelete = React.memo(
  ({
    isVisible,
    planPlaceDelId,
    closeModal,
    delPlanPlace,
  }: {
    isVisible: boolean;
    planPlaceDelId: number;
    closeModal: () => void;
    delPlanPlace: () => void;
  }) => {
    if (!isVisible) {
      return <></>;
    }

    const handleDelete = async () => {
      try {
        const deleteResponse = axiosInstance.delete(
          `/places/${planPlaceDelId}`,
        );
        delPlanPlace();
        closeModal();
      } catch (error) {
        console.log('Error removing place from plan: ', error);
      }
    };

    return (
      <View
        style={{
          zIndex: 1000,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Modal visible={isVisible}>
          <StyledCardPressableView
            style={{
              marginHorizontal: 40,
              padding: 40,
              backgroundColor: WHITE,
              alignItems: 'center',
              gap: 15,
            }}>
            <Text style={globalStyles.h4}>이 장소를 삭제하시겠습니까?</Text>
            <View style={{flexDirection: 'row', gap: 15}}>
              <StyledPressableView style={{width: 'auto', flex: 1}}>
                <StyledPressable
                  onPress={closeModal}
                  android_ripple={{color: BLUE_LIGHT_PRESSED}}
                  style={{backgroundColor: BLUE_LIGHT, width: 'auto'}}>
                  <Text style={[globalStyles.h5, {color: BLUE}]}>취소</Text>
                </StyledPressable>
              </StyledPressableView>
              <StyledPressableView style={{width: 'auto', flex: 1}}>
                <StyledPressable
                  onPress={handleDelete}
                  android_ripple={{color: BLUE_LIGHT_PRESSED}}
                  style={{backgroundColor: BLUE_LIGHT, width: 'auto'}}>
                  <Text style={[globalStyles.h5, {color: BLUE}]}>삭제</Text>
                </StyledPressable>
              </StyledPressableView>
            </View>
          </StyledCardPressableView>
        </Modal>
      </View>
    );
  },
);
