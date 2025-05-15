import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity, TouchableHighlight, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuthStore, { AuthState } from '@/zustand/authStore';
import { logIn, register } from '@/api/authApi';
import { Redirect, useRouter } from 'expo-router';
import DropdownSelection, { DropdownProps } from '@/components/Auth/DropdownSelection';

const signup = () => {
    const [ usernameInput, setUsernameInput ] = useState('');
    const [ passwordInput, setPasswordInput ] = useState('');
    const [ confirmPasswordInput, setConfirmPasswordInput ] = useState('');
    const [ usernameError, setUsernameError ] = useState(false);
    const [ roleError, setRoleError ] = useState(false);
    const [ confirmPasswordError, setConfirmPasswordError ] = useState(false);
    const [ passwordError, setPasswordError ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState("");
    const [ usernameErrorMessage, setUsernameErrorMessage ] = useState('');
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState('');
    const authState = useAuthStore((state) => state.authState);
    const router = useRouter();
    const saveAuthState = useAuthStore((state) => state.saveAuthState);

    const dropdownProps: DropdownProps = {
        isError: roleError,
        title: selectedItem.length != 0 ? selectedItem : "Choose your role",
        data: ["Student", "Teacher"],
        styling: null,
        setSelectedItem: setSelectedItem
    }

    const handleSignup = () => {
        if (usernameInput.length == 0) {
            setUsernameError(true);
            setUsernameErrorMessage("Please enter your username");
        }

        if (selectedItem.length == 0) {
            setRoleError(true);
        }

        if (passwordInput.length == 0) {
            setPasswordError(true);
            setPasswordErrorMessage("Please enter your password");
        }

        if (usernameError || passwordError || confirmPasswordError || roleError) {
            return;
        }

        const request = {
            username: usernameInput,
            password: passwordInput,
            role: 0
        };

        register(request).then((res) => {
            const authState: AuthState = {
                user: res.data.user,
                accessToken: res.data.authToken
            };
            saveAuthState(authState);
            setUsernameError(false);
            setPasswordError(false);
            setRoleError(false);
            setConfirmPasswordError(false);
        }).catch((err) => {
            if (err.response?.status == 409) {
                setUsernameError(true);
                setPasswordError(false);
                setUsernameErrorMessage(`Username '${usernameInput}' already exists`);
            }
            console.log(err.message);
        });
    }

    useEffect(() => {
        if (passwordInput.length != 0) {
            setConfirmPasswordInput('');
        }
    }, [passwordInput]);

    useEffect(() => {
        if (confirmPasswordInput != passwordInput) {
            setConfirmPasswordError(true);
        } else {
            setConfirmPasswordError(false);
        }
    }, [confirmPasswordInput]);

    useEffect(() => {
        if (selectedItem.length != 0) {
            setRoleError(false);
        }
    }, [selectedItem]);

    if (authState?.user != null) {
        return <Redirect href="/(tabs)/home"/>;
    }

  return (
    <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
    <View
        id='login-screen'
        className='flex-1 justify-center items-center'
    >
        <View
            id='login-container'
            className='flex flex-col items-center p-4 h-fit w-4/5 gap-3'
        >
            <Image
                id='lumilearn-logo'
                className='mb-8'
                source={require("../../assets/images/lumiLearnLogoWithText.png")}
                style={{
                    height: 120,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                }}
                accessible={true}
                accessibilityLabel="Lumi Learn Logo, Login Page"
            />
            <View
                id='login-form'
                className='relative flex flex-col gap-5 w-full color-orange-300'
            >
                <View id='username-input'>
                    <Text
                        accessible={false}
                        className={usernameError ? 
                            'text-sm ml-1 mb-2 color-red-600'
                            : 'text-sm ml-1 mb-2 color-cyan-700'}
                    >
                        Username
                    </Text>
                    <TextInput
                        id='username-input-field'
                        accessible={true}
                        accessibilityLabel="Sign Up UserName field"
                        placeholder='Please enter your username'
                        placeholderTextColor={"#9CA3AF"}
                        className={usernameError ? 
                            'w-full p-4 rounded-xl bg-transparent border border-solid border-red-500'
                            : 'w-full p-4 rounded-xl bg-transparent border border-solid border-cyan-600'}
                        style={{ textAlignVertical: 'center' }}
                        onChangeText={(text) => {
                            setUsernameInput(text);
                            setUsernameError(false);
                        }}
                    />
                    {usernameError && (
                        <Text className='text-sm ml-1 mt-2 mb-2 color-red-600'>
                            {usernameErrorMessage}
                        </Text>
                    )}
                </View>
                {/* <View id='role-input' className='z-[100]'>
                    <Text 
                        className={roleError ? 
                            'text-sm ml-1 mb-2 color-red-600'
                            : 'text-sm ml-1 mb-2 color-slate-700'}
                    >
                        Role
                    </Text>
                    <DropdownSelection {...dropdownProps}/>
                    {roleError && (
                        <Text className='text-sm ml-1 mt-2 mb-2 color-red-600'>
                            Please choose a role
                        </Text>
                    )}
                </View> */}
                <View id='password-input'>
                    <Text 
                        accessible={false}
                        className={passwordError ? 
                            'text-sm ml-1 mb-2 color-red-600'
                            : 'text-sm ml-1 mb-2 color-cyan-700'}
                    >
                        Password
                    </Text>
                    <TextInput
                        id='password-input-field'
                        secureTextEntry={true}
                        accessibilityLabel='Sign Up Password field'
                        placeholder='Please enter your password'
                        placeholderTextColor={"#9CA3AF"}
                        className={passwordError ? 
                            'w-full p-4 rounded-xl bg-transparent border border-solid border-red-500'
                            : 'w-full p-4 rounded-xl bg-transparent border border-solid border-cyan-600'}
                        style={{ textAlignVertical: 'center' }}
                        onChangeText={(text) => {
                            setPasswordInput(text);
                            setPasswordError(false);
                        }}
                    />
                    {passwordError && (
                        <Text className='text-sm ml-1 mt-2 mb-2 color-red-600'>
                            {passwordErrorMessage}
                        </Text>
                    )}
                </View>
                <View id='confirm-password-input'>
                    <Text
                        accessible={false}
                        className={confirmPasswordError ? 
                            'text-sm ml-1 mb-2 color-red-600'
                            : 'text-sm ml-1 mb-2 color-cyan-700'}
                    >
                        Confirm password
                    </Text>
                    <TextInput
                        id='confirm-password-input-field'
                        secureTextEntry={true}
                        accessibilityLabel='Sign Up Confirm Password field'
                        placeholder='Please re-enter your password'
                        placeholderTextColor={"#9CA3AF"}
                        className={confirmPasswordError ? 
                            'w-full p-4 rounded-xl bg-transparent border border-solid border-red-500'
                            : 'w-full p-4 rounded-xl bg-transparent border border-solid border-cyan-600'}
                        style={{ textAlignVertical: 'center' }}
                        onChangeText={(text) => {
                            setConfirmPasswordInput(text);
                        }}
                    />
                    {confirmPasswordError && (
                        <Text className='text-sm ml-1 mt-2 mb-2 color-red-600'>
                            Password does not match
                        </Text>
                    )}
                </View>
                <TouchableHighlight
                    id='login-button'
                    className='w-full mt-5 py-4 flex items-center bg-cyan-700 rounded-xl'
                    onPress={() => handleSignup()}
                    underlayColor="gray"
                    accessible={true}
                    accessibilityLabel="Sign Up"
                    accessibilityRole="button"
                    accessibilityHint="Double tap to Sign Up"
                >
                    <Text
                        id='login-button'
                        className='color-white text-lg font-semibold'
                    >
                        Sign up
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    className="w-full mt-3 flex items-center"
                    onPress={() => router.push("/(auth)/login")}
                    accessibilityLabel="Already had an account? Log In"
                    accessibilityHint="Double Tab to Navigate to the Log In screen"
                    underlayColor={"transparent"}
                >
                    <Text className="text-sm color-slate-700">
                    Already had an account?{" "}
                    <Text
                        className="font-bold color-blue-500"
                    >
                        Log in
                    </Text>
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    </View>
    </KeyboardAvoidingView>
  )
}

export default signup