import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getCourseOverview } from '@/api/courseApi';
import { CourseOverview } from '@/types/course';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import LessonItem from '@/components/Lesson/LessonItem';
import LessonList from '@/components/Lesson/LessonList';

const CourseOverviewPage = () => {
    const [ courseOverview, setCourseOverview ] = useState<CourseOverview | undefined>(undefined);
    const { id } = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        getCourseOverview(id as string).then((res) => {
            setCourseOverview(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [id])
    return (
        <View
            id='course-overview-screen'
            className='flex-1 flex-col items-center'
        >
            <View
                id='top-nav'
                className='flex-row pt-14 px-4 w-full'
            >
                <Pressable
                    onPress={() => { 
                        router.back();
                    }}
                >
                    <AntDesign name='arrowleft' size={24}/>
                </Pressable>
            </View>
            <View
                id='course-overview-section'
                className='flex-row gap-2 px-4 py-8 w-full'
            >
                <View
                    id='course-overview-info'
                    className='flex-col gap-3 w-3/4'
                >
                    <Text
                        id='course-name'
                        className='text-3xl font-bold'
                    >
                        {courseOverview?.title}
                    </Text>
                    <Text
                        id='course-description'
                        className='font-normal'
                    >
                        {courseOverview?.description}
                    </Text>
                </View>
                {/* Replace with course thumbnail later */}
                <View
                    id='course-thumbnail'
                    className='w-24 h-24 rounded-lg bg-white'
                >
                </View>
            </View>
            <View
                id='Lesson-list-section'
                className='flex-col gap-4 px-4 w-full flex-1'
            >
                <View id='lesson-list-title'>
                    <Text className='text-lg font-bold'>Lessons in this course</Text>
                </View>
                <LessonList lessons={courseOverview?.lessons}/>
            </View>
        </View>
    )
}

export default CourseOverviewPage