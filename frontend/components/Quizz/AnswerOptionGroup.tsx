import React from 'react';
import { View } from 'react-native';
import { AnswerOptionDto } from '@/types/answerOption';
import AnswerOption from './AnswerOption';

interface Props {
    options: AnswerOptionDto[];
    selectedOptionId: string | null;
    onSelect: (optionId: string) => void;
  }
  
const AnswerOptionGroup: React.FC<Props> = ({ options, selectedOptionId, onSelect }) => {
    return (
        <>
        {options.map((option) => (
            <AnswerOption
                key={option.id}
                option={option}
                isSelected={selectedOptionId === option.id}
                onSelect={() => onSelect(option.id)}
            />
        ))}
        </>
    );
};

export default AnswerOptionGroup;
