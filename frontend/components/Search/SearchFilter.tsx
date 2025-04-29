import React, { useEffect, useState } from 'react'
import { Button, Dimensions, Pressable, Text, View } from 'react-native'
import AntDesgin from '@expo/vector-icons/AntDesign';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { PillSelection } from '../PillsSelection/PillSelection';
import { GetAllTopics } from '@/api/topicApi';

interface SearchFilterProps {
    disableSearchFilter: () => void;
}
const SearchFilter = ({disableSearchFilter}: SearchFilterProps) => {
    const [ratingRange, setRatingRange] = useState<number[]>([2, 8]);
    const [ selectedTopics, setSelectedTopics ] = useState<string[]>([]);
    const [ selectedLength, setSelectedLength ] = useState<string[]>([]);
    const [ isClearButtonPressed, setClearButtonPressed ] = useState(false);
    const [ isApplyButtonPressed, setApplyButtonPressed ] = useState(false);
    const [ topics, setTopics ] = useState<string[]>([]);
    const screenWidth = Dimensions.get('window').width;
    const sliderWidth = screenWidth - 28 * 2;
    const positionPerStep = sliderWidth / 10;

    useEffect(() => {
        GetAllTopics().then((res) => {
            const data = res.data;
            const names = data.map((topic: any) => topic.name);
            setTopics(names);
        }).catch((err) => {
            console.log(err.message);
        });
    }, []);

    const clearSearchFilter = () => {
        setSelectedTopics([]);
        setSelectedLength([]);
        setRatingRange([2, 8]);
    }

    const applyFilter = () => {
        disableSearchFilter();
    }

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
    
  return (
    <View className = "flex-col items-center px-4 pb-6 gap-5 rounded-t-3xl bg-white w-full animate-slideUpToHalf">
        <View
            id='filter-top'
            className='w-full'
        >
            <Text className = "text-center font-semibold text-xl mt-5">Search Filter</Text>
            {/* close icon */}
            <Pressable className = "absolute top-4">
                <AntDesgin name = "close" size = {24} className = "" onPress = {disableSearchFilter}/>
            </Pressable>
        </View>

        {/* topics */}
        <View 
            id='topic-section'
            className = "flex-col w-full gap-3"
        >
            <Text className = "text-xl font-semibold">Topics</Text>
            {/* list of topics */}
            <PillSelection
                values={topics}
                multiSelect={true}
                selected={selectedTopics}
                setSelected={setSelectedTopics}
                wrap={true}
            />
        </View>

        {/* rating */}
        <View 
            id='rating-section'
            className = "flex-col w-full gap-3"
        >
            <Text className = "text-xl font-semibold">Rating</Text>
            <View
                id='slider-container'
                className='flex-col items-center px-3 w-full'
            >
                <View id='slider'>
                    <MultiSlider 
                        values={ratingRange}
                        sliderLength={screenWidth - 2 * 28}
                        onValuesChange={setRatingRange}
                        min={0}
                        max={10}
                        step={1}
                        snapped={true}
                        selectedStyle={{backgroundColor: "black"}}
                        unselectedStyle={{backgroundColor: "#e5e7eb"}}
                        markerStyle={{backgroundColor: "white", borderColor: "black", borderStyle: "solid", borderWidth: 2, width: 20, height: 20}}
                    />
                </View>
                {/* Start value label */}
                <Text
                    className="absolute top-[3rem]"
                    style={{
                        left: ratingRange[0] * positionPerStep + 9,
                    }}
                >
                    {Math.floor(ratingRange[0])}
                </Text>

                {/* End value label */}
                <Text
                    className="absolute top-[3rem]"
                    style={{
                        left: ratingRange[1] * positionPerStep + 9,
                    }}
                >
                    {Math.floor(ratingRange[1])}
                </Text>
            </View>
        </View>

        {/* course length */}
        <View 
            id='course-length-section'
            className = "flex-col gap-4 w-full"
        >
            <Text className = "text-xl font-semibold">Course length</Text>
            {/* choices */}
            <PillSelection
                values={dummyCourseLength}
                multiSelect={false}
                selected={selectedLength}
                setSelected={setSelectedLength}
                wrap={true}
            />
        </View>

        {/* buttons */}
        <View 
            id='button-container'
            className = "flex-row justify-between w-full px-6"
        >
            <Pressable 
                className = {`py-[0.5rem] w-[48%] rounded-xl border-solid border-[1px]
                    ${isClearButtonPressed ? 'border-gray-700 bg-gray-300' : 'border-black bg-gray-200'}`}
                onPress={() => clearSearchFilter()}
                onPressIn={() => setClearButtonPressed(true)}
                onPressOut={() => setClearButtonPressed(false)}
            >
                <Text className = "text-lg font-semibold text-center">Clear filter</Text>
            </Pressable>
            <Pressable 
                className = {`py-[0.5rem] w-[48%] rounded-xl
                    ${isApplyButtonPressed ? 'bg-gray-300' : 'bg-gray-400'}`}
                onPress={() => applyFilter()}
                onPressIn={() => setApplyButtonPressed(true)}
                onPressOut={() => setApplyButtonPressed(false)}
            >
                <Text className = {`text-lg font-semibold text-center text-white`}>Apply filter</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default SearchFilter
