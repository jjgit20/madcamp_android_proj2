import {useFocusEffect} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import StarIcon from '@src/assets/icons/icon-star.svg';
import {PlansClose} from '@src/components/PlansScreenComponents/PlansClose';
import {PlansModal} from '@src/components/PlansScreenComponents/PlansViewComponents/PlansModal';
import PlansModifyButtonBar from '@src/components/PlansScreenComponents/PlansViewComponents/PlansModifyButtonBar';
import {PlansViewDays} from '@src/components/PlansScreenComponents/PlansViewComponents/PlansViewDays';
import {PlansViewImage} from '@src/components/PlansScreenComponents/PlansViewComponents/PlansViewImage';
import PlansViewItems from '@src/components/PlansScreenComponents/PlansViewComponents/PlansViewItems';
import {StyledScrollView} from '@src/components/StyledComponents/StyledScreenView';
import {
  BLACK,
  BLUE,
  BLUE_LIGHT,
  HEADING_VERTICAL_MARGIN,
  ROUND_ICON_SIZE,
  WHITE,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import axiosInstance from '@src/utils/axiosService';
import {dateDifference} from '@src/utils/dateFormatter';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

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
  isComplete: false,
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
  const [userId, setUserId] = useState<number>(0);

  const getPlan = useCallback(async () => {
    if (route.params.reload) {
      await new Promise(resolve => setTimeout(resolve, 600)); // Introduce a delay for rendering
    }
    if (route.params.planId !== 0) {
      // if (plan?.isNull === true && route.params.planId !== 0) {
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
  }, [route.params.planId, route.params.reload]);

  // useEffect(() => {
  //   getPlan();
  // }, [getPlan]);

  useFocusEffect(
    useCallback(() => {
      getPlan();
      // //    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getPlan]),
  );

  // returning from editing screen
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getPlan();
  //   });

  //   return unsubscribe;
  // }, [navigation, getPlan]);

  useEffect(() => {
    const getUserId = async () => {
      const userSession = await EncryptedStorage.getItem('user_session');
      setUserId(userSession && JSON.parse(userSession).userId);
    };
    getUserId();
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [isCompleteVisible, setIsCompleteVisible] = useState(false);

  const modifyPlan = useCallback((param: string) => {
    setPlan((prevState: PersonalPlansDetailedResponseType | null) => {
      if (prevState === null) {
        return prevState;
      } else if (param === 'isComplete') {
        return {...prevState, isComplete: true};
      } else if (param === 'isPublic') {
        return {...prevState, isPublic: !prevState.isPublic};
      } else {
        return prevState;
      }
    });
  }, []);

  const handlePressLike = async () => {
    if (!plan) {
      return;
    }
    try {
      const likeResponse = await axiosInstance.patch(
        `/plans/${plan.planId}/like`,
      );
      setPlan(prevState => {
        if (prevState == null) {
          return null;
        }
        return {
          ...prevState,
          likes: plan.didILikeIt
            ? plan.likes.slice(0, -1) // Remove the last element
            : [...plan.likes, 'tmp'],
          didILikeIt: !prevState.didILikeIt,
        };
      });
    } catch (error) {
      console.log('Error liking: ', error);
    }
  };

  const handlePressFork = async () => {
    if (!plan) {
      return;
    }
    try {
      const forkResponse = await axiosInstance.post(
        `/plans/${plan.planId}/fork`,
      );
      // console.log('forkResponse', forkResponse.data);
      navigation.navigate('PlanEditScreen', {
        planId: forkResponse.data.planId,
      });
    } catch (error) {
      console.log('Error liking: ', error);
    }
  };

  return (
    <React.Fragment>
      <PlansModal
        isVisible={isVisible}
        closeModal={() => setIsVisible(false)}
        planId={plan?.planId}
        type={'delete'}
        modifyPlan={modifyPlan}
      />
      <PlansModal
        isVisible={isCompleteVisible}
        closeModal={() => setIsCompleteVisible(false)}
        planId={plan?.planId}
        type={plan?.isComplete ? 'visible' : 'complete'}
        modifyPlan={modifyPlan}
      />
      <View style={[StyleSheet.absoluteFill, {zIndex: -1}]}>
        <PlansClose
          color={WHITE}
          // customBack={() => navigation.navigate('MainTabs')} //no need
        />
        {userId === plan?.userId?.userId && (
          <PlansModifyButtonBar
            isPublic={plan?.isPublic}
            isComplete={plan?.isComplete}
            planId={plan?.planId}
            toggleModal={() => setIsVisible(prevState => !prevState)}
            toggleOtherModal={() =>
              setIsCompleteVisible(prevState => !prevState)
            }
          />
        )}
        <PlansViewImage
          image={image}
          plan={plan}
          handlePressLike={handlePressLike}
          handlePressFork={handlePressFork}
        />
        <StyledScrollView
          contentContainerStyle={{gap: 15, paddingVertical: 20}}>
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

          <Text
            style={[
              globalStyles.h4,
              {color: BLACK, marginTop: HEADING_VERTICAL_MARGIN},
            ]}>
            여행 리뷰
          </Text>
          <View
            style={{
              paddingHorizontal: 15,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
            }}>
            <View style={{flexDirection: 'row', gap: 10}}>
              {plan?.rating &&
                plan?.rating !== undefined &&
                Array.from({length: 5}, (_, index) => (
                  <StarIcon
                    key={index}
                    width={ROUND_ICON_SIZE}
                    height={ROUND_ICON_SIZE}
                    fill={
                      plan?.rating && plan?.rating > index ? BLUE : BLUE_LIGHT
                    }
                  />
                ))}
            </View>
            <Text style={[globalStyles.h4, {color: BLUE, textAlign: 'center'}]}>
              {plan?.selfReview}
            </Text>
          </View>

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
      </View>
    </React.Fragment>
  );
};

export default PlanViewScreen;
