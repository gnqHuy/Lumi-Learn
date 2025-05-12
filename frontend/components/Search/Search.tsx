import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
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
    <ScrollView>
        {displaySearchResult === false &&
            <View className = "relative left-[4%] animate-slideLeftFromRight">
                {/* recent searches */}
                <View className = "">
                    <Text className = "text-lg font-semibold">Recent searches</Text>
                    <View className = "flex-col gap-8 mt-[1rem] relative left-[4%]">
                        {recentSearches.map((search, index) => {
                            return (
                                <Pressable className = "flex-row" key = {index} onPress = {() => handleAutoFillAndSearchKeyword(search.content)}>
                                    <Text className = "text-lg">{search.content}</Text>
                                    <Pressable className = "absolute right-14 z-[20]" onPress={() => deleteSearchHistory(search.content)}>
                                        <AntDesgin name = "close" size = {24}/>
                                    </Pressable>
                                </Pressable>
                            )
                        })}
                    </View>
                </View>
            </View>
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
