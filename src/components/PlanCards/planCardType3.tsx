import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FavoritIcon from '@src/assets/icons/Favorite_fill.svg';
import ForkIcon from '@src/assets/icons/fork_icon.svg';
import ViewIcon from '@src/assets/icons/View.svg';
import ViewHideIcon from '@src/assets/icons/View_hide.svg';
import {WHITE_PRESSED} from '@src/styles/globalStyleVariables';
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // This creates the semi-transparent overlay
  },
  rowWiseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20, // Add margin to the top of the container
    marginBottom: 20, // Add margin to the bottom of the container
    marginLeft: 20, // Add margin to the left of the container
    marginRight: 20, // Add margin to the right of the container
  },
  columnWiseContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  countryText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  interactionText: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});

const PlanCardType3 = ({plan}: {plan: PersonalPlansResponseType}) => {
  if (!plan) return null;

  const iconSize = 24;
  // Function to sum up numbers in an array
  const sum = (numbers: number[]) =>
    numbers.reduce((acc, current) => acc + current, 0);

  // Calculate the sums for likes and forks
  const totalLikes = sum(plan.likes);
  const totalForks = sum(plan.forks);

  const VisibilityIcon = plan.isPublic ? ViewIcon : ViewHideIcon;

  const navigation = useNavigation<StackNavigationProp<MainStackParamsList>>();
  const handlePlanCard = () => {
    navigation.navigate('PlanEditScreen', {planId: plan.planId});
  };

  return (
    <StyledCardPressableView>
      <StyledCardPressable
        onPress={handlePlanCard}
        android_ripple={{color: WHITE_PRESSED, foreground: true}}>
        <ImageBackground
          source={{uri: plan.image}}
          style={{
            flex: 1 / 2,
            height: cardWidth,
          }}>
          <View style={styles.darkFilter} />
          <View style={styles.columnWiseContainer}>
            <View style={styles.rowWiseContainer}>
              <Text style={styles.countryText}>{plan.country}</Text>
              <VisibilityIcon
                width={iconSize}
                height={iconSize}
                style={{color: '#ffffff'}}
              />
            </View>
            <View style={styles.rowWiseContainer}>
              <TouchableOpacity style={styles.interactionText}>
                <FavoritIcon
                  width={iconSize}
                  height={iconSize}
                  style={{color: '#ffffff'}}
                />
                <Text style={styles.interactionText}>
                  {totalLikes.toString()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interactionText}>
                <ForkIcon
                  width={iconSize}
                  height={iconSize}
                  style={{color: '#ffffff'}}
                />
                <Text style={styles.interactionText}>
                  {totalForks.toString()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </StyledCardPressable>
    </StyledCardPressableView>
  );
};

export default PlanCardType3;
