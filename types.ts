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

export interface AuthContextType {
  login: (token: string) => Promise<void>;
  logout: () => void;
  signup: (token: string) => Promise<void>;
}

export type MainTabsParamsList = {
  FinderScreen: undefined;
  PlansScreen: undefined;
  UserScreen: {userId: number};
};
