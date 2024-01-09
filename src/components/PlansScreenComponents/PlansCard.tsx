import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  BLACK_PRESSED,
  WHITE,
  WHITE_PRESSED,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import {dateFormatter} from '@src/utils/dateFormatter';
import React, {useCallback, useMemo} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

import {MainStackParamsList, PersonalPlansResponseType} from '../../../types';
import {
  StyledCardPressable,
  StyledCardPressableView,
} from '../StyledComponents/StyledButton';

const styles = StyleSheet.create({
  shadowContainer: {
    elevation: 3,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
});

const days = ['일', '월', '화', '수', '목', '금', '토'];

export const PlansCard = ({plan}: {plan: PersonalPlansResponseType}) => {
  const startDate = useMemo(() => new Date(plan.startDate), [plan.startDate]);
  const todayDate = useMemo(() => new Date(), []);
  const formattedDate = useMemo(
    () => dateFormatter(plan.startDate) + `(${days[startDate.getDay()]})`,
    [plan.startDate, startDate],
  );
  const returnFormattedDday = useCallback(() => {
    const DDay =
      Math.floor(startDate.getTime() / (1000 * 60 * 60 * 24)) -
      Math.floor(todayDate.getTime() / (1000 * 60 * 60 * 24));

    if (DDay == 0) {
      return 'D-DAY';
    } else if (DDay > 0) {
      return `D-${DDay}`;
    } else {
      return `D+${-DDay}`;
    }
  }, [startDate, todayDate]);
  const formattedDDay = useMemo(
    () => returnFormattedDday(),
    [returnFormattedDday],
  );

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
            width: '100%',
            height: 120,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: BLACK_PRESSED,
              padding: 20,
            }}>
            <Text style={[globalStyles.h3, {color: WHITE}]}>
              {plan.country}
            </Text>
            <Text style={[globalStyles.body2, {color: WHITE}]}>
              {plan.city} - {plan.country}
            </Text>
            <Text
              style={[
                globalStyles.h6,
                {color: WHITE, marginLeft: 'auto', marginTop: 'auto'},
              ]}>
              {formattedDate} - {formattedDDay}
            </Text>
          </View>
        </ImageBackground>
      </StyledCardPressable>
    </StyledCardPressableView>
  );
};
