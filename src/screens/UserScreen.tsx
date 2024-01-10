import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';
import PlanCardType3 from '@src/components/PlanCards/planCardType3';
import ProfileBar from '@src/components/profileBar';
import axiosInstance from '@src/utils/axiosService';
import React, {useCallback, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import {MainTabsParamsList, PersonalPlansResponseType} from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1, // 이 컨테이너가 화면 전체를 차지하도록 함
    // paddingHorizontal: 20, // 좌우에만 20px의 패딩 적용
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 20,
  },
  column: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const renderItem = ({
  item,
  index,
  isMyPage,
  modifyPlanLike,
}: {
  item: any;
  index: number;
  isMyPage: boolean;
  modifyPlanLike: (
    planId: number,
    planUserId: number,
    didILikeIt: boolean,
  ) => void;
}) => {
  return (
    <PlanCardType3
      plan={item}
      index={index}
      isMyPage={isMyPage}
      modifyPlanLike={modifyPlanLike}
    />
  );
};

type Props = BottomTabScreenProps<MainTabsParamsList, 'UserScreen', 'Tab'>;

const UserScreen = ({route, navigation}: Props) => {
  const [user, setUser] = useState<{receivedLikes: number; image?: string}>({
    receivedLikes: 0,
  });
  const [plans, setPlans] = useState<PersonalPlansResponseType[]>([]);
  const [isMyPage, setIsMyPage] = useState(true);

  // useEffect(() => {
  //   const getUserPlans = async () => {
  //     let userId = route.params.userId;

  //     if (userId === 0) {
  //       const userSession = await EncryptedStorage.getItem('user_session');
  //       userId = userSession && JSON.parse(userSession).userId;
  //     }

  //     const userResponse = await axiosInstance.get(`/users/${userId}`);
  //     const userPlanResponse = await axiosInstance.get(`/users/${userId}`);

  //     console.log('UserScreen', userResponse.data);
  //     console.log('UserScreen', userPlanResponse.data);
  //     setUser(userResponse.data);
  //     setPlans(userPlanResponse.data);
  //   };

  //   getUserPlans();
  // }, [route.params.userId]);

  useFocusEffect(
    useCallback(() => {
      const getUserPlans = async () => {
        let userId = route.params.userId;

        const userSession = await EncryptedStorage.getItem('user_session');
        setIsMyPage(
          userId === 0 ||
            userId === (userSession && JSON.parse(userSession).userId),
        );
        if (userId === 0) {
          userId = userSession && JSON.parse(userSession).userId;
          navigation.navigate('UserScreen', {userId});
        }

        const userResponse = await axiosInstance.get(`/users/${userId}`);
        const userPlanResponse = await axiosInstance.get(
          `/users/${userId}/plans`,
        );

        console.log('UserScreen', userResponse.data);
        console.log('UserScreen', userPlanResponse.data);
        setUser(userResponse.data);
        setPlans(userPlanResponse.data);
      };

      getUserPlans();
    }, [route.params.userId, navigation]),
  );

  const modifyPlanLike = useCallback(
    (planId: number, planUserId: number, didILikeIt: boolean) => {
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
      console.log(route.params.userId, planUserId);
      if (route.params.userId === planUserId) {
        setUser(prevState => ({
          ...prevState,
          receivedLikes: didILikeIt
            ? prevState.receivedLikes - 1
            : prevState.receivedLikes + 1,
        }));
      }
    },
    [route.params.userId],
  );

  return (
    <View style={styles.container}>
      <ProfileBar user={user} />
      <FlatList
        data={plans}
        renderItem={({item, index}) =>
          renderItem({item, index, isMyPage, modifyPlanLike})
        }
        keyExtractor={item => item.planId.toString()}
        numColumns={2} // Set the number of columns you want
        columnWrapperStyle={styles.column}
        contentContainerStyle={{paddingHorizontal: 20}}
      />
    </View>
  );
};

export default UserScreen;
