import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import AntDesgin from '@expo/vector-icons/AntDesign';

interface SearchProps {
    dummyRecentSearches: string[]
    setupDummyRecentSearches: (newRecentSearches: string[]) => void;
}

const Search = ({dummyRecentSearches, setupDummyRecentSearches}: SearchProps) => {
    const [option, setOption] = useState(1);

    const handleDeleteRecentSearch = (index: any) => {
        const deleted = dummyRecentSearches.filter((_, idx) => idx !== index);
        setupDummyRecentSearches(deleted);
    }
  return (
    <View className = "relative left-[4%]">
        {/* header */}
        <View className = "mt-[2rem]">
            <Text className = "text-xl font-bold">Topic you may like</Text>
            {/* topics */}
            <View className = "flex-row mt-[1rem] gap-3">
                <Pressable className = {`rounded-full py-[0.5rem] px-[1.2rem] border-solid border-[2px] ${option === 1 ? "bg-gray-400" : ""}`} onPress={() => setOption(1)}>
                    <Text className = {option === 1 ? "text-white" : ""}>Science</Text>
                </Pressable>
                <Pressable className = {`rounded-full py-[0.5rem] px-[1.2rem] border-solid border-[2px] ${option === 2 ? "bg-gray-400" : ""}`} onPress={() => setOption(2)}>
                    <Text className = {option === 2 ? "text-white" : ""}>Math</Text>
                </Pressable>
                <Pressable className = {`rounded-full py-[0.5rem] px-[1.2rem] border-solid border-[2px] ${option === 3 ? "bg-gray-400" : ""}`} onPress={() => setOption(3)}>
                    <Text className = {option === 3 ? "text-white" : ""}>Literature</Text>
                </Pressable>
                <Pressable className = {`rounded-full py-[0.5rem] px-[1.2rem] border-solid border-[2px] ${option === 4 ? "bg-gray-400" : ""}`} onPress={() => setOption(4)}>
                    <Text className = {option === 4 ? "text-white" : ""}>Physics</Text>
                </Pressable>
            </View>
        </View>

        {/* recent searches */}
        <View className = "mt-[2rem]">
            <Text className = "text-xl font-bold">Recent searches</Text>
            <View className = "flex-col gap-8 mt-[1rem] relative left-[4%]">
                {dummyRecentSearches.map((search, index) => {
                    return (
                        <View className = "flex-row" key = {index}>
                            <Text className = "text-lg">{search}</Text>
                            <Pressable className = "absolute right-14" onPress={() => handleDeleteRecentSearch(index)}>
                                <AntDesgin name = "close" size = {24}/>
                            </Pressable>
                        </View>
                    )
                })}
            </View>
        </View>
    </View>
  )
}

export default Search
