import PlanCardType1 from '@src/components/PlanCards/planCardType1';
import SearchTab from '@src/components/searchBar';
import axiosInstance from '@src/utils/axiosService';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // 이 컨테이너가 화면 전체를 차지하도록 함
    paddingHorizontal: 20, // 좌우에만 20px의 패딩 적용
    backgroundColor: 'rgb(255, 255, 255)',
  },
  column: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const renderItem = ({item}: {item: any}) => {
  console.log('ALLITEM', item);
  return <PlanCardType1 plan={item} />;
};

const FinderScreen = () => {
  const [plans, setPlans] = useState();

  useEffect(() => {
    const getUserPlans = async () => {
      const allUserPlanResponse = await axiosInstance.get(`/plans`);
      console.log('FinderScreen', allUserPlanResponse.data);
      setPlans(allUserPlanResponse.data);
    };

    getUserPlans();
  }, []);

  return (
    <View style={styles.container}>
      <SearchTab />
      <FlatList
        data={plans}
        renderItem={renderItem}
        keyExtractor={item => item.planId}
      />
    </View>
  );
};

export default FinderScreen;
