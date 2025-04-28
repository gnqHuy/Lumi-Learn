import { View, Text } from 'react-native'
import React, { useState } from 'react'
import MainProfile from '@/components/Profile/MainProfile';
import UserInformation from '@/components/Profile/UserInformation';

const ProfilePage = () => {
  const [displayInformation, setDisplayInformation] = useState(false);

  const setupDisplayInformation = (display: boolean) => {
    setDisplayInformation(display);
  }
  return (
    <View>
      {displayInformation === false && 
        <View>
          <MainProfile 
            setupDisplayInformation={setupDisplayInformation}
          />
        </View>
      }

      {displayInformation === true && 
        <UserInformation 
            setupDisplayInformation={setupDisplayInformation}
        />
      }
    </View>
  )
};

export default ProfilePage;