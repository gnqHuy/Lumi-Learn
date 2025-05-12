import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import CreateAnswerOption from './CreateAnswerOption';
import { QuestionWithContent } from '@/types/question';
import { AntDesign, Entypo } from '@expo/vector-icons';

interface Props {
    index: number;
    question: QuestionWithContent;
    titleError: boolean;
    answerOptionError: boolean;
    onChange: (index: number, updated: QuestionWithContent, titleError: boolean, answerOptionError: boolean) => void;
}

const CreateQuestion: React.FC<Props> = ({ index, question, titleError, answerOptionError, onChange }) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isPressed, setIsPressed ] = useState(false);
    

    const handleQuestionContentChange = (text: string) => {
        const updated = { ...question, content: text };
        const titleError = !text.trim();
        const answerOptionError = 
        !updated.answerOptions.some(opt => opt.isCorrect) || updated.answerOptions.some(opt => !opt.content.trim());
        onChange(index, updated, titleError, answerOptionError);
    };

    const handleOptionChange = (optionIndex: number, content: string, isCorrect: boolean) => {
        const updatedOptions = [...question.answerOptions];
        updatedOptions[optionIndex] = { content, isCorrect };
        if (isCorrect) {
            updatedOptions.forEach((option, index) => {
                if (index != optionIndex) {
                    option.isCorrect = false;
                }
            })
        }
        const updatedQuestion = { ...question, answerOptions: updatedOptions };

        const titleError = !updatedQuestion.content.trim();
        const answerOptionError = 
        !updatedOptions.some(opt => opt.isCorrect) || updatedOptions.some(opt => !opt.content.trim());
        onChange(index, updatedQuestion, titleError, answerOptionError);
    };

    return (
        <View className="px-4 w-full bg-gray-50 rounded-xl border border-gray-400">
            <Pressable
                id="quiz-top"
                className="flex-row items-center justify-between w-full h-14"
                onPress={() => setIsOpen(!isOpen)}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
            >
                <Text
                    id="question-title"
                    className={`font-semibold ${titleError || answerOptionError ? 'text-red-500' : 'text-gray-600'}`}
                >
                    Question {index + 1}
                </Text>
                {isOpen ? (
                    <Entypo name="chevron-up" size={20} color={titleError || answerOptionError ? 'red' : 'gray'}/>
                ) : (
                    <Entypo name="chevron-down" size={20} color={titleError || answerOptionError ? 'red' : 'gray'}/>
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
                    <Text className={`text-sm ${titleError ? 'text-red-500' : 'text-gray-500'} font-semibold`}>Question title</Text>
                    <TextInput
                        placeholder={`Type your question here`}
                        placeholderTextColor={"#9CA3AF"}
                        value={question.content}
                        onChangeText={handleQuestionContentChange}
                        style={{ textAlignVertical: 'center' }}
                        className="text-lg leading-5 p-3 border-b border-gray-400 mb-4"
                    />
                </View>
                <Text className={`text-sm ${answerOptionError ? 'text-red-500' : 'text-gray-500'} font-semibold`}>Answer options</Text>
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
