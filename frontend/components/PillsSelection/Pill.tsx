import React, { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, findNodeHandle, Pressable, Text, TouchableOpacity } from 'react-native';

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
  textColor = 'text-black',
  selectedTextColor = 'text-white',
  defaultColor = 'bg-gray-200', 
  selectedColor = 'bg-gray-500',
  borderStyle = undefined,
  onPress }) => {
  return (
    <TouchableOpacity
      className={`rounded-full py-[0.6rem] px-[1rem] mr-2 mb-2 ${
        selected ? selectedColor : defaultColor
      } ${borderStyle}`}
      onPress={() => {
        onPress();
        setTimeout(() => {
          AccessibilityInfo.announceForAccessibility("Selected.");
        }, 100);
      }}
      accessibilityLabel={`${value}. ${selected ? 'Selected Filter option' : 'Unselected Filter option. Double tab to choose this filter'}`}
      activeOpacity={0.7}
    >
      <Text className={`${selected ? selectedTextColor : textColor}`}>{value}</Text>
    </TouchableOpacity>
  );
};
