import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const CourseDetailLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index'/>
            <Stack.Screen name='quiz'/>
            <Stack.Screen name='flashcardset'/>
        </Stack>
    )
}

export default CourseDetailLayout;