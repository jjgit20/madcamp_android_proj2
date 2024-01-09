import PlanCardType1 from '@src/components/PlanCards/planCardType1';
import PlanCardType2 from '@src/components/PlanCards/planCardType1';
import SearchTab from '@src/components/searchBar';
import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // 이 컨테이너가 화면 전체를 차지하도록 함
    paddingHorizontal: 20, // 좌우에만 20px의 패딩 적용
    backgroundColor: 'rgb(255, 255, 255)',
  },
  scrollViewContent: {
    // ScrollView 내부에 상하 패딩을 추가합니다.
    paddingVertical: 10,
  },
});

const FinderScreen = () => {
  return (
    <View style={styles.container}>
      <SearchTab />
      <ScrollView>
        <PlanCardType1 />
        <PlanCardType2 />
        <PlanCardType2 />
        <PlanCardType2 />
      </ScrollView>
    </View>
  );
};

export default FinderScreen;
