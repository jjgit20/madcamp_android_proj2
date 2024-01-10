import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FinderTabIcon from '@src/assets/icons/tab_finder.svg';
import PlansTabIcon from '@src/assets/icons/tab_plans.svg';
import UserTabIcon from '@src/assets/icons/tab_user.svg';
import FinderScreen from '@src/screens/FinderScreen';
import PlansScreen from '@src/screens/PlansScreen';
import UserScreen from '@src/screens/UserScreen';
import {BLACK, BLUE, WHITE} from '@src/styles/globalStyleVariables';
import React from 'react';

import {MainTabsParamsList} from '../../types';

const Tab = createBottomTabNavigator<MainTabsParamsList>();

const MainTabs = () => {
  const iconSize = 20;
  const focusedIconSize = 21;

  return (
    <Tab.Navigator
      initialRouteName={'FinderScreen'}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: BLUE,
        tabBarInactiveTintColor: BLACK,
        tabBarStyle: {height: 50, backgroundColor: WHITE, elevation: 0},
        headerShown: false,
      }}>
      <Tab.Screen
        name="FinderScreen"
        component={FinderScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <FinderTabIcon
              name="home"
              width={focused ? focusedIconSize : iconSize}
              height={focused ? focusedIconSize : iconSize}
              fill={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PlansScreen"
        component={PlansScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <PlansTabIcon
              name="home"
              width={focused ? focusedIconSize : iconSize}
              height={focused ? focusedIconSize : iconSize}
              fill={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <UserTabIcon
              name="home"
              width={focused ? focusedIconSize : iconSize}
              height={focused ? focusedIconSize : iconSize}
              fill={color}
            />
          ),
        }}
        initialParams={{userId: 0}}
      />
    </Tab.Navigator>
  );
};
export default MainTabs;
