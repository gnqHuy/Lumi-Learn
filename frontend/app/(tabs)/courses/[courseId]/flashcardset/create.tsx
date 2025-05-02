import { View, Text, Pressable } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from 'expo-router'

const CreateFlashcardSetScreen = () => {
    const router = useRouter();
    return (
        <View
            id='create-flashcard-set-screen'
            className='flex-col flex-1 items-center px-6 bg-orange-300'
        >
            <View 
                id="top-nav"
                className="flex-row mt-14 mb-4 items-center px-2 w-full"
            >
                <Pressable className="z-10" onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={24} />
                </Pressable>
                <View className="absolute left-0 right-0 items-center">
                    <Text className="w-2/3 text-center text-xl font-semibold">
                        Create flashcard set
                    </Text>
                </View>
            </View>
            <Text className='text-5xl font-bold text-blue-300'>Test</Text>
        </View>
    )
}

export default CreateFlashcardSetScreen