import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

interface ChangeThemeProps {
    setupDisplayChangeTheme: (display: boolean) => void;
}

const ChangeTheme = ({setupDisplayChangeTheme}: ChangeThemeProps) => {
    const [theme, setTheme] = useState("light");
  return (
    <View className = "bg-white w-[100vw] h-[30vh] rounded-tl-2xl rounded-tr-2xl">
        {/* close icon */}
        <Pressable className = "absolute left-2 top-4 z-[10]" onPress = {() => setupDisplayChangeTheme(false)}>
            <AntDesign name = "close" size = {32} className = ""/>
        </Pressable>
        {/* title */}
        <Text className = "text-2xl font-bold text-center mt-[1.2rem] text-cyan-700">Theme</Text>
        {/* options */}
        <View className = "relative left-[15%] mt-[1.5rem] flex-col gap-4">
            <Pressable className = "w-[70%] border-solid border-[1px] border-black rounded-2xl py-[0.7rem] pl-[1.5rem] bg-slate-100" onPress={() => setTheme('dark')}>
                <Text className = "text-xl">Dark</Text>
                {theme === 'dark' && 
                    <Feather name = "check" size = {28} className = "absolute right-4 top-2" />
                }
            </Pressable>
            <Pressable className = "w-[70%] border-solid border-[1px] border-black rounded-2xl py-[0.7rem] pl-[1.5rem] bg-slate-100" onPress={() => setTheme('light')}>
                <Text className = "text-xl">Light</Text>
                {theme === 'light' && 
                    <Feather name = "check" size = {28} className = "absolute right-4 top-2" />
                }
            </Pressable>
        </View>
    </View>
  )
}

export default ChangeTheme
