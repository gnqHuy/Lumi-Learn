import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const AppLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false}}>
        <Tabs.Screen
            name='home'
            options={{
                title: 'Home'
            }}
        />
        <Tabs.Screen
            name='courses'
            options={{
                title: 'Courses'
            }}
        />
        <Tabs.Screen
            name='notification'
            options={{
                title: 'Notification'
            }}
        />
        <Tabs.Screen
            name='profile'
            options={{
                title: 'Profile'
            }}
        />
    </Tabs>
  )
}

export default AppLayout