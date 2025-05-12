import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

interface HelpsProps {
    setupDisplayHelp: (display: boolean) => void;
}

const Helps = ({ setupDisplayHelp }: HelpsProps) => {
    const [accessibleRender, setAccessibleRender] = useState(false);
             
    useEffect(() => {
    const timeout = setTimeout(() => {
        setAccessibleRender(true);
    }, 0);

    return () => {
        clearTimeout(timeout);
    }
    }, []); 

  return (
    <ScrollView className = "mt-[4rem] animate-slideLeftFromRight">
        {/* header */}
        <View className = "w-[100vw] border-solid border-black border-b-[1px] pb-[1rem] mt-[1rem]">
            <Text className = "text-center text-3xl font-bold"
                accessible={true}
                accessibilityLabel='Helps'
                accessibilityRole='header'
            >
                Helps</Text>
            <Pressable className = "absolute left-8 top-1"
                onPress={() => setupDisplayHelp(false)}
                accessible={true}
                accessibilityLabel='Back'
                accessibilityRole='button'
                accessibilityHint='Double tab to return to Profile page'
            >
                <AntDesign name = "arrowleft" size = {24} />
            </Pressable>
        </View>

        {/* paragraph 1 */}
        <View className = "mt-[2rem] relative left-[5%] w-[90%]">
            <Text className = "text-2xl font-bold">Getting Started</Text>
            <Text className = "text-lg mt-[0.5rem]"><Text className = "font-bold">Lumilearn</Text> is designed to work seamlessly with screen readers and voice navigation tools. When you open the app, you will find a simple and clear menu to guide you to your learning resources. If you ever feel lost, you can return to the Home screen at any time by using the "Home" button located at the bottom of the app.</Text>
        </View>

        {/* paragraph 2 */}
        <View className = "mt-[1.5rem] relative left-[5%] w-[90%]">
            <Text className = "text-2xl font-bold">Accessibility Support</Text>
            <Text className = "text-lg mt-[0.5rem]">Accessibility is our top priority. All content within <Text className = "font-bold">Lumilearn</Text> is fully compatible with screen readers like VoiceOver (iOS) and TalkBack (Android). Our buttons, menus, and learning materials are labeled clearly so that you can navigate with confidence. If you encounter any part of the app that is difficult to access, please let us know — we are committed to continuous improvement.</Text>
        </View>
    </ScrollView>
  )
}

export default Helps
