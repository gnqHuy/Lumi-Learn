import React, { useState } from 'react'
import { Button, Pressable, Text, View } from 'react-native'
import AntDesgin from '@expo/vector-icons/AntDesign';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

interface SearchFilterProps {
    disableSearchFilter: () => void;
}
const SearchFilter = ({disableSearchFilter}: SearchFilterProps) => {
    const [ratingRange, setRatingRange] = useState<number[]>([2, 8]);
    const [chosenCategories, setChosenCategories] = useState(['Math']);
    const [chosenCourseLength, setChosenCourseLength] = useState("1-5 Lessons");

    // dummy categories
    const dummyCategories = [
        "Math",
        "Literature",
        "History",
        "Science",
        "Technology",
        "Physics", 
        "Art"
    ]

    // dummy course length
    const dummyCourseLength = [
        "1-5 Lessons",
        "6-10 Lessons",
        "11-15 Lessons",
        "16-20 Lessons",
        ">20 Lessons"
    ]
    
    // add categories 
    const addChosenCategory = (category: string) => {
        setChosenCategories(prev => [...prev, category]);
    }   

    // remove categories
    const removeChosenCategory = (category:string) => {
        const newCategories = chosenCategories.filter(ctg => ctg !== category);
        setChosenCategories(newCategories);
    }

    // check if category is in chosen categories
    const checkContainCategory = (category: string) => {
        return chosenCategories.includes(category);
    }
  return (
    <View className = "bg-white w-[100vw] h-[70vh] rounded-tl-2xl rounded-tr-2xl animate-slideUpToHalf">
        <Text className = "text-center font-bold text-3xl mt-[1rem]">Search Filter</Text>
        {/* close icon */}
        <Pressable className = "absolute left-2 top-4">
            <AntDesgin name = "close" size = {32} className = "" onPress = {disableSearchFilter}/>
        </Pressable>

        {/* categories */}
        <View className = "mt-[1rem] relative left-[3%]">
            <Text className = "text-2xl font-bold">Categories</Text>
            {/* list of categories */}
            <View className = "flex-row flex-wrap mt-[1rem] gap-x-2 gap-y-4">
                {dummyCategories.map((category, index) => {
                    return (
                        <Pressable key = {index} className = {!checkContainCategory(category) ? `bg-gray-200 rounded-full py-[0.6rem] px-[1.5rem]` : `bg-gray-500 rounded-full py-[0.6rem] px-[1.5rem]`} onPress={() => {
                            checkContainCategory(category) ? removeChosenCategory(category) : addChosenCategory(category);
                        }}>
                            <Text className = {checkContainCategory(category) ? "text-white" : ""}>{category}</Text>
                        </Pressable>
                    )
                })}
            </View>
        </View>

        {/* rating */}
        <View className = "mt-[2rem] relative left-[3%]">
            <Text className = "text-2xl font-bold">Rating</Text>
            <View className = "mt-[1rem]">
                <MultiSlider 
                    values={ratingRange}
                    sliderLength={380}
                    onValuesChange={setRatingRange}
                    min={0}
                    max={10}
                    step={1}
                    selectedStyle={{backgroundColor: "black"}}
                    unselectedStyle={{backgroundColor: "#e5e7eb"}}
                    markerStyle={{backgroundColor: "white", borderColor: "black", borderStyle: "solid", borderWidth: 2, width: 20, height: 20}}
                />
            </View>
            {/* text below marker */}
            <Text className = {`absolute top-[6rem]`} style = {{left: Math.floor(ratingRange[0])*36}}>{Math.floor(ratingRange[0])}</Text>
            <Text className = {`absolute top-[6rem]`} style = {{left: Math.floor(ratingRange[1])*37.5}}>{Math.floor(ratingRange[1])}</Text>
        </View>

        {/* course length */}
        <View className = "mt-[2.5rem] relative left-[3%]">
            <Text className = "text-2xl font-bold">Course length</Text>
            {/* choices */}
            <View className = "flex-row flex-wrap mt-[1rem] gap-x-2 gap-y-4">
                {dummyCourseLength.map((courseLength, index) => {
                    return (
                        <Pressable key = {index} className = {chosenCourseLength !== courseLength ? "bg-gray-200 rounded-full py-[0.6rem] px-[1.5rem]" : "bg-gray-500 rounded-full py-[0.6rem] px-[1.5rem]"} onPress={() => setChosenCourseLength(courseLength)}>
                            <Text className = {chosenCourseLength === courseLength ? "text-white" : ""}>{courseLength}</Text>
                        </Pressable>
                    )
                })}
            </View>
        </View>

        {/* buttons */}
        <View className = "mt-[2rem] relative left-[5.5%] flex-row gap-10">
            <View className = "bg-gray-200 py-[0.5rem] w-[40%] rounded-xl border-solid border-[1px] border-black">
                <Text className = "text-xl text-center">Clear filter</Text>
            </View>
            <View className = "bg-gray-400 py-[0.5rem] w-[40%] rounded-xl">
                <Text className = "text-xl text-center text-white">Apply filter</Text>
            </View>
        </View>
    </View>
  )
}

export default SearchFilter
