import React, { useEffect, useRef, useState } from 'react'
import { AccessibilityInfo, findNodeHandle, Image, Pressable, Text, Touchable, TouchableOpacity, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { User } from '@/types/user';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';

interface UserInformationProps {
    setupDisplayInformation: (display: boolean) => void;
    userProfile: User;
    setupDisplayChangeProfile: (display: boolean) => void;
    changeBirthdayState: boolean
}

const UserInformation = ({setupDisplayInformation, userProfile, setupDisplayChangeProfile, changeBirthdayState}: UserInformationProps) => {
    const handleDisplayChangeProfile = () => {
        setupDisplayInformation(false);
        setupDisplayChangeProfile(true);
    }

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
    <ScrollView className = "mt-16 animate-slideLeftFromRight">
        {/* header */}
        <View className="flex-row items-center bg-white justify-between mb-4 px-5 border-solid border-black border-b-[1px]">
            <Text className="text-[24px] font-bold text-cyan-800 absolute left-4 right-4 text-center p-3 mb-2"
                accessible={true}
                accessibilityLabel='Information'
                accessibilityRole='header'>
                    Information
            </Text>
            <Pressable className={!accessibleRender ? 'hidden' : " p-3 mb-2"}
                onPress={() => setupDisplayInformation(false)}
                accessible={true}
                accessibilityLabel='Back'
                accessibilityRole='button'
                accessibilityHint='Double tab to return Profile page'
                >
                <AntDesign name = "arrowleft" size = {24} color={'#155e75'}/>
            </Pressable>
        </View>

        {/* avatar and change */}
        <View className="mt-[2rem]">
              <Image source={userProfile.role === "Teacher"
                  ? require("../../assets/images/teacher-avatar.png")
                  : require("../../assets/images/student-avatar.png")}
                  className = "w-[6rem] h-[6rem] relative left-[40%] border-gray-500 border-solid border-[1px] rounded-full"/>
        </View>

        {/* username */}
        <View className = "mt-[1rem] relative left-[5%]">
            <Text className = "text-lg font-bold"
                accessible={false}
            >
                User name</Text>
            {/* options */}
            <View className = "flex-col mt-[0.5rem]"
                accessible={true}
                accessibilityLabel={`Username: ${userProfile?.username}`}
            >
                <Pressable className = "w-[90%] border-solid border-black border-[1px] pl-[1rem] py-[0.7rem] rounded-2xl bg-slate-100">
                    <Text className = "text-lg">{userProfile?.username}</Text>
                </Pressable>
            </View>
        </View>

        {/* full name */}
        <View className="mt-[1.5rem] relative left-[5%]">
            <Text className = "text-lg font-bold"
                accessible={false}
            >
                Full name</Text>
            {/* options */}
            <View className="flex-col mt-[0.5rem]"
                accessible={true}
                accessibilityLabel={`Fullname: ${userProfile?.name}`}
                accessibilityRole='button'
                accessibilityHint='Double tab to open Update Information Page'
            >
                <TouchableOpacity
                    className = "w-[90%] border-solid border-black border-[1px] pl-[1rem] py-[0.7rem] rounded-2xl bg-slate-100 flex-row justify-between px-3" 
                    onPress = {handleDisplayChangeProfile}
                    activeOpacity={0.5}
                >
                    <Text className = "text-lg">{userProfile?.name}</Text>
                    <Entypo name = "chevron-right" size = {20}/>
                </TouchableOpacity>
            </View>
        </View>

        {/* birthday */}
        <View className="mt-[1.5rem] relative left-[5%]">
            <Text className = "text-lg font-bold"
                accessible={false}
            >
                Birthday</Text>
            {/* options */}
            <View className="flex-col mt-[0.5rem]"
                accessible={true}
                accessibilityLabel={`Birthday: ${userProfile?.birthday && userProfile.birthday.toString().substring(0,10)}`}
                accessibilityRole='button'
                accessibilityHint='Double tab to open Update Information Page'
            >
                <TouchableOpacity 
                    className = "w-[90%] border-solid border-black border-[1px] pl-[1rem] py-[0.7rem] rounded-2xl bg-slate-100 flex-row justify-between px-3" 
                    onPress = {handleDisplayChangeProfile}
                    activeOpacity={0.5}
                >
                    <Text className = "text-lg">{new Date(
                        new Date(userProfile.birthday).getUTCFullYear(), 
                        new Date(userProfile.birthday).getUTCMonth(), 
                        new Date(userProfile.birthday).getUTCDate()
                    ).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    }).replace(/ /g, ' ')}</Text>
                    <Entypo name = "chevron-right" size = {20}/>  
                </TouchableOpacity>
            </View>
        </View>

        {/* email */}
        <View className="mt-[1.5rem] relative left-[5%]">
            <Text className = "text-lg font-bold"
                accessible={false}
            >
                Email</Text>
            {/* options */}
            <View className="flex-col mt-[0.5rem]"
                accessible={true}
                accessibilityLabel={`Email: ${userProfile?.email}`}
                accessibilityRole='button'
                accessibilityHint='Double tab to open Update Information Page'
            >
                <TouchableOpacity 
                    className = "w-[90%] border-solid border-black border-[1px] pl-[1rem] py-[0.7rem] rounded-2xl bg-slate-100 flex-row justify-between px-3" 
                    onPress = {handleDisplayChangeProfile}
                    activeOpacity={0.5}
                >
                    <Text className = "text-lg">{userProfile?.email}</Text>
                    <Entypo name = "chevron-right" size = {20}/> 
                </TouchableOpacity>
            </View>
        </View>

        {/* phone number */}
        <View className="mt-[1.5rem] relative left-[5%]">
            <Text className = "text-lg font-bold"
                accessible={false}
            >
                Phone number</Text>
            {/* options */}
            <View className="flex-col mt-[0.5rem]"
                accessible={true}
                accessibilityLabel={`Phone number: ${userProfile?.phone}`}
                accessibilityRole='button'
                accessibilityHint='Double tab to open Update Information Page'
            >
                <TouchableOpacity 
                    className = "w-[90%] border-solid border-black border-[1px] pl-[1rem] py-[0.7rem] rounded-2xl bg-slate-100 flex-row justify-between px-3" 
                    onPress = {handleDisplayChangeProfile}
                    activeOpacity={0.5}
                >
                    <Text className = "text-lg">{userProfile?.phone}</Text>
                    <Entypo name = "chevron-right" size = {20}/>  
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
  )
}

export default UserInformation
