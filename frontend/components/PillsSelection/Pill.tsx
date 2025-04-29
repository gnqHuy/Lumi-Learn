import React from 'react';
import { Pressable, Text } from 'react-native';

type PillProps = {
  value: string;
  selected: boolean;
  onPress: () => void;
};

export const Pill: React.FC<PillProps> = ({ value, selected, onPress }) => {
  return (
    <Pressable
      className={`rounded-full py-[0.6rem] px-[1.5rem] mr-2 mb-2 ${
        selected ? 'bg-gray-500' : 'bg-gray-200'
      }`}
      onPress={onPress}
    >
      <Text className={selected ? 'text-white' : 'text-black'}>{value}</Text>
    </Pressable>
  );
};
