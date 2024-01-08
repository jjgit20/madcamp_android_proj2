import axiosInstance from '@src/utils/axiosService';
import React, {useEffect, useState} from 'react';

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
  return <></>;
};

export default UserScreen;
