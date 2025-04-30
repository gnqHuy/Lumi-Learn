import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

const QuizLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false}}>
            <Stack.Screen name='[quizId]'/>
            <Stack.Screen name='result'/>
        </Stack>
    )
}

export default QuizLayout;