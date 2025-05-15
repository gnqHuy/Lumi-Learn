import { View, Text, Modal, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { CreateTopic } from '@/api/topicApi';
import { showNotification } from '../Toast/Toast';

export type AddValueModalProps = {
    setShowModal: (val: boolean) => void;
    values: string[],
    setValues: (values: string[]) => void
}

const AddValueModal: React.FC<AddValueModalProps> = ({ setShowModal, values, setValues }) => {
    const [valueError, setValueError] = useState(false);
    const [valueErrorMessage, setValueErrorMessage] = useState('');
    const [valueInput, setValueInput] = useState('');

    const handleAddValue = () => {
        if (!valueInput.trim()) {
            setValueError(true);
            setValueErrorMessage('Please enter a topic name');
            return;
        }

        if (values.includes(valueInput)) {
            setValueError(true);
            setValueErrorMessage('Duplicate topic name');
            return;
        }
        CreateTopic(valueInput).then((res) => {
            setValueError(false);
            setValues([...values, valueInput]);
            setShowModal(false);
            showNotification('success', 'Success!', 'Topic is created successfully!');
        }).catch((err) => {
            showNotification('error', 'Error!', err.message);
            console.log(err.message);
        });
    }

    return (
        <Modal
            animationType="fade"
            transparent
            visible
            onRequestClose={() => setShowModal(false)}
        >
            <Pressable
                className="flex-1 bg-black/50 justify-center items-center"
                onPress={() => setShowModal(false)}
            >
                <View
                    className="flex-col gap-4 items-center w-11/12 bg-white rounded-2xl p-6 shadow-lg"
                    onStartShouldSetResponder={() => true}
                >
                    <Text className="text-xl text-gray-900 font-semibold mb-4">Add new topic</Text>

                    <View
                        id='create-lesson-form'
                        className='w-full flex-col items-center justify-center gap-6'
                    >
                        <View
                            id='lesson-title-input'
                            className="w-full"
                        >
                            <Text className={`text-sm ml-1 mb-2 ${valueError ? 'text-red-600' : 'text-slate-700'}`}>
                                Topic name
                            </Text>
                            <TextInput
                                placeholder="Enter lesson title"
                                placeholderTextColor={"#9CA3AF"}
                                className={`w-full p-4 rounded-xl bg-transparent border ${
                                    valueError ? 'border-red-500' : 'border-gray-600'
                                }`}
                                style={{ textAlignVertical: 'center' }}
                                value={valueInput}
                                onChangeText={(text) => {
                                    setValueInput(text);
                                    setValueError(false);
                                }}
                            />
                            {valueError && (
                                <Text className="text-sm ml-1 mt-2 mb-2 text-red-600">
                                    {valueErrorMessage}
                                </Text>
                            )}
                        </View>
    
                        <TouchableOpacity
                            className="bg-cyan-700 py-5 rounded-xl items-center w-full"
                            onPress={handleAddValue}
                            activeOpacity={0.6}
                        >
                            <Text className="text-white font-semibold">Create</Text>
                        </TouchableOpacity>
    
                        <TouchableOpacity
                            className="bg-gray-200 border border-cyan-600 py-5 rounded-xl items-center w-full"
                            onPress={() => setShowModal(false)}
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

export default AddValueModal