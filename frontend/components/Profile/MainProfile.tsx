import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

interface MainProfileProps {
    setupDisplayInformation: (display: boolean) => void;
}
const MainProfile = ({setupDisplayInformation}: MainProfileProps) => {
  return (
    <View className = "mt-[4rem] animate-slideRightFromLeft">
        {/* username and avatar */}
        <View className = "w-[100vw] pb-[1rem] border-solid border-b-[1px] border-b-black">
            <View>
                <Image source = {require('../../assets/images/userAvatarTest.png')} alt = "" className = "w-[7rem] h-[7rem] relative left-[39vw] mt-[3rem]" />
                <Text className = "text-center text-2xl font-bold mt-[0.5rem]">Username</Text>
            </View>
        </View>

        {/* account controller */}
        <View className = "mt-[1rem] relative left-[5%]">
            <Text className = "text-xl font-bold">Account</Text>
            {/* options */}
            <View className = "flex-col mt-[0.5rem]">
                {/* information */}
                <Pressable className = "w-[90%] border-solid border-black border-[2px] border-b-[1px] pl-[1rem] py-[0.7rem] rounded-tl-lg rounded-tr-lg" onPress={() => setupDisplayInformation(true)}>
                    <Text className = "text-xl">Information</Text>
                    <AntDesign name = "right" size = {24} className = "absolute right-4 top-3" /> 
                </Pressable>
                <View className = "w-[90%] border-solid border-black border-[2px] border-t-[0px] pl-[1rem] py-[0.7rem] rounded-bl-lg rounded-br-lg">
                    <Text className = "text-xl">Change password</Text>
                    <AntDesign name = "right" size = {24} className = "absolute right-4 top-3" /> 
                </View>
            </View>
        </View>

        {/* settings controller */}
        <View className = "mt-[3rem] relative left-[5%]">
            <Text className = "text-xl font-bold">Settings</Text>
            {/* options */}
            <View className = "flex-col mt-[0.5rem]">
                {/* information */}
                <View className = "w-[90%] border-solid border-black border-[2px] border-b-[1px] pl-[1rem] py-[0.7rem] rounded-tl-lg rounded-tr-lg">
                    <Text className = "text-xl">Policy</Text>
                    <AntDesign name = "right" size = {24} className = "absolute right-4 top-3" /> 
                </View>
                <View className = "w-[90%] border-solid border-black border-[2px] border-t-[0px] pl-[1rem] py-[0.7rem] rounded-bl-lg rounded-br-lg">
                    <Text className = "text-xl">Helps</Text>
                    <AntDesign name = "right" size = {24} className = "absolute right-4 top-3" /> 
                </View>
            </View>
        </View>

        {/* theme controller */}
        <View className = "mt-[3rem] relative left-[5%]">
            <Text className = "text-xl font-bold">Theme</Text>
            {/* options */}
            <View className = "flex-col mt-[0.5rem]">
                {/* information */}
                <View className = "w-[90%] border-solid border-black border-[2px] pl-[1rem] py-[0.7rem] rounded-tl-lg rounded-lg">
                    <Text className = "text-xl">Change</Text>
                    <AntDesign name = "right" size = {24} className = "absolute right-4 top-3" /> 
                </View>
            </View>
        </View>

        {/* logout */}
        <View className = "mt-[3rem] w-[60%] relative left-[20%] border-solid border-[2px] border-black rounded-lg py-[0.7rem]">
            <Text className = "text-xl text-center">Logout</Text>
        </View>
    </View>
  )
}

export default MainProfile
