import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import useCourseStore from '@/zustand/courseStore'
import { Feather, FontAwesome6 } from '@expo/vector-icons'

export type CourseItemProps = {
    id: string,
    imgUrl: string | undefined,
    courseName: string,
    instructorName: string,
    timestamp: Date,
    rating: number,
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
            className={`w-[98%] flex-row justify-center p-3 rounded-xl ${isPressed ? 'bg-slate-100' : 'bg-slate-50'}`}
            style = {{boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"}}
            onPress={() => {
                setSelectedCourseId(props.id);
                props.isUserEnrolled === true ? router.push(`/(tabs)/courses/${props.id}`) : router.push('/(other)/CoursePreview');
            }}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            <View
                id='course-item-content'
                className='w-full flex-row gap-5 items-center'
            >
                {/* Replace with real thumbnail image later */}
                <Image
                  src={props.imgUrl}  
                  width={80}
                  height={80}
                  borderRadius={8}
                />

                <View
                    id='course-overview'
                    className='w-full h-20 flex-col'
                >
                    <Text
                        id='course-name'
                        className='text-cyan-800 font-semibold text-lg'
                    >{props.courseName}</Text>
                    <View className='flex-row gap-2 items-center ml-1'>
                        <FontAwesome6 name='user' size={10} color={"#ca8a04"} style={{ fontWeight: 'bold'}}/>
                        <Text
                            id='instructor-name'
                            className='text-yellow-600 text-sm font-medium'
                        >{props.instructorName}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default CourseItem