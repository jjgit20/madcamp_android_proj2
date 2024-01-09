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

const CustomDatePickerModal = ({
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
};

export const StyledDateInput = ({
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
};

export const StyledMoneyInput = () => {
  const [money, setMoney] = useState(10000000);
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
};

export const StyledSelectInput = React.memo(
  ({
    name,
    options,
  }: {
    name: string;
    options?: {
      label: string;
      value: string;
    }[];
  }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

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
        {/* <DropDownPicker
        open={open}
        setOpen={setOpen}
        items={options}
        value={value}
        setValue={setValue}
        listMode="SCROLLVIEW"
        placeholder="나라"
        style={{flex: 1, minHeight: 40}}
        // dropDownContainerStyle={{height: 40}}
        searchable={true}
        searchContainerStyle={{
          minWidth: '100%',
        }}
      /> */}
        <Dropdown
          style={{flex: 1, paddingHorizontal: 10, height: 40}}
          placeholderStyle={globalStyles.body1}
          selectedTextStyle={globalStyles.body1}
          inputSearchStyle={[
            globalStyles.body1,
            {height: 40, justifyContent: 'center', paddingHorizontal: 10},
          ]}
          data={options ? options : []}
          search
          labelField="label"
          valueField="value"
          placeholder={name}
          onChange={() => {}}
          // onChange={item => {
          //   setValue(item.value);
          // }}
          renderItem={renderItem}
        />
      </StyledInputView>
    );
  },
);
