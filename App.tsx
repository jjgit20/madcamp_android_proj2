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
import {registerTranslation} from 'react-native-paper-dates';

import {AuthContextType, MainStackParamsList} from './types';

registerTranslation('ko', {
  save: '저장하기',
  selectSingle: '날짜를 선택하세요',
  selectMultiple: '날짜를 선택하세요',
  selectRange: '기간을 선택하세요',
  notAccordingToDateFormat: inputFormat => `${inputFormat} 형식을 따라주세요`,
  mustBeHigherThan: date => `${date} 이후 날짜를 골라주세요`,
  mustBeLowerThan: date => `${date} 이전 날짜를 골라주세요`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: '이 날짜는 사용할 수 없습니다',
  previous: '이전',
  next: '다음',
  typeInDate: '날짜를 입력하세요',
  pickDateFromCalendar: '달력에서 날짜를 골라주세요',
  close: '닫기',
  hour: '시',
  minute: ' 분',
});

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
      await EncryptedStorage.setItem('user_session', null);
      const userSession = await EncryptedStorage.getItem('user_session');
      dispatch({
        type: 'LOAD_TOKEN',
        token: userSession && JSON.parse(userSession).token,
      });
      console.log('LOAD_TOKEN', userSession && JSON.parse(userSession).token);
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
