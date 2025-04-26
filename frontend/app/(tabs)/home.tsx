import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import CoursesPage from './courses';
import { logIn } from '@/api/authApi';
import useAuthStore from '@/zustand/authStore';
// import { REACT_APP_API_BASE_URL } from '';

const HomePage = () => {
    const username = 'teacher';
    const password = 'string';
    const [text, setText] = useState('');
    const authState = useAuthStore((state) => state.authState);
    const logOut = useAuthStore((state) => state.logOut);

    const handleOnClick = () => {
      logOut();
    }

    useEffect(() => {
      if (authState?.accessToken) {
        setText(authState.accessToken);
      }
    }, [authState]);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-5xl text-blue-500 font-bold">home</Text>
      <Button
            title="Logout"
            onPress={handleOnClick}
        />
        <Text className="text-5xl text-blue-500 font-bold">{text}</Text>
    </View>
  )
};

export default HomePage;