import { router } from 'expo-router'
import React from 'react'
import { Image, Pressable, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { CourseItemProps } from '../Course/CourseItem'
import { FontAwesome6 } from '@expo/vector-icons'


interface CourseJoinedProps {
    courseJoined: CourseItemProps[],
}


const CourseJoined = ({courseJoined}: CourseJoinedProps) => {
  return (
    <View className = "flex-col pl-[4%]">
        {/* title */}
        <View className = "">
            <Text className = "text-xl text-cyan-800 font-bold">Courses you've joined</Text> 
        </View>

        {/* courses */}
        <ScrollView 
            className = "" 
            horizontal={true} showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingRight: 32 }}
        >
            <View className = "flex-row gap-4 py-4">
            {courseJoined.map((course, index) => {
                return (
                    <TouchableOpacity 
                        className = "p-2 border-2 border-gray-100 rounded-3xl bg-white" 
                        key = {index} 
                        onPress = {() => {
                            router.push(`/(tabs)/courses/${course.id}`)}
                        }
                        activeOpacity={0.6}
                    >
                        {/* fake thumbnail */}
                        <View className='flex-col'>
                            <Image
                                src={course.imgUrl}
                                width={150}
                                height={105}
                                borderRadius={12}
                            />
                            <Text className = "ml-2 mt-3 mb-1 font-semibold text-gray-600">
                                {course.courseName?.length > 18 ? course.courseName.substring(0, 18) + "..." : course.courseName}
                            </Text>
                            <View className = "absolute left-0 top-20 opacity-90 ml-2 mt-2 px-2 py-1 rounded-full bg-slate-200 flex-row items-center gap-2 w-auto self-start">
                                <Text className = "text-gray-400 text-xs font-semibold">{course?.topic}</Text>
                            </View>
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
