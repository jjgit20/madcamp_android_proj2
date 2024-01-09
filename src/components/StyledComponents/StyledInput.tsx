import DateIcon from '@src/assets/icons/icon-date.svg';
import {BLACK_PRESSED, DARK_GREY} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import {dateFormatter} from '@src/utils/dateFormatter';
import React, {useCallback, useState} from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {DatePickerModal} from 'react-native-paper-dates';
import {CalendarDate} from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import styled from 'styled-components/native';

import {StyledRoundPressable, StyledRoundPressableView} from './StyledButton';

export const StyledTextInput = styled.TextInput`
  flex: 1;
  border-width: 0px;
  padding: 0;
  height: 40px;
  font-family: Pretendard-Regular;
  font-size: 16px;
`;

export const StyledInputView = styled.View`
  flex: 1;
  border-color: ${DARK_GREY};
  border-width: 1px;
  border-radius: 10px;
  padding: 0;
  height: 40px;
  font-family: Pretendard-Regular;
  font-size: 16px;
  flex-direction: row;
  align-items: center;
`;

const CustomDatePickerModal = React.memo(
  ({
    modalOpen,
    closeModal,
    startDate,
    endDate,
    modifyPlan,
  }: {
    modalOpen: boolean;
    closeModal: () => void;
    startDate: string | undefined;
    endDate: string | undefined;
    modifyPlan: (
      param: string,
      change: any,
      secondParam?: string,
      secondChange?: any,
    ) => void;
  }) => {
    const startDateDate = startDate ? new Date(startDate) : new Date();
    const endDateDate = endDate ? new Date(endDate) : new Date();

    const onConfirm = useCallback(
      ({
        startDate,
        endDate,
      }: {
        startDate: CalendarDate;
        endDate: CalendarDate;
      }) => {
        modifyPlan('startDate', startDate, 'endDate', endDate);
        closeModal();
      },
      [modifyPlan, closeModal],
    );

    return (
      <DatePickerModal
        locale={'ko'}
        mode={'range'}
        startDate={startDateDate}
        endDate={endDateDate}
        visible={modalOpen}
        onConfirm={onConfirm}
        onDismiss={closeModal}
        presentationStyle={'pageSheet'}
      />
    );
  },
);

export const StyledDateInput = React.memo(
  ({
    startDate,
    endDate,
    modifyPlan,
  }: {
    startDate: string | undefined;
    endDate: string | undefined;
    modifyPlan: (
      param: string,
      change: any,
      secondParam?: string,
      secondChange?: any,
    ) => void;
  }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpenClose = () => {
      setModalOpen(prevState => !prevState);
    };
    const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);
    return (
      <React.Fragment>
        <CustomDatePickerModal
          modalOpen={modalOpen}
          closeModal={closeModal}
          startDate={startDate}
          endDate={endDate}
          modifyPlan={modifyPlan}
        />
        <StyledInputView>
          <Text style={globalStyles.body1}>
            {' '}
            {startDate && dateFormatter(startDate)}
            {` ~ `}
            {endDate && dateFormatter(endDate)}
          </Text>
          <StyledRoundPressableView style={{marginLeft: 'auto'}}>
            <StyledRoundPressable
              onPress={handleModalOpenClose}
              android_ripple={{color: BLACK_PRESSED, foreground: true}}
              style={{height: 38, width: 38}}>
              <DateIcon />
            </StyledRoundPressable>
          </StyledRoundPressableView>
        </StyledInputView>
      </React.Fragment>
    );
  },
);

export const StyledOverallMoneyInput = React.memo(
  ({money, setMoney}: {money: number; setMoney: (money: number) => void}) => {
    return (
      <StyledInputView>
        <StyledTextInput
          style={[globalStyles.body1, {marginHorizontal: 10}]}
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          value={isNaN(money) ? '0' : money.toLocaleString('ko-KR')}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setMoney(parseInt(e.nativeEvent.text.replace(/[^0-9]/g, ''), 10))
          }
        />
        <StyledRoundPressableView
          style={{
            marginLeft: 'auto',
            height: 40,
            width: 40,
          }}>
          <Text style={[globalStyles.body1, {textAlignVertical: 'center'}]}>
            원
          </Text>
        </StyledRoundPressableView>
      </StyledInputView>
    );
  },
);

export const StyledMoneyInput = React.memo(
  ({
    money,
    changeCash,
  }: {
    money: number;
    changeCash: (money: number) => void;
  }) => {
    // const [money, setMoney] = useState(10000000);
    return (
      <StyledInputView>
        <StyledTextInput
          style={[globalStyles.body1, {marginHorizontal: 10}]}
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          value={isNaN(money) ? '0' : money.toLocaleString('ko-KR')}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            changeCash(parseInt(e.nativeEvent.text.replace(/[^0-9]/g, ''), 10))
          }
        />
        <StyledRoundPressableView
          style={{
            marginLeft: 'auto',
            height: 40,
            width: 40,
          }}>
          <Text style={[globalStyles.body1, {textAlignVertical: 'center'}]}>
            원
          </Text>
        </StyledRoundPressableView>
      </StyledInputView>
    );
  },
);

export const StyledSelectInput = React.memo(
  ({
    name,
    options,
    value,
    onChange,
  }: {
    name: string;
    options?: {
      label: string;
      value: string;
    }[];
    value: string | null;
    onChange: ({label, value}: {label: string; value: string}) => void;
  }) => {
    const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(null);

    const renderItem = (item: {label: string; value: string}) => {
      return (
        <View
          style={{height: 40, justifyContent: 'center', paddingHorizontal: 10}}>
          <Text style={globalStyles.body1}>{item.label}</Text>
        </View>
      );
    };

    return (
      <StyledInputView style={{}}>
        <Dropdown
          style={{flex: 1, paddingHorizontal: 10, height: 40}}
          placeholderStyle={globalStyles.body1}
          selectedTextStyle={globalStyles.body1}
          inputSearchStyle={[
            globalStyles.body1,
            {height: 40, justifyContent: 'center', paddingHorizontal: 5},
          ]}
          data={options ? options : []}
          search
          labelField="label"
          valueField="value"
          placeholder={name}
          onChange={onChange}
          value={value}
          renderItem={renderItem}
        />
      </StyledInputView>
    );
  },
);
