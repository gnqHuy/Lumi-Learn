import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import useCourseStore from '@/zustand/courseStore'
import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons'

export type CourseItemProps = {
    id: string,
    imgUrl: string | undefined,
    courseName: string,
    instructorName: string,
    timestamp: Date,
    rating: number,
    numberOfRatings: number,
    numberOfLessons: number,
    isUserEnrolled: boolean, 
    topic: string
}

const CourseItem = (props: CourseItemProps) => {
    const [ isPressed, setIsPressed ] = useState(false);
    const router = useRouter();

    // zustand for course
    const setSelectedCourseId = useCourseStore((state) => state.setSelectedCourseId);
    return (
        <Pressable
            id='course-item-container'
            className={`w-[90%] flex-row justify-center p-2 border-2 border-gray-100 rounded-2xl ${isPressed ? 'bg-slate-100' : 'bg-white'}`}
            // style = {{boxShadow: "0px 4px 10px 1px rgba(53, 53, 53, 0.12)"}}
            onPress={() => {
                setSelectedCourseId(props.id);
                props.isUserEnrolled === true ? router.push(`/(tabs)/courses/${props.id}`) : router.push('/(other)/CoursePreview');
            }}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            <View
                id='course-item-content'
                className='w-full flex-row gap-5'
            >
                {/* Replace with real thumbnail image later */}
                <Image
                  src={props.imgUrl}  
                  width={90}
                  height={90}
                  borderRadius={8}
                />

                <View
                    id='course-overview'
                    className='flex-1 flex-col gap-3'
                >
                    <View className='flex-row items-center gap-2 justify-between pr-2'>
                        <Text
                            id='course-name'
                            className='text-gray-600 font-bold text-lg'
                        >
                            {props.courseName}
                        </Text>
                        <View className='flex-row items-center'>
                            <Text className='text-sm text-gray-400 mr-2'>
                                {props.rating}
                            </Text>
                            <AntDesign name='star' size={18} color={'#facc15'}/>
                            <Text className='text-sm text-gray-400 ml-1'>
                                {`(${props.numberOfRatings})`}
                            </Text>
                        </View>
                    </View>
                    <View className='flex-row gap-2 items-center ml-1'>
                        <Image 
                            source={require("../../assets/images/userAvatarTest.png")}
                            className = "w-5 h-5"    
                        />
                        <Text
                            id='instructor-name'
                            className='text-gray-500 text-sm font-medium'
                        >{props.instructorName}</Text>
                    </View>
                    <View className='flex-row gap-3 items-center ml-1'>
                        <Text
                            id='instructor-name'
                            className='text-gray-400 text-sm font-medium'
                        >{props.numberOfLessons} Lessons</Text>
                        <View className='px-3 py-1 self-start opacity-80 bg-slate-200 rounded-full'>
                            <Text className='text-cyan-600 text-sm font-semibold'>
                                {props.topic}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default CourseItem