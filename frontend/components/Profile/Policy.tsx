import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

interface PolicyProps {
    setupDisplayPolicy: (display: boolean) => void;
}
const Policy = ({ setupDisplayPolicy }: PolicyProps) => {
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
        <View className="flex-row items-center bg-white justify-between mb-4 px-5 border-solid border-black border-b-[1px]">
            <Text className="text-[24px] font-bold text-cyan-800 absolute left-4 right-4 text-center p-3 mb-2"
                accessible={true}
                accessibilityLabel='Policy'
                accessibilityRole='header'
            >
                Policy</Text>
            <Pressable className={!accessibleRender ? 'hidden' : " p-3 mb-2"}
                onPress={() => setupDisplayPolicy(false)}
                accessible={true}
                accessibilityLabel='Back'
                accessibilityRole='button'
                accessibilityHint='Double tab to return to Profile page'
            >
                <AntDesign name = "arrowleft" size = {24} color={'#155e75'}/> 
            </Pressable>
        </View>

        {/* paragraph 1 */}
        <View className = "mt-5 relative left-[5%] w-[90%]"
            accessible={true}
        >
            <Text className = "text-lg">At <Text className = "font-bold">Lumilearn</Text>, we believe that education should be accessible to everyone, regardless of physical ability. Our mission is to empower blind and visually impaired individuals by providing an intuitive, reliable, and fully accessible learning platform. Every feature is carefully designed to work seamlessly with screen readers, voice commands, and other assistive technologies.</Text>
        </View>

        {/* paragraph 2 */}
        <View className = "mt-[1.5rem] relative left-[5%] w-[90%]"
            accessible={true}
        >
            <Text className = "text-lg">Accessibility is at the heart of our development process. From navigation to content interaction, <Text className = "font-bold">Lumilearn</Text> ensures that users can engage with educational materials independently and comfortably. We are committed to continuously improving our app based on feedback from the blind community, educators, and accessibility experts.</Text>
        </View>

        {/* paragraph 3 */}
        <View className = "mt-[1.5rem] relative left-[5%] w-[90%]"
            accessible={true}
        >
            <Text className = "text-lg">As developers of <Text className = "font-bold">Lumilearn</Text>, we are dedicated to fostering an inclusive learning environment. We see technology as a bridge to opportunity, and we are proud to support the blind and visually impaired community in their pursuit of knowledge, confidence, and success.</Text>
        </View>
    </ScrollView>
  )
}

export default Policy
