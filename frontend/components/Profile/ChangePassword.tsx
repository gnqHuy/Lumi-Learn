import AntDesign from '@expo/vector-icons/AntDesign'
import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

interface ChangePasswordProps {
    setupDisplayChangePassword: (display: boolean) => void;
}

const ChangePassword = ({setupDisplayChangePassword}: ChangePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <View className = "mt-[4rem] animate-slideLeftFromRight">
        {/* header */}
        <View className = "w-[100vw] border-solid border-black border-b-[1px] pb-[2rem] mt-[1rem]">
            <Text className = "text-center text-3xl font-bold">Change password</Text>
            <Pressable className = "absolute left-8 top-1" onPress={() => setupDisplayChangePassword(false)}>
                <AntDesign name = "left" size = {26} />
            </Pressable>
        </View>

        {/* recent password */}
        <View className = "relative left-[5%] mt-[5rem]">
            <Text className = "text-xl font-bold">Recent Password</Text>
            <TextInput 
              placeholder = "Enter your current password"
              secureTextEntry = {true}
              className = "w-[90%] border-solid border-[2px] border-black rounded-lg py-[1rem] mt-[1rem] pl-[1rem]" 
              placeholderTextColor={"black"}
              value = {currentPassword}
              onChangeText={setCurrentPassword} 
            />
        </View>

        {/* new password */}
        <View className = "relative left-[5%] mt-[2rem]">
            <Text className = "text-xl font-bold">New Password</Text>
            <TextInput 
              placeholder = "Enter your new password"
              secureTextEntry = {true}
              className = "w-[90%] border-solid border-[2px] border-black rounded-lg py-[1rem] mt-[1rem] pl-[1rem]" 
              placeholderTextColor={"black"}
              value = {newPassword}
              onChangeText={setNewPassword}
            />
        </View>

        {/* confirm password */}
        <View className = "relative left-[5%] mt-[2rem]">
            <Text className = "text-xl font-bold">Confirm new Password</Text>
            <TextInput 
              placeholder = "Confirm your new password"
              secureTextEntry = {true}
              className = "w-[90%] border-solid border-[2px] border-black rounded-lg py-[1rem] mt-[1rem] pl-[1rem]" 
              placeholderTextColor={"black"}
              value = {confirmPassword}
              onChangeText={setConfirmPassword}
            />
        </View>

        {/* comfirm button */}
        <View className = "mt-[3rem]">
            <Pressable className = "relative left-[15%] w-[70%] border-solid border-[2px] border-black rounded-lg py-[0.7rem]">
                <Text className = "text-xl text-center">Confirm</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default ChangePassword
