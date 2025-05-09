import React from 'react';
import { View, ScrollView } from 'react-native';
import { Pill } from './Pill';

type PillGroupProps = {
    values: string[];
    selected: string[];
    textColor?: string;
    selectedTextColor?: string;
    defaultColor?: string;
    selectedColor?: string;
    borderStyle?: string;
    setSelected: (values: string[]) => void;
    multiSelect?: boolean;
    wrap?: boolean;
};

export const PillSelection: React.FC<PillGroupProps> = ({
    values,
    selected,
    textColor,
    selectedTextColor,
    defaultColor,
    selectedColor,
    borderStyle,
    setSelected,
    multiSelect = false,
    wrap = true,
}) => {
    const toggleSelection = (value: string) => {
        let newSelection: string[];

        if (multiSelect) {
        newSelection = selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value];
        } else {
        newSelection = selected.includes(value) ? [] : [value];
        }

        setSelected(newSelection);
    };

    const Container = wrap ? View : ScrollView;

    return (
        <Container
            className={wrap ? 'flex-row flex-wrap' : 'flex-row'}
            horizontal={!wrap}
            showsHorizontalScrollIndicator={false}
        >
        {values.map((val) => (
            <Pill
                key={val}
                value={val}
                textColor={textColor}
                selectedTextColor={selectedTextColor}
                defaultColor={defaultColor}
                selectedColor={selectedColor}
                borderStyle={borderStyle}
                selected={selected.includes(val)}
                onPress={() => toggleSelection(val)}
            />
        ))}
        </Container>
    );
};