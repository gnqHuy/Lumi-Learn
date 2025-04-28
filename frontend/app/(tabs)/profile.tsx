import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import MainProfile from '@/components/Profile/MainProfile';
import UserInformation from '@/components/Profile/UserInformation';
import ChangePassword from '@/components/Profile/ChangePassword';
import ChangeTheme from '@/components/Profile/ChangeTheme';

const ProfilePage = () => {
  const [displayInformation, setDisplayInformation] = useState(false);
  const [displayChangePassword, setDisplayChangePassword] = useState(false);
  const [displayChangeTheme, setDisplayChangeTheme] = useState(false);

  const setupDisplayInformation = (display: boolean) => {
    setDisplayInformation(display);
  }

  const setupDisplayChangePassword = (display: boolean) => {
    setDisplayChangePassword(display);
  }

  const setupDisplayChangeTheme = (display: boolean) => {
    setDisplayChangeTheme(display);
  }
  return (
    <View>
      <View>
        {(displayInformation === false && displayChangePassword === false) && 
          <View>
            <MainProfile 
              setupDisplayInformation={setupDisplayInformation}
              setupDisplayChangePassword={setDisplayChangePassword}
              setupDisplayChangeTheme={setupDisplayChangeTheme}
            />
          </View>
        }

        {displayInformation === true && 
          <UserInformation 
              setupDisplayInformation={setupDisplayInformation}
          />
        }

        {displayChangePassword === true && 
          <View>
              <ChangePassword 
                  setupDisplayChangePassword={setupDisplayChangePassword}
              />
          </View>
        }

        {displayChangeTheme === true && 
          <View className = "absolute top-[70vh] z-[50]">
              <ChangeTheme 
                  setupDisplayChangeTheme={setupDisplayChangeTheme}
              />
          </View>
        }
      </View>
      {/* overlay */}
      {displayChangeTheme === true && 
        <Pressable className = "bg-gray-600 absolute left-0 top-0 w-[100vw] h-[100vh] z-[10] opacity-50" onPress={() => setDisplayChangeTheme(false)}></Pressable>
      }
    </View>
  )
};

export default ProfilePage;