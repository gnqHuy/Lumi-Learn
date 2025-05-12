import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { addFeedback } from '@/api/feedbackApi';
import { AddFeedbackRequest } from '@/types/feedback';

export type AddRatingProps = {
    size?: number;
    courseId: string;
    rating: number;
    setRating: (rating: number) => void;
    isRatedByUser: boolean
    setIsRatedByUser: (status: boolean) => void;
};

const AddRating: React.FC<AddRatingProps> = ({ size = 26, courseId, rating, setRating, isRatedByUser, setIsRatedByUser }) => {
    const handleRating = (score: number) => {
        setRating(score);
    }

    const handleSubmitRating = () => {
        const request: AddFeedbackRequest = {
            courseId: courseId,
            rating: rating
        };

        addFeedback(request).then(() => {
            setIsRatedByUser(true);
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
                    >
                        <AntDesign name='star' size={size} color={index + 1 <= rating ? '#facc15' : '#9ca3af'}/>
                    </Pressable>
                ))]}
            </View>
            {!isRatedByUser ? 
            <Text className='text-gray-300 my-6'>Tap on stars to add rating</Text>
            : <></>}
            {(!isRatedByUser && rating != 0) ?
            <TouchableOpacity
                id='submit-button'
                className='w-1/2 py-4 rounded-xl items-center justify-center bg-cyan-700'
                activeOpacity={0.7}
                onPress={() => handleSubmitRating()}
            >
                <Text className='font-bold text-white'>Submit rating</Text>
            </TouchableOpacity>
            : <></>
            }
        </View>
    )
}

export default AddRating