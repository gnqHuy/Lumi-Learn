import { View, Text, Pressable, ScrollView, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { LessonOverview } from '@/types/lesson';
import MyCourseScreen from '@/app/(tabs)/courses';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useAuthStore from '@/zustand/authStore';
import { S3_URL_PREFIX } from '@/const/AmazonS3';
import { Entypo } from '@expo/vector-icons';

export type LessonItemProps = {
    lesson: LessonOverview,
    lessonNumber: number,
};

const LessonItem = ({ lesson, lessonNumber }: LessonItemProps) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isPressed, setIsPressed ] = useState(false);
    const [ hasContent, setHasContent ] = useState(true);
    const { courseId } = useLocalSearchParams();
    const user = useAuthStore((state) => state.authState?.user);
    const router = useRouter();

    const isTeacher = () => {
        return user?.role == "Teacher";
    }

    const handleExtendItem = () => {
        setIsOpen(!isOpen);
        if (lesson.flashcardSets.length == 0 && lesson.quizzes.length == 0) {
            setHasContent(false);
        }
    }

    const trim = (str: string, maxLength: number) => {
        if (str.length < maxLength) return str;
        return str.substring(0, maxLength - 3) + '...';
    }

    return (
        <View
            id="lesson-item"
            className={`flex-col px-3 w-[98%] ${isPressed ? 'bg-slate-200' : 'bg-slate-100'} rounded-xl`}
            style = {{boxShadow: "0px 4px 6px rgba(0,0,0,0.08)"}}
        >
            <Pressable
                id="lesson-top"
                className="flex-row items-center justify-between w-full h-14"
                onPress={() => handleExtendItem()}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
            >
                <View className='flex-row gap-2'>
                    <Text
                        id="lesson"
                        className="font-bold text-yellow-600"
                    >
                        Lesson {lessonNumber}:
                    </Text>
                    <Text
                        id="lesson-name"
                        className="font-semibold text-cyan-700"
                    >
                        {lesson.title}
                    </Text>
                </View>
                {isOpen ? (
                    <Entypo name="chevron-up" size={18} color={'#0e7490'}/>
                ) : (
                    <Entypo name="chevron-down" size={18} color={'#0e7490'} />
                )}
            </Pressable>
            <View
                id='lesson-content'
                className='flex-col gap-3 items-center w-full'
            >
                {(isOpen && hasContent) && (
                <View 
                    id='student-content'
                    className='w-full flex-col gap-3 pb-4'
                >
                    <ScrollView
                        id='flashcard-set-scroll-view'
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        className='relative w-full'
                    >
                        <View
                            id='flashcard-sets'
                            className='flex-col gap-3 px-2'
                        >
                            {[lesson.flashcardSets.map((flashcardSet, index) => (
                                <TouchableHighlight
                                    id='flashcard-set'
                                    key={index}
                                    className='w-full px-3 py-4 rounded-lg bg-white'
                                    onPress={() => router.push(`/(tabs)/courses/${courseId}/flashcardset/${flashcardSet.id}`)}
                                    underlayColor={'rgba(0,0,0,0.08)'}
                                >
                                    <View className='flex-row gap-2 items-center'>
                                        <AntDesign name='filetext1' size={22} color={'#0e7490'}></AntDesign>
                                        <Text id='flashcard-set-title' className='text-base'>
                                            {trim(`Flashcard set ${index + 1}: ${flashcardSet.title}`, 36)}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            ))]}
                        </View>
                    </ScrollView>

                    <ScrollView
                        id='quizzes-scroll-view'
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        className='relative w-full'
                    >
                        <View
                            id='quizzes'
                            className='flex-col gap-3 px-2'
                        >
                            {[lesson.quizzes.map((quiz, index) => (
                                <TouchableHighlight
                                    id='quiz'
                                    key={index}
                                    className='w-full px-3 py-4 rounded-lg bg-white'
                                    onPress={() => router.push(`/(tabs)/courses/${courseId}/quiz/${quiz.id}`)}
                                    underlayColor={'rgba(0,0,0,0.08)'}
                                >
                                    <View className='flex-row gap-2 items-center'>
                                        <AntDesign name='barschart' size={22} color={'#ca8a04'}></AntDesign>
                                        <Text id='quiz-title' className='text-base'>
                                            {trim(`Quiz ${index + 1}: ${quiz.title}`, 36)}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            ))]}
                        </View>
                    </ScrollView>
                </View>)}
                {isTeacher() && isOpen ? 
                <ScrollView
                    id='buttons-scroll-view'
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    className='w-full pb-4'
                >
                    <View
                        id='buttons'
                        className='flex-col gap-3 px-2'
                    >
                        <TouchableHighlight
                            id='create-flashcard-set-button'
                            className='w-full px-3 py-4 rounded-lg bg-gray-400'
                            onPress={() => router.push({
                                pathname: `/(tabs)/courses/${courseId}/flashcardset/create`,
                                params: { lessonId: lesson.id }
                            })}
                            underlayColor={'rgba(0,0,0,0.2)'}
                        >
                            <View className='flex-row justify-center items-center'>
                                <Text className='text-base font-semibold text-white'>
                                    Create flashcard set
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            id='create-quiz-button'
                            className='w-full px-3 py-4 rounded-lg bg-gray-400'
                            onPress={() => router.push({
                                pathname: `/(tabs)/courses/${courseId}/quiz/create`,
                                params: { lessonId: lesson.id }
                            })}
                            underlayColor={'rgba(0,0,0,0.2)'}
                        >
                            <View className='flex-row justify-center items-center'>
                                <Text className='text-base font-semibold text-white'>
                                    Create quiz
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                : <></>}
            </View>
        </View>
    )
}

export default LessonItem