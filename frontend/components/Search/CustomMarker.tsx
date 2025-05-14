import React from 'react';
import { Pressable } from 'react-native';

interface CustomMarkerProps {
  currentValue: number;
  sliderType: 'rating' | 'courseLength';
}

const CustomMarker = ({ currentValue, sliderType }: CustomMarkerProps) => {
  return (
    <Pressable
      accessible={true}
      accessibilityRole="none"
      accessibilityLabel={`${sliderType === 'rating' ? 'Rating' : 'Course length'} slider. Adjustable`}
      accessibilityHint={`Current value is ${currentValue}${currentValue === 20 ? '+' : ''}. Swipe left or right to adjust.`}
      className="bg-white border-2 border-cyan-800 w-5 h-5 rounded-full"
    />
  );
};

export default CustomMarker;
