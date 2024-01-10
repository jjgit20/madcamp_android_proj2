import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';
import PlanCardType1 from '@src/components/PlanCards/planCardType1';
import SearchTab from '@src/components/searchBar';
import axiosInstance from '@src/utils/axiosService';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {MainTabsParamsList, PersonalPlansResponseType} from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1, // 이 컨테이너가 화면 전체를 차지하도록 함
    backgroundColor: 'rgb(255, 255, 255)',
    paddingBottom: 20,
  },
  column: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const renderItem = ({
  item,
  modifyPlanLike,
}: {
  item: PersonalPlansResponseType;
  modifyPlanLike: (planId: number) => void;
}) => {
  return <PlanCardType1 plan={item} modifyPlanLike={modifyPlanLike} />;
};

type Props = BottomTabScreenProps<MainTabsParamsList, 'FinderScreen', 'Tab'>;

const FinderScreen = ({route, navigation}: Props) => {
  const [plans, setPlans] = useState<PersonalPlansResponseType[]>([]);

  useFocusEffect(
    useCallback(() => {
      const getUserPlans = async () => {
        const allUserPlanResponse = await axiosInstance.get(`/plans`);
        setPlans(allUserPlanResponse.data);
      };
      getUserPlans();
    }, []),
  );

  const modifyPlanLike = useCallback((planId: number) => {
    setPlans(prevState =>
      prevState.map(plan =>
        plan.planId === planId
          ? {
              ...plan,
              didILikeIt: !plan.didILikeIt,
              likes: plan.didILikeIt
                ? plan.likes.slice(0, -1) // Remove the last element
                : [...plan.likes, 'tmp'],
            }
          : plan,
      ),
    );
  }, []);

  return (
    <View style={styles.container}>
      <SearchTab />
      <FlatList
        data={plans}
        renderItem={({item}) => renderItem({item, modifyPlanLike})}
        keyExtractor={item => item.planId.toString()}
        contentContainerStyle={{gap: 15}}
        style={{paddingHorizontal: 20}}
      />
    </View>
  );
};

export default FinderScreen;
