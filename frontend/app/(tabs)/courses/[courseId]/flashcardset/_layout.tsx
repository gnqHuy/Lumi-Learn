import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const FlashcardSetLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false}}>
            <Stack.Screen name='[flashcardSetId]'/>
            <Stack.Screen name='create'/>
        </Stack>
    )
}

export default FlashcardSetLayout