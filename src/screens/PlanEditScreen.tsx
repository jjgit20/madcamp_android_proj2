import {StackScreenProps} from '@react-navigation/stack';
import {PlansClose} from '@src/components/PlansScreenComponents/PlansClose';
import {PlansEditDays} from '@src/components/PlansScreenComponents/PlansEditComponents/PlansEditDays';
import {PlansEditImage} from '@src/components/PlansScreenComponents/PlansEditComponents/PlansEditImage';
import PlansEditItems from '@src/components/PlansScreenComponents/PlansEditComponents/PlansEditItems';
import PlansSave from '@src/components/PlansScreenComponents/PlansEditComponents/PlansSave';
import {StyledScrollView} from '@src/components/StyledComponents/StyledScreenView';
import {
  BLACK,
  HEADING_VERTICAL_MARGIN,
  WHITE,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
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

const PlanEditScreen = ({route, navigation}: Props) => {
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
      <PlansClose color={WHITE} />
      <PlansSave />
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

export default React.memo(PlanEditScreen);
