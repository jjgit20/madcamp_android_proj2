import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FavoritIcon from '@src/assets/icons/Favorite_fill.svg';
import ForkIcon from '@src/assets/icons/fork_icon.svg';
import ViewIcon from '@src/assets/icons/View.svg';
import ViewHideIcon from '@src/assets/icons/View_hide.svg';
import {
  BLACK_PRESSED,
  WHITE,
  WHITE_PRESSED,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import axiosInstance from '@src/utils/axiosService';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

import {MainStackParamsList, PersonalPlansResponseType} from '../../../types';
import {
  StyledCardPressable,
  StyledCardPressableView,
} from '../StyledComponents/StyledButton';

const windowWidth = Dimensions.get('window').width;
const cardWidth = windowWidth / 2 - 25;

const styles = StyleSheet.create({
  card: {
    flex: 1 / 2,
    height: cardWidth,
    elevation: 3,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderRadius: 30, // 이제 이 속성은 card에 직접 적용됩니다.
    overflow: 'hidden', // borderRadius 적용을 위해 필요합니다.
    margin: 5,
  },
  darkFilter: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BLACK_PRESSED, // This creates the semi-transparent overlay
  },
  rowWiseContainer: {
    flexDirection: 'row',
    marginTop: 20, // Add margin to the top of the container
    marginBottom: 20, // Add margin to the bottom of the container
    marginLeft: 20, // Add margin to the left of the container
    marginRight: 20, // Add margin to the right of the container
    gap: 10,
  },
  columnWiseContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  countryText: {
    ...globalStyles.h3,
    color: WHITE,
  },
  interactionTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 2,
    gap: 10,
  },
  interactionText: {
    ...globalStyles.h6,
    color: WHITE,
  },
});

const PlanCardType3 = ({
  plan,
  index,
  isMyPage,
  modifyPlanLike,
}: {
  plan: PersonalPlansResponseType;
  index: number;
  isMyPage: boolean;
  modifyPlanLike: (
    planId: number,
    planUserId: number,
    didILikeIt: boolean,
  ) => void;
}) => {
  const handlePressLike = async () => {
    try {
      const likeResponse = await axiosInstance.patch(
        `/plans/${plan.planId}/like`,
      );
      modifyPlanLike(
        plan.planId,
        plan.userId?.userId as number,
        plan.didILikeIt === undefined ? false : plan.didILikeIt,
      );
    } catch (error) {
      console.log('Error liking: ', error);
    }
  };

  const iconSize = 24;
  // Function to sum up numbers in an array
  const sum = (numbers: number[]) =>
    numbers.reduce((acc, current) => acc + current, 0);

  // Calculate the sums for likes and forks
  const totalLikes = plan?.likes?.length;
  const totalForks = plan?.forks?.length;

  const VisibilityIcon = plan?.isPublic ? ViewIcon : ViewHideIcon;

  const navigation = useNavigation<StackNavigationProp<MainStackParamsList>>();
  const handlePlanCard = () => {
    navigation.navigate('PlanViewScreen', {planId: plan.planId});
  };

  const handlePressFork = async () => {
    try {
      const forkResponse = await axiosInstance.post(
        `/plans/${plan.planId}/fork`,
      );
      console.log('forkResponse', forkResponse.data);
      navigation.navigate('PlanEditScreen', {
        planId: forkResponse.data.planId,
      });
    } catch (error) {
      console.log('Error liking: ', error);
    }
  };

  if (!plan) return null;

  return (
    <StyledCardPressableView
      style={{
        flex: 1 / 2,
        // width: '50%',
        height: cardWidth,
        marginRight: index % 2 === 0 ? 7 : 0,
        marginLeft: index % 2 === 0 ? 0 : 7,
        marginVertical: 7,
      }}>
      <StyledCardPressable
        onPress={handlePlanCard}
        android_ripple={{color: WHITE_PRESSED, foreground: true}}>
        <ImageBackground
          source={
            plan.image && plan.image !== ''
              ? {uri: plan.image}
              : require('@src/assets/images/default_image.png')
          }>
          <View style={styles.darkFilter} />
          <View style={styles.columnWiseContainer}>
            <View style={styles.rowWiseContainer}>
              <Text style={styles.countryText}>{plan.country}</Text>
              {isMyPage && (
                <VisibilityIcon
                  width={iconSize}
                  height={iconSize}
                  style={{color: '#ffffff', margin: 5, marginLeft: 'auto'}}
                />
              )}
            </View>
            <View style={styles.rowWiseContainer}>
              <TouchableOpacity
                onPress={handlePressLike}
                style={styles.interactionTextContainer}>
                <FavoritIcon
                  width={iconSize}
                  height={iconSize}
                  style={{color: '#ffffff'}}
                />
                <Text style={styles.interactionText}>{totalLikes}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePressFork}
                style={styles.interactionTextContainer}>
                <ForkIcon
                  width={iconSize}
                  height={iconSize}
                  style={{color: '#ffffff'}}
                />
                <Text style={styles.interactionText}>{totalForks}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </StyledCardPressable>
    </StyledCardPressableView>
  );
};

export default PlanCardType3;
