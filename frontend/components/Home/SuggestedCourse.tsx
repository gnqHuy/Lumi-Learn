import FontAwesome from '@expo/vector-icons/FontAwesome'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface SuggestedCourses {
    dummySuggestedCourses: Course[],
    images: Record<string, any>
}

type Course = {
    courseName: string;
    instructorName: string;
    urlKey: string;
}

const SuggestedCourse = ({dummySuggestedCourses, images}: SuggestedCourses) => {
  return (
    <View className = "mt-[3rem] h-full flex-1"> 
        {/* title */}
        <View className = "relative left-[5%]">
        <Text className = "text-xl font-bold">Choose your courses</Text>
        </View>
        {/* options filter */}
        <SafeAreaView className = "flex-row mt-[1rem] relative left-[5%] gap-3">
            {/* all */}
            <View className = "bg-gray-600 rounded-full border-solid border-[2px]">
                <Text className = "text-lg text-white px-[1rem] py-[0.3rem]">All</Text>
            </View>
            {/* new */}
            <View className = "rounded-full border-solid border-[2px]">
                <Text className = "text-lg px-[1rem] py-[0.3rem]">New</Text>
            </View>
            {/* popular */}
            <View className = "rounded-full border-solid border-[2px]">
                <Text className = "text-lg px-[1rem] py-[0.3rem]">Popular</Text>
            </View>
            {/* highest rated */}
            <View className = "rounded-full border-solid border-[2px]">
                <Text className = "text-lg px-[1rem] py-[0.3rem]">Highest Rated</Text>
            </View>
        </SafeAreaView>

        {/* courses */}
        <ScrollView
        className = "relative left-[5%] h-full mt-[1rem]"
        showsVerticalScrollIndicator = {false}
        horizontal={false}
        contentContainerStyle={{ paddingBottom: 20}}
        >
            <View className = "flex-col gap-5 pt-[1rem]">
                {dummySuggestedCourses.map((course, index) => {
                    return (
                        <View className = "w-[26rem] h-[6rem] rounded-lg flex-row gap-12" key = {index} style = {{boxShadow: "4px 4px 6px rgba(0,0,0,0.1)"}}>
                            <Image source = {images[course.urlKey]} className = "w-[4.1rem] h-[4.1rem] relative top-[1rem] left-[1.5rem] rounded-lg" />
                            <View className = "relative top-[1rem] flex-col gap-[0.8rem]">
                                <Text className = "text-xl font-bold">{course.courseName}</Text>
                                <View className = "flex-row gap-3">
                                    <FontAwesome name = "user" size = {20} />
                                    <Text className = "text-lg relative bottom-[0.2rem]">{course.instructorName}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
</View>
  )
}

export default SuggestedCourse
