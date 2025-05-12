import { View, Text, ScrollView, TouchableOpacity, Image, Pressable, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { getCourseOverview } from '@/api/courseApi';
import { getMyRating } from '@/api/feedbackApi';
import { CourseOverview } from '@/types/course';

import AntDesign from '@expo/vector-icons/AntDesign';

import LessonList from '@/components/Lesson/LessonList';
import useAuthStore from '@/zustand/authStore';
import CreateLessonModal from '@/components/Lesson/CreateLessonModal';
import AddRating from '@/components/Feedback/AddRating';

const CourseOverviewPage = () => {
  const [courseOverview, setCourseOverview] = useState<CourseOverview | undefined>(undefined);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isRatedByUser, setIsRatedByUser] = useState(false);
  const [rating, setRating] = useState(0);
  const [refreshPage, setRefreshPage] = useState(false);
  const [activeTab, setActiveTab] = useState<'lesson' | 'about'>('lesson');

  const { courseId } = useLocalSearchParams();
  const router = useRouter();
  const user = useAuthStore((state) => state.authState?.user);

  const isTeacher = () => user?.role === 'Teacher';

  useEffect(() => {
    if (refreshPage) {
      getCourseOverview(courseId as string)
        .then((res) => setCourseOverview(res.data))
        .catch(console.log);

      setRefreshPage(false);
    }
  }, [refreshPage]);

  useEffect(() => {
    getCourseOverview(courseId as string)
      .then((res) => setCourseOverview(res.data))
      .catch(console.log);

    getMyRating(courseId as string)
      .then((res) => {
        setRating(res.data);
        if (res.data !== 0) setIsRatedByUser(true);
      })
      .catch(console.log);
  }, []);

  return (
    <View className='bg-white'>
    <ScrollView className='bg-white mt-14' horizontal={false} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        <View className=" px-5 pt-5 pb-2 flex-row bg-white items-center justify-between mb-2">
            <AntDesign name="arrowleft" size={24} color="#155e75" onPress={() => router.back()} />
            <Text className="text-2xl font-bold text-cyan-800">Course Details</Text>
            <View className="mx-2" />
        </View>
        <View id="course-overview-screen" className="flex-1">
            <View className="mt-4 px-6">
                <Image
                id="course-thumbnail"
                source={{ uri: courseOverview?.thumbnail as string | undefined }}
                className="w-full h-56 rounded-2xl"
                resizeMode="cover"
                />
            </View>
            <View id="course-overview-section" className="px-6 py-8 w-full">
                <View className="flex-row justify-between items-start mb-3">
                <Text
                    id="course-name"
                    className="text-2xl font-bold text-cyan-800 flex-1 pr-4 my-auto"
                >
                    {courseOverview?.title}
                </Text>
                <View className="flex-row mt-1 mr-2 items-center">
                    <AntDesign name="star" size={16} color="#facc15" />
                    <Text className="text-base text-gray-600 font-medium ml-1">
                        {courseOverview?.rating}
                    </Text>
                    </View>
                </View>
                <View className="mt-2 flex-row items-start justify-between">
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
                    <Pressable className="border-solid bg-yellow-500 border-cyan-700 border-[2px] rounded-full px-4 py-1 mr-3 my-auto w-auto">
                        <Text className="text-cyan-700 text-lg font-semibold">{courseOverview?.topic}</Text>
                    </Pressable>
                </View>
            </View>

            <View className="flex-row border-b border-gray-200">
                <TouchableOpacity
                    className={`w-1/2 items-center pb-2 ${activeTab === 'lesson' ? 'border-b-2 border-cyan-800' : ''}`}
                    onPress={() => setActiveTab('lesson')}
                >
                    <Text className={`text-lg font-semibold ${activeTab === 'lesson' ? 'text-cyan-800' : 'text-gray-500'}`}>
                    Lessons
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`w-1/2 items-center pb-2 ${activeTab === 'about' ? 'border-b-2 border-cyan-800' : ''}`}
                    onPress={() => setActiveTab('about')}
                >
                    <Text className={`text-lg font-semibold ${activeTab === 'about' 
                        
                        
                        ? 'text-cyan-800' : 'text-gray-500'}`}>
                    About Course
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="flex-1 pb-10">
            {activeTab === 'lesson' ? (
                <View id="Lesson-list-section" className="flex-col gap-4 flex-1 w-full px-6 mt-4">
                <LessonList lessons={courseOverview?.lessons} />
                </View>
            ) : (
                <View id="about-section" className="flex-col gap-2 flex-1 w-full px-6 mt-4">
                <Text className="text-xl font-bold text-cyan-800">Descriptions</Text>
                <Text className="text-base text-gray-700">{courseOverview?.description}</Text>

                {!isTeacher() && (
                    <>
                    {isRatedByUser ? (
                        <View id="rating-section" className="flex-row items-center gap-6 w-full mt-6">
                        <Text className="text-lg text-cyan-800 font-bold">Your rating</Text>
                        <AddRating
                            size={20}
                            courseId={courseId as string}
                            rating={rating}
                            setRating={setRating}
                            isRatedByUser={isRatedByUser}
                            setIsRatedByUser={setIsRatedByUser}
                        />
                        </View>
                    ) : (
                        <View id="rating-section" className="gap-4 mt-6">
                        <Text className="text-lg text-cyan-800 font-bold">Rate this course</Text>
                        <AddRating
                            courseId={courseId as string}
                            rating={rating}
                            setRating={setRating}
                            isRatedByUser={isRatedByUser}
                            setIsRatedByUser={setIsRatedByUser}
                        />
                        </View>
                    )}
                    </>
                )}
                </View>
            )}
            </View>
        
            {isTeacher() && activeTab === 'lesson' && (
                <View className="w-full px-6 pb-2 pt-4 bottom-0 z-10 absolute">
                <TouchableOpacity
                    id="submit-button"
                    className="flex justify-center items-center w-full py-4 bg-cyan-800 rounded-xl"
                    onPress={() => setIsLessonModalOpen(true)}
                    activeOpacity={0.55}
                    style={{ boxShadow: '0px 0px 20px 20px rgba(243, 243, 243, 0.9)' }}
                >
                    <Text className="text-lg text-white font-semibold">Add lesson</Text>
                </TouchableOpacity>
                </View>
            )}
        </View>

      {isLessonModalOpen && (
        <CreateLessonModal onClose={setIsLessonModalOpen} setRefresh={setRefreshPage} />
      )}
    </ScrollView>

    </View>
  );
};

export default CourseOverviewPage;
