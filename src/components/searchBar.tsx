import FilterIcon from '@src/assets/icons/Filter.svg';
import SearchIcon from '@src/assets/icons/Search.svg';
import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%', // 전체 너비
    flexDirection: 'row', // 자식 요소들을 행 방향으로 배치
    justifyContent: 'center', // 센터 정렬
    alignItems: 'center', // 아이템 세로 정렬
    paddingVertical: 15,
  },
  searchBox: {
    flex: 1, // 나머지 공간 모두 차지
    flexDirection: 'row', // 자식 요소들을 행 방향으로 배치
    alignItems: 'center', // 아이템 세로 정렬
    backgroundColor: '#F6F6F6', // 배경색
    borderRadius: 10, // 모서리 둥글게
    paddingHorizontal: 10, // 좌우 패딩
  },
  searchInput: {
    flex: 1, // 입력 영역이 나머지 공간 모두 차지
    color: '#797979', // 글자색
    fontSize: 18, // 글자 크기
    fontFamily: 'Inter', // 글꼴
  },
  icon: {
    marginRight: 10, // 아이콘과 텍스트 사이의 마진
  },
  filterButton: {
    padding: 10, // 필터 버튼의 패딩
  },
});

const SearchTab = () => {
  const iconSize = 24;

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <SearchIcon width={iconSize} height={iconSize} />
        <TextInput
          style={styles.searchInput}
          placeholder="검색"
          placeholderTextColor="#797979"
        />
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <FilterIcon width={iconSize} height={iconSize} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchTab;
