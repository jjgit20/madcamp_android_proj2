export type MainStackParamsList = {
  MainTabs: undefined;
  PlanEditScreen: {planId: number};
  PlanViewScreen: {planId: number};
  LoginScreen: undefined;
  SignUpScreen: {
    kakaoId: string;
    email: string;
    nickname: string;
    image: string;
  };
};

export type MainTabsParamsList = {
  FinderScreen: undefined;
  PlansScreen: undefined;
  UserScreen: {userId: number};
};
