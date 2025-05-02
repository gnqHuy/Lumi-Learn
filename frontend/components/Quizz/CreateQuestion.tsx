import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import CreateAnswerOption from './CreateAnswerOption';
import { QuestionWithContent } from '@/types/question';
import { AntDesign } from '@expo/vector-icons';

interface Props {
    index: number;
    question: QuestionWithContent;
    hasError: boolean;
    onChange: (index: number, updated: QuestionWithContent, hasError: boolean) => void;
}

const CreateQuestion: React.FC<Props> = ({ index, question, hasError, onChange }) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isPressed, setIsPressed ] = useState(false);
    

    const handleQuestionContentChange = (text: string) => {
        const updated = { ...question, content: text };
        const hasError = !text.trim() || !updated.answerOptions.some(opt => opt.isCorrect);
        onChange(index, updated, hasError);
    };

    const handleOptionChange = (optionIndex: number, content: string, isCorrect: boolean) => {
        const updatedOptions = [...question.answerOptions];
        updatedOptions[optionIndex] = { content, isCorrect };
        const updatedQuestion = { ...question, answerOptions: updatedOptions };

        const hasError = !updatedQuestion.content.trim() || !updatedOptions.some(opt => opt.isCorrect);
        onChange(index, updatedQuestion, hasError);
    };

    return (
        <View className="px-4 w-full bg-gray-50 rounded-xl border">
            <Pressable
                id="quiz-top"
                className="flex-row items-center justify-between w-full h-14"
                onPress={() => setIsOpen(!isOpen)}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
            >
                <Text
                    id="quiz-title"
                    className={`font-semibold ${hasError ? 'text-red-500' : ''}`}
                >
                    Question {index + 1}
                </Text>
                {isOpen ? (
                    <AntDesign name="up" size={18} color={hasError ? 'red' : 'black'}/>
                ) : (
                    <AntDesign name="down" size={18} color={hasError ? 'red' : 'black'}/>
                )}
            </Pressable>
            {isOpen ? 
            <View
                id='quiz-content'
                className='flex-col gap-2 px-2 w-full pb-6'
            >
                <View
                    id='question-title'
                    className='flex-col gap-2'
                >
                    <Text className={`text-sm text-gray-500 font-semibold`}>Question title</Text>
                    <TextInput
                        placeholder={`Type your question here`}
                        placeholderTextColor={"#9CA3AF"}
                        value={question.content}
                        onChangeText={handleQuestionContentChange}
                        style={{ textAlignVertical: 'center' }}
                        className="text-lg leading-5 p-3 border-b border-gray-400 mb-4"
                    />
                </View>
                <Text className={`text-sm text-gray-500 font-semibold`}>Answer options</Text>
                <View
                    id='answer-options'
                    className='flex-col gap-3 w-full'
                >
                    {question.answerOptions.map((opt, i) => (
                        <CreateAnswerOption
                            key={i}
                            index={i}
                            content={opt.content}
                            isCorrect={opt.isCorrect}
                            onChange={(content, isCorrect) => handleOptionChange(i, content, isCorrect)}
                        />
                    ))}
                </View>
            </View>
            : <></>}
        </View>
    );
};

export default CreateQuestion;
