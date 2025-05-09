import { User } from '@/types/user';
import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { updateProfileApi } from '@/api/userApi';
import { router } from 'expo-router';


interface ChangeProfileProps {
    setupDisplayChangeProfile: (display: boolean) => void;
    setupDisplayInformation: (display: boolean) => void;
    userProfile: User
    resetProfile: () => void;
}

const ChangeProfile = ({setupDisplayChangeProfile, setupDisplayInformation, userProfile, resetProfile}: ChangeProfileProps) => {
    // inputs
    const [fullNameInput, setFullNameInput] = useState(userProfile.name);
    const [birthdayInput, setBirthdayInput] = useState(userProfile.birthday ? userProfile.birthday : null);
    const [emailInput, setEmailInput] = useState(userProfile.email);
    const [phoneInput, setPhoneInput] = useState(userProfile.phone);

    // date picker display
    const [displayDatePicker, setDisplayDatePicker] = useState(false);

    // errors
    const [fullNameError, setFullNameError] = useState("");
    const [birthdayError, setBirthdayError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    // on change of date time picker
    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setBirthdayInput(new Date(selectedDate)); // Save the selected date as a Date object
        }
        setDisplayDatePicker(false); // Close the date picker
    };

    // check empty
    const checkInputEmpty = () => {
        if (fullNameInput === "") {
            setFullNameError("Full name cannot be empty");
        }
        if (emailInput === "") {
            setEmailError("Email cannot be empty");
        }
        if (phoneInput === "") {
            setPhoneError("Phone number cannot be empty");
        }
    }

    // handle update
    const handleUpdateProfile = () => {
        checkInputEmpty();
        if (fullNameInput && emailInput && phoneInput) {
            if (fullNameInput === userProfile.name && birthdayInput === userProfile.birthday && emailInput === userProfile.email && phoneInput === userProfile.phone) {
                setFullNameError("At least one prop must be different from old information");
                setBirthdayError("At least one prop must be different from old information");
                setEmailError("At least one prop must be different from old information");
                setPhoneError("At least one prop must be different from old information");
            } else {
                // handle update
                const payload = {
                    email: emailInput, 
                    phone: phoneInput, 
                    birthday: birthdayInput, 
                    name: fullNameInput
                }
                updateProfileApi(payload).then((response) => {
                    console.log("Update profile successfully!");
                    setupDisplayChangeProfile(false);
                    resetProfile();
                }).catch(err => console.error(err));
            }
        }
    }
  return (
    <ScrollView className = "mt-[4rem] animate-slideLeftFromRight h-full">
        {/* header */}
        <View className = "w-[100vw] border-solid border-black border-b-[1px] pb-[2rem] mt-[1rem]">
            <Text className = "text-center text-3xl font-bold">Update information</Text>
            <Pressable className = "absolute left-8 top-1" onPress = {() => {
                setupDisplayChangeProfile(false);
                setupDisplayInformation(true);
            }}>
                <AntDesign name = "left" size = {26} />
            </Pressable>
        </View>

        {/* profile */}
        <View className = "mt-[3rem]">
            {/* full name */}
            <View className = "mt-[1rem] relative left-[5%]">
                <Text className = {fullNameError ? "text-xl font-bold text-red-500" : "text-xl font-bold"}>Full name</Text>
                <View className = "flex-col mt-[0.5rem]">
                    <TextInput 
                        className = {fullNameError ? "w-[90%] border-solid border-red-500 border-[2px] pl-[1rem] py-[0.9rem] rounded-lg" : "w-[90%] border-solid border-black border-[2px] pl-[1rem] py-[0.9rem] rounded-lg"}
                        value = {fullNameInput}
                        onChangeText={setFullNameInput}
                        onFocus={() => setFullNameError("")}
                    />
                </View>
                {fullNameError && 
                    <Text className = "relative left-[0.5rem] mt-[0.5rem] text-red-500">{fullNameError}</Text>
                }
            </View>

            {/* birthday */}
            <View className = "mt-[1.5rem] relative left-[5%]">
                <Text className = {birthdayError ? "text-xl font-bold text-red-500" : "text-xl font-bold"}>Birthday</Text>
                <View className = "flex-col mt-[0.5rem]">
                    <Pressable className = {birthdayError ? "w-[90%] border-solid border-red-500 border-[2px] pl-[1rem] py-[0.9rem] rounded-lg" : "w-[90%] border-solid border-black border-[2px] pl-[1rem] py-[0.9rem] rounded-lg"} onPress = {() => {
                        setDisplayDatePicker(true);
                        setBirthdayError("");
                    }}>
                    <Text>
                        {birthdayInput
                            ? new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                            }).format(new Date(birthdayInput))
                            : 'Select a date'}
                    </Text>
                    </Pressable>
                </View>
                {birthdayError && 
                    <Text className = "relative left-[0.5rem] mt-[0.5rem] text-red-500">{birthdayError}</Text>
                }
            </View>

            {/* date picker */}
            {displayDatePicker === true && 
                <View className = "">
                    <DateTimePicker 
                        value = {birthdayInput ? new Date(birthdayInput) : new Date()}
                        mode = {'date'}
                        onChange={onChange}
                        style = {{backgroundColor: 'gray', position: 'relative', left: 20, borderRadius: 5, marginTop: 10, paddingRight: 5}}
                        maximumDate={new Date()}
                    />
                </View>
            }

            {/* email */}
            <View className = "mt-[1.5rem] relative left-[5%]">
                <Text className = {emailError ? "text-xl font-bold text-red-500" : "text-xl font-bold"}>Email</Text>
                <View className = "flex-col mt-[0.5rem]">
                    <TextInput 
                        className = {emailError ? "w-[90%] border-solid border-red-500 border-[2px] pl-[1rem] py-[0.9rem] rounded-lg" : "w-[90%] border-solid border-black border-[2px] pl-[1rem] py-[0.9rem] rounded-lg"}
                        value = {emailInput}
                        onChangeText={setEmailInput}
                        onFocus={() => setEmailError("")}
                    />
                </View>
                {emailError && 
                    <Text className = "relative left-[0.5rem] mt-[0.5rem] text-red-500">{emailError}</Text>
                }
            </View>

            {/* phone number */}
            <View className = "mt-[1.5rem] relative left-[5%]">
                <Text className = {phoneError ? "text-xl font-bold text-red-500" : "text-xl font-bold"}>Phone number</Text>
                <View className = "flex-col mt-[0.5rem]">
                    <TextInput 
                        className = {phoneError ? "w-[90%] border-solid border-red-500 border-[2px] pl-[1rem] py-[0.9rem] rounded-lg" : "w-[90%] border-solid border-black border-[2px] pl-[1rem] py-[0.9rem] rounded-lg"}
                        value = {phoneInput}
                        onChangeText={setPhoneInput}
                        onFocus={() => setPhoneError("")}
                    />
                </View>
                {phoneError && 
                    <Text className = "relative left-[0.5rem] mt-[0.5rem] text-red-500">{phoneError}</Text>
                }
            </View>

            {/* update button */}
            <View className = "mt-[5rem]">
                <Pressable className = "w-[60vw] relative self-start left-[20vw] border-solid border-black border-[2px] py-[0.5rem] rounded-lg bg-gray-400" onPress={handleUpdateProfile}>
                    <Text className = "text-center text-lg text-white">Update</Text>
                </Pressable>
            </View>
        </View>
    </ScrollView>
  )
}

export default ChangeProfile
