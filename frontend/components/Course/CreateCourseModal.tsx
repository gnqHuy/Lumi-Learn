import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, Pressable } from 'react-native';

interface CreateCourseModalProps {
    onClose: (val: boolean) => void;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ onClose }) => {
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');

    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');

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

        if (!valid) return;

        // ✅ Handle course creation logic here (e.g., send to API)
        console.log({ titleInput, descriptionInput });

        // Close modal
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
                    <Text className="text-xl font-bold mb-4">Create New Course</Text>

                    <View className="w-20 h-20 rounded-xl bg-gray-300" />

                    {/* Title Input */}
                    <View className="w-full">
                        <Text className={`text-sm ml-1 mb-2 ${titleError ? 'text-red-600' : 'text-slate-700'}`}>
                            Course title
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

                    {/* Description Input */}
                    <View className="w-full">
                        <Text className={`text-sm ml-1 mb-2 ${descriptionError ? 'text-red-600' : 'text-slate-700'}`}>
                            Course description
                        </Text>
                        <TextInput
                            multiline={true}
                            placeholder="Enter course description"
                            className={`w-full px-3 py-3 rounded-xl bg-transparent border-b ${
                                descriptionError ? 'border-red-500' : 'border-gray-600'
                            }`}
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

                    {/* Create Button */}
                    <TouchableOpacity
                        className="bg-blue-400 py-3 rounded-lg items-center w-full"
                        onPress={handleCreateCourse}
                    >
                        <Text className="text-white font-semibold">Create</Text>
                    </TouchableOpacity>

                    {/* Cancel Button */}
                    <TouchableOpacity
                        className="mt-3 items-center"
                        onPress={() => onClose(false)}
                    >
                        <Text className="text-gray-500">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
};

export default CreateCourseModal;
