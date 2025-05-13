import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, Pressable, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import { Pill } from './Pill';
import AddValueModal from './AddValueModal';
import { Entypo } from '@expo/vector-icons';

type PillGroupProps = {
    values: string[];
    setValues?: (values: string[]) => void;
    selected: string[];
    textColor?: string;
    selectedTextColor?: string;
    defaultColor?: string;
    selectedColor?: string;
    borderStyle?: string;
    setSelected: (values: string[]) => void;
    multiSelect?: boolean;
    wrap?: boolean;
    extendable?: boolean;
    allowAddValue?: boolean;
    visibleRows?: number;
};

export const PillSelection: React.FC<PillGroupProps> = ({
    values,
    setValues,
    selected,
    textColor = 'text-black',
    selectedTextColor = 'text-white',
    defaultColor = 'bg-gray-200',
    selectedColor = 'bg-gray-500',
    borderStyle = undefined,
    setSelected,
    multiSelect = false,
    wrap = true,
    extendable = false,
    allowAddValue = false,
    visibleRows = 3,
}) => {
    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ showAddValueModal, setShowAddValueModal ] = useState(false);
    const [ rowMap, setRowMap ] = useState<{ [key: number]: string[] }>({});

    const toggleSelection = (value: string) => {
        let newSelection: string[];

        if (multiSelect) {
            if (value.toLowerCase() == 'all') {
                newSelection = ['All'];
            } else {
                newSelection = selected.includes(value)
                ? selected.filter((v) => v !== value)
                : [...selected, value].filter((v) => v.toLowerCase() !== 'all');
            }
        } else {
            newSelection = selected.includes(value) ? [] : [value];
        }

        setSelected(newSelection);
    };

    const pillRefs = useRef<{ [key: string]: number }>({});
    const rowOrderRefs = useRef<{ [top: number]: string[] }>({});

    const handleLayout = (val: string, event: LayoutChangeEvent) => {
        const top = event.nativeEvent.layout.y;
        pillRefs.current[val] = top;

        if (!rowOrderRefs.current[top]) {
            rowOrderRefs.current[top] = [];
        }

        if (!rowOrderRefs.current[top].includes(val)) {
            rowOrderRefs.current[top].push(val);
        }

        const totalMeasured = Object.keys(pillRefs.current).length;
        if (totalMeasured === values.length) {
            setRowMap({ ...rowOrderRefs.current });
        }

        //   const top = event.nativeEvent.layout.y;

        // if (!rowOrder[top]) rowOrder[top] = [];
        // rowOrder[top].push(val);

        // if (Object.keys(pillRefs.current).length + 1 === values.length) {
        //     setRowMap(rowOrder);
        // }
        // pillRefs.current[val] = top;
    };

    const Container = wrap ? View : ScrollView;

    let renderedValues = values;

    const rowKeys = Object.keys(rowMap).map(Number).sort((a, b) => a - b);
    const totalRows = rowKeys.length;

    if (wrap && extendable && !isExpanded && totalRows >= visibleRows) {
        const noOfRenderedRows = rowKeys.slice(0, visibleRows - 1);
        renderedValues = noOfRenderedRows.flatMap((key) => rowMap[key]);
    }

    return (
        <>
        <Container
            className={wrap ? 'flex-row flex-wrap' : 'flex-row'}
            horizontal={!wrap}
            showsHorizontalScrollIndicator={false}
        >
            {renderedValues.map((val) => (
            <View 
                key={val} 
                onLayout={(e) => wrap && extendable && handleLayout(val, e)}
            >
                <Pill
                    value={val}
                    textColor={textColor}
                    selectedTextColor={selectedTextColor}
                    defaultColor={defaultColor}
                    selectedColor={selectedColor}
                    borderStyle={borderStyle}
                    selected={selected.includes(val)}
                    onPress={() => toggleSelection(val)}
                />
            </View>
            ))}
            {allowAddValue && 
            <TouchableOpacity
                onPress={() => setShowAddValueModal(true)}
                className={`flex-row gap-2 items-center rounded-full py-[0.6rem] px-[1rem] mr-2 mb-2 ${defaultColor} border ${selectedColor?.replace('bg', 'border')}`}
                activeOpacity={0.6}
            >
                <Entypo name='plus' size={16} color={'#0e7490'}/>
                <Text className={`${textColor}`}>Add</Text>
            </TouchableOpacity>
            }
            {wrap && extendable && totalRows >= visibleRows && !isExpanded && (
            <TouchableOpacity
                onPress={() => setIsExpanded(true)}
                className={`rounded-full py-[0.6rem] mr-2 mb-2 px-[1rem] bg-transparent`}
                activeOpacity={0.6}
            >
                <Text className={`${textColor} font-semibold`}>Show More...</Text>
            </TouchableOpacity>
            )}
            {wrap && extendable && totalRows >= visibleRows && isExpanded && (
            <TouchableOpacity
                onPress={() => setIsExpanded(false)}
                className={`rounded-full py-[0.6rem] px-[1rem] mr-2 mb-2 bg-transparent`}
                activeOpacity={0.6}
            >
                <Text className={`${textColor} font-semibold`}>Show less</Text>
            </TouchableOpacity>
            )}
        </Container>
        {showAddValueModal && 
        <AddValueModal
            setShowModal={setShowAddValueModal}
            values={values}
            setValues={setValues!}
        />}
        </>
    );
};
