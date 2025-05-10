import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

interface NotificationImageProps {
  image: string;
  type: string;
}

const NotificationImage: React.FC<NotificationImageProps> = ({
  image,
  type,
}) => {
  // console.log(image);
  return (
    <View className="w-[64px] h-[64px] my-auto overflow-hidden relative">
      {!image ? <Image source={require("../../assets/images/lumiLearnLogo.png")} className="w-[100%] h-[100%] rounded-full bg-blue-300" resizeMode="contain" /> : <Image source={{ uri: image }} className="w-[100%] h-[100%] rounded-full" resizeMode="cover" />}
      
      <View className="absolute bottom-[0] right-[0] bg-[#b2e4b3] rounded-full p-[2px] border border-black">
        {type == 'FlashCardSet' && 
          <Image
            source={require('../../assets/images/flash-card.png')}
            style={{ width: 16, height: 16 }}
            resizeMode="contain"
          />
        }

        {type == 'Quiz' && 
          <Image
            source={require('../../assets/images/quiz1.png')}
            style={{ width: 16, height: 16,}}
            resizeMode="contain"
          />
        }

        {type == 'StudentEnrolled' && 
          <Image
            source={require('../../assets/images/add-friend.png')}
            style={{ width: 16, height: 16 }}
            resizeMode="contain"
          />
        }

        {type == 'StudentSubmitQuiz' && 
          <Image
            source={require('../../assets/images/submit.png')}
            style={{ width: 16, height: 16 }}
            resizeMode="contain"
          />
        }

        {type == 'default' && 
          <Image
            source={require('../../assets/images/flash-card.png')}
            style={{ width: 16, height: 16 }}
            resizeMode="contain"
          />
        }   
      </View>
    </View>
  );
};

export default NotificationImage;
