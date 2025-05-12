import React, { useEffect, useState } from 'react'
import { Button, Dimensions, Pressable, Text, View } from 'react-native'
import AntDesgin from '@expo/vector-icons/AntDesign';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { PillSelection } from '../PillsSelection/PillSelection';
import { GetAllTopics } from '@/api/topicApi';

interface SearchFilterProps {
    disableSearchFilter: () => void;
    setupDisplaySearch: (display: boolean) => void;
    setupDisplaySearchResult: (display: boolean) => void;
    handleFilterCourse: (rating: number[], topics: string[], length: number[]) => void;
    ratingRange: number[];
    setRatingRange: (ratingRange: number[]) => void;
    courseLengthRange: number[], 
    setCourseLengthRange: (courseLengthRange: number[]) => void;
    selectedTopics: string[], 
    setSelectedTopics: (selectedTopics: string[]) => void;
}
const SearchFilter = ({disableSearchFilter, setupDisplaySearch, setupDisplaySearchResult, handleFilterCourse, ratingRange, setRatingRange, courseLengthRange, setCourseLengthRange, selectedTopics, setSelectedTopics}: SearchFilterProps) => {


    // state of buttons
    const [ isClearButtonPressed, setClearButtonPressed ] = useState(false);
    const [ isApplyButtonPressed, setApplyButtonPressed ] = useState(false);

    // all topics
    const [ topics, setTopics ] = useState<string[]>([]);

    // some attribute to calculate
    const screenWidth = Dimensions.get('window').width;
    const sliderWidth = screenWidth - 28 * 2;
    const positionPerStep = sliderWidth / 5;
    const positionPerStepCourseLengthSlider = sliderWidth / 30;

    useEffect(() => {
        GetAllTopics().then((res) => {
            const data = res.data;
            const names = data.map((topic: any) => topic.name);
            setTopics(["All", ...names]);
        }).catch((err) => {
            console.log(err.message);
        });
    }, []);

    // handle when clear search filter
    const clearSearchFilter = () => {
        setSelectedTopics([]);
        setRatingRange([2, 8]);
    }

    // handle when apply filter
    const applyFilter = () => {
        disableSearchFilter();
        handleFilterCourse(ratingRange, selectedTopics, courseLengthRange);
        console.log('rating range' + ratingRange[0] + "-->" + ratingRange[1]);
        console.log('topics selected: ' + selectedTopics);
        console.log('course length range: ' + courseLengthRange[0] + "-->" + courseLengthRange[1]);
    }
    
  return (
    <View className = "flex-col items-center px-4 pb-6 gap-5 rounded-t-3xl bg-white w-full animate-slideUpToHalf">
        <View
            id='filter-top'
            className='w-full'
        >
            <Text className = "text-center font-bold text-xl mt-5 text-cyan-800">Search Filter</Text>
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
            <Text className = "text-xl font-semibold text-cyan-800">Topics</Text>
            {/* list of topics */}
            <PillSelection
                values={topics}
                multiSelect={true}
                selected={selectedTopics}
                setSelected={setSelectedTopics}
                wrap={true}
                defaultColor='bg-zinc-100'
                selectedColor='bg-cyan-700'
                textColor='text-cyan-700'
            />
        </View>

        {/* rating */}
        <View 
            id='rating-section'
            className = "flex-col w-full gap-3"
        >
            <Text className = "text-xl font-semibold text-cyan-800">Rating</Text>
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
                        max={5}
                        step={1}
                        snapped={true}
                        selectedStyle={{backgroundColor: "#155e75"}}
                        unselectedStyle={{backgroundColor: "#e5e7eb"}}
                        markerStyle={{backgroundColor: "white", borderColor: "#155e75", borderStyle: "solid", borderWidth: 2, width: 20, height: 20}}
                    />
                </View>
                {/* Start value label */}
                <Text
                    className="absolute top-[3rem] text-cyan-700"
                    style={{
                        left: ratingRange[0] * positionPerStep + 9,
                    }}
                >
                    {Math.floor(ratingRange[0])}
                </Text>

                {/* End value label */}
                <Text
                    className="absolute top-[3rem] text-cyan-700"
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
            className = "flex-col gap-3 w-full"
        >
            <Text className = "text-xl font-semibold text-cyan-800">Course length</Text>
            <View
                id='slider-container'
                className='flex-col items-center px-3 w-full'
            >
                <View id='slider'>
                    <MultiSlider 
                        values={courseLengthRange}
                        sliderLength={screenWidth - 2 * 28}
                        onValuesChange={setCourseLengthRange}
                        min={0}
                        max={30}
                        step={1}
                        snapped={true}
                        selectedStyle={{backgroundColor: "#155e75"}}
                        unselectedStyle={{backgroundColor: "#e5e7eb"}}
                        markerStyle={{backgroundColor: "white", borderColor: "#155e75", borderStyle: "solid", borderWidth: 2, width: 20, height: 20}}
                    />
                </View>
                {/* Start value label */}
                <Text
                    className="absolute top-[3rem] text-cyan-700"
                    style={{
                        left: courseLengthRange[0] * positionPerStepCourseLengthSlider + 9,
                    }}
                >
                    {Math.floor(courseLengthRange[0])}
                </Text>

                {/* End value label */}
                <Text
                    className="absolute top-[3rem] text-cyan-700"
                    style={{
                        left: courseLengthRange[1] * positionPerStepCourseLengthSlider + 9,
                    }}
                >
                    {Math.floor(courseLengthRange[1])}
                </Text>
            </View>
        </View>

        {/* buttons */}
        <View 
            id='button-container'
            className = "flex-row justify-between w-full px-6"
        >
            <Pressable 
                className = {`py-[0.5rem] w-[48%] rounded-xl border-solid border-[1px]
                    ${isClearButtonPressed ? 'border-cyan-800 bg-gray-300' : 'border-cyan-700 bg-gray-200'}`}
                onPress={() => clearSearchFilter()}
                onPressIn={() => setClearButtonPressed(true)}
                onPressOut={() => setClearButtonPressed(false)}
            >
                <Text className = "text-lg font-semibold text-center text-cyan-700">Clear filter</Text>
            </Pressable>
            <Pressable 
                className = {`py-[0.5rem] w-[48%] rounded-xl
                    ${isApplyButtonPressed ? 'bg-cyan-800' : 'bg-cyan-700'}`}
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
