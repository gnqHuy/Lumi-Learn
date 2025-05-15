import React, { useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import AntDesgin from '@expo/vector-icons/AntDesign';
import { Topic } from '@/types/topic';
import { CourseItemProps } from '../Course/CourseItem';
import CourseList from '../Course/CourseList';
import { ScrollView } from 'react-native-gesture-handler';

interface SearchProps {
    recentSearches: SearchInfo[],
    deleteSearchHistory: (content: any) => void
    displaySearchResult: boolean,
    searchedCourses: CourseItemProps[],
    handleAutoFillAndSearchKeyword: (val: string) => void;
}

type SearchInfo  = {
    content: string
}

const Search = ({recentSearches, deleteSearchHistory, displaySearchResult, searchedCourses, handleAutoFillAndSearchKeyword}: SearchProps) => {
    const [option, setOption] = useState(1);
  return (
    <ScrollView className = "h-full" keyboardShouldPersistTaps = 'always'>
        {displaySearchResult === false &&
            <ScrollView className = "relative left-[4%] animate-slideLeftFromRight" keyboardShouldPersistTaps = 'handled'>
                {/* recent searches */}
                <View className = "">
                    <Text className = "text-lg font-semibold py-1">Recent searches</Text>
                    <View className = "flex-col gap-2 mt-[1rem] relative left-[4%]">
                        {recentSearches.map((search, index) => {
                            return (
                                <View 
                                    className = "flex-row" 
                                    key = {index} 
                                    // activeOpacity={0.5}
                                >
                                    <Pressable
                                        onPress={() => handleAutoFillAndSearchKeyword(search.content)}
                                        accessible={true}
                                        accessibilityLabel={`${search.content}. search content`}
                                        accessibilityHint='Double tab to search course by this content'
                                        className="w-full"
                                    >
                                        <Text className = "text-lg py-2">{search.content}</Text>
                                    </Pressable>
                                    <TouchableOpacity
                                        className = "absolute right-14 z-[20] p-2" 
                                        onPress={() => deleteSearchHistory(search.content)}
                                        activeOpacity={0.7}
                                        accessible={true}
                                        accessibilityLabel='Delete'
                                        accessibilityRole='button'
                                        accessibilityHint='Double tab to delete this search content'
                                    >
                                        <AntDesgin name = "close" size = {24}/>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        }

        {displaySearchResult === true && 
            <View className = "">
                <Text className = "text-xl font-bold relative left-[2rem]">Courses:</Text>
                <ScrollView
                    className = ""
                    contentContainerStyle = {{paddingBottom: 20}}
                >
                    <View className = "flex-col w-full items-center" id='my-course-screen'>
                        {searchedCourses.length ? 
                            <CourseList 
                                courses={searchedCourses}
                            /> : 
                            <Text className = "mt-[1rem] text-lg">{`No courses found for your search`}</Text>
                        }
                    </View>
                </ScrollView>
            </View>
        }
    </ScrollView>
  )
}

export default Search
