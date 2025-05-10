import { Redirect, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import "./global.css";
import { setupAxios } from "@/api/api";
import useAuthStore from "@/zustand/authStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { NotificationsProvider } from "@/components/Toast/Toast";

export default function RootLayout() {
  useEffect(() => {
    setupAxios();
  }, []);

  return (
    <GestureHandlerRootView>
      <NotificationsProvider>
      <StatusBar barStyle="dark-content"/>
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)"
          />
          <Stack.Screen name="(auth)"
          />
          <Stack.Screen name = "(other)"
          />
      </Stack></NotificationsProvider>
      {/* {redirectPath ?? <Redirect href={redirectPath}/>} */}
    </GestureHandlerRootView>
  );
}
