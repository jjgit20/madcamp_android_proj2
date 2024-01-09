import {useFocusEffect} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {PlansClose} from '@src/components/PlansScreenComponents/PlansClose';
import {PlansViewDays} from '@src/components/PlansScreenComponents/PlansViewComponents/PlansViewDays';
import {PlansViewImage} from '@src/components/PlansScreenComponents/PlansViewComponents/PlansViewImage';
import PlansViewItems from '@src/components/PlansScreenComponents/PlansViewComponents/PlansViewItems';
import {StyledScrollView} from '@src/components/StyledComponents/StyledScreenView';
import {
  BLACK,
  HEADING_VERTICAL_MARGIN,
  WHITE,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import axiosInstance from '@src/utils/axiosService';
import {dateDifference} from '@src/utils/dateFormatter';
import React, {useCallback, useState} from 'react';
import {Text} from 'react-native';

import {
  ImageType,
  MainStackParamsList,
  PersonalPlansDetailedResponseType,
} from '../../types';
type Props = StackScreenProps<MainStackParamsList, 'PlanViewScreen', 'Stack'>;

const initPlan: PersonalPlansDetailedResponseType = {
  startDate: new Date().toDateString(),
  endDate: new Date().toDateString(),
  country: null,
  city: null,
  forks: 0,
  likes: 0,
  image: null,
  isPublic: false,
  cash: 0,
  places: [],
  isNull: true,
};

const PlanViewScreen = ({route, navigation}: Props) => {
  const [plan, setPlan] = useState<PersonalPlansDetailedResponseType | null>(
    initPlan,
  );
  const [image, setImage] = useState<ImageType>({
    uri: null,
    type: null,
    name: null,
  });
  const [days, setDays] = useState<Date[]>(
    dateDifference(initPlan.startDate as string, initPlan.endDate as string),
  );

  const getPlan = useCallback(async () => {
    if (plan?.isNull === true && route.params.planId !== 0) {
      const personalPlansDetailedResponse = await axiosInstance.get(
        `/plans/${route.params.planId}`,
      );
      setPlan({...personalPlansDetailedResponse.data, isNull: false});
      setImage({
        uri: personalPlansDetailedResponse.data.image,
        type: null,
        name: null,
      });
      setDays(
        dateDifference(
          personalPlansDetailedResponse.data.startDate,
          personalPlansDetailedResponse.data.endDate,
        ),
      );
    }
  }, [plan, route.params.planId]);

  // useEffect(() => {
  //   getPlan();
  // }, [getPlan]);

  useFocusEffect(
    useCallback(() => {
      getPlan();
    }, [getPlan]),
  );
  return (
    <React.Fragment>
      <PlansClose
        color={WHITE}
        customBack={() => navigation.navigate('MainTabs')}
      />
      <PlansViewImage image={image} plan={plan} />
      <StyledScrollView contentContainerStyle={{gap: 15, paddingVertical: 20}}>
        <Text style={[globalStyles.h4, {color: BLACK}]}>여행 필수 정보</Text>
        <PlansViewItems plan={plan} type={'needed'} />

        <Text
          style={[
            globalStyles.h4,
            {color: BLACK, marginTop: HEADING_VERTICAL_MARGIN},
          ]}>
          여행 추가 정보
        </Text>
        <PlansViewItems plan={plan} type={'extra'} />

        {days.map((day: Date, index: number) => (
          <PlansViewDays
            key={index}
            day={index + 1}
            date={day.getTime()}
            places={
              (plan?.places &&
                plan?.places.filter(
                  place =>
                    new Date(place.visitDate).getTime() === day.getTime(),
                )) ||
              []
            }
          />
        ))}
      </StyledScrollView>
    </React.Fragment>
  );
};

export default PlanViewScreen;
