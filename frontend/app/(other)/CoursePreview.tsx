import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { router } from 'expo-router'
import useCourseStore from '@/zustand/courseStore'
import { getCourseOverview } from '@/api/courseApi'
import { CourseOverview } from '@/types/course'
import { ScrollView } from 'react-native-gesture-handler'
import { JoinCourseApi } from '@/api/enrollmentApi'
import { S3_URL_PREFIX } from '@/const/AmazonS3'
import { LinearGradient } from 'expo-linear-gradient';
import { showNotification } from '@/components/Toast/Toast'
import useAuthStore from '@/zustand/authStore'

const CoursePreview = () => {
    const selectedCourseId = useCourseStore((state) => state.selectedCourseId);
    const screenWidth = Dimensions.get('window').width;
    const currentUser = useAuthStore.getState().authState?.user;

    const isTeacher = () => {
        return currentUser?.role == 'Teacher';
    }
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
            showNotification('success', 'Enrollment Successful', 'You have successfully joined the course.');
            router.push(`/(tabs)/courses/${selectedCourseId}`);
        }).catch(err => showNotification('error', 'Enrollment Failed', 'An error occurred while trying to join the course. Please try again later.')
    );
    }
    const lessonCount = courseOverview?.lessons?.length ?? 0;
    const [showFullDesc, setShowFullDesc] = useState(false);
  return (
    <View className="flex-1 bg-white">
        <View className="mt-14 px-5 flex-row items-center justify-between mb-2">
            <AntDesign name="arrowleft" size={24} color="#155e75" onPress={() => router.push('/(tabs)/home')} />
            <Text className="text-2xl font-bold text-cyan-800">Course Preview</Text>
            <View className="mx-2" />
        </View>

        <View className="mt-4 px-6">
            <Image
                source={{ uri: `${S3_URL_PREFIX}/course/${selectedCourseId}` }}
                className="w-full h-56 rounded-2xl"
                resizeMode="cover"
            />
        </View>

        <View className="flex-1 px-6 pt-4 pb-4">
            <View className='flex-row mb-2 justify-between'>
                <Text className="text-2xl font-bold text-cyan-800">{courseOverview?.title}</Text>
                <View className="flex-row items-center mr-1">
                    <AntDesign name="star" size={16} color="#facc15" />
                    <Text className="text-base text-gray-600 font-medium ml-1">
                        {courseOverview?.rating}
                    </Text>
                </View>
            </View>
            <View className="mt-3 mb-4 flex-row items-start justify-between">
                <View className='flex-row'>
                    <Image
                        source={{ uri: courseOverview?.thumbnail as string | undefined }}
                        className="w-12 h-12 rounded-full my-auto"
                    />
                    <View className="ml-3 items-start">
                        <Text className="text-lg font-bold text-cyan-800">
                            Instructor
                        </Text>
                        <Text className="text-lg font-medium text-gray-700">
                        {courseOverview?.instructor}
                        </Text>
                    </View>
                </View>
                <Pressable className="border-solid bg-yellow-400 border-cyan-700 border-[2px] rounded-full px-4 py-1 mr-3 my-auto w-auto">
                    <Text className="text-cyan-700 text-lg font-semibold">{courseOverview?.topic}</Text>
                </Pressable>
            </View>

            <View className="mb-2 flex-1">
                <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
                    <View className="mb-2">
                    <Text className="text-xl font-bold text-cyan-800">Descriptions</Text>

                    {courseOverview?.description && (
                        <>
                        <Text
                            className="text-base mt-1 text-gray-700"
                            numberOfLines={showFullDesc ? undefined : 3}
                        >
                            {courseOverview.description}
                        </Text>

                        {courseOverview.description.length > 100 && (
                            <View className="flex-row justify-end mt-1">
                            <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
                                <Text className="text-base text-cyan-800 font-semibold">
                                {showFullDesc ? 'Read less' : 'Read more'}
                                </Text>
                            </TouchableOpacity>
                            </View>
                        )}
                        </>
                    )}
                    </View>
                    <View className="bg-white py-2">
                        <Text className="text-xl font-bold text-cyan-800">{`${lessonCount} Lesson${lessonCount >= 2 ? 's' : ''}`}</Text>
                    </View>
                    <View className="flex-col gap-4">
                        {courseOverview?.lessons?.map((lesson, index) => (
                        <View className="flex-row items-center gap-8" key={index}>
                            <Text className="font-bold text-2xl text-cyan-800">
                            {(index + 1).toString().padStart(2, '0')}
                            </Text>
                            <View>
                                <Text className="text-lg text-cyan-800 font-bold">{lesson.title}</Text>
                                <Text className="text-base text-yellow-600">
                                    {`${lesson.flashcardSets.length} flashcard(s)`}
                                </Text>
                            </View>
                        </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
        {!isTeacher() && <View className="px-6 pb-6 bg-white">
            <TouchableOpacity
                className="w-full bg-cyan-900 py-4 rounded-2xl items-center"
                onPress={handleJoinCourse}
                activeOpacity={0.6}
            >
                <Text className="text-lg text-white font-semibold">Join course</Text>
            </TouchableOpacity>
        </View>
        }
        
    </View>
    );
}

export default CoursePreview
