import { View, Text, useWindowDimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GetFlashcards } from "@/api/flashcardApi";
import { FlashcardDto } from "@/types/flashcard";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, {
useSharedValue,
useAnimatedStyle,
withTiming,
interpolate,
runOnJS,
} from "react-native-reanimated";
import {
GestureDetector,
GestureHandlerRootView,
Gesture,
} from "react-native-gesture-handler";
import FlashcardResultScreen from "@/components/Flashcard/FlashcardResult";

const FlashcardSetPage = () => {
    const [ flashcards, setFlashcards ] = useState<FlashcardDto[]>([]);
    const [ cardStore, setCardStore ] = useState<FlashcardDto[]>([]);
    const [ learningCards, setLearningCards ] = useState<FlashcardDto[]>([]);
    const [ currentCard, setCurrentCard ] = useState<FlashcardDto>();
    const [ flashcardSetTitle, setFlashcardSetTitle ] = useState('');
    const [ knowCount, setKnowCount ] = useState(0);
    const [ learningCount, setLearningCount ] = useState(0);
    const [ isFlipped, setIsFlipped ] = useState(false);
    const [ isKnown, setIsKnown ] = useState(false);
    const [ isLearning, setIsLearning ] = useState(false);
    const [ isCompleted, setIsCompleted ] = useState(false);
    const [index, setIndex] = useState(0);
    const { flashcardSetId } = useLocalSearchParams();
    const router = useRouter();
    const rotateY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const { width } = useWindowDimensions();

    const flipCard = () => {
        const newFlipped = !isFlipped;
        setIsFlipped(newFlipped);
        rotateY.value = withTiming(newFlipped ? 180 : 0, { duration: 300 });
    };

    const nextCard = () => {
        const nextIndex = Math.min(index + 1, flashcards.length - 1);
        const nextCard = flashcards[nextIndex];
        if (index == flashcards.length - 1) {
            setIsCompleted(true);
        }
        setIndex(nextIndex);
        setIsFlipped(false);
        setCurrentCard(nextCard);
    };

    const addToLearning = () => {
        setLearningCards(prev => [...prev, currentCard!]);
    }

    const closeResultScreen = () => {
        setIsCompleted(false);
        if (learningCount == 0) {
            setFlashcards(cardStore);
        } else {
            setFlashcards(learningCards);
        }
        setLearningCards([]);
        setIndex(0);
        setKnowCount(0);
        setLearningCount(0);
    }

    const swipeGesture = Gesture.Pan()
        .onUpdate((event) => {
            const threshold = width / 5;

            translateX.value = event.translationX;
            translateY.value = event.translationY;

            if (event.translationX < -threshold) {
                runOnJS(setIsKnown)(false);
                runOnJS(setIsLearning)(true);
            } else if (event.translationX > threshold) {
                runOnJS(setIsLearning)(false);
                runOnJS(setIsKnown)(true);
            } else {
                runOnJS(setIsLearning)(false);
                runOnJS(setIsKnown)(false);
            }
        })
        .onEnd((event) => {
            runOnJS(setIsLearning)(false);
            runOnJS(setIsKnown)(false);
            const threshold = width / 5;

            if (event.translationX < -threshold) {
                const currentLearningCount = learningCount + 1;
                runOnJS(nextCard)();
                translateX.value = withTiming(-width, {duration: 400}, () => {
                    runOnJS(setLearningCount)(currentLearningCount);
                    runOnJS(addToLearning)();
                    rotateY.value = 0;
                    translateX.value = 0;
                    translateY.value = 0;
                });
            } else if (event.translationX > threshold) {
                const currentKnowCount = knowCount + 1;
                runOnJS(nextCard)();
                translateX.value = withTiming(width, {duration: 400}, () => {
                    runOnJS(setKnowCount)(currentKnowCount);
                    rotateY.value = 0;
                    translateX.value = 0;
                    translateY.value = 0;
                });
            } else {
                translateX.value = withTiming(0);
                translateY.value = withTiming(0);
            }
        });


    const tapGesture = Gesture.Tap().onEnd(() => {
        runOnJS(flipCard)();
    });

    const gesture = Gesture.Simultaneous(swipeGesture, tapGesture);

    const frontStyle = useAnimatedStyle(() => ({
        transform: [
            { perspective: 1000 },
            { rotateY: `${interpolate(rotateY.value, [0, 180], [0, 180])}deg` },
        ],
        backfaceVisibility: "hidden",
    }));

    const backStyle = useAnimatedStyle(() => ({
        transform: [
            { perspective: 1000 },
            { rotateY: `${interpolate(rotateY.value, [0, 180], [180, 360])}deg` },
        ],
        position: "absolute",
        top: 0,
        backfaceVisibility: "hidden",
    }));

    const containerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }, {translateY: translateY.value}],
    }));

    useEffect(() => {
        GetFlashcards(flashcardSetId as string)
        .then((res) => {
            setFlashcards(res.data.flashCards);
            setCardStore(res.data.flashCards);
            setFlashcardSetTitle(res.data.title);
            setCurrentCard(res.data.flashCards[0]);
        })
        .catch((err) => console.log(err.message));
    }, [flashcardSetId]);

    const getTextSafe = (value: any) => {
        if (isKnown) return "Know";
        else if (isLearning) return "Learning";
        else {
            if (typeof value === "string") return value;
            if (value == null) return "";
            return JSON.stringify(value);
        }
    };

    const flashcardStyle = () => {
        const style = "h-full w-11/12 bg-gray-200 rounded-3xl justify-center items-center px-6";
        let additionalStyle = "";

        if(isKnown) {
            additionalStyle = " border-2 border-green-500 bg-green-200";
        } else if(isLearning) {
            additionalStyle = " border-2 border-orange-400 bg-orange-200";
        }

        return style + additionalStyle;
    }

    const textStyle = () => {
        let style = "text-xl text-black text-center";

        if(isKnown) {
            style = "text-4xl font-bold text-green-500 text-center";
        } else if(isLearning) {
            style = "text-4xl font-bold text-orange-400 text-center";
        }

        return style;
    }

    return (
        <>
            {!isCompleted ? 
                <View className="flex-1 bg-orange-300">
                    <View className="w-full h-full bg-white px-6 py-4">
                        <View 
                            id="top-nav"
                            className="flex-row mt-14 mb-4 items-center px-2 w-full"
                        >
                            <Pressable className="z-10" onPress={() => router.back()}>
                                <AntDesign name="arrowleft" size={24} />
                            </Pressable>
                            <View className="absolute left-0 right-0 items-center">
                                <Text className="w-2/3 text-center text-xl font-semibold">
                                    Flashcard Set: {flashcardSetTitle}
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between items-center px-2 mt-4">
                            <View className={`w-10 h-10 rounded-full border-2 border-orange-500 ${isLearning ? 'bg-orange-500' : ''} items-center justify-center`}>
                                <Text className={`font-extrabold text-lg ${isLearning ? 'text-gray-100' : 'text-orange-500'}`}>
                                    {learningCount}
                                </Text>
                            </View>
                            <Text className="text-black text-base">
                                {index + 1}/{flashcards.length} 
                            </Text>
                            <View className={`w-10 h-10 rounded-full border-2 border-green-500 ${isKnown ? 'bg-green-500' : ''} items-center justify-center`}>
                                <Text className={`font-extrabold text-lg ${isKnown ? 'text-gray-100' : 'text-green-500'}`}>
                                    {knowCount}
                                </Text>
                            </View>
                        </View>

                        <GestureDetector gesture={gesture}>
                            <Animated.View
                                style={[containerStyle]}
                                className="relative z-10 mt-6 flex h-3/5 w-full justify-center items-center"
                            >
                                <Animated.View
                                    style={[frontStyle]}
                                    className={flashcardStyle()}
                                >
                                    <Text className={`font-semibold ${textStyle()}`}>
                                        {getTextSafe(currentCard?.term)}
                                    </Text>
                                </Animated.View>

                                <Animated.View
                                    style={[backStyle]}
                                    className={flashcardStyle()}
                                >
                                    <Text className={textStyle()}>
                                        {getTextSafe(currentCard?.definition)}
                                    </Text>
                                </Animated.View>
                            </Animated.View>
                        </GestureDetector>

                        <Text className="text-center text-gray-600 text-base mt-8">
                            Swipe right to mark Know
                        </Text>
                    </View>
                </View>
                : <View
                    className='absolute h-screen w-screen bg-white z-100'
                >
                    <FlashcardResultScreen 
                        known={knowCount} 
                        learning={learningCount} 
                        flashcardSetTitle={flashcardSetTitle}
                        handleClose={closeResultScreen}
                    />
                </View>
            }
        </>
        
    );
};

export default FlashcardSetPage;
