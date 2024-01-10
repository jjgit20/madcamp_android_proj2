import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FavoritIcon from '@src/assets/icons/Favorite_fill.svg';
import ForkIcon from '@src/assets/icons/fork_icon.svg';
import StarIcon from '@src/assets/icons/Star_fill.svg';
import {
  BLACK,
  BLACK_PRESSED,
  BLUE,
  DARK_GREY,
  WHITE,
  WHITE_PRESSED,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import axiosInstance from '@src/utils/axiosService';
import {differenceInDays, parseISO} from 'date-fns';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {
  MainStackParamsList,
  MainTabsParamsList,
  PersonalPlansResponseType,
} from '../../../types';
import {
  StyledCardPressable,
  StyledCardPressableView,
} from '../StyledComponents/StyledButton';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 380,
    elevation: 15,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderRadius: 30, // 이제 이 속성은 card에 직접 적용됩니다.
    overflow: 'hidden', // borderRadius 적용을 위해 필요합니다.
    marginHorizontal: 20,
    marginVertical: 10,
  },
  subcard: {
    height: 100,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    left: 20, // 좌측 정렬
    right: 20, // 우측 정렬
    top: 20,
    // marginHorizontal: 20, // 양쪽으로 20px 마진 적용
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    // React Native doesn't support backdrop-filter, use an overlay Image or blur effect instead
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  countryAndRankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
  },
  cityAndDateContainer: {
    ...globalStyles.body2,
    alignSelf: 'flex-start',
    color: DARK_GREY,
  },
  profileImage: {
    width: 70, // Set the width as needed
    height: 70, // Set the height as needed
    borderRadius: 35, // Make it round
    borderWidth: 2, // Adjust as needed
    borderColor: 'white', // Adjust as needed
  },
  interactionContainer: {
    position: 'absolute',
    bottom: 20, // Set the interaction container to be 20 pixels from the bottom
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 15,
    flex: 1,
  },
  interactionTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
    borderRadius: 20,
    flex: 1,
    gap: 10,
    paddingVertical: 4,
  },
  interactionText: {
    ...globalStyles.h6,
    color: BLUE,
  },
  priceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLUE,
    borderRadius: 12,
    flex: 1,
  },
  price: {
    color: 'white',
    ...globalStyles.h6,
  },
  countryAndRatingText: {
    ...globalStyles.h3,
    color: BLACK,
  },
});

export const getFormattedDurationInDays = (start?: string, end?: string) => {
  if (!start || !end) {
    // If either start or end date is missing, return 0

    return `0박 1일`;
  }
  const startDate = parseISO(start);
  const endDate = parseISO(end);
  const difference = differenceInDays(endDate, startDate);
  return `${difference}박 ${difference + 1}일`;
};

const PlanCardType1 = ({
  plan,
  modifyPlanLike,
}: {
  plan: PersonalPlansResponseType;
  modifyPlanLike: (planId: number) => void;
}) => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamsList>>();
  const navigationTab =
    useNavigation<BottomTabNavigationProp<MainTabsParamsList>>();

  const handlePressLike = async () => {
    try {
      const likeResponse = await axiosInstance.patch(
        `/plans/${plan.planId}/like`,
      );
      modifyPlanLike(plan.planId);
    } catch (error) {
      console.log('Error liking: ', error);
    }
  };

  const handlePressFork = async () => {
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

  if (!plan) return null;
  const iconSize = 20;

  const totalLikes = plan?.likes?.length;
  const totalForks = plan?.forks?.length;

  const formattedDuration = getFormattedDurationInDays(
    plan.startDate,
    plan.endDate,
  );
  const cash = Math.round(plan.cash / 10000);

  const handlePlanCard = () => {
    navigation.navigate('PlanViewScreen', {planId: plan.planId});
  };

  const handleUserCard = () => {
    navigation.navigate('MainTabs', {
      screen: 'UserScreen',
      params: {
        userId: plan.userId?.userId ? plan.userId?.userId : 0,
      },
    });
    navigationTab.navigate('UserScreen', {
      userId: plan.userId?.userId ? plan.userId?.userId : 0,
    });
  };

  return (
    <StyledCardPressableView>
      <StyledCardPressable
        onPress={handlePlanCard}
        android_ripple={{color: WHITE_PRESSED, foreground: true}}>
        <ImageBackground
          source={{
            uri:
              plan.image ||
              'https://i.pinimg.com/564x/85/b0/02/85b00271cb3cfaa900f7d5165ee6a80d.jpg',
          }}
          style={{
            width: '100%',
            height: 380,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: BLACK_PRESSED,
              padding: 20,
            }}>
            <View style={styles.subcard}>
              <View style={styles.textContainer}>
                <View style={styles.countryAndRankContainer}>
                  <Text style={[styles.countryAndRatingText]}>
                    {plan.country}
                  </Text>
                  <StarIcon width={iconSize} height={iconSize} />
                  <Text style={styles.countryAndRatingText}>{plan.rating}</Text>
                </View>
                <Text style={styles.cityAndDateContainer}>
                  {plan.city} - {formattedDuration}
                </Text>
              </View>
              <TouchableOpacity onPress={handleUserCard}>
                <Image
                  source={{
                    uri:
                      plan.userId?.image ||
                      'https://i.pinimg.com/564x/85/b0/02/85b00271cb3cfaa900f7d5165ee6a80d.jpg',
                  }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.interactionContainer}>
              <TouchableOpacity
                onPress={handlePressLike}
                style={[
                  styles.interactionTextContainer,
                  {backgroundColor: plan.didILikeIt ? BLUE : WHITE},
                ]}>
                <FavoritIcon
                  width={iconSize}
                  height={iconSize}
                  style={{color: plan.didILikeIt ? WHITE : BLUE}}
                />
                <Text
                  style={[
                    styles.interactionText,
                    {color: plan.didILikeIt ? WHITE : BLUE},
                  ]}>
                  {totalLikes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePressFork}
                style={styles.interactionTextContainer}>
                <ForkIcon
                  width={iconSize}
                  height={iconSize}
                  style={{color: '#0989FF'}}
                />
                <Text style={styles.interactionText}>{totalForks}</Text>
              </TouchableOpacity>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{cash}만원</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </StyledCardPressable>
    </StyledCardPressableView>
  );
};

export default PlanCardType1;
