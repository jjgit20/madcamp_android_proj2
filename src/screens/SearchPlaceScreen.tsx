import {GOOGLE_API_KEY} from '@env';
import {PlansClose} from '@src/components/PlansScreenComponents/PlansClose';
import {StyledScreenView} from '@src/components/StyledComponents/StyledScreenView';
import {
  BLACK,
  DARK_GREY,
  HEADING_VERTICAL_MARGIN,
} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import {arePropsEqual} from '@src/utils/renderingComparisonService';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const SearchPlaceScreen = () => {
  return (
    <StyledScreenView>
      <PlansClose color={BLACK} />

      <GooglePlacesAutocomplete
        placeholder={'검색어를 입력하세요'}
        onPress={(data, details = null) => {
          console.log(JSON.stringify(details?.geometry?.location));
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'ko',
          // components: 'country:kr',
        }}
        styles={styles.search}
        fetchDetails
      />
    </StyledScreenView>
  );
};

export default React.memo(SearchPlaceScreen, arePropsEqual);

const styles = StyleSheet.create({
  search: {
    container: {
      marginTop: HEADING_VERTICAL_MARGIN * 2,
    },
    textInput: {
      ...globalStyles.body1,
      borderColor: DARK_GREY,
      borderWidth: 1,
      borderRadius: 10,
    },
    description: {...globalStyles.body1},
  },
});
