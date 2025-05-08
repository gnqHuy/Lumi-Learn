import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

interface NotificationImageProps {
  image: ImageSourcePropType;
  iconName: keyof typeof FontAwesome.glyphMap;
  iconColor?: string;
  iconSize?: number;
}

const NotificationImage: React.FC<NotificationImageProps> = ({
  image,
  iconName,
  iconColor = '#000',
  iconSize = 20,
}) => {
  return (
    <View className="w-[57px] h-[57px] my-auto overflow-hidden relative">
      <Image source={image} className="w-[95%] h-[95%]" resizeMode="cover" />
      <View className="absolute bottom-[0] right-[0]">
        <FontAwesome6 name={iconName} size={iconSize} color={iconColor} />
      </View>
    </View>
  );
};

export default NotificationImage;
