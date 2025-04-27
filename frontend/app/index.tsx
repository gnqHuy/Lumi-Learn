import { Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Index = () => {
    return (
        <Redirect href="/(tabs)/home"/>
    );
}

export default Index;