import { View, Text, Pressable, TouchableOpacity, AccessibilityInfo, findNodeHandle } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { addFeedback } from '@/api/feedbackApi';
import { AddFeedbackRequest } from '@/types/feedback';
import { useLocalSearchParams, useRouter } from 'expo-router';

export type AddRatingProps = {
    size?: number;
    courseId: string;
    rating: number;
    setRating: (rating: number) => void;
    isRatedByUser: boolean
    setIsRatedByUser: (status: boolean) => void;
};

const AddRating: React.FC<AddRatingProps> = ({ size = 26, courseId, rating, setRating, isRatedByUser, setIsRatedByUser }) => {
    const submitRatingRef = useRef(null);
    const router = useRouter();

    const handleRating = (score: number) => {
        if (!isRatedByUser) {
            setRating(score);
            const node = findNodeHandle(submitRatingRef.current);
            setTimeout(() => {
                if (node) {
                    AccessibilityInfo.setAccessibilityFocus(node);
                }
            }, 400);
        }
    }

    const handleSubmitRating = () => {
        const request: AddFeedbackRequest = {
            courseId: courseId,
            rating: rating
        };

        addFeedback(request).then(() => {
            setIsRatedByUser(true);
            router.push(`/(tabs)/courses/${courseId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    }

    return (
        <View className={`flex-1 flex-col ${isRatedByUser ? '' : 'items-center'}`}>
            <View
                id='rating'
                className='flex-row items-center gap-3'
            >
                {[...Array.from({ length: 5 }).map((_, index) => (
                    <Pressable
                        key={index + 1}
                        onPress={() => handleRating(index + 1)}
                        accessible={true}
                        accessibilityLabel={`${index + 1}stars ${index + 1 === rating ? 'Rated' : '. Unrated. Double tab to add a rating'}`}
                    >
                        <AntDesign name='star' size={size} color={index + 1 <= rating ? '#facc15' : '#9ca3af'}/>
                    </Pressable>
                ))]}
            </View>
            {!isRatedByUser ? 
            <Text className='text-gray-300 my-6' accessible={false}>Tap on stars to add rating</Text>
            : <></>}
            {(!isRatedByUser && rating != 0) ?
            <TouchableOpacity
                ref={submitRatingRef}
                id='submit-button'
                className='w-1/2 py-4 rounded-xl items-center justify-center bg-cyan-700'
                activeOpacity={0.7}
                onPress={() => handleSubmitRating()}
                accessible={true}
                accessibilityLabel="Submit rating"
                accessibilityRole='button'
                accessibilityHint='Double tab to submit rating'
            >
                <Text className='font-bold text-white'>Submit rating</Text>
            </TouchableOpacity>
            : <></>
            }
        </View>
    )
}

export default AddRating