import { View, Text, ScrollView, TouchableOpacity, Image, Pressable, StatusBar, KeyboardAvoidingView, Platform, TouchableHighlight } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { getCourseOverview, updateCourse } from '@/api/courseApi';
import { getMyRating } from '@/api/feedbackApi';
import { CourseOverview, UpdateCourseRequest } from '@/types/course';

import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import LessonList from '@/components/Lesson/LessonList';
import useAuthStore from '@/zustand/authStore';
import CreateLessonModal from '@/components/Lesson/CreateLessonModal';
import AddRating from '@/components/Feedback/AddRating';
import { TextInput } from 'react-native-gesture-handler';
import { ReactNativeFile } from '../createCourse';
import { getCourseThumbnail } from '@/utils/image';
import { showNotification } from '@/components/Toast/Toast';

const CourseOverviewPage = () => {
  const [courseOverview, setCourseOverview] = useState<CourseOverview | undefined>(undefined);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isRatedByUser, setIsRatedByUser] = useState(false);
  const [rating, setRating] = useState(0);
  const [refreshPage, setRefreshPage] = useState(false);
  const [activeTab, setActiveTab] = useState<'lesson' | 'about'>('lesson');
  const [ courseTitleInput, setCourseTitleInput ] = useState<string>('');
  const [ descriptionInput, setDescriptionInput ] = useState<string>('');
  const [ thumbnailInput, setThumbnailInput ] = useState<ReactNativeFile | null>(null);
  const [ thumbnailInputUri, setThumbnailInputUri ] = useState<string | null>(null);
  const [ courseUpdated, setCourseUpdated ] = useState<boolean>(false);

  const { courseId } = useLocalSearchParams();
  const router = useRouter();
  const user = useAuthStore((state) => state.authState?.user);

  const isTeacher = () => user?.role === 'Teacher';

  useEffect(() => {
    getCourseOverview(courseId as string)
      .then((res) => {
        setCourseOverview(res.data);
        setDescriptionInput(res.data.description);
        setCourseTitleInput(res.data.title);
        setThumbnailInputUri(res.data.thumbnail);
        console.log('ThumbnailUrl: ', res.data.thumbnail);
    })
      .catch(console.log);

    getMyRating(courseId as string)
      .then((res) => {
        setRating(res.data);
        if (res.data !== 0) setIsRatedByUser(true);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (refreshPage) {
      getCourseOverview(courseId as string)
        .then((res) => {
            setCourseOverview(res.data);
            setDescriptionInput(res.data.description);
            setCourseTitleInput(res.data.title);
            setThumbnailInputUri(res.data.thumbnail);
        })
        .catch(console.log);

      setRefreshPage(false);
    }
  }, [refreshPage]);

  useEffect(() => {
    if (courseOverview) {
        if (courseTitleInput !== courseOverview.title 
            || descriptionInput !== courseOverview.description
            || thumbnailInputUri !== courseOverview.thumbnail
        ) {
            setCourseUpdated(true);
        } else {
            setCourseUpdated(false);
        }
    }
  }, [courseTitleInput, descriptionInput, thumbnailInputUri]);

    const handleImagePicker = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: false,
        });

        if (result.canceled || !result.assets || result.assets.length === 0) return;

        const selectedAsset = result.assets[0];
        const uri = selectedAsset.uri;
        setThumbnailInputUri(uri);

        const fileName = selectedAsset.fileName || uri.split('/').pop() || 'thumbnail.jpg';
        const imageType = fileName.split('.').pop()?.toLowerCase() || 'jpg';
        const mimeType = `image/${imageType == 'jpg' ? 'jpeg' : imageType}`;

        const file: ReactNativeFile = {
            uri,
            name: fileName,
            type: mimeType,
        };

        setThumbnailInput(file);
    }

    const handleUpdateCourse = () => {
        if (!courseTitleInput.trim() && !descriptionInput.trim() && !thumbnailInput) return;
        const formData = new FormData();
        formData.append('Title', courseTitleInput);
        formData.append('Description', descriptionInput);

        if (thumbnailInput) {
            formData.append('Thumbnail', {
                uri: thumbnailInput.uri,
                name: thumbnailInput.name,
                type: thumbnailInput.type,
            } as any);
        }

        const updateRequest: UpdateCourseRequest = {
            id: courseId as string,
            updateCourseRequest: formData
        }

        updateCourse(updateRequest).then((res) => {
            showNotification('success', 'Success', 'Update course successfully');
            router.push(`/(tabs)/courses/${courseId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    }

  return (
    <View className='bg-white flex-1'>
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, backgroundColor: 'transparent'}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
    <ScrollView 
        className='bg-white h-full mt-14' 
        horizontal={false} 
        showsVerticalScrollIndicator={false} 
        stickyHeaderIndices={[0]}
        keyboardShouldPersistTaps='handled'
    >
        <View className="px-5 flex-row items-center bg-white justify-between">
            <Text className="text-[20px] font-bold text-cyan-800 absolute left-4 right-4 text-center p-3">Course Details</Text>
            <Pressable onPress={() => router.push('/(tabs)/courses')}
                accessible={true}
                accessibilityLabel='Back button. Double tab to return Course page.'
                className='p-3'
            >
                <AntDesign name="arrowleft" size={24} color={'#155e75'}/>  
            </Pressable>
        </View>
        <View id="course-overview-screen" className="flex-1">
            {isTeacher() ? 
            <TouchableOpacity 
                className="mt-4 px-6"
                onPress={handleImagePicker}
            >
                <Image
                id="course-thumbnail"
                source={courseOverview?.thumbnail || thumbnailInputUri
                    ?
                    {
                        uri: thumbnailInputUri != courseOverview?.thumbnail
                            ? thumbnailInputUri
                            : courseOverview?.thumbnail
                    }
                    : require('../../../../assets/images/default-course.jpg')
                }
                className="w-full h-56 rounded-2xl"
                resizeMode="cover"
                />
            </TouchableOpacity>
            :
            <View className="mt-4 px-6">
                <Image
                    id="course-thumbnail"
                    source={{ uri: getCourseThumbnail(courseId as string) }}
                    className="w-full h-56 rounded-2xl"
                    resizeMode="cover"
                />
            </View>
            }
            <View id="course-overview-section" className="px-6 py-8 w-full">
                <View 
                    accessible={true}
                    accessibilityLabel={`Course: ${courseOverview?.title}, Topic: ${courseOverview?.topic}, Instructor: ${courseOverview?.instructor}
                    Rating: ${courseOverview?.rating}/5, ${courseOverview?.numberOfRatings} rate.`}
                >              
                    <View className="flex-row items-center justify-between items-start mb-3">
                    {isTeacher() ?
                    <TextInput
                        value={courseTitleInput}
                        multiline
                        className='text-2xl font-bold w-5/6 text-cyan-800 my-auto'
                        onChangeText={(text) => {
                            setCourseTitleInput(text);
                        }}
                    />
                    : <Text
                        id="course-name"
                        className="text-2xl w-5/6 font-bold text-cyan-800 my-auto"
                    >
                        {courseOverview?.title}
                    </Text> 
                    }
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
                                source={require('../../../../assets/images/teacher-avatar.png')}
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
                </View>
            </View>

            <View className="flex-row border-b border-gray-200">
                <TouchableOpacity
                    className={`w-1/2 items-center pb-2 ${activeTab === 'lesson' ? 'border-b-2 border-cyan-800' : ''}`}
                    onPress={() => setActiveTab('lesson')}
                    accessible={true}
                    accessibilityLabel={`Lessons Tab. ${activeTab === 'lesson' ? 'activated' : 'Double tab to switch to Lessons tab.'}`}
                >
                    <Text className={`text-lg font-semibold ${activeTab === 'lesson' ? 'text-cyan-800' : 'text-gray-500'}`}>
                        Lessons
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`w-1/2 items-center pb-2 ${activeTab === 'about' ? 'border-b-2 border-cyan-800' : ''}`}
                    onPress={() => setActiveTab('about')}
                    accessible={true}
                    accessibilityLabel={`About Course Tab. ${activeTab === 'about' ? 'activated' : 'Double tab to switch to About Course tab.'}`}
                >
                    <Text className={`text-lg font-semibold ${activeTab === 'about' 
                        ? 'text-cyan-800' : 'text-gray-500'}`}
                    >
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
                    <View 
                        accessible={true}
                        accessibilityLabel={`Description: ${courseOverview?.description}`}
                        className='flex-col gap-2'
                    >
                        <Text className="text-xl font-bold text-cyan-800">Descriptions</Text>
                        {isTeacher() ? 
                        <TextInput
                            className='text-base text-gray-700 w-full'
                            multiline
                            value={descriptionInput}
                            onChangeText={(text) => {
                                setDescriptionInput(text);
                            }}
                        />
                        : <Text className="text-base text-gray-700">{courseOverview?.description}</Text>}
                    </View>

                    {!isTeacher() && (
                        <>
                        {isRatedByUser ? (
                            <View id="rating-section" className="flex-row items-center gap-6 w-full mt-6"
                                accessible={true}
                                accessibilityLabel={`Your rating: ${rating} stars`}
                            >
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
        
        </View>

      {isLessonModalOpen && (
        <CreateLessonModal onClose={setIsLessonModalOpen} setRefresh={setRefreshPage} />
      )}
    </ScrollView>
    {isTeacher() && activeTab === 'lesson' && !courseUpdated && (
        <View className="w-full px-6 pb-2 pt-4 bottom-0 z-10 absolute">
        <TouchableOpacity
            id="submit-button"
            className="flex justify-center items-center w-full py-4 bg-cyan-700 rounded-xl"
            onPress={() => setIsLessonModalOpen(true)}
            activeOpacity={0.7}
            style={{ boxShadow: '0px 0px 20px 20px rgba(243, 243, 243, 0.5)' }}
        >
            <Text className="text-lg text-white font-semibold">Add lesson</Text>
        </TouchableOpacity>
        </View>
    )}
    {courseUpdated && (
        <View className="w-full px-6 pb-2 pt-4 bottom-0 z-10 absolute">
        <TouchableHighlight
            id="submit-button"
            className="flex justify-center border border-cyan-600 items-center w-full py-4 bg-slate-200 rounded-xl"
            onPress={handleUpdateCourse}
            underlayColor={"#cbd5e1"}
            style={{ boxShadow: '0px 0px 20px 20px rgba(243, 243, 243, 0.5)' }}
        >
            <Text className="text-lg text-cyan-700 font-semibold">Update course</Text>
        </TouchableHighlight>
        </View>
    )}
    </KeyboardAvoidingView>
    </View>
    
  );
};

export default CourseOverviewPage;
