import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';

type FlashcardProps = {
    index: number;
    term: string;
    definition: string;
    hasError: boolean;
    onChange: (index: number, field: 'term' | 'definition', value: string) => void;
};

const CreateFlashcard = ({ index, term, definition, hasError, onChange }: FlashcardProps) => {
    const [ isPressed, setIsPressed ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);
    return (
        <View
            id="flashcard-item"
            className={`flex-col px-3 w-full rounded-xl 
                ${isPressed ? 'bg-slate-100 ' : 'bg-gray-50 '}
                ${hasError ? 'border border-red-500' : ''}`}
            style = {{boxShadow: hasError ? "0px 2px 8px rgba(255,0,0,0.5)" : "0px 2px 8px rgba(0,0,0,0.15)"}}
        >
            <Pressable
                id="flashcard-top"
                className="flex-row items-center justify-between w-full h-14"
                onPress={() => setIsOpen(!isOpen)}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
            >
                <Text
                    id="lesson-title"
                    className={`font-semibold ${hasError ? 'text-red-500' : ''}`}
                >
                    Flashcard {index + 1}
                </Text>
                {isOpen ? (
                    <AntDesign name="up" size={18} color={hasError ? 'red' : 'black'}/>
                ) : (
                    <AntDesign name="down" size={18} color={hasError ? 'red' : 'black'}/>
                )}
            </Pressable>
            {isOpen ? 
            <View
                id='flashcard-content'
                className='flex-col gap-4 px-2 w-full pb-6'
            >
                <View
                    id='term-input'
                    className='flex-col gap-2'
                >
                    <Text className={`text-sm ${(!term.trim() && hasError) ? 'text-red-500' : 'text-gray-500'} font-semibold`}>Term</Text>
                    <TextInput
                        placeholder="Term"
                        placeholderTextColor={"#9CA3AF"}
                        value={term}
                        onChangeText={(text) => onChange(index, 'term', text)}
                        className={`border ${(!term.trim() && hasError) ? 'border-red-400' : 'border-gray-500'} p-4 rounded-lg`}
                        style={{ textAlignVertical: 'center' }}
                    />
                    {(!term.trim() && hasError) ?
                    <Text className="text-sm text-red-500 font-semibold"> * Please enter a term</Text>
                    : <></>
                    }
                </View>
                <View
                    id='definition-input'
                    className='flex-col gap-2'
                >
                    <Text className={`text-sm ${(!definition.trim() && hasError) ? 'text-red-500' : 'text-gray-500'} font-semibold`}>Definition</Text>
                    <TextInput
                        placeholder="Explanation"
                        placeholderTextColor={"#9CA3AF"}
                        value={definition}
                        onChangeText={(text) => onChange(index, 'definition', text)}
                        className={`border ${(!definition.trim() && hasError) ? 'border-red-400' : 'border-gray-500'} p-4 rounded-lg`}
                        style={{ textAlignVertical: 'center' }}
                    />
                    {(!definition.trim() && hasError) ?
                    <Text className="text-sm text-red-500 font-semibold"> * Please enter the definition</Text>
                    : <></>
                    }
                </View>
            </View>
            : <></>}
        </View>
    );
};

export default CreateFlashcard;
