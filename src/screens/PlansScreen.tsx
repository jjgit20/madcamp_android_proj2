import {PlansCard} from '@src/components/PlansScreenComponents/PlansCard';
import {PlansNewButton} from '@src/components/PlansScreenComponents/PlansNewButton';
import {StyledScrollView} from '@src/components/StyledComponents/StyledScreenView';
import {BLUE, HEADING_VERTICAL_MARGIN} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import axiosInstance from '@src/utils/axiosService';
import React, {useEffect, useState} from 'react';
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

  useEffect(() => {
    const getPlans = async () => {
      try {
        const userSession = await EncryptedStorage.getItem('user_session');
        if (userSession && JSON.parse(userSession).userId) {
          const personalPlansResponse = await axiosInstance.get(
            `/users/${JSON.parse(userSession).userId}/plans`,
          );
          setCurrentPlans(
            personalPlansResponse.data.filter(
              (plan: PersonalPlansResponseType) =>
                new Date(plan.startDate).getDate() <= new Date().getDate() &&
                new Date(plan.endDate).getDate() >= new Date().getDate(),
            ),
          );
          setFuturePlans(
            personalPlansResponse.data.filter(
              (plan: PersonalPlansResponseType) =>
                new Date(plan.startDate).getDate() > new Date().getDate(),
            ),
          );
          setPastPlans(
            personalPlansResponse.data.filter(
              (plan: PersonalPlansResponseType) =>
                new Date(plan.endDate).getDate() < new Date().getDate(),
            ),
          );
        }
      } catch (error) {
        console.log('getting plans error: ', error);
      }
    };
    getPlans();
  }, []);
  return (
    <React.Fragment>
      <StyledScrollView contentContainerStyle={{gap: 15}}>
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
