import {
  StyledDateInput,
  StyledInputView,
  StyledMoneyInput,
  StyledSelectInput,
  StyledTextInput,
} from '@src/components/StyledComponents/StyledInput';
import {extraInfo, neededInfo} from '@src/screens/PlanEditScreen';
import globalStyles from '@src/styles/style';
import React, {useMemo} from 'react';
import {Text, View} from 'react-native';

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
    () => (type === 'needed' ? neededInfo : extraInfo),
    [type],
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
            }: {
              id: string;
              name: string;
              type: string;
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
                <StyledSelectInput id={id} country={plan?.country} />
              )}
              {type === 'money' && <StyledMoneyInput />}
              {type === 'string' && (
                <StyledInputView>
                  <StyledTextInput style={{marginHorizontal: 10}} />
                </StyledInputView>
              )}
              {type === 'date' && (
                <StyledDateInput
                  startDate={plan?.startDate}
                  endDate={plan?.endDate}
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
