import { View, Text, Modal, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { CreateLessonRequest } from '@/types/lesson';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { createLesson } from '@/api/lessonApi';
import { showNotification } from '../Toast/Toast';

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

        createLesson(createLessonRequest).then((res) => {
            setRefresh(true);
            onClose(false);
            showNotification('success', 'Success!', 'Lesson is created successfully!');
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
                    <Text className="text-xl text-gray-900 font-semibold mb-4">Create New Lesson</Text>

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
                                placeholder="Enter lesson title"
                                placeholderTextColor={"#9CA3AF"}
                                className={`w-full p-4 rounded-xl bg-transparent border ${
                                    titleError ? 'border-red-500' : 'border-gray-600'
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
    
                        <TouchableOpacity
                            className="bg-cyan-700 py-5 rounded-xl items-center w-full"
                            onPress={handleCreateCourse}
                            activeOpacity={0.6}
                        >
                            <Text className="text-white font-semibold">Create</Text>
                        </TouchableOpacity>
    
                        <TouchableOpacity
                            className="bg-gray-200 border border-cyan-600 py-5 rounded-xl items-center w-full"
                            onPress={() => onClose(false)}
                            activeOpacity={0.6}
                        >
                            <Text className="text-cyan-700 font-semibold">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}

export default CreateLessonModal