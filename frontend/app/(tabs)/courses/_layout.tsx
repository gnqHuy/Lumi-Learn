import { Stack } from "expo-router"
import React from "react"

export default function CourseLayout() {
    return (
        <Stack screenOptions={{ headerShown: false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="createCourse"/>
            <Stack.Screen name="[courseId]"/>
        </Stack>
    )
}