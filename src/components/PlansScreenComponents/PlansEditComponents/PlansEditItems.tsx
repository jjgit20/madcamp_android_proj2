import {
  StyledDateInput,
  StyledInputView,
  StyledOverallMoneyInput,
  StyledSelectInput,
  StyledTextInput,
} from '@src/components/StyledComponents/StyledInput';
import globalStyles from '@src/styles/style';
import {
  commonCountries,
  countryAirports,
  countryCities,
  seasons,
} from '@src/utils/\bselectService';
import React, {useMemo} from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';

import {PersonalPlansDetailedResponseType} from '../../../../types';

const PlansEditItems = ({
  plan,
  type,
  modifyPlan,
}: {
  plan: PersonalPlansDetailedResponseType | null;
  type: string;
  modifyPlan: (
    param: string,
    change: any,
    secondParam?: string,
    secondChange?: any,
  ) => void;
}) => {
  const currentList = useMemo(
    () =>
      type === 'needed'
        ? [
            {
              id: 'country',
              name: '나라',
              type: 'select',
              options: commonCountries,
            },
            {
              id: 'city',
              name: '도시',
              type: 'select',
              options: plan?.country
                ? countryCities[plan?.country as keyof typeof countryCities]
                : [],
            },
            {id: 'date', name: '시작일', type: 'date'},
            {id: 'cash', name: '경비', type: 'money'},
          ]
        : [
            {
              id: 'airport',
              name: '공항',
              type: 'select',
              options: plan?.country
                ? countryAirports[plan?.country as keyof typeof countryAirports]
                : [],
            },
            {id: 'season', name: '계절', type: 'select', options: seasons},
            {id: 'topic', name: '주제', type: 'string'},
          ],
    [type, plan?.country],
  );
  return (
    <React.Fragment>
      {currentList &&
        currentList.map(
          (
            {
              id,
              name,
              type,
              options,
            }: {
              id: string;
              name: string;
              type: string;
              options?: {
                label: string;
                value: string;
              }[];
            },
            index: number,
          ) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                alignItems: 'center',
                gap: 15,
              }}>
              <Text
                style={[globalStyles.body1, {width: 50, textAlign: 'right'}]}>
                {name}
              </Text>
              {type === 'select' && (
                <StyledSelectInput
                  name={name}
                  options={options}
                  value={
                    (plan &&
                      plan[id as keyof PersonalPlansDetailedResponseType]) ||
                    null
                  }
                  onChange={({label, value}: {label: string; value: string}) =>
                    modifyPlan(id, value)
                  }
                />
              )}
              {type === 'money' && (
                <StyledOverallMoneyInput
                  money={plan?.cash || 0}
                  setMoney={(money: number) => modifyPlan('cash', money)}
                />
              )}
              {type === 'string' && (
                <StyledInputView>
                  <StyledTextInput
                    style={{marginHorizontal: 10}}
                    value={
                      plan &&
                      plan[id as keyof PersonalPlansDetailedResponseType]
                    }
                    onChange={(
                      e: NativeSyntheticEvent<TextInputChangeEventData>,
                    ) => modifyPlan(id, e.nativeEvent.text)}
                  />
                </StyledInputView>
              )}
              {type === 'date' && (
                <StyledDateInput
                  startDate={plan?.startDate as string}
                  endDate={plan?.endDate as string}
                  modifyPlan={modifyPlan}
                />
              )}
            </View>
          ),
        )}
    </React.Fragment>
  );
};

export default React.memo(PlansEditItems);
