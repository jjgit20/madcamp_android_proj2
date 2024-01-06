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
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import {AuthContextType, MainStackParamsList} from './types';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export const Stack = createStackNavigator<MainStackParamsList>();
export const AuthContext = createContext<AuthContextType>();

function App(): React.JSX.Element {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'LOAD_TOKEN': // token finished loading
          return {
            ...prevState,
            isLoading: false,
            token: action.token,
          };
        case 'LOGIN':
          return {
            ...prevState,
            token: action.token,
          };
        case 'LOGOUT':
          return {
            ...prevState,
            isSignout: true,
            token: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: null,
    },
  );

  const retrieveUserSession = async () => {
    try {
      const userSession = await EncryptedStorage.getItem('user_session');
      dispatch({
        type: 'LOAD_TOKEN',
        token: userSession && JSON.parse(userSession).token,
      });
    } catch (error) {
      console.error('token getting error: ', error);
    }
  };

  useEffect(() => {
    retrieveUserSession();
  }, []);

  const authContext = useMemo(
    () => ({
      login: async (token: string) => {
        dispatch({type: 'SIGN_IN', token: token});
      },
      logout: () => dispatch({type: 'SIGN_OUT'}),
      signup: async (token: string) => {
        dispatch({type: 'SIGN_IN', token: token});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state?.token === null && (
            <React.Fragment>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            </React.Fragment>
          )}
          {state?.token !== null && (
            <React.Fragment>
              <Stack.Screen name="MainTabs" component={MainTabs} />
              <Stack.Screen name="PlanEditScreen" component={PlanEditScreen} />
              <Stack.Screen name="PlanViewScreen" component={PlanViewScreen} />
            </React.Fragment>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
