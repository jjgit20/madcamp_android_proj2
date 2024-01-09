import PlanCardType3 from '@src/components/PlanCards/planCardType3';
import ProfileBar from '@src/components/profileBar';
import axiosInstance from '@src/utils/axiosService';
import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

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
  console.log('ITEM', item);
  return <PlanCardType3 plan={item} />;
};

const UserScreen = () => {
  const [user, setUser] = useState();
  const [plans, setPlans] = useState();

  useEffect(() => {
    const getUserPlans = async () => {
      const userResponse = await axiosInstance.get(`/users/3`);
      const userPlanResponse = await axiosInstance.get(`/users/3/plans`);
      console.log('UserScreen', userResponse.data);
      console.log('UserScreen', userPlanResponse.data);
      setUser(userResponse.data);
      setPlans(userPlanResponse.data);
    };

    getUserPlans();
  }, []);

  return (
    <View style={styles.container}>
      <ProfileBar user={user} />
      <FlatList
        data={plans}
        renderItem={renderItem}
        keyExtractor={item => item.planId}
        numColumns={2} // Set the number of columns you want
        columnWrapperStyle={styles.column}
      />
    </View>
  );
};

export default UserScreen;
