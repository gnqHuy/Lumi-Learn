import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuthStore from '@/zustand/authStore';

const NotificationPage = () => {
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
      <Text className="text-5xl text-blue-500 font-bold">notification</Text>
      <Button
            title="Logout"
            onPress={handleOnClick}
        />
    </View>
  )
};

export default NotificationPage;