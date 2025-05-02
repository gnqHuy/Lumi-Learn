import { View, Text, Modal, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { CreateLessonRequest } from '@/types/lesson';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { createLesson } from '@/api/lessonApi';

export type CreateLessonModalProps = {
    onClose: (val: boolean) => void;
    setRefresh: (val: boolean) => void
}

const CreateLessonModal: React.FC<CreateLessonModalProps> = ({ onClose, setRefresh }) => {
    const [titleError, setTitleError] = useState(false);
    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const { courseId } = useLocalSearchParams();
    const router = useRouter();

    const handleCreateCourse = () => {
        let valid = true;

        if (!titleInput.trim()) {
            setTitleError(true);
            setTitleErrorMessage('Title is required.');
            valid = false;
        }

        if (!valid) return;

        const createLessonRequest = {
            title: titleInput,
            courseId: courseId as string
        };

        console.log(createLessonRequest);

        createLesson(createLessonRequest).then((res) => {
            setRefresh(true);
            router.push(`/(tabs)/courses/${courseId}`);
        }).catch((err) => {
            console.log(err.message);
        })

        onClose(false);
    };

    return (
        <Modal
            animationType="fade"
            transparent
            visible
            onRequestClose={() => onClose(false)}
        >
            <Pressable
                className="flex-1 bg-black/50 justify-center items-center"
                onPress={() => onClose(false)}
            >
                <View
                    className="flex-col gap-4 items-center w-11/12 bg-white rounded-2xl p-6 shadow-lg"
                    onStartShouldSetResponder={() => true}
                >
                    <Text className="text-xl font-bold mb-4">Create New Lesson</Text>

                    <View
                        id='create-lesson-form'
                        className='w-full flex-col items-center justify-center gap-6'
                    >
                        <View
                            id='lesson-title-input'
                            className="w-full"
                        >
                            <Text className={`text-sm ml-1 mb-2 ${titleError ? 'text-red-600' : 'text-slate-700'}`}>
                                Lesson title
                            </Text>
                            <TextInput
                                placeholder="Enter course title"
                                className={`w-full px-3 py-4 rounded-xl bg-transparent border ${
                                    titleError ? 'border-red-500' : 'border-gray-600'
                                }`}
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
    
                        <TouchableOpacity
                            className="bg-gray-400 py-5 rounded-xl items-center w-full"
                            onPress={handleCreateCourse}
                            activeOpacity={0.6}
                        >
                            <Text className="text-white font-semibold">Create</Text>
                        </TouchableOpacity>
    
                        <TouchableOpacity
                            className="bg-gray-200 border border-black py-5 rounded-xl items-center w-full"
                            onPress={() => onClose(false)}
                            activeOpacity={0.6}
                        >
                            <Text className="text-gray-700">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}

export default CreateLessonModal