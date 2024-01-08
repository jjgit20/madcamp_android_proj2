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
  SearchPlaceScreen: undefined;
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

export interface PersonalPlansResponseType {
  planId: number;
  startDate: string;
  endDate: string;
  country: string;
  city: string;
  forks: any;
  likes: any;
  image: string;
  isPublic: boolean;
}

export interface PersonalPlansDetailedResponseType {
  planId: number;
  startDate: string;
  endDate: string;
  country: string;
  city: string;
  forks: any;
  likes: any;
  image: string;
  isPublic: boolean;
  cash: number;
}

export interface ImageType {
  uri: string | null;
  type: string | null;
}
