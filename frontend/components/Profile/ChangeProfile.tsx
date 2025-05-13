import { User } from '@/types/user';
import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { updateProfileApi } from '@/api/userApi';
import { router } from 'expo-router';
import { showNotification } from '../Toast/Toast';
import moment from 'moment-timezone';


interface ChangeProfileProps {
    setupDisplayChangeProfile: (display: boolean) => void;
    setupDisplayInformation: (display: boolean) => void;
    userProfile: User
    resetProfile: () => void;
    activateChangeBirthday: () => void;
}

const ChangeProfile = ({setupDisplayChangeProfile, setupDisplayInformation, userProfile, resetProfile, activateChangeBirthday}: ChangeProfileProps) => {
    // inputs
    const [fullNameInput, setFullNameInput] = useState(userProfile.name);
    const [birthdayInput, setBirthdayInput] = useState<Date>(userProfile.birthday ? new Date(userProfile.birthday) : new Date());
    const [emailInput, setEmailInput] = useState(userProfile.email);
    const [phoneInput, setPhoneInput] = useState(userProfile.phone);

    // date picker display
    const [displayDatePicker, setDisplayDatePicker] = useState(false);

    // errors
    const [fullNameError, setFullNameError] = useState("");
    const [birthdayError, setBirthdayError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");

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
                    birthday: new Date(
                        new Date(birthdayInput).getFullYear(), 
                        new Date(birthdayInput).getMonth(),
                        new Date(birthdayInput).getDate() + 1
                    ), 
                    name: fullNameInput
                }
                updateProfileApi(payload).then((response) => {
                    console.log("Update profile successfully!");
                    showNotification('success', 'Profile Updated', 'Your profile has been updated successfully.');
                    router.push('/(tabs)/profile');
                    setupDisplayChangeProfile(false);
                    resetProfile();
                }).catch(err => console.error(err));
            }
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
    <ScrollView className = "mt-[4rem] animate-slideLeftFromRight h-full">
        {/* header */}
        <View className = "w-[100vw] border-solid border-black border-b-[1px] pb-[2rem] mt-[1rem]">
            <Text className = "text-center text-3xl font-bold text-cyan-700"
                accessible={true}
                accessibilityLabel='Update Information'
                accessibilityRole='header'
            >
                Update information</Text>
            <Pressable className = {!accessibleRender ? 'hidden' : "absolute left-8 top-1"} 
                onPress={() => {
                    setupDisplayChangeProfile(false);
                    setupDisplayInformation(true);
                }}
                accessible={true}
                accessibilityLabel='Back'
                accessibilityRole='button'
                accessibilityHint='Double tab to return to Information page'
            >
                <AntDesign name = "arrowleft" size = {24} />
            </Pressable>
        </View>

        {/* profile */}
        <View className = "mt-[3rem]">
            {/* full name */}
            <View className = "mt-[1rem] relative left-[5%]">
                <Text className={fullNameError ? "text-lg font-bold text-red-500" : "text-lg font-bold"}
                    accessible={false}
                >
                    Full name</Text>
                <View className = "flex-col mt-[0.5rem]">
                    <TextInput 
                        className = {fullNameError ? "w-[90%] border-solid border-red-500 border-[1px] pl-[1rem] py-[0.9rem] rounded-2xl" : "w-[90%] border-solid border-black border-[1px] pl-[1rem] py-[0.9rem] rounded-2xl bg-slate-100"}
                        value = {fullNameInput}
                        onChangeText={setFullNameInput}
                        onFocus={() => setFullNameError("")}
                        accessible={true}
                        accessibilityLabel="Full name"
                    />
                </View>
                {fullNameError && 
                    <Text className = "relative left-[0.5rem] mt-[0.5rem] text-red-500">{fullNameError}</Text>
                }
            </View>

            {/* birthday */}
            <View className = "mt-[1.5rem] relative left-[5%]">
                <Text className = {birthdayError ? "text-lg font-bold text-red-500" : "text-lg font-bold"}
                    accessible={false}
                >
                    Birthday</Text>
                  <View className="flex-col mt-[0.5rem]"
                        accessible={true}
                        accessibilityLabel={`Birthday: ${birthdayInput?.toString().substring(0,10)}`}>
                    <Pressable className = {birthdayError ? "w-[90%] border-solid border-red-500 border-[1px] pl-[1rem] py-[0.9rem] rounded-2xl" : "w-[90%] border-solid border-black border-[1px] pl-[1rem] py-[0.9rem] rounded-2xl bg-slate-100"} onPress = {() => {
                        setDisplayDatePicker(true);
                        setBirthdayError("");
                    }}>
                    <Text>{new Date(birthdayInput).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    }).replace(/ /g, ' ')}</Text>
                    </Pressable>
                </View>
                {birthdayError && 
                    <Text className = "relative left-[0.5rem] mt-[0.5rem] text-red-500">{birthdayError}</Text>
                }
            </View>

            {/* date picker */}
            {displayDatePicker === true && 
                <View className = "">
                    <DateTimePickerModal 
                        isVisible = {displayDatePicker}
                        mode = 'date'
                        display='spinner'
                        date = {birthdayInput ? new Date(birthdayInput) : new Date()}
                        onCancel={() => setDisplayDatePicker(false)}
                        maximumDate={new Date()}
                        onConfirm={(date) => {
                            const timezone = "Asia/Bangkok";
                            const localDate = moment(date).tz(timezone).startOf('day').toDate();
                            setBirthdayInput(localDate);
                            setDisplayDatePicker(false);
                            activateChangeBirthday();
                        }}
                    />
                </View>
            }

            {/* email */}
            <View className = "mt-[1.5rem] relative left-[5%]">
                <Text className = {emailError ? "text-lg font-bold text-red-500" : "text-lg font-bold"}
                    accessible={false}
                >
                    Email</Text>
                <View className = "flex-col mt-[0.5rem]">
                    <TextInput 
                        className = {emailError ? "w-[90%] border-solid border-red-500 border-[1px] pl-[1rem] py-[0.9rem] rounded-2xl" : "w-[90%] border-solid border-black border-[1px] pl-[1rem] py-[0.9rem] rounded-2xl bg-slate-100"}
                        value = {emailInput}
                        onChangeText={setEmailInput}
                        onFocus={() => setEmailError("")}
                        accessibilityLabel="Email"
                    />
                </View>
                {emailError && 
                    <Text className = "relative left-[0.5rem] mt-[0.5rem] text-red-500">{emailError}</Text>
                }
            </View>

            {/* phone number */}
            <View className = "mt-[1.5rem] relative left-[5%]">
                <Text className = {phoneError ? "text-lg font-bold text-red-500" : "text-lg font-bold"}
                    accessible={false}
                >
                    Phone number</Text>
                <View className = "flex-col mt-[0.5rem]">
                    <TextInput 
                        className = {phoneError ? "w-[90%] border-solid border-red-500 border-[1px] pl-[1rem] py-[0.9rem] rounded-2xl" : "w-[90%] border-solid border-black border-[1px] pl-[1rem] py-[0.9rem] rounded-2xl bg-slate-100"}
                        value = {phoneInput}
                        onChangeText={setPhoneInput}
                        onFocus={() => setPhoneError("")}
                        accessibilityLabel="Phone number"
                    />
                </View>
                {phoneError && 
                    <Text className = "relative left-[0.5rem] mt-[0.5rem] text-red-500">{phoneError}</Text>
                }
            </View>

            {/* update button */}
            <View className = "mt-[3rem]">
                <Pressable className = "w-[90%] relative self-start left-[5%] py-[1rem] rounded-2xl bg-cyan-800"
                    onPress={handleUpdateProfile}
                    accessible={true}
                    accessibilityLabel='Update'
                    accessibilityRole='button'
                    accessibilityHint='Double tab to Update Information'
                >
                    <Text className = "text-center text-lg text-white">Update</Text>
                </Pressable>
            </View>
        </View>
    </ScrollView>
  )
}

export default ChangeProfile
