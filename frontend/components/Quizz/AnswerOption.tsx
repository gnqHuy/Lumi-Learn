import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AnswerOptionDto } from '@/types/answerOption';

interface Props {
    option: AnswerOptionDto;
    isSelected: boolean
    onSelect: (optionId: string) => void;
}

const AnswerOption: React.FC<Props> = ({ option, isSelected, onSelect }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                onSelect(option.id);
            }}
            className={`w-full border rounded-xl p-4 mb-2 ${isSelected ? 'border-black bg-gray-200' : 'border-gray-300'}`}
            activeOpacity={0.35}
        >
            <Text className="text-base">{option.content}</Text>
        </TouchableOpacity>
    );
};

export default AnswerOption;
