import PlanCardType1 from '@src/components/PlanCards/planCardType1';
import PlanCardType2 from '@src/components/PlanCards/planCardType2';
import PlanCardType3 from '@src/components/PlanCards/planCardType3';
import SearchTab from '@src/components/searchBar';
import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';

const backgroundImage = require('@src/assets/image/tokyo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1, // 이 컨테이너가 화면 전체를 차지하도록 함
    paddingHorizontal: 20, // 좌우에만 20px의 패딩 적용
    backgroundColor: 'rgb(255, 255, 255)',
  },
});

const FinderScreen = () => {
  return (
    <View style={styles.container}>
      <SearchTab />
      <ScrollView>
        <PlanCardType1 />
        <PlanCardType3
          backgroundImage={backgroundImage}
          country="오스트리아"
          likes="637"
          forks="1,123"
        />
        <PlanCardType2
          backgroundImage={backgroundImage}
          country="오스트리아"
          city="빈"
          duration="1박2일"
          date="2024.01.30(화)"
          dday="-1"
        />
        <PlanCardType2
          backgroundImage={backgroundImage}
          country="오스트리아"
          city="빈"
          duration="1박2일"
          date="2024.01.30(화)"
          dday="-1"
        />
        <PlanCardType2
          backgroundImage={backgroundImage}
          country="오스트리아"
          city="빈"
          duration="1박2일"
          date="2024.01.30(화)"
          dday="-1"
        />
      </ScrollView>
    </View>
  );
};

export default FinderScreen;
