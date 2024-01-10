import globalStyles from '@src/styles/style';
import React from 'react';
import {Text, View} from 'react-native';

import PlaceIcon from '../PlansEditComponents/PlaceIcon';

const PlansPlace = ({
  name,
  type,
  cash,
  planPlaceId,
}: {
  name: string;
  type: string;
  cash: number;
  planPlaceId: number;
}) => {
  return (
    <React.Fragment>
      <View style={{flexDirection: 'row'}}>
        <View style={{padding: 20, justifyContent: 'center'}}>
          <PlaceIcon type={type} customSize={20} />
        </View>
        <View
          style={{
            padding: 20,
            gap: 10,
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
          }}>
          <Text style={[globalStyles.h5, {flex: 1}]}>{name}</Text>
          <Text style={[globalStyles.body2, {marginLeft: 'auto'}]}>
            {cash.toLocaleString('ko-KR')}원
          </Text>
        </View>
      </View>
    </React.Fragment>
  );
};
export default React.memo(PlansPlace);
