import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import CourseItem, { CourseItemProps } from './CourseItem'

export type CourseListProps = {
    courses: CourseItemProps[],
};

const CourseList = ({ courses }: CourseListProps) => {
    return (
        <View
            id='course-screen'
            className='flex-1 items-center pt-10'
        >
            <ScrollView
                id='course-list-container'
                horizontal={false}
                showsVerticalScrollIndicator = {false}
                className=' relative w-full'
            >
                <View
                    id='course-list'
                    className='w-full flex flex-col items-center gap-5'
                >
                    {courses.map((course, index) => (
                        <CourseItem {...course} key={course.id}/>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default CourseList