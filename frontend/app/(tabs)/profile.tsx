import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainProfile from '@/components/Profile/MainProfile';
import UserInformation from '@/components/Profile/UserInformation';
import ChangePassword from '@/components/Profile/ChangePassword';
import Policy from '@/components/Profile/Policy';
import Helps from '@/components/Profile/Helps';
import { User } from '@/types/user';
import { changePasswordApi, getUserProfile } from '@/api/userApi';
import useAuthStore from '@/zustand/authStore';
import { router } from 'expo-router';
import ChangeProfile from '@/components/Profile/ChangeProfile';

const ProfilePage = () => {
  const [displayInformation, setDisplayInformation] = useState(false);
  const [displayChangePassword, setDisplayChangePassword] = useState(false);
  const [displayChangeProfile, setDisplayChangeProfile] = useState(false);
  const [displayPolicy, setDisplayPolicy] = useState(false);
  const [displayHelp, setDisplayHelp] = useState(false);

  // zustand auth state and logout
  const authState = useAuthStore((state) => state.authState);
  const logOutAuthState = useAuthStore((state) => state.logOut);
  const saveAuthState = useAuthStore((state) => state.saveAuthState);

  // test state to change birthday
  const [changeBirthdayState, setChangeBirthdayState] = useState(false);

  // user profile
  const [userProfile, setUserProfile] = useState<User>({
    id: '',
    username: '',
    name: '',
    email: '',
    phone: '',
    birthday: new Date(),
    role: '',
  });

  useEffect(() => {
    getUserProfile().then((response) => {
        setUserProfile(response.data);
    })
  }, [])

  const setupDisplayInformation = (display: boolean) => {
    setDisplayInformation(display);
  }

  const setupDisplayChangePassword = (display: boolean) => {
    setDisplayChangePassword(display);
  }

  const setupDisplayPolicy = (display: boolean) => {
    setDisplayPolicy(display);
  }

  const setupDisplayHelp = (display: boolean) => {
    setDisplayHelp(display);
  }

  const setupDisplayChangeProfile = (display: boolean) => {
    setDisplayChangeProfile(display);
  }

  // reset user profile
  const resetProfile = () => {
    getUserProfile().then((response) => {
      setUserProfile(response.data);
      saveAuthState({
        user: response.data,
        accessToken: authState?.accessToken!
      });
    })
  }

  // logout
  const handleLogOut = () => {
      try {
        logOutAuthState();
      } catch(err) {
        console.error(err);
      }
      router.push('/(auth)/login');
  }

  // activate change birthday
  const activateChangeBirthday = () => {
    setChangeBirthdayState(true);
  }
  return (
    <View className='bg-white flex-1'>
      <View>
        {(displayInformation === false && displayChangePassword === false && displayPolicy === false && displayHelp === false && displayChangeProfile === false) && 
          <View>
            <MainProfile 
              setupDisplayInformation={setupDisplayInformation}
              setupDisplayChangePassword={setDisplayChangePassword}
              setupDisplayPolicy={setupDisplayPolicy}
              setupDisplayHelp={setupDisplayHelp}
              handleLogOut={handleLogOut}
              userProfile={userProfile}
            />
          </View>
        }

        {displayInformation === true && 
          <UserInformation 
              setupDisplayInformation={setupDisplayInformation}
              userProfile={userProfile}
              setupDisplayChangeProfile={setupDisplayChangeProfile}
              changeBirthdayState = {changeBirthdayState}
          />
        }

        {displayChangePassword === true && 
          <View>
              <ChangePassword 
                  setupDisplayChangePassword={setupDisplayChangePassword}
              />
          </View>
        }

        {displayChangeProfile === true && 
          <View>
              <ChangeProfile 
                  setupDisplayChangeProfile={setupDisplayChangeProfile}
                  setupDisplayInformation={setupDisplayInformation}
                  userProfile={userProfile}
                  resetProfile={resetProfile}
                  activateChangeBirthday={activateChangeBirthday}
              />
          </View>
        }

        {displayPolicy === true && 
          <Policy 
            setupDisplayPolicy={setupDisplayPolicy}
          />
        }

        {displayHelp === true && 
          <Helps 
            setupDisplayHelp={setupDisplayHelp}
          />
        }
      </View>
    </View>
  )
};

export default ProfilePage;