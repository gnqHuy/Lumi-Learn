import React, { useEffect, useRef, useState } from 'react'
import { AccessibilityInfo, Button, Dimensions, findNodeHandle, Pressable, Text, View } from 'react-native'
import AntDesgin from '@expo/vector-icons/AntDesign';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { PillSelection } from '../PillsSelection/PillSelection';
import { GetAllTopics } from '@/api/topicApi';
import { ScrollView } from 'react-native-gesture-handler';
import CustomMarker from './CustomMarker';

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
    const positionPerStepCourseLengthSlider = sliderWidth / 20;

    const searchFilterRef = useRef(null);

    useEffect(() => {
        const node = findNodeHandle(searchFilterRef.current);
        if (node) {
            setTimeout(() => {
                AccessibilityInfo.setAccessibilityFocus(node);
            }, 100);
        }
    }, []);

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
        setRatingRange([0, 5]);
        setCourseLengthRange([0, 20]);
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
    <View className = "flex-col flex-1 items-center px-4 pb-6 gap-5 rounded-t-3xl bg-white w-full animate-slideUpToHalf">
        <View
            id='filter-top'
            className='w-full mt-5'
        >
            <Text className = "text-center font-bold text-xl text-cyan-800 p-2"
                ref={searchFilterRef}
                accessibilityRole='header'
            >
                Search Filter</Text>
            {/* close icon */}
            <Pressable className = "absolute p-2"
                onPress = {disableSearchFilter}
                accessible={true}
                accessibilityLabel='Close'
                accessibilityRole='button'
                accessibilityHint='Double tab to close Search Filter modal'
            >
                <AntDesgin name = "close" size = {24} className = ""/>
            </Pressable>
        </View>

        <ScrollView
            className='flex-1'
        >
            <View className='flex-col items-center gap-5 pb-6'>
                {/* topics */}
                <View 
                    id='topic-section'
                    className = "flex-col w-full gap-3"
                >
                    <Text className = "text-xl font-semibold text-cyan-800 p-1">
                        Topics</Text>
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
                        extendable={true}
                        visibleRows={4}
                    />
                </View>

                {/* rating */}
                <View 
                    id='rating-section'
                    className = "flex-col w-full gap-3"
                >
                    <Text className = "text-xl font-semibold text-cyan-800 p-1">Rating</Text>
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
                                customMarker={(e) => (
                                    <CustomMarker currentValue={e.currentValue} sliderType="rating" />
                                )}
                            />
                        </View>
                        {/* Start value label */}
                        <Text
                            className="absolute top-[3rem] text-cyan-700"
                            style={{
                                left: ratingRange[0] * positionPerStep + 9,
                            }}
                            accessible={false}
                        >
                            {ratingRange[0]}
                        </Text>

                        {/* End value label */}
                        <Text
                            className="absolute top-[3rem] text-cyan-700"
                            style={{
                                left: ratingRange[1] * positionPerStep + 9,
                            }}
                            accessible={false}
                        >
                            {ratingRange[1]}
                        </Text>
                    </View>
                </View>

                {/* course length */}
                <View 
                    id='course-length-section'
                    className = "flex-col gap-3 w-full"
                >
                    <Text className = "text-xl font-semibold text-cyan-800 p-1">Course length</Text>
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
                                max={20}
                                step={1}
                                snapped={true}
                                selectedStyle={{backgroundColor: "#155e75"}}
                                unselectedStyle={{backgroundColor: "#e5e7eb"}}
                                markerStyle={{backgroundColor: "white", borderColor: "#155e75", borderStyle: "solid", borderWidth: 2, width: 20, height: 20}}
                                customMarker={(e) => (
                                    <CustomMarker currentValue={e.currentValue} sliderType="courseLength" />
                                )}
                            />
                        </View>
                        {/* Start value label */}
                        <Text
                            className="absolute top-[3rem] text-cyan-700"
                            style={{
                                left: courseLengthRange[0] * positionPerStepCourseLengthSlider + 9,
                            }}
                            accessible={false}
                        >
                            {Math.floor(courseLengthRange[0])}
                        </Text>

                        {/* End value label */}
                        <Text
                            className="absolute top-[3rem] text-cyan-700"
                            style={{
                                left: courseLengthRange[1] * positionPerStepCourseLengthSlider + (courseLengthRange[1] < 10 ? 9 : (courseLengthRange[1] === 20 ? 2 : 6))
                            }}
                            accessible={false}
                        >
                            {`${Math.floor(courseLengthRange[1])}${courseLengthRange[1] === 20 ? '+' : ''}`}
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
                        accessible={true}
                        accessibilityRole='button'
                        accessibilityHint='Double tab to clear filter'
                    >
                        <Text className = "text-lg font-semibold text-center text-cyan-700">Clear filter</Text>
                    </Pressable>
                    <Pressable 
                        className = {`py-[0.5rem] w-[48%] rounded-xl
                            ${isApplyButtonPressed ? 'bg-cyan-700' : 'bg-cyan-600'}`}
                        onPress={() => applyFilter()}
                        onPressIn={() => setApplyButtonPressed(true)}
                        onPressOut={() => setApplyButtonPressed(false)}
                        accessible={true}
                        accessibilityRole='button'
                        accessibilityHint='Double tab to apply filter'
                    >
                        <Text className = {`text-lg font-semibold text-center text-white`}>Apply filter</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default SearchFilter
