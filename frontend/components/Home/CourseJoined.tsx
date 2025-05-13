import { router } from 'expo-router'
import React from 'react'
import { Image, Pressable, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { CourseItemProps } from '../Course/CourseItem'
import { AntDesign, FontAwesome6 } from '@expo/vector-icons'
import useAuthStore from '@/zustand/authStore'
import { getCourseThumbnail } from '@/utils/image'


interface CourseJoinedProps {
    courseJoined: CourseItemProps[],
}


const CourseJoined = ({courseJoined}: CourseJoinedProps) => {
    const authState = useAuthStore.getState().authState;

    const isTeacherRole = () => {
        return authState?.user?.role == 'Teacher';
    };

    const trim = (str: string, maxLength: number) => {
        if (str.length < maxLength) return str;
        return str.substring(0, maxLength - 3) + '...';
    }

    return (
        <View className = "flex-col">
            {/* title */}
            <View className = "">
                <Text className = "pl-[4%] text-xl text-cyan-800 font-bold">
                    Courses you've {isTeacherRole() ? 'created' : 'joined'}
                </Text> 
            </View>

            {/* courses */}
            <ScrollView 
                className = "" 
                horizontal={true} showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ paddingRight: 32 }}
            >
                <View className = "flex-row gap-4 px-4 py-4">
                {courseJoined.map((course, index) => {
                    return (
                        <TouchableOpacity 
                            className = "p-2 rounded-3xl bg-white" 
                            style = {{boxShadow: "0px 4px 10px 1px rgba(53, 53, 53, 0.12)"}}
                            key = {index} 
                            onPress = {() => {
                                router.push(`/(tabs)/courses/${course.id}`)}
                            }
                            activeOpacity={0.6}
                        >
                            {/* fake thumbnail */}
                            <View className='flex-col gap-3'
                                accessible={true}
                                accessibilityLabel={`Course: ${course.courseName}, Topic: ${course.topic}, Instructor: ${course.instructorName}
                                ${course.numberOfLessons} Lessons, Rating: ${course.rating}/5, ${course.numberOfRatings} rate`}
                                accessibilityRole='button'
                                accessibilityHint='Double tab to open Course Details'
                            >
                                <Image
                                    source={course.imgUrl
                                        ? { uri: course.imgUrl }
                                        : require('../../assets/images/default-course.jpg')
                                    }
                                    className='w-[165px] h-[105px]'
                                    width={165}
                                    height={105}
                                    borderRadius={12}
                                />
                                <View className='px-2 flex-row items-center justify-between'>
                                    <Text className = "font-bold text-gray-600">
                                        {trim(course.courseName, 10)}
                                    </Text>
                                    <View 
                                        className='px-3 py-1 opacity-80 bg-slate-200 rounded-full'
                                    >
                                        <Text className='text-xs font-semibold text-cyan-600'>{course.topic}</Text>
                                    </View>
                                </View>
                                <View className='left-[5%] flex-row items-center gap-2'>
                                    <Image 
                                        source={require("../../assets/images/userAvatarTest.png")}
                                        className = "w-5 h-5"    
                                    />
                                    <Text className='text-sm text-gray-400'>
                                        {course.instructorName}
                                    </Text>
                                </View>
                                <View className='px-2 flex-row items-center justify-between mb-1'>
                                    <Text className='text-sm text-gray-400'>
                                        {course.numberOfLessons} Lessons
                                    </Text>
                                    <View className='flex-row items-center gap-1'>
                                        <Text className='text-sm text-gray-400'>
                                            {course.rating}
                                        </Text>
                                        <AntDesign name='star' size={16} color={'#facc15'}/>
                                        <Text className='text-sm text-gray-400'>
                                            {`(${course.numberOfRatings})`}
                                        </Text>
                                    </View>
                                </View>
                                {/* <View className = "absolute left-0 top-20 opacity-90 ml-2 mt-2 px-2 py-1 rounded-full bg-slate-200 flex-row items-center gap-2 w-auto self-start">
                                    <Text className = "text-gray-400 text-xs font-semibold">{course?.topic}</Text>
                                </View> */}
                            </View>
                        </TouchableOpacity>
                    )
                })} 
                </View>
            </ScrollView>
        </View>
    )
}

export default CourseJoined
