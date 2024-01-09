import styled from 'styled-components/native';

export const StyledPressable = styled.Pressable`
  padding: 15px 30px;
  flex-direction: row;
  gap: 45px;
  width: 100%;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const StyledPressableView = styled.View`
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
`;

export const StyledCardPressable = styled.Pressable`
  border-radius: 20px;
  overflow: hidden;
`;

export const StyledCardPressableView = styled.View`
  border-radius: 20px;
  overflow: hidden;
  elevation: 1;
`;

export const StyledRoundPressable = styled.Pressable`
  border-radius: 100px;
  overflow: hidden;
  height: 55px;
  width: 55px;
  align-items: center;
  justify-content: center;
`;

export const StyledRoundPressableView = styled.View`
  border-radius: 100px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;
