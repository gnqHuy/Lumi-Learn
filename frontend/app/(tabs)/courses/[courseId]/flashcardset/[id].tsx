import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const FlashcardSetPage = () => {
    const { id } = useLocalSearchParams();
    return (
        <View className=' flex-1 items-center justify-center bg-orange-300'>
            <Text className='text-xl font-semibold text-blue-400'>
                {`Flashcard set id: ${id}`}
            </Text>
        </View>
    )
}

export default FlashcardSetPage;