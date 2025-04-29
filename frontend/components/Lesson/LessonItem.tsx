import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { LessonOverview } from '@/types/lesson';
import index from '@/app/(tabs)/courses';

export type LessonItemProps = {
    lesson: LessonOverview,
    lessonNumber: number,
};

const LessonItem = ({ lesson, lessonNumber }: LessonItemProps) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isPressed, setIsPressed ] = useState(false);
    const [ hasContent, setHasContent ] = useState(true);

    const handleExtendItem = () => {
        setIsOpen(!isOpen);
        if (lesson.flashcardSets.length == 0 && lesson.quizzes.length == 0) {
            setHasContent(false);
        }
    }

    return (
        <View
            id="lesson-item"
            className={`flex-col px-3 w-full ${isPressed ? 'bg-slate-100' : 'bg-gray-50'} rounded-xl`}
            style = {{boxShadow: "0px 2px 8px rgba(0,0,0,0.15)"}}
        >
            <Pressable
                id="lesson-top"
                className="flex-row items-center justify-between w-full h-14"
                onPress={() => handleExtendItem()}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
            >
                <Text
                    id="lesson-title"
                    className="font-semibold"
                >
                    Lesson {lessonNumber}: {lesson.title}
                </Text>
                {isOpen ? (
                    <AntDesign name="up" size={18} />
                ) : (
                    <AntDesign name="down" size={18} />
                )}
            </Pressable>
            {(isOpen && hasContent) && (
            <View
                id='lesson-content'
                className='flex-col gap-3 pb-4 items-center w-full'
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
                            <View
                                id='flashcard-set'
                                key={index}
                                className='flex-row gap-2 w-full px-3 py-4 border border-gray-400 rounded-lg items-center bg-white'
                            >
                                <AntDesign name='filetext1' size={22}></AntDesign>
                                <Text id='flashcard-set-title' className='text-base'>
                                    Flashcard set {index + 1}: {flashcardSet.title}
                                </Text>
                            </View>
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
                            <View
                                id='quiz'
                                key={index}
                                className='flex-row gap-2 w-full px-3 py-4 border border-gray-400 rounded-lg items-center bg-white'
                            >
                                <AntDesign name='barschart' size={22}></AntDesign>
                                <Text id='quiz-title' className='text-base'>
                                    Quiz {index + 1}: {quiz.title}
                                </Text>
                            </View>
                        ))]}
                    </View>
                </ScrollView>
            </View>
            )}
        </View>
    )
}

export default LessonItem