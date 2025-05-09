import { router } from 'expo-router'
import React from 'react'
import { Image, Pressable, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { CourseItemProps } from '../Course/CourseItem'


interface CourseJoinedProps {
    courseJoined: CourseItemProps[],
}


const CourseJoined = ({courseJoined}: CourseJoinedProps) => {
  return (
    <View className = "flex-col gap-2 pl-[4%]">
        {/* title */}
        <View className = "">
            <Text className = "text-lg text-cyan-800 font-semibold">Courses you've joined</Text> 
        </View>

        {/* courses */}
        <ScrollView 
            className = "" 
            horizontal={true} showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingRight: 32 }}
        >
            <View className = "flex-row gap-4">
            {courseJoined.map((course, index) => {
                return (
                    <TouchableOpacity 
                        className = "p-2 border-solid border-gray-300 border-[1px] rounded-xl bg-zinc-50" 
                        key = {index} 
                        onPress = {() => {
                            router.push(`/(tabs)/courses/${course.id}`)}
                        }
                        activeOpacity={0.6}
                    >
                        {/* fake thumbnail */}
                        <View className='flex-col gap-2'>
                            <Image
                                src={course.imgUrl}
                                width={140}
                                height={95}
                                borderRadius={8}
                            />
                            <Text className = "ml-1 font-bold text-cyan-900">
                                {course.courseName?.length > 18 ? course.courseName.substring(0, 18) + "..." : course.courseName}
                            </Text>
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
