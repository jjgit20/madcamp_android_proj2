/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {BACKEND_URL} from '@env';
import {
  getProfile,
  login,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
import axios from 'axios';
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const [userInfo, setUserInfo] = useState({});
  const logReturn = async () => {
    console.log(BACKEND_URL);
    axios
      .get(`${BACKEND_URL}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => console.log(e));
    await loginWithKakaoAccount()
      .then(res => {
        console.log(res);
        setUserInfo(res);
        getProfile(res.accessToken).then(res => {
          console.log('ayy', res),
            axios
              .post(`${BACKEND_URL}/auth/kakao/login`, {
                kakaoId: res.id,
              })
              .then(res => console.log(res.data))
              .catch(err => console.log('ERROR LOGGING IN'));
          axios
            .post(`${BACKEND_URL}/auth/kakao/signup`, {
              kakaoId: res.id,
              username: 'tester',
              password: 'testpwd',
              nickname: res.nickname,
              email: res.email,
              image: res.profileImageUrl,
            })
            .then(res => console.log(res.data))
            .catch(err => console.log('ERROR SIGNING UP:', err));
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView>
      <Pressable onPress={logReturn}>
        <View>
          <Text>hihihihi</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
