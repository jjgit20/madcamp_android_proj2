import {GOOGLE_API_KEY} from '@env';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {PlansClose} from '@src/components/PlansScreenComponents/PlansClose';
import PlaceIcon from '@src/components/PlansScreenComponents/PlansEditComponents/PlaceIcon';
import {
  StyledPressable,
  StyledPressableView,
} from '@src/components/StyledComponents/StyledButton';
import {StyledScreenView} from '@src/components/StyledComponents/StyledScreenView';
import {
  BLACK,
  BLUE,
  BLUE_LIGHT,
  BLUE_LIGHT_PRESSED,
  DARK_GREY,
  HEADING_VERTICAL_MARGIN,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import {countryCodes} from '@src/utils/\bselectService';
import axiosInstance from '@src/utils/axiosService';
import {getLocationType} from '@src/utils/locationTypingService';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {BackHandler, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {Place, PlanPlace} from '../../../../types';

const PlansPlaceNew = ({
  planId,
  orderInDay,
  visitDate,
  closeModal,
  newPlanPlace,
  planCountry,
}: {
  planId: number;
  orderInDay: number;
  visitDate: number;
  closeModal: () => void;
  newPlanPlace: (place: PlanPlace) => void;
  planCountry: string | null | undefined;
}) => {
  const [place, setPlace] = useState<Place>();
  const snapPoints = useMemo(() => ['60%', '75%'], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleNewPlanPlace = async () => {
    if (!place) {
      return;
    }
    try {
      const placeData = {
        orderInDay: orderInDay,
        visitDate: new Date(visitDate),
      };
      const placeResponse = await axiosInstance.post(
        `/places/${place.placeId}/plans/${planId}`,
        placeData,
      );
      newPlanPlace(placeResponse.data);
      closeModal();
    } catch (error) {
      console.log('Error adding place to plan: ', error);
    }
  };

  useEffect(() => {
    const backAction = () => {
      closeModal();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [closeModal]);

  return (
    <BottomSheetModalProvider>
      <StyledScreenView style={{backgroundColor: '#F9F9F9'}}>
        <PlansClose color={BLACK} customBack={() => closeModal()} />

        <GooglePlacesAutocomplete
          placeholder={'검색어를 입력하세요'}
          onPress={async (data, details = null) => {
            try {
              const placeData = {
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
                type: getLocationType(details?.types),
                name: details?.name,
              };
              const placeResponse = await axiosInstance.post(
                `/places`,
                placeData,
              );
              setPlace(placeResponse.data);
              bottomSheetModalRef.current?.present();
            } catch (error) {
              console.log('Error with google autocomplete: ', error);
            }
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: 'ko',
            components: `country:${
              planCountry &&
              Object.keys(countryCodes).includes(planCountry) &&
              countryCodes[planCountry as keyof typeof countryCodes]
            }`,
          }}
          styles={styles.search}
          fetchDetails
        />
        {place && (
          <BottomSheetModal
            style={{
              zIndex: 9,
              elevation: 50,
              marginHorizontal: 10,
              backgroundColor: 'transparent',
            }}
            handleIndicatorStyle={{width: '20%', marginTop: 5}}
            snapPoints={snapPoints}
            ref={bottomSheetModalRef}>
            <View
              style={{
                flex: 1,
                gap: 30,
                alignItems: 'center',
                padding: 30,
              }}>
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: BLUE_LIGHT,
                  padding: 35,
                }}>
                <PlaceIcon
                  type={place.placeType}
                  customSize={45}
                  customColor={BLACK}
                />
              </View>
              <Text style={[globalStyles.h2, {color: BLACK}]}>
                {place.name}
              </Text>

              <StyledPressableView>
                <StyledPressable
                  onPress={handleNewPlanPlace}
                  android_ripple={{color: BLUE_LIGHT_PRESSED}}
                  style={{backgroundColor: BLUE_LIGHT}}>
                  <Text style={[globalStyles.h5, {color: BLUE}]}>
                    내 여행에 추가하기
                  </Text>
                </StyledPressable>
              </StyledPressableView>
            </View>
          </BottomSheetModal>
        )}
      </StyledScreenView>
    </BottomSheetModalProvider>
  );
};

export default React.memo(PlansPlaceNew);

const styles = {
  search: {
    container: {
      marginTop: HEADING_VERTICAL_MARGIN * 2,
    },
    textInput: {
      ...globalStyles.body1,
      borderColor: DARK_GREY,
      borderWidth: 1,
      borderRadius: 10,
    },
    description: {...globalStyles.body1},
  },
};
