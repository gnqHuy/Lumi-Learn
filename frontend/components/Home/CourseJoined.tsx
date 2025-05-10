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
            <Text className = "text-lg text-cyan-800 font-bold">Courses you've joined</Text> 
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
                        className = "p-2 border-solid rounded-xl bg-slate-100" 
                        // style = {{boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"}}
                        key = {index} 
                        onPress = {() => {
                            router.push(`/(tabs)/courses/${course.id}`)}
                        }
                        activeOpacity={0.6}
                    >
                        {/* fake thumbnail */}
                        <View className='flex-col gap-3'>
                            <Image
                                src={course.imgUrl}
                                width={140}
                                height={95}
                                borderRadius={8}
                            />
                            <Text className = "ml-1 font-semibold text-gray-600">
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
