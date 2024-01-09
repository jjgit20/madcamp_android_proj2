import PlanCardType3 from '@src/components/PlanCards/planCardType3';
import axiosInstance from '@src/utils/axiosService';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  column: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});

const dummyData = [
  {
    id: '0',
    country: 'Japan',
    likes: '637',
    forks: '2,853',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '1',
    country: 'Italy',
    likes: '431',
    forks: '1,123',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '2',
    country: 'Italy',
    likes: '431',
    forks: '1,123',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '3',
    country: 'Italy',
    likes: '431',
    forks: '1,123',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '4',
    country: 'Japan',
    likes: '637',
    forks: '2,853',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '5',
    country: 'Italy',
    likes: '431',
    forks: '1,123',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '6',
    country: 'Italy',
    likes: '431',
    forks: '1,123',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '7',
    country: 'Italy',
    likes: '431',
    forks: '1,123',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '8',
    country: 'Japan',
    likes: '637',
    forks: '2,853',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '9',
    country: 'Italy',
    likes: '431',
    forks: '1,123',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '10',
    country: 'Italy',
    likes: '431',
    forks: '1,123',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '11',
    country: 'Italy',
    likes: '431',
    forks: '1,123',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '12',
    country: 'Japan',
    likes: '637',
    forks: '2,853',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '13',
    country: 'Italy',
    likes: '431',
    forks: '1,123',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '14',
    country: 'Italy',
    likes: '431',
    forks: '1,123',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
  {
    id: '15',
    country: 'Italy',
    likes: '431',
    forks: '1,123',
    backgroundImage: require('@src/assets/image/tokyo.png'),
  },
];

const renderItem = ({item}) => {
  return <PlanCardType3 {...item} />;
};

const UserScreen = () => {
  const [plans, setPlans] = useState();

  useEffect(() => {
    const getUserPlans = async () => {
      const userResponse = await axiosInstance.get(`/users/1`);
      const userPlanResponse = await axiosInstance.get(`/users/1/plans`);
      console.log('UserScreen', userResponse.data);
      console.log('UserScreen', userPlanResponse.data);
    };

    getUserPlans();
  }, []);

  return (
    <FlatList
      data={dummyData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={2} // Set the number of columns you want
      columnWrapperStyle={styles.column}
    />
  );
};

export default UserScreen;
