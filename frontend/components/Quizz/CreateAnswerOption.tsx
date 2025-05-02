import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

interface Props {
    index: number;
    content: string;
    isCorrect: boolean;
    onChange: (content: string, isCorrect: boolean) => void;
}

const CreateAnswerOption: React.FC<Props> = ({ index, content, isCorrect, onChange }) => {
    return (
        <View className='flex-row items-center border p-4 rounded-xl'>
            <TextInput
                placeholder={`Option ${index + 1}`}
                placeholderTextColor={"#9CA3AF"}
                value={content}
                onChangeText={(text) => onChange(text, isCorrect)}
                className='flex-1 leading-5 text-base'
            />
            <TouchableOpacity onPress={() => onChange(content, !isCorrect)}>
                {isCorrect ? (
                    <AntDesign name="checkcircle" size={20} color="green" />
                ) : (
                    <Feather name="circle" size={20} color="gray" />
                )}
            </TouchableOpacity>
        </View>
    );
};

export default CreateAnswerOption;
