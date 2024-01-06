/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabs from '@src/navigation/MainTabs';
import LoginScreen from '@src/screens/LoginScreen';
import PlanEditScreen from '@src/screens/PlanEditScreen';
import PlanViewScreen from '@src/screens/PlanViewScreen';
import SignUpScreen from '@src/screens/SignUpScreen';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import {MainStackParamsList} from './types';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export const Stack = createStackNavigator<MainStackParamsList>();

function App(): React.JSX.Element {
  const [userSession, setUserSession] = useState();
  const retrieveUserSession = async () => {
    try {
      const userSession = await EncryptedStorage.getItem('user_session');
      setUserSession(userSession);
    } catch (error) {
      console.error('token getting error: ', error);
    }
  };
  useEffect(() => {
    retrieveUserSession();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!userSession && (
          <React.Fragment>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </React.Fragment>
        )}
        {userSession && (
          <React.Fragment>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="PlanEditScreen" component={PlanEditScreen} />
            <Stack.Screen name="PlanViewScreen" component={PlanViewScreen} />
          </React.Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
