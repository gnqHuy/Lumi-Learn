import { View, Text, Pressable, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getCourseOverview } from '@/api/courseApi';
import { CourseOverview } from '@/types/course';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import LessonItem from '@/components/Lesson/LessonItem';
import LessonList from '@/components/Lesson/LessonList';
import useAuthStore from '@/zustand/authStore';
import CreateCourseModal from '@/components/Course/CreateCourseModal';
import CreateLessonModal from '@/components/Lesson/CreateLessonModal';
import AddRating from '@/components/Feedback/AddRating';
import { getMyRating } from '@/api/feedbackApi';

const CourseOverviewPage = () => {
    const [ courseOverview, setCourseOverview ] = useState<CourseOverview | undefined>(undefined);
    const [ isLessonModalOpen, setIsLessonModalOpen ] = useState(false);
    const [ isRatedByUser, setIsRatedByUser ] = useState(false);
    const [ rating, setRating ] = useState(0);
    const [ refreshPage, setRefreshPage ] = useState(false);
    const { courseId } = useLocalSearchParams();
    const user = useAuthStore((state) => state.authState?.user);
    const router = useRouter();

    const isTeacher = () => {
        return user?.role == "Teacher";
    }

    useEffect(() => {
        if (refreshPage) {
            getCourseOverview(courseId as string).then((res) => {
                setCourseOverview(res.data);
            }).catch((err) => {
                console.log(err);
            })
            setRefreshPage(false);
        }
    }, [refreshPage]);

    useEffect(() => {
        getCourseOverview(courseId as string).then((res) => {
            setCourseOverview(res.data);
        }).catch((err) => {
            console.log(err);
        });

        getMyRating(courseId as string).then((res) => {
            console.log('My Rating: ', res.data);
            setRating(res.data);

            if (res.data != 0) {
                setIsRatedByUser(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <View
            id='course-overview-screen'
            className='flex-1 flex-col items-center bg-white'
        >
            <View
                id='top-nav'
                className='flex-row pt-14 px-6 w-full'
            >
                <Pressable
                    onPress={() => { 
                        router.push(`/(tabs)/courses`);
                    }}
                >
                    <AntDesign name='arrowleft' size={24}/>
                </Pressable>
            </View>
            <View
                id='course-overview-section'
                className='flex-row justify-between px-6 py-8 w-full'
            >
                <View
                    id='course-overview-info'
                    className='flex-col gap-3 w-2/3'
                >
                    <Text
                        id='course-name'
                        className='text-2xl font-bold text-cyan-800'
                    >
                        {courseOverview?.title}
                    </Text>
                    <Text
                        id='course-description'
                        className='font-normal'
                    >
                        {courseOverview?.description}
                    </Text>
                </View>
                {/* Replace with course thumbnail later */}
                <View 
                    id="cover-pic"
                    className='border-[3px] border-cyan-700 rounded-xl self-start'    
                >
                    <Image
                        id='course-thumbnail'
                        source={{ uri: courseOverview?.thumbnail as string | undefined }}
                        width={84}
                        height={84}
                        borderRadius={8}
                    >
                    </Image>
                </View>
            </View>
            <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
            >
                <View className='flex-1 pb-10'>
                    <View
                        id='Lesson-list-section'
                        className='flex-col gap-4 flex-1 w-full px-6'
                    >
                        <View id='lesson-list-title'>
                            <Text className='text-lg text-cyan-800 font-bold'>Lessons in this course</Text>
                        </View>
                        <LessonList lessons={courseOverview?.lessons}/>
                    </View>
                    {!isTeacher() ?
                        isRatedByUser ?
                        <View
                            id='rating-section'
                            className='flex-row items-center gap-6 w-full px-6'
                        >
                            <View id='lesson-list-title'>
                                <Text className='text-lg text-cyan-800 font-bold'>Your rating</Text>
                            </View>
                            <AddRating
                                size={20}
                                courseId={courseId as string}
                                rating={rating}
                                setRating={setRating}
                                isRatedByUser={isRatedByUser}
                                setIsRatedByUser={setIsRatedByUser}
                            />
                        </View>
                        : 
                        <View
                            id='rating-section'
                            className='flex-col flex-1 gap-10 px-6'
                        >
                            <View id='lesson-list-title'>
                                <Text className='text-lg text-cyan-800 font-bold'>Rate this course</Text>
                            </View>
                            <AddRating
                                courseId={courseId as string}
                                rating={rating}
                                setRating={setRating}
                                isRatedByUser={isRatedByUser}
                                setIsRatedByUser={setIsRatedByUser}
                            />
                        </View>
                    : <></>}
                </View>
            </ScrollView>
            {isTeacher() ? 
            <View 
                className='w-full px-6 pb-2 pt-4 bottom-0 z-10 absolute'
            >
                <TouchableOpacity
                    id='submit-button'
                    className='flex justify-center items-center w-full py-4 bg-cyan-800 rounded-xl'
                    onPress={() => setIsLessonModalOpen(true)}
                    style = {{boxShadow: "0px 0px 20px 20px rgba(243, 243, 243, 0.9)"}}
                    activeOpacity={0.55}
                >
                    <Text className='text-lg text-white font-semibold'>Add lesson</Text>
                </TouchableOpacity>
            </View>
            : <></>}
            {isLessonModalOpen ? 
                <CreateLessonModal onClose={setIsLessonModalOpen} setRefresh={setRefreshPage}/>
            : <></>}
        </View>
    )
}

export default CourseOverviewPage