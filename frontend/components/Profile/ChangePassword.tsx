import { changePasswordApi } from '@/api/userApi';
import AntDesign from '@expo/vector-icons/AntDesign'
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { showNotification } from '../Toast/Toast';

interface ChangePasswordProps {
    setupDisplayChangePassword: (display: boolean) => void;
}

const ChangePassword = ({setupDisplayChangePassword}: ChangePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // error handling
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleChangePassword = () => {
    // handle error
    if (currentPassword === "") {
      setCurrentPasswordError("Recent password cannot be empty");
    }

    if (newPassword === "") {
      setNewPasswordError("New password cannot be empty");
    }

    if (newPassword === currentPassword && newPassword !== "" && currentPassword !== "") {
      setNewPasswordError("New password cannot be the same as recent password");
    }

    if (newPassword !== currentPassword && newPassword !== "" && currentPassword !== "") {
      const payload = {
        currentPassword: currentPassword,
        newPassword: newPassword
      }
      changePasswordApi(payload).then((res) => {
        console.log("Change password successfully");
        showNotification('success', 'Password Changed', 'Your password has been changed successfully.');
        router.push('/(tabs)/profile');
        setupDisplayChangePassword(false);
      }).catch((err) => {
          if (err?.response.status === 400) {
              setCurrentPasswordError("Recent password is wrong");
          }
      });
    }
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
    <ScrollView className = "mt-[4rem] animate-slideLeftFromRight">
        {/* header */}
        <View className = "w-[100vw] border-solid border-black border-b-[1px] pb-[2rem] mt-[1rem]">
            <Text className = "text-center text-3xl font-bold text-cyan-700"
              accessible={true}
              accessibilityLabel='Change Password'
              accessibilityRole='header'
            >
              Change password</Text>
            <Pressable className = {!accessibleRender ? 'hidden' : "absolute left-8 top-1"}
              onPress={() => setupDisplayChangePassword(false)}
              accessible={true}
              accessibilityLabel='Back'
              accessibilityRole='button'
              accessibilityHint='Double tab to return to Profile page'
            >
              <AntDesign name = "arrowleft" size = {24} />
            </Pressable>
        </View>

        {/* recent password */}
        <View className = "relative left-[5%] mt-[5rem]">
            <Text className = {currentPasswordError ? "text-lg font-bold text-red-500" : "text-lg font-bold"}
              accessible={false}
            >
              Recent Password</Text>
            <TextInput 
              placeholder = "Enter your current password"
              secureTextEntry = {true}
              className = {`w-[90%] border-solid border-[1px] rounded-2xl py-[1rem] mt-[0.5rem] pl-[1rem] bg-slate-100 ${currentPasswordError ? "border-red-500" : "border-black"}`} 
              placeholderTextColor={"black"}
              value = {currentPassword}
              onChangeText={setCurrentPassword}
              onFocus = {() => setCurrentPasswordError("")}
              accessible={true}
              accessibilityLabel="Recent Password:"
            />
            {currentPasswordError && 
              <Text className = "text-red-500 text-lg mt-[0.5rem] relative left-[0.3rem]">{currentPasswordError}</Text>
            }
        </View>

        {/* new password */}
        <View className = "relative left-[5%] mt-[2rem]">
            <Text className = {newPasswordError ? "text-lg font-bold text-red-500" : "text-lg font-bold"}
              accessible={false}
            >
              New Password</Text>
            <TextInput 
              placeholder = "Enter your new password"
              secureTextEntry = {true}
              className = {`w-[90%] border-solid border-[1px] rounded-2xl py-[1rem] mt-[0.5rem] pl-[1rem] bg-slate-100 ${newPasswordError ? "border-red-500" : "border-black"}`} 
              placeholderTextColor={"black"}
              value = {newPassword}
              onChangeText={setNewPassword}
              onFocus = {() => setNewPasswordError("")}
              accessible={true}
              accessibilityLabel="New Password:"
            />
            {newPasswordError && 
              <Text className = "text-red-500 text-lg mt-[0.5rem] relative left-[0.3rem]">{newPasswordError}</Text>
            }
        </View>

        {/* confirm password */}
        <View className = "relative left-[5%] mt-[2rem]">
            <Text className = {confirmPasswordError ? "text-lg font-bold text-red-500" : "text-lg font-bold"}
              accessible={false}
            >
              Confirm new Password</Text>
            <TextInput 
              placeholder = "Confirm your new password"
              secureTextEntry = {true}
              className = {`w-[90%] border-solid border-[1px] rounded-2xl py-[1rem] mt-[0.5rem] pl-[1rem] bg-slate-100 ${confirmPasswordError ? "border-red-500" : "border-black"}`} 
              placeholderTextColor={"black"}
              value = {confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus = {() => setConfirmPasswordError("")}
              accessible={true}
              // accessibilityLabel="Confirm New Password:"
            />
            {confirmPasswordError && 
              <Text className = "text-red-500 text-lg mt-[0.5rem] relative left-[0.3rem]">{confirmPasswordError}</Text>
            }
        </View>

        {/* comfirm button */}
        <View className = "mt-[5rem]">
            <Pressable className = "relative left-[5%] w-[90%] rounded-2xl py-[0.7rem] bg-cyan-800"
              onPress = {handleChangePassword}
              accessible={true}
              accessibilityLabel='Confirm'
              accessibilityRole='button'
              accessibilityHint='Double tab to Update Change Password'
            >
                <Text className = "text-xl text-center text-white">Confirm</Text>
            </Pressable>
        </View>
    </ScrollView>
  )
}

export default ChangePassword
