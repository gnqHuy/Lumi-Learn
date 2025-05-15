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
import { AccessibilityInfo, findNodeHandle, InteractionManager } from 'react-native';
import { useRef } from 'react';

const QuizPage = () => {
    const { quizId, courseId } = useLocalSearchParams();
    const [ quizDetail, setQuizDetail ] = useState<QuizDetailDto>();
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ selectedOptions, setSelectedOptions ] = useState<Record<string, string | null>>({});
    const [ quizSubmission, setQuizSubmission ] = useState<QuizSubmissionDto>({
        userId: useAuthStore((state) => state.authState)?.user?.id!,
        quizId: quizId as string,
        answers: []
    });
    const [ showQuizResult, setShowQuizResult ] = useState(false);
    const [quizResult, setQuizResult] = useState<QuizResult | undefined>(undefined);
    const [suppressAccessibility, setSuppressAccessibility] = useState(false);
    const router = useRouter();

    const currentQuestion = quizDetail?.questions[currentIndex];

    const currentQuestionRef = useRef(null);

    useEffect(() => {
        const node = findNodeHandle(currentQuestionRef.current);
        if (node) {
            AccessibilityInfo.setAccessibilityFocus(node);
        }
    }, [currentIndex]);

    useEffect(() => {
        console.log(courseId);
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

    const isCurrentQuestionAnswered = () => {
        const questionId = currentQuestion?.id;
        return questionId ? selectedOptions[questionId] !== undefined : false;
    };

    const next = () => {
        if (!isCurrentQuestionAnswered()) return;
        if (currentIndex < quizDetail?.questions.length! - 1) {
            setSuppressAccessibility(true);
            setCurrentIndex(currentIndex + 1);

            setTimeout(() => {
                setSuppressAccessibility(false);
            }, 100);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setSuppressAccessibility(true);
            setCurrentIndex(currentIndex - 1);

            setTimeout(() => {
                setSuppressAccessibility(false);
            }, 100);
        }
    };

    const userHasCompletedQuiz = () => {
        const totalQuestions = quizDetail?.questions.length ?? 0;
        const selectedCount = Object.keys(selectedOptions).length;

        return selectedCount === totalQuestions;
    };

    const submitQuiz = () => {
        SubmitQuiz(quizSubmission).then((res) => {
            setShowQuizResult(true);
            setQuizResult(res.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }


    return (
        <View 
            id='quiz-screen'
            className="flex-1 flex-col items-center bg-white px-6">
        
        {showQuizResult == true 
        ? 
        <View className='absolute h-screen w-screen z-100'>
            <QuizResultScreen quizTitle={quizDetail?.title!} quizResult={quizResult!}/>
        </View>
        : <>{quizDetail && currentQuestion ? (
            <>
            <View className="mt-14 px-4 mb-4 w-full flex-row relative items-center justify-center h-16 ">
                <View className="absolute left-8 right-8 top-1 text-center items-center">
                    <Text
                        className="text-[20px] font-semibold text-cyan-800 text-center p-3"
                        accessible={true}
                        accessibilityLabel={`Quiz: ${quizDetail.title}`}
                        numberOfLines={1}
                    >
                        {quizDetail.title}
                    </Text>
                    <Text
                        className="text-sm text-gray-500 mt-1"
                        accessible={false}
                    >
                        Question {currentIndex + 1}/{quizDetail.questions.length}
                    </Text>
                </View>

                {/* Nút quay lại */}
                <Pressable
                    className="absolute left-0 top-1 z-10 p-3"
                    accessible={true}
                    accessibilityLabel="Back button. Double tap to go back to course detail"
                    onPress={() => router.back()}
                >
                    <AntDesign name="arrowleft" size={24} />
                </Pressable>
            </View>


    
            <View
                ref={currentQuestionRef}
                accessible={true}
                accessibilityLabel={`Question ${currentIndex + 1} of ${quizDetail.questions.length}.
                 ${currentQuestion.content}. Choose the answer below`}
                className="flex items-center justify-center p-2 w-full h-1/4 border-2 border-zinc-300 rounded-xl my-4"
            >
                <Text className="text-lg text-center font-semibold">
                    {currentQuestion.content}
                </Text>
            </View>
    
            <Text className="text-sm font-semibold text-gray-500 mb-4"
                accessible={false}
            >
                Choose the answer
            </Text>
    
            <AnswerOptionGroup
                options={currentQuestion.answerOptions}
                selectedOptionId={selectedOptions[currentQuestion?.id || ''] || null}
                onSelect={handleSelect}
            />
    
            <View className="flex-row w-full justify-between mt-6">
                <TouchableOpacity 
                    onPress={prev}
                    disabled={currentIndex === 0}
                    className={`flex-row gap-2 items-center bg-cyan-700 pl-3 pr-8 py-3 rounded-xl ${currentIndex === 0 ? 'opacity-50' : ''}`}
                    activeOpacity={0.55}
                    accessibilityLabel={`${suppressAccessibility ? `Pressed Prev` : 'Return to previous question'}`}
                    accessibilityRole='button'
                >
                    <Entypo name='chevron-left' size={14} color={'white'}/>
                    <Text className="text-white font-semibold text-base">Prev</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={next}
                    disabled={!isCurrentQuestionAnswered() || currentIndex === quizDetail?.questions.length! - 1}
                    className={`flex-row gap-2 items-center bg-cyan-700 pl-8 pr-3 py-3 rounded-xl ${!isCurrentQuestionAnswered() || currentIndex === quizDetail?.questions.length! - 1 ? 'opacity-50' : ''}`}
                    activeOpacity={0.55}
                    accessibilityLabel={`${suppressAccessibility ? `Pressed Next` : 'Move to next question'}`}
                    accessibilityRole='button'
                >
                    <Text 
                        className="text-white font-semibold text-base"
                        accessible={false}
                    >
                        Next</Text>
                    <Entypo name='chevron-right' size={14} color={'white'}/>
                </TouchableOpacity>
            </View>
            {userHasCompletedQuiz() ? 
            <TouchableOpacity
                id='submit-button'
                className='absolute bottom-4 flex justify-center items-center w-full py-4 bg-cyan-700 rounded-xl'
                onPress={() => submitQuiz()}
                activeOpacity={0.55}
                accessibilityLabel='Submiz quiz'
                accessibilityRole='button'
            >
                <Text className='text-lg text-white font-semibold'>Submit quiz</Text>
            </TouchableOpacity>
            : <></>}
            </>
        ) : (
            <Text className="text-center mt-10"accessible={false}>
                Loading quiz...
            </Text>
        )}</>
        }
        </View>
    );
}

export default QuizPage;