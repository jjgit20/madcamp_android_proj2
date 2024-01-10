import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  BLACK,
  BLUE,
  BLUE_LIGHT,
  BLUE_LIGHT_PRESSED,
  WHITE,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import axiosInstance from '@src/utils/axiosService';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Modal} from 'react-native-paper';

import {MainStackParamsList} from '../../../../types';
import {
  StyledCardPressableView,
  StyledPressable,
  StyledPressableView,
} from '../../StyledComponents/StyledButton';

export const PlansModal = React.memo(
  ({
    isVisible,
    planId,
    closeModal,
    type,
    modifyPlan,
  }: {
    isVisible: boolean;
    planId: number | undefined;
    closeModal: () => void;
    type: string;
    modifyPlan: (param: string) => void;
  }) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigation =
      useNavigation<StackNavigationProp<MainStackParamsList>>();

    if (!isVisible) {
      return <></>;
    }

    const handleDelete = async () => {
      if (!planId) {
        return;
      }
      try {
        const deleteResponse = axiosInstance.delete(`/plans/${planId}`);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigation.navigate('MainTabs');
          closeModal();
        }, 500);
      } catch (error) {
        console.log('Error removing  plan: ', error);
      }
    };

    const handleComplete = async () => {
      if (!planId) {
        return;
      }
      try {
        const completeResponse = axiosInstance.patch(
          `/plans/${planId}/isComplete`,
        );
        setShowSuccessMessage(true);
        modifyPlan('isComplete');
        setTimeout(() => {
          setShowSuccessMessage(false);
          closeModal();
        }, 500);
      } catch (error) {
        console.log('Error removing  plan: ', error);
      }
    };

    const handlePublic = async () => {
      if (!planId) {
        return;
      }
      try {
        const completeResponse = axiosInstance.patch(
          `/plans/${planId}/isPublic`,
        );
        setShowSuccessMessage(true);
        modifyPlan('isPublic');
        setTimeout(() => {
          setShowSuccessMessage(false);
          closeModal();
        }, 500);
      } catch (error) {
        console.log('Error removing  plan: ', error);
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
              gap: 20,
            }}>
            {showSuccessMessage ? (
              <Text style={globalStyles.h5}>
                {type === 'delete'
                  ? '삭제되었습니다!'
                  : type === 'complete'
                    ? '완료되었습니다!'
                    : '변경되었습니다!'}
              </Text>
            ) : (
              <React.Fragment>
                <Text style={[globalStyles.h5, {color: BLACK}]}>
                  {type === 'delete'
                    ? '이 여행을 삭제하시겠습니까?'
                    : type === 'complete'
                      ? '이 여행을 완료하시겠습니까? 추후 계획 변경은 불가능합니다.'
                      : '이 여행의 보기 설정을 바꾸시겠습니다?'}
                </Text>
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
                      onPress={
                        type === 'delete'
                          ? handleDelete
                          : type === 'complete'
                            ? handleComplete
                            : handlePublic
                      }
                      android_ripple={{color: BLUE_LIGHT_PRESSED}}
                      style={{backgroundColor: BLUE_LIGHT, width: 'auto'}}>
                      <Text style={[globalStyles.h5, {color: BLUE}]}>
                        {type === 'delete'
                          ? '삭제'
                          : type === 'complete'
                            ? '완료'
                            : '변경'}
                      </Text>
                    </StyledPressable>
                  </StyledPressableView>
                </View>
              </React.Fragment>
            )}
          </StyledCardPressableView>
        </Modal>
      </View>
    );
  },
);
