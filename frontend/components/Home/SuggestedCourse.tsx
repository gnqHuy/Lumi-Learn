import FontAwesome from '@expo/vector-icons/FontAwesome'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CourseList from '../Course/CourseList';
import { CourseItemProps } from '../Course/CourseItem';
import { PillSelection } from '../PillsSelection/PillSelection';

interface SuggestedCourses {
    courses: CourseItemProps[],
    filters: string[],
    selectedFilter: string[],
    setSelectedFilter: (filters: string[]) => void
}


const SuggestedCourse = ({courses, filters, selectedFilter, setSelectedFilter}: SuggestedCourses) => {

    return (
        <View className = "flex-1 flex-col gap-3 px-5"> 
            {/* title */}
            <View className = "">
                <Text className = "text-lg text-cyan-800 font-bold">Choose your courses</Text>
            </View>
            {/* options filter */}
            <PillSelection
                values={filters}
                defaultColor='bg-zinc-100'
                selectedColor='bg-cyan-700'
                textColor='text-cyan-700'
                selected={selectedFilter}
                setSelected={setSelectedFilter}
            />

            {/* courses */}
            <CourseList courses={courses}
            />
        </View>
    )
}

export default SuggestedCourse
