import {useFocusEffect} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {PlansClose} from '@src/components/PlansScreenComponents/PlansClose';
import {PlansEditDays} from '@src/components/PlansScreenComponents/PlansEditComponents/PlansEditDays';
import {PlansEditImage} from '@src/components/PlansScreenComponents/PlansEditComponents/PlansEditImage';
import PlansEditItems from '@src/components/PlansScreenComponents/PlansEditComponents/PlansEditItems';
import {PlansPlaceDelete} from '@src/components/PlansScreenComponents/PlansEditComponents/PlansPlaceDelete';
import PlansPlaceNew from '@src/components/PlansScreenComponents/PlansEditComponents/PlansPlaceNew';
import PlansSave from '@src/components/PlansScreenComponents/PlansEditComponents/PlansSave';
import {PlansSaveFirst} from '@src/components/PlansScreenComponents/PlansEditComponents/PlansSaveFirst';
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
import {StyleSheet, Text, View} from 'react-native';

import {
  ImageType,
  MainStackParamsList,
  PersonalPlansDetailedResponseType,
  PlanPlace,
} from '../../types';

type Props = StackScreenProps<MainStackParamsList, 'PlanEditScreen', 'Stack'>;

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

const PlanEditScreen = ({route, navigation}: Props) => {
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

  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [planPlaceDelId, setPlanPlaceDelId] = useState(0);
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [newParams, setNewParams] = useState({orderInDay: 0, visitDate: 0});

  const savePlan = async (redirect: boolean) => {
    const formData = new FormData();
    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    };
    try {
      if (plan !== null) {
        if (image.name !== null) {
          formData.append('file', image);
        }

        if (typeof plan.startDate === 'string') {
          plan.startDate = new Date(plan.startDate);
        }
        if (typeof plan.endDate === 'string') {
          plan.endDate = new Date(plan.endDate);
        }

        Object.keys(plan).forEach(key => {
          if (key === 'startDate' || key === 'endDate') {
            formData.append(
              key,
              plan[key as keyof PersonalPlansDetailedResponseType].getTime(),
            );
          } else if (
            typeof plan[key as keyof PersonalPlansDetailedResponseType] ===
            'object'
          ) {
            formData.append(
              key,
              JSON.stringify(
                plan[key as keyof PersonalPlansDetailedResponseType],
              ),
            );
          } else {
            formData.append(
              key,
              plan[key as keyof PersonalPlansDetailedResponseType],
            );
          }
        });
        let newPlanId = route.params.planId;
        if (route.params.planId === 0) {
          const newPlanResponse = await axiosInstance.post(`/plans`, formData, {
            headers,
          });
          navigation.navigate('PlanEditScreen', {
            planId: newPlanResponse.data.planId,
          });
          newPlanId = newPlanResponse.data.planId;
        } else {
          axiosInstance
            .patch(`/plans/${route.params.planId}`, formData, {
              headers,
            })
            .then(res => console.log(res))
            .catch(err => console.log(err)); // not error...idk why this is flagging
        }

        if (redirect) {
          navigation.navigate('PlanViewScreen', {planId: newPlanId});
        }
      }
    } catch (error) {
      console.error('Error:', JSON.stringify(error));
    }
  };

  return (
    <React.Fragment>
      <PlansPlaceDelete
        isVisible={isDeleteVisible}
        planPlaceDelId={planPlaceDelId}
        closeModal={() => setIsDeleteVisible(false)}
        delPlanPlace={() =>
          modifyPlan(
            'places',
            plan?.places.filter(
              planPlace => planPlace.planPlaceId !== planPlaceDelId,
            ),
          )
        }
      />
      {isNewVisible && route.params.planId !== 0 && (
        <PlansPlaceNew
          planId={route.params.planId}
          orderInDay={newParams.orderInDay}
          visitDate={newParams.visitDate}
          closeModal={() => setIsNewVisible(false)}
          newPlanPlace={(place: PlanPlace) => {
            if (!plan?.places) {
              return;
            }
            modifyPlan('places', [...plan?.places, place]);
          }}
        />
      )}
      {isNewVisible && route.params.planId === 0 && (
        <PlansSaveFirst
          isVisible={isNewVisible}
          closeModal={() => setIsNewVisible(false)}
          savePlan={() => savePlan(false)}
        />
      )}
      <View style={[StyleSheet.absoluteFill, {zIndex: -1}]}>
        <PlansClose color={WHITE} />
        <PlansSave savePlan={() => savePlan(true)} />
        <PlansEditImage
          image={image}
          setImage={(uri: string, type: string, name: string) =>
            setImage({uri, type, name})
          }
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
            <PlansEditDays
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
              openModal={(id: number) => {
                setIsDeleteVisible(true);
                setPlanPlaceDelId(id);
              }}
              openNewModal={(orderInDay: number, visitDate: number) => {
                setIsNewVisible(true);
                setNewParams({orderInDay, visitDate});
              }}
              changeCash={(planPlaceId: number, money: number) => {
                if (!plan) {
                  return;
                }
                const updatedPlaces = plan.places.map(place => {
                  if (place.planPlaceId === planPlaceId) {
                    // Update the cash property for the matching planPlaceId
                    return {...place, money: money};
                  }
                  return place;
                });
                modifyPlan('places', updatedPlaces);
              }}
            />
          ))}
        </StyledScrollView>
      </View>
    </React.Fragment>
  );
};

export default React.memo(PlanEditScreen);
