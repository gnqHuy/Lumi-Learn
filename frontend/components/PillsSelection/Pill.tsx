import React from 'react';
import { Pressable, Text } from 'react-native';

type PillProps = {
  value: string;
  selected: boolean;
  textColor?: string;
  selectedTextColor?: string;
  defaultColor?: string;
  selectedColor?: string;
  borderStyle?: string;
  onPress: () => void;
};

export const Pill: React.FC<PillProps> = ({ 
  value, 
  selected, 
  textColor,
  selectedTextColor,
  defaultColor, 
  selectedColor,
  borderStyle,
   onPress }) => {
  return (
    <Pressable
      className={`rounded-full py-[0.6rem] px-[1rem] mr-2 mb-2 ${
        selected ? selectedColor : defaultColor
      } ${borderStyle}`}
      onPress={onPress}
    >
      <Text className={`${selected ? selectedTextColor : textColor}`}>{value}</Text>
    </Pressable>
  );
};
