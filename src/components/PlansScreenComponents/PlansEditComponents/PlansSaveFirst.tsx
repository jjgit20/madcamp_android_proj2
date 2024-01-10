import {
  BLUE,
  BLUE_LIGHT,
  BLUE_LIGHT_PRESSED,
  WHITE,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Modal} from 'react-native-paper';

import {
  StyledCardPressableView,
  StyledPressable,
  StyledPressableView,
} from '../../StyledComponents/StyledButton';

export const PlansSaveFirst = React.memo(
  ({
    isVisible,
    closeModal,
    savePlan,
  }: {
    isVisible: boolean;
    closeModal: () => void;
    savePlan: () => Promise<void>;
  }) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    if (!isVisible) {
      return <></>;
    }

    const handleSaveFirst = async () => {
      try {
        setShowSuccessMessage(true);

        // Close the success message after 2 seconds (adjust as needed)
        setTimeout(() => {
          setShowSuccessMessage(false);
          savePlan();
          closeModal();
        }, 500);
      } catch (error) {
        console.log('Error handleSaveFirst: ', error);
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
            {showSuccessMessage ? (
              <Text style={globalStyles.h5}>저장되었습니다!</Text>
            ) : (
              <React.Fragment>
                <Text style={globalStyles.h5}>먼저 이 계획을 저장하세요!</Text>
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
                      onPress={handleSaveFirst}
                      android_ripple={{color: BLUE_LIGHT_PRESSED}}
                      style={{backgroundColor: BLUE_LIGHT, width: 'auto'}}>
                      <Text style={[globalStyles.h5, {color: BLUE}]}>저장</Text>
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
