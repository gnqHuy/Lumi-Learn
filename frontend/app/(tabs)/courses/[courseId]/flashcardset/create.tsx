import { View, Text, Pressable, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { CreateFlashcardRequest } from '@/types/flashcard'
import CreateFlashcard from '@/components/Flashcard/CreateFlashcard'
import { CreateFlashcardSetRequest } from "@/types/flashcardSet";
import { createFlashcardSet } from '@/api/flashcardSetApi'

const CreateFlashcardSetScreen = () => {
    const [ flashcards, setFlashcards ] = useState<CreateFlashcardRequest[]>([]);
    const [ validationErrors, setValidationErrors ] = useState<boolean[]>([]);
    const [ title, setTitle ] = useState('');
    const [ titleError, setTitleError ] = useState(false);
    const { lessonId, courseId } = useLocalSearchParams();
    const router = useRouter();

    const handleAddFlashcard = () => {
        setFlashcards([...flashcards, { term: '', definition: '' }]);
        setValidationErrors([...validationErrors, true]);
    };
    
    const handleFlashcardChange = (index: number, field: 'term' | 'definition', value: string) => {
        const updated = [...flashcards];
        updated[index][field] = value;
        setFlashcards(updated);

        if (flashcards[index].term.trim() && flashcards[index].definition.trim()) {
            const updatedErrors = [...validationErrors];
            updatedErrors[index] = false;
            setValidationErrors(updatedErrors);
        } else {
            const updatedErrors = [...validationErrors];
            updatedErrors[index] = true;
            setValidationErrors(updatedErrors);
        }
    };

    const handleCreateFlashcardSet = () => {
        const hasError = validationErrors.some(e => e);
        const isTitleEmpty = !title.trim();

        setTitleError(isTitleEmpty);

        if (hasError || isTitleEmpty) return;

        const request: CreateFlashcardSetRequest = {
            lessonId: lessonId as string,
            title: title,
            flashcards: flashcards
        }

        createFlashcardSet(request).then((res) => {
            router.push(`/(tabs)/courses/${courseId}`);
        }).catch((err) => {
            console.log(err.message);
        })
       
        console.log("All flashcards valid. Proceed with creation.");
    };

    return (
        <View
            id='create-flashcard-set-screen'
            className='flex-col flex-1 items-center gap-4 px-6 py-2'
        >
            <View 
                id="top-nav"
                className="flex-row mt-14 mb-4 items-center w-full"
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
            <View
                id='title-input' 
                className='w-full'   
            >
                <Text className={`text-sm ${titleError ? 'text-red-500' : 'text-gray-600'}`}>Flashcard set title</Text>
                <TextInput
                    placeholder="Enter the flashcard set title"
                    placeholderTextColor={"#9CA3AF"}
                    value={title}
                    onChangeText={(text) => {
                        setTitle(text);
                        setTitleError(false);
                    }}
                    className={`border-b-2 ${titleError ? 'border-red-500' : 'border-gray-500'} p-4 rounded mb-2 text-2xl font-semibold`}
                    style={{ textAlignVertical: 'center' }}
                />
                {titleError ? 
                <Text className={`text-sm text-red-500`}> * Please enter flashcard set title</Text>
                : <></>
                }
            </View>
            <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                className='w-full'
            >
                <View
                    id='flashcard-list-container'
                    className='flex-col gap-3 pb-8 px-2 pt-2'
                >
                    {flashcards.map((flashcard, index) => (
                        <CreateFlashcard
                            key={index}
                            index={index}
                            term={flashcard.term}
                            definition={flashcard.definition}
                            hasError={validationErrors[index]}
                            onChange={handleFlashcardChange}
                        />
                    ))}
                    <TouchableOpacity
                        id='add-flashcard-button'
                        className='w-full p-4 bg-gray-200 border rounded-xl border-black items-center justify-center'
                        onPress={() => handleAddFlashcard()}
                        activeOpacity={0.55}
                    >
                        <Text className='text-lg text-black font-semibold'>Add flashcard</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <TouchableOpacity
                id='add-flashcard-set-button'
                className='bottom-4 z-10 flex justify-center items-center w-full py-4 bg-gray-500 rounded-xl'
                activeOpacity={0.55}
                onPress={() => handleCreateFlashcardSet()}
            >
                <Text className='text-lg text-white font-semibold'>Create flashcard set</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateFlashcardSetScreen