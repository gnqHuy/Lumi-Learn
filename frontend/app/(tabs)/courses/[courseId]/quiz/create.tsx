import { View, Text, Pressable, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { QuestionWithContent } from '@/types/question';
import { CreateQuizRequest } from '@/types/quizz';
import CreateQuestion from '@/components/Quizz/CreateQuestion';
import { createQuizWithContent } from '@/api/quizApi';

const CreateQuizScreen = () => {
    const [questions, setQuestions] = useState<QuestionWithContent[]>([]);
    const [ questionTitleErrors, setQuestionTitleErrors ] = useState<boolean[]>([]);
    const [ answerOptionErrors, setAnswerOptionErrors ] = useState<boolean[]>([]);
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);

    const { lessonId, courseId } = useLocalSearchParams();
    const router = useRouter();

    const handleAddQuestion = () => {
        setQuestions([...questions, {
            content: '',
            answerOptions: Array(4).fill({ content: '', isCorrect: false })
        }]);
        setQuestionTitleErrors([...questionTitleErrors, true]);
        setAnswerOptionErrors([...answerOptionErrors, true]);
    };

    const handleQuestionChange = (index: number, question: QuestionWithContent, titleError: boolean, answerOptionError: boolean) => {
        const updated = [...questions];
        updated[index] = question;
        setQuestions(updated);

        const titleErrors = [...questionTitleErrors];
        titleErrors[index] = titleError;
        setQuestionTitleErrors(titleErrors);

        const optionErrors = [...answerOptionErrors];
        optionErrors[index] = answerOptionError;
        setAnswerOptionErrors(optionErrors);
    };

    const handleCreateQuiz = () => {
        const hasError = questionTitleErrors.some(e => e) || answerOptionErrors.some(e => e);
        const isTitleEmpty = !title.trim();
        setTitleError(isTitleEmpty);

        if (hasError || isTitleEmpty) return;

        const request: CreateQuizRequest = {
            lessonId: lessonId as string,
            title: title,
            questions: questions
        };

        createQuizWithContent(request).then(() => {
            router.push(`/(tabs)/courses/${courseId}`);
        }).catch(err => {
            console.log(err.message);
        });
    };

    return (
        <View className='flex-col flex-1 items-center gap-4 px-6 py-2'>
            {/* Top nav */}
            <View className="flex-row mt-14 mb-4 items-center w-full">
                <Pressable className="z-10" onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={24} />
                </Pressable>
                <View className="absolute left-0 right-0 items-center">
                    <Text className="w-2/3 text-center text-xl font-semibold">
                        Create a new Quiz
                    </Text>
                </View>
            </View>

            <View className='w-full'>
                <Text className={`text-sm ${titleError ? 'text-red-500' : 'text-gray-600'}`}>Exam title</Text>
                <TextInput
                    placeholder="Enter your Exam title"
                    placeholderTextColor={"#9CA3AF"}
                    value={title}
                    onChangeText={(text) => {
                        setTitle(text);
                        setTitleError(false);
                    }}
                    className={`border-b-2 ${titleError ? 'border-red-500' : 'border-gray-400'} p-4 rounded mb-2 text-2xl font-semibold`}
                    style={{ textAlignVertical: 'center' }}
                />
                {titleError && <Text className='text-sm text-red-500'>* Please enter exam title</Text>}
            </View>

            <ScrollView 
                className='w-full' 
                showsVerticalScrollIndicator={false}>
                <View 
                    id='question-list-container'
                    className='flex-col gap-3 pb-8 px-2 pt-2'
                >
                    {questions.map((q, i) => (
                        <CreateQuestion
                            key={i}
                            index={i}
                            question={q}
                            titleError={questionTitleErrors[i]}
                            answerOptionError={answerOptionErrors[i]}
                            onChange={handleQuestionChange}
                        />
                    ))}

                    <TouchableOpacity
                        className='w-full p-4 bg-gray-200 border rounded-xl border-cyan-600 items-center justify-center'
                        onPress={handleAddQuestion}
                        activeOpacity={0.55}
                    >
                        <Text className='text-lg text-cyan-700 font-semibold'>Add question</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TouchableOpacity
                className='bottom-4 z-10 flex justify-center items-center w-full py-4 bg-cyan-700 rounded-xl'
                activeOpacity={0.55}
                onPress={handleCreateQuiz}
            >
                <Text className='text-lg text-white font-semibold'>Create quiz</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateQuizScreen;
