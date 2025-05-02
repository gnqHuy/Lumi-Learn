import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'

export type CourseItemProps = {
    id: string,
    imgUrl: string | null | undefined,
    courseName: string,
    instructorName: string,
}

const CourseItem = (props: CourseItemProps) => {
    const [ isPressed, setIsPressed ] = useState(false);
    const router = useRouter();
    return (
        <Pressable
            id='course-item-container'
            className={`w-full flex-row justify-center p-3 rounded-xl ${isPressed ? 'bg-slate-100' : 'bg-gray-50'}`}
            style = {{boxShadow: "0px 2px 8px rgba(0,0,0,0.15)"}}
            onPress={() => {
                router.push(`/(tabs)/courses/${props.id}`);
            }}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            <View
                id='course-item-content'
                className='w-full flex-row gap-5 items-center'
            >
                {/* Replace with real thumbnail image later */}
                <View
                    id='course-thumbnail'
                    className='w-20 h-20 bg-white rounded-lg'
                >
                </View>

                <View
                    id='course-overview'
                    className='w-full h-20 flex-col gap-1'
                >
                    <Text
                        id='course-name'
                        className='color-gray-700 font-semibold text-lg'
                    >{props.courseName}</Text>
                    <Text
                        id='instructor-name'
                        className='color-gray-700 text-sm'
                    >{props.instructorName}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default CourseItem