import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { CreateCourseRequest } from '@/types/course';
import { GetAllTopics } from '@/api/topicApi';
import { PillSelection } from '@/components/PillsSelection/PillSelection';
import { createCourse } from '@/api/courseApi';

const CreateCoursePage = () => {
    const [ titleError, setTitleError ] = useState(false);
    const [ descriptionError, setDescriptionError ] = useState(false);
    const [ topicError, setTopicError ] = useState<boolean>(false);

    const [ titleErrorMessage, setTitleErrorMessage ] = useState('');
    const [ descriptionErrorMessage, setDescriptionErrorMessage ] = useState('');
    const [ topicErrorMessage, setTopicErrorMessage ] = useState('');

    const [ titleInput, setTitleInput ] = useState('');
    const [ descriptionInput, setDescriptionInput ] = useState('');

    const [ topics, setTopics ] = useState<string[]>([]);
    const [ selectedTopics, setSelectedTopics ] = useState<string[]>([]);


    const router = useRouter();

    const handleCreateCourse = () => {
        let valid = true;

        if (!titleInput.trim()) {
            setTitleError(true);
            setTitleErrorMessage('Title is required.');
            valid = false;
        }

        if (!descriptionInput.trim()) {
            setDescriptionError(true);
            setDescriptionErrorMessage('Description is required.');
            valid = false;
        }

        if (selectedTopics.length == 0) {
            setTopicError(true);
            setTopicErrorMessage('Please choose a topic');
        }

        if (!valid) return;

        const createCourseRequest: CreateCourseRequest = {
            title: titleInput,
            description: descriptionInput,
            thumbnail: 'string',
            topic: selectedTopics[0],
        }

        createCourse(createCourseRequest).then((res) => {
            const courseId = res.data.id;
            router.push(`/(tabs)/courses/${courseId}`);
        }).catch((err) => {
            console.log(err.message);
        })

        console.log({ titleInput, descriptionInput });
    };

    useEffect(() => {
        GetAllTopics().then((res) => {
            const data = res.data;
            const names = data.map((topic: any) => topic.name);
            setTopics(names);
        })
    }, [])

    return (
        <View
            id='create-course-screen'
            className='flex-col flex-1 items-center justify-center px-6'
        >
            <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                className='w-full'
            >
                <View className='w-full flex-col items-center justify-center'>
                    <View className="w-32 h-32 rounded-xl bg-gray-300 mb-6 mt-20" />
                    <View
                        id='create-course-form'
                        className='w-full flex-col items-center justify-center gap-6'
                    >
                        <View 
                            id='title-input'
                            className="w-full"
                        >
                            <Text className={`text-sm ml-1 mb-2 ${titleError ? 'text-red-600' : 'text-slate-700'}`}>
                                Course title
                            </Text>
                            <TextInput
                                placeholder="Enter course title"
                                placeholderTextColor={"#9CA3AF"}
                                className={`w-full p-4 rounded-xl text-3xl font-semibold bg-transparent border-b-2 ${
                                    titleError ? 'border-red-500' : 'border-gray-400'
                                }`}
                                style={{ textAlignVertical: 'center' }}
                                value={titleInput}
                                onChangeText={(text) => {
                                    setTitleInput(text);
                                    setTitleError(false);
                                }}
                            />
                            {titleError && (
                                <Text className="text-sm ml-1 mt-2 mb-2 text-red-600">
                                    {titleErrorMessage}
                                </Text>
                            )}
                        </View>

                        <View 
                            id='description-input'
                            className="w-full"
                        >
                            <Text className={`text-sm ml-1 mb-2 ${descriptionError ? 'text-red-600' : 'text-slate-700'}`}>
                                Course description
                            </Text>
                            <TextInput
                                placeholder="Enter course description"
                                placeholderTextColor={"#9CA3AF"}
                                className={`w-full p-4 rounded-xl text-xl font-normal bg-transparent border-b-2 ${
                                    descriptionError ? 'border-red-500' : 'border-gray-400'
                                }`}
                                style={{ textAlignVertical: 'center' }}
                                value={descriptionInput}
                                onChangeText={(text) => {
                                    setDescriptionInput(text);
                                    setDescriptionError(false);
                                }}
                            />
                            {descriptionError && (
                                <Text className="text-sm ml-1 mt-2 mb-2 text-red-600">
                                    {descriptionErrorMessage}
                                </Text>
                            )}
                        </View>

                        <View
                            id='topic-selection'
                            className="w-full"
                        >
                            <Text className={`text-sm ml-1 mb-2 ${topicError ? 'text-red-600' : 'text-slate-700'}`}>
                                Choose a topic for your course
                            </Text>
                            <PillSelection
                                values={topics}
                                selected={selectedTopics}
                                setSelected={setSelectedTopics}
                                multiSelect={false}
                                wrap={true}
                            />
                            {topicError && (
                                <Text className="text-sm ml-1 mt-2 mb-2 text-red-600">
                                    {topicErrorMessage}
                                </Text>
                            )}
                        </View>

                        <TouchableOpacity
                            className="bg-gray-400 py-5 rounded-xl items-center w-full"
                            onPress={handleCreateCourse}
                            activeOpacity={0.6}
                        >
                            <Text className="text-white font-semibold">Create course</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-gray-200 border border-black py-5 rounded-xl items-center w-full"
                            onPress={() => router.back()}
                            activeOpacity={0.6}
                        >
                            <Text className="text-gray-700">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CreateCoursePage