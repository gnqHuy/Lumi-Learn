import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import useCourseStore from '@/zustand/courseStore'
import { getCourseOverview } from '@/api/courseApi'
import { CourseOverview } from '@/types/course'
import { ScrollView } from 'react-native-gesture-handler'
import { JoinCourseApi } from '@/api/enrollmentApi'
import { S3_URL_PREFIX } from '@/const/AmazonS3'
import { LinearGradient } from 'expo-linear-gradient';

const CoursePreview = () => {
    const selectedCourseId = useCourseStore((state) => state.selectedCourseId);
    const screenWidth = Dimensions.get('window').width;

    // course
    const [courseOverview, setCourseOverview] = useState<CourseOverview>();

    useEffect(() => {
        getCourseOverview(selectedCourseId).then((response) => {
            setCourseOverview(response.data);
        }).catch(err => console.error(err))
    }, [])

    // join course
    const handleJoinCourse = () => {
        const payload = {
            courseId: selectedCourseId
        }
        JoinCourseApi(payload).then((res) => {
            console.log('Join course successfully!');
            router.push(`/(tabs)/courses/${selectedCourseId}`);
        }).catch(err => console.error(err));
    }
  return (
    <View className = "flex-1 bg-cyan-950">
        <StatusBar barStyle="light-content"/>
        <Image
            id="cover-pic"
            source={{ uri: `${S3_URL_PREFIX}/course/${selectedCourseId}` }}
            style={{
            position: 'absolute',
            right: screenWidth * 0.1,
            height: '40%',
            width: screenWidth * 0.8,
            resizeMode: 'cover',
            }}
        />
        <LinearGradient
            colors={['#083344', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
                position: 'absolute',
                left: screenWidth * 0.1,
                width: screenWidth * 0.5,
                height: '100%',
            }}
        />
        <LinearGradient
            colors={['#083344', 'transparent']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={{
                position: 'absolute',
                right: screenWidth * 0.1,
                width: screenWidth * 0.5,
                height: '100%',
            }}
        />
        <View className = "mt-14 flex-1 flex-col">
            {/* close button */}
            <View 
                id='cover'
                className='absolute h-1/3 w-full'
            >
                <View 
                    id='cover-content'
                    className='w-full flex-col gap-4 z-10'
                >
                    <View className='w-full px-6'>
                        <Pressable className = "">
                            <AntDesign color='white' name = "close" size = {24} onPress={() => {
                                router.push('/(tabs)/home');
                            }}/>
                        </Pressable>
                    </View>
                    {/* course name and topic */}
                    <View className = "w-full px-6 flex-col gap-3">
                        <Text className = "text-3xl text-white font-extrabold">{courseOverview?.title}</Text>
                        <Pressable className = "border-solid border-white border-[2px] rounded-full px-[1rem] py-[0.4rem] w-auto self-start">
                            <Text className = "text-white">{courseOverview?.topic}</Text>
                        </Pressable>
                    </View>
                </View>
                
            </View>
            {/* course info */}
            <View className = "flex-1 mt-72 p-8 bg-white rounded-t-[30px]">
                <View className='flex-col flex-1 gap-4'>
                    <View>
                        <Text className = "text-2xl font-bold">{courseOverview?.title}</Text>
                        <Text className = "text-lg mt-1">{`${courseOverview?.lessons.length} lesson(s)`}</Text>
                    </View>
                    {/* description */}
                    <View>
                        <Text className = "text-xl font-bold">Descriptions</Text>
                        <Text className = "text-lg mt-1">{courseOverview?.description}</Text>
                    </View>
                    {/* lesson lists */}
                    <View className='flex-1 mt-2'>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            <View className='flex-col gap-6'>
                                {courseOverview?.lessons?.map((lesson, index) => {
                                    const index_ = index + 1;
                                    return (
                                        <View className = "flex-row items-center gap-[2rem]" key = {index}>
                                            <Text className = "font-bold text-4xl">{index_.toString().padStart(2, "0")}</Text>
                                            <View className = "relative">
                                                <Text className = "text-lg font-bold">{lesson.title}</Text>
                                                <Text className = "text-base">{`${lesson.flashcardSets.length} flashcard(s)`}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    <View className = "sticky z-10 bottom-0 w-full flex-row justify-center">
                        <TouchableOpacity 
                            className = "w-full flex items-center bg-cyan-900 py-4 rounded-2xl" 
                            onPress={handleJoinCourse}
                            activeOpacity={0.6}
                        >
                            <Text className = "text-lg text-white font-semibold">Join course</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </View>
  )
}

export default CoursePreview
