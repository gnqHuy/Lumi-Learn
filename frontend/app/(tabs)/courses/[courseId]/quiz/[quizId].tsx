import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { QuizDetailDto } from '@/types/quizz'
import { GetQuizDetail } from '@/api/quizApi'
import AnswerOptionGroup from '@/components/Quizz/AnswerOptionGroup'
import AntDesign from '@expo/vector-icons/AntDesign'
import Entypo from '@expo/vector-icons/Entypo'
import { QuizResult, QuizSubmissionDto } from '@/types/quizResult'
import useAuthStore from '@/zustand/authStore'
import { SubmitQuiz } from '@/api/quizResultApi'
import QuizResultScreen from '@/components/Quizz/QuizResult'

const QuizPage = () => {
    const { quizId } = useLocalSearchParams();
    const [ quizDetail, setQuizDetail ] = useState<QuizDetailDto>();
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ selectedOptions, setSelectedOptions ] = useState<Record<string, string | null>>({});
    const [ quizSubmission, setQuizSubmission ] = useState<QuizSubmissionDto>({
        userId: useAuthStore((state) => state.authState)?.user?.id!,
        quizId: quizId as string,
        answers: []
    });
    const [ showQuizResult, setShowQuizResult ] = useState(false);
    const [ quizResult, setQuizResult ] = useState<QuizResult | undefined>(undefined);
    const router = useRouter();

    const currentQuestion = quizDetail?.questions[currentIndex];

    useEffect(() => {
        GetQuizDetail(quizId as string).then((res) => {
            setQuizDetail(res.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [quizId]);

    const handleSelect = (optionId: string) => {
        const questionId = currentQuestion?.id;
        if (questionId) {
            setSelectedOptions((prev) => ({
                ...prev,
                [questionId]: optionId,
            }));

            setQuizSubmission((prev) => {
                const existingAnswers = [...prev.answers];
                const index = existingAnswers.findIndex(a => a.questionId == questionId);

                if (index != -1) {
                    existingAnswers[index].selectedAnswerId = optionId;
                } else {
                    existingAnswers.push({
                        questionId: questionId,
                        selectedAnswerId: optionId
                    });
                }

                return {
                    ...prev,
                    answers: existingAnswers
                };
            });
        }
    };

    const next = () => {
        if (currentIndex < quizDetail?.questions.length! - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const userHasCompletedQuiz = () => {
        const totalQuestions = quizDetail?.questions.length ?? 0;
        const selectedCount = Object.keys(selectedOptions).length;

        return selectedCount === totalQuestions;
    };

    const submitQuiz = () => {
        SubmitQuiz(quizSubmission).then((res) => {
            console.log(res.data);
            setShowQuizResult(true);
            setQuizResult(res.data);
        }).catch((err) => {
            console.log(quizSubmission);
            console.log(err.message);
        })
    }

    return (
        <View 
            id='quiz-screen'
            className="flex-1 flex-col items-center bg-white px-6 py-4">
        {quizDetail && currentQuestion ? (
            <>
            <View
                id='top-nav'
                className='flex-row mt-14 px-2 w-full'
            >
                <Pressable
                    onPress={() => { 
                        router.back();
                    }}
                >
                    <AntDesign name='arrowleft' size={24}/>
                </Pressable>
                <Text className="absolute left-0 right-0 text-center text-xl font-semibold">Quiz: {quizDetail.title}</Text>
            </View>
            <Text 
                id='quiz-length'
                className="text-sm text-gray-500 mb-4"
            >
                Question {currentIndex + 1}/{quizDetail.questions.length}
            </Text>
    
            <View 
                id='question-content'
                className="flex items-center justify-center p-2 w-full h-1/4 border border-gray-300 rounded-xl mb-4"
            >
                <Text className="text-lg font-semibold">{currentQuestion.content}</Text>
            </View>
    
            <Text className="text-sm text-gray-500 mb-2">Choose the answer</Text>
    
            <AnswerOptionGroup
                options={currentQuestion.answerOptions}
                selectedOptionId={selectedOptions[currentQuestion?.id || ''] || null}
                onSelect={handleSelect}
            />
    
            <View className="flex-row w-full justify-between mt-6">
                <TouchableOpacity onPress={prev} className="flex-row gap-2 items-center bg-gray-400 pl-3 pr-8 py-3 rounded-xl">
                    <Entypo name='chevron-left' size={14} color={'white'}/>
                    <Text className="text-white font-semibold text-base">Prev</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={next} className="flex-row gap-2 items-center bg-gray-400 pl-8 pr-3 py-3 rounded-xl">
                    <Text className="text-white font-semibold text-base">Next</Text>
                    <Entypo name='chevron-right' size={14} color={'white'}/>
                </TouchableOpacity>
            </View>
            {userHasCompletedQuiz() ? 
            <TouchableOpacity
                id='submit-button'
                className='mt-16 flex justify-center items-center w-full py-4 bg-gray-400 rounded-xl'
                onPress={() => submitQuiz()}
            >
                <Text className='text-lg text-white font-semibold'>Submit quiz</Text>
            </TouchableOpacity>
            : <></>}
            </>
        ) : (
            <Text className="text-center mt-10">Loading quiz...</Text>
        )}
        {showQuizResult == true ? 
        <View className='absolute h-screen w-screen z-100'>
            <QuizResultScreen quizTitle={quizDetail?.title!} quizResult={quizResult!}/>
        </View>
        : <></>
        }
        </View>
    );
}

export default QuizPage;