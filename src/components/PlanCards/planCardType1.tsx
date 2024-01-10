import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FavoritIcon from '@src/assets/icons/Favorite_fill.svg';
import ForkIcon from '@src/assets/icons/fork_icon.svg';
import StarIcon from '@src/assets/icons/Star_fill.svg';
import {
  BLACK,
  BLUE,
  DARK_GREY,
  WHITE,
  WHITE_PRESSED,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import axiosInstance from '@src/utils/axiosService';
import {differenceInDays, parseISO} from 'date-fns';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {MainStackParamsList} from '../../../types';
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
    backgroundColor: 'rgba(255, 255, 255, 0.70)',
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
    borderRadius: 12,
    flex: 1,
    gap: 10,
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

const PlanCardType1 = ({plan}: {plan: any}) => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamsList>>();
  const [user, setUser] = useState();

  const handlePressLike = () => {
    const getUserPlans = async () => {
      const userResponse = await axiosInstance.patch(`/plans/${plan}/like`);
      setUser(userResponse.data);
    };
    getUserPlans();
  };

  const handlePressFork = () => {
    const getUserPlans = async () => {
      const userResponse = await axiosInstance.post(`/plans/${plan}/fork`);
      setUser(userResponse.data);
    };
    getUserPlans();
  };

  if (!plan) return null;
  const iconSize = 24;

  // Function to sum up numbers in an array
  const sum = (numbers: number[]) =>
    numbers.reduce((acc, current) => acc + current, 0);

  // Calculate the sums for likes and forks
  const totalLikes = sum(plan.likes);
  const totalForks = sum(plan.forks);

  // Use the function to calculate the duration
  const formattedDuration = getFormattedDurationInDays(
    plan.startDate,
    plan.endDate,
  );
  const cash = Math.round(plan.cash / 10000);

  const handlePlanCard = () => {
    navigation.navigate('PlanViewScreen', {planId: plan.planId});
  };

  const handleUserCard = () => {
    navigation.navigate('UserScreen', {userId: plan.userId.userId});
  };

  return (
    <StyledCardPressableView>
      <StyledCardPressable
        onPress={handlePlanCard}
        android_ripple={{color: WHITE_PRESSED, foreground: true}}>
        <ImageBackground
          source={{uri: plan.image}}
          style={{
            width: '100%',
            height: 380,
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
                source={{uri: plan.userId.image}}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.interactionContainer}>
            <TouchableOpacity
              onPress={handlePressLike}
              style={styles.interactionTextContainer}>
              <FavoritIcon
                width={iconSize}
                height={iconSize}
                style={{color: '#0989FF'}}
              />
              <Text style={styles.interactionText}>{totalLikes}</Text>
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
        </ImageBackground>
      </StyledCardPressable>
    </StyledCardPressableView>
  );
};

export default PlanCardType1;
