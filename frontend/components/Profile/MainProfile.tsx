import React from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { ScrollView } from 'react-native-gesture-handler';
import { User } from '@/types/user';
import { Entypo } from '@expo/vector-icons';

interface MainProfileProps {
    setupDisplayInformation: (display: boolean) => void;
    setupDisplayChangePassword: (display: boolean) => void;
    setupDisplayPolicy: (display: boolean) => void;
    setupDisplayHelp: (display: boolean) => void;
    handleLogOut: () => void;
    userProfile: User
}
const MainProfile = ({setupDisplayInformation, setupDisplayChangePassword, setupDisplayPolicy, setupDisplayHelp, handleLogOut, userProfile}: MainProfileProps) => {
  return (
    <ScrollView className = "animate-slideRightFromLeft">
        {/* username and avatar */}
        <View className = "w-[100vw] pb-[1rem] border-solid border-b-[1px] border-b-cyan-700">
            <View>
                  <Image source={userProfile.role === "Teacher"
                    ? require("../../assets/images/teacher-avatar.png")
                    : require("../../assets/images/student-avatar.png")}
                      alt=""
                      className="w-[7rem] h-[7rem] relative left-[39vw] mt-[3rem] border-gray-500 border-solid border-[1px] rounded-full"
                      accessible={true}
                      accessibilityLabel='User Avatar'
                      accessibilityRole='image'
                  />
                  <Text className="text-center text-2xl text-cyan-800 font-bold mt-[0.5rem]"
                      accessible={true}
                      accessibilityLabel={`username: ${userProfile.name || userProfile.username}`}
                  >{userProfile.name || userProfile.username}</Text>
            </View>
        </View>

        {/* account controller */}
        <View className = "mt-[1rem] relative left-[5%]">
            <Text className = "text-lg text-cyan-800 font-bold">Account</Text>
            {/* options */}
            <View className = "flex-col mt-[0.5rem]">
                {/* information */}
                  <TouchableOpacity 
                      className="w-[90%] border-solid border-cyan-800 border-[1px] pl-[1rem] py-[0.7rem] rounded-tl-2xl rounded-tr-2xl bg-slate-100 flex-row justify-between px-3"
                      onPress={() => setupDisplayInformation(true)}
                      accessible={true}
                      accessibilityLabel='Information'
                      accessibilityRole='button'
                      accessibilityHint='Double tab to open Account Information screen'
                      activeOpacity={0.5}
                  >
                    <Text className = "text-lg">Information</Text>
                    <Entypo name = "chevron-right" size = {20}/> 
                </TouchableOpacity>
                <TouchableOpacity 
                      className="w-[90%] border-solid border-cyan-800 border-[1px] border-t-[0px] pl-[1rem] py-[0.7rem] rounded-bl-2xl rounded-br-2xl bg-slate-100 flex-row justify-between px-3"
                      onPress={() => setupDisplayChangePassword(true)}
                      accessible={true}
                      accessibilityLabel='Change password'
                      accessibilityRole='button'
                      accessibilityHint='Double tab to open Change Password screen'
                      activeOpacity={0.5}
                  >
                    <Text className = "text-lg">Change password</Text>
                    <Entypo name = "chevron-right" size = {20}/> 
                </TouchableOpacity>
            </View>
        </View>

        {/* settings controller */}
        <View className = "mt-[3rem] relative left-[5%]">
            <Text className = "text-lg text-cyan-800 font-bold">Settings</Text>
            {/* options */}
            <View className = "flex-col mt-[0.5rem]">
                {/* information */}
                <TouchableOpacity 
                    className="w-[90%] border-solid border-cyan-800 border-[1px] pl-[1rem] py-[0.7rem] rounded-tl-2xl rounded-tr-2xl bg-slate-100 flex-row justify-between px-3"
                    onPress={() => setupDisplayPolicy(true)}
                    accessible={true}
                    accessibilityLabel='Policy'
                    accessibilityRole='button'
                    accessibilityHint='Double tab to open Policy screen'
                    activeOpacity={0.5}
                >
                    <Text className = "text-lg">Policy</Text>
                    <Entypo name = "chevron-right" size = {20}/> 
                </TouchableOpacity>
                <TouchableOpacity 
                    className="w-[90%] border-solid border-cyan-800 border-[1px] border-t-[0px] pl-[1rem] py-[0.7rem] rounded-bl-2xl rounded-br-2xl bg-slate-100 flex-row justify-between px-3"
                    onPress={() => setupDisplayHelp(true)}
                    accessible={true}
                    accessibilityLabel='Helps'
                    accessibilityRole='button'
                    accessibilityHint='Double tab to open Helps screen'
                    activeOpacity={0.5}
                >
                    <Text className = "text-lg">Helps</Text>
                    <Entypo name = "chevron-right" size = {20}/> 
                </TouchableOpacity>
            </View>
        </View>

        {/* logout */}
        <TouchableOpacity 
            className = "mt-[3rem] w-[90%] left-[5%] relative border-solid bg-cyan-700 rounded-2xl py-[1rem]" 
            onPress={handleLogOut}
            activeOpacity={0.7}
        >
            <Text className = "text-lg font-semibold text-white text-center">Logout</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

export default MainProfile
