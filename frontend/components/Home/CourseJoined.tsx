import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'


interface CourseJoinedProps {
    dummyDataCourses: Course[],
    images: Record<string, any>
}

type Course = {
    courseName: string;
    urlKey: string;
}


const CourseJoined = ({dummyDataCourses, images}: CourseJoinedProps) => {
  return (
    <View className = "">
        {/* title */}
        <View className = "relative left-[5%] mt-[2rem]">
            <Text className = "text-xl font-bold">Courses you've joined</Text> 
        </View>

        {/* courses */}
        <ScrollView 
            className = "relative left-[5%] mt-[1rem]" 
            horizontal={true} showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingRight: 32 }}
        >
            <View className = "flex-row gap-4">
            {dummyDataCourses.map((course, index) => {
                return (
                    <View className = "w-[12rem] border-solid border-gray-300 border-[1px] rounded-lg h-[8rem]" key = {index}>
                        <Image source={images[course.urlKey]} className = "w-[90%] relative left-[5%] h-[65%] top-[8%] rounded-lg" />
                        <Text className = "relative left-[6%] top-[12%] font-bold">{course.courseName}</Text>
                    </View>
                )
            })} 
            </View>
        </ScrollView>
    </View>
  )
}

export default CourseJoined
