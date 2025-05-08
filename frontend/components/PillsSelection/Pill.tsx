import React from 'react';
import { Pressable, Text } from 'react-native';

type PillProps = {
  value: string;
  selected: boolean;
  defaultColor?: string;
  selectedColor?: string;
  borderStyle?: string;
  onPress: () => void;
};

export const Pill: React.FC<PillProps> = ({ 
  value, 
  selected, 
  defaultColor = 'bg-gray-200', 
  selectedColor = 'bg-gray-500',
  borderStyle = undefined,
   onPress }) => {
  return (
    <Pressable
      className={`rounded-full py-[0.6rem] px-[1rem] mr-2 mb-2 ${
        selected ? selectedColor : defaultColor
      } ${borderStyle}`}
      onPress={onPress}
    >
      <Text className={`${selected ? 'text-white' : 'text-black'}`}>{value}</Text>
    </Pressable>
  );
};
