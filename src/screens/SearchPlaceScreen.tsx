import {GOOGLE_API_KEY} from '@env';
import {StyledScreenView} from '@src/components/StyledComponents/StyledScreenView';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const SearchPlaceScreen = () => {
  return (
    <StyledScreenView>
      <GooglePlacesAutocomplete
        placeholder={'검색어를 입력하세요'}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{key: GOOGLE_API_KEY, language: 'ko', components: 'country:kr'}}
      />
    </StyledScreenView>
  );
};

export default SearchPlaceScreen;
