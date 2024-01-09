import {useFocusEffect} from '@react-navigation/native';
import {PlansCard} from '@src/components/PlansScreenComponents/PlansCard';
import {PlansNewButton} from '@src/components/PlansScreenComponents/PlansNewButton';
import {StyledScrollView} from '@src/components/StyledComponents/StyledScreenView';
import {BLUE, HEADING_VERTICAL_MARGIN} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import axiosInstance from '@src/utils/axiosService';
import React, {useCallback, useState} from 'react';
import {Text} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import {PersonalPlansResponseType} from '../../types';

const PlansScreen = () => {
  const [currentPlans, setCurrentPlans] = useState<PersonalPlansResponseType[]>(
    [],
  );
  const [futurePlans, setFuturePlans] = useState<PersonalPlansResponseType[]>(
    [],
  );
  const [pastPlans, setPastPlans] = useState<PersonalPlansResponseType[]>([]);

  const getPlans = useCallback(async () => {
    try {
      const userSession = await EncryptedStorage.getItem('user_session');
      if (userSession && JSON.parse(userSession).userId) {
        const personalPlansResponse = await axiosInstance.get(
          `/users/${JSON.parse(userSession).userId}/plans`,
        );
        const tempPlans = personalPlansResponse.data.sort(
          (
            planA: PersonalPlansResponseType,
            planB: PersonalPlansResponseType,
          ) =>
            new Date(planA.startDate).getTime() -
            new Date(planB.startDate).getTime(),
        );
        const tempStartDate = new Date();
        tempStartDate.setHours(0, 0, 0, 0);
        const tempStartTime = tempStartDate.getTime();
        const tempEndDate = new Date();
        tempEndDate.setHours(0, 0, 0, 0);
        tempEndDate.setDate(tempEndDate.getDate() + 1);
        const tempEndTime = tempEndDate.getTime();

        setCurrentPlans(
          tempPlans.filter(
            (plan: PersonalPlansResponseType) =>
              new Date(plan.startDate).getTime() <= tempEndTime &&
              new Date(plan.endDate).getTime() >= tempStartTime,
          ),
        );
        setFuturePlans(
          tempPlans.filter(
            (plan: PersonalPlansResponseType) =>
              new Date(plan.startDate).getTime() > tempEndTime,
          ),
        );
        setPastPlans(
          tempPlans.filter(
            (plan: PersonalPlansResponseType) =>
              new Date(plan.endDate).getTime() < tempStartTime,
          ),
        );
      }
    } catch (error) {
      console.log('getting plans error: ', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getPlans();
    }, [getPlans]),
  );

  return (
    <React.Fragment>
      <StyledScrollView
        contentContainerStyle={{
          gap: 15,
          paddingBottom: HEADING_VERTICAL_MARGIN,
        }}>
        {currentPlans && currentPlans.length > 0 && (
          <Text
            style={[
              globalStyles.h1,
              {color: BLUE, marginTop: HEADING_VERTICAL_MARGIN},
            ]}>
            D-day 여행
          </Text>
        )}
        {currentPlans?.map((plan, index) => (
          <PlansCard key={index} plan={plan} />
        ))}
        <Text
          style={[
            globalStyles.h2,
            {color: BLUE, marginTop: HEADING_VERTICAL_MARGIN},
          ]}>
          앞으로의 여행
        </Text>
        {futurePlans?.map((plan, index) => (
          <PlansCard key={index} plan={plan} />
        ))}
        <Text
          style={[
            globalStyles.h2,
            {color: BLUE, marginTop: HEADING_VERTICAL_MARGIN},
          ]}>
          이전 여행
        </Text>
        {pastPlans?.map((plan, index) => <PlansCard key={index} plan={plan} />)}
      </StyledScrollView>
      <PlansNewButton />
    </React.Fragment>
  );
};

export default PlansScreen;
