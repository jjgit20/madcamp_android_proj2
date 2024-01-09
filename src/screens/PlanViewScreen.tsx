import {StackScreenProps} from '@react-navigation/stack';
import {PlansClose} from '@src/components/PlansScreenComponents/PlansClose';
import DeleteButton from '@src/components/PlansScreenComponents/PlansEditComponents/DeleteButton';
import IsComplitButton from '@src/components/PlansScreenComponents/PlansEditComponents/IsComplitButton';
import IsPublicButton from '@src/components/PlansScreenComponents/PlansEditComponents/IsPublicButton';
import {PlansEditDays} from '@src/components/PlansScreenComponents/PlansEditComponents/PlansEditDays';
import {PlansEditImage} from '@src/components/PlansScreenComponents/PlansEditComponents/PlansEditImage';
import PlansEditItems from '@src/components/PlansScreenComponents/PlansEditComponents/PlansEditItems';
import {StyledScrollView} from '@src/components/StyledComponents/StyledScreenView';
import {BLACK, HEADING_VERTICAL_MARGIN} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import {commonCountries} from '@src/utils/\bselectService';
import axiosInstance from '@src/utils/axiosService';
import {dateDifference} from '@src/utils/dateFormatter';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  ImageType,
  MainStackParamsList,
  PersonalPlansDetailedResponseType,
} from '../../types';

type Props = StackScreenProps<MainStackParamsList, 'PlanEditScreen', 'Stack'>;
export const neededInfo = [
  {id: 'country', name: '나라', type: 'select', options: commonCountries},
  {id: 'city', name: '도시', type: 'select'},
  {id: 'date', name: '시작일', type: 'date'},
  {id: 'cash', name: '경비', type: 'money'},
];
export const extraInfo = [
  {id: 'airport', name: '공항', type: 'select'},
  {id: 'season', name: '계절', type: 'select'},
  {id: 'topic', name: '주제', type: 'string'},
];

const PlanViewScreen = ({route, navigation}: Props) => {
  const [plan, setPlan] = useState<PersonalPlansDetailedResponseType | null>(
    null,
  );
  const [image, setImage] = useState<ImageType>({uri: null, type: null});
  const [days, setDays] = useState<Date[]>([]);

  const getPlan = useCallback(async () => {
    if (plan == null && route.params.planId !== 0) {
      const personalPlansDetailedResponse = await axiosInstance.get(
        `/plans/${route.params.planId}`,
      );
      console.log('heheheh', personalPlansDetailedResponse.data);
      setPlan(personalPlansDetailedResponse.data);
      setImage({uri: personalPlansDetailedResponse.data.image, type: null});
      setDays(
        dateDifference(
          personalPlansDetailedResponse.data.startDate,
          personalPlansDetailedResponse.data.endDate,
        ),
      );
    }
  }, [plan, route.params.planId]);
  useEffect(() => {
    getPlan();
  }, [getPlan]);

  const modifyPlan = useCallback(
    (param: string, change: any, secondParam?: string, secondChange?: any) => {
      setPlan((prevState: PersonalPlansDetailedResponseType | null) => {
        if (prevState === null) {
          return prevState;
        } else if (!secondParam || !secondChange) {
          return {...prevState, [param]: change};
        } else {
          return {...prevState, [param]: change, [secondParam]: secondChange};
        }
      });
      if (param === 'startDate' && secondParam === 'endDate') {
        setDays(dateDifference(change, secondChange));
      }
    },
    [],
  );

  return (
    <View style={StyleSheet.absoluteFill}>
      <PlansClose />
      <DeleteButton />
      <IsComplitButton />
      <IsPublicButton />
      <PlansEditImage
        image={image}
        setImage={(uri: string, type: string) => setImage({uri, type})}
        plan={plan}
      />
      <StyledScrollView
        contentContainerStyle={{gap: 15, paddingVertical: 20}}
        nestedScrollEnabled={true}>
        <Text style={[globalStyles.h4, {color: BLACK}]}>여행 필수 정보</Text>
        <PlansEditItems plan={plan} type={'needed'} modifyPlan={modifyPlan} />
        <Text
          style={[
            globalStyles.h4,
            {color: BLACK, marginTop: HEADING_VERTICAL_MARGIN},
          ]}>
          여행 추가 정보
        </Text>
        <PlansEditItems plan={plan} type={'extra'} modifyPlan={modifyPlan} />
        {days.map((day: Date, index: number) => (
          <PlansEditDays key={index} day={index + 1} />
        ))}
      </StyledScrollView>
    </View>
  );
};

export default PlanViewScreen;
