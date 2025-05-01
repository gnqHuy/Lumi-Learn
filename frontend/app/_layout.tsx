import { Redirect, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import "./global.css";
import { setupAxios } from "@/api/api";
import useAuthStore from "@/zustand/authStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const authState = useAuthStore((state) => state.authState);
  setupAxios(authState);

  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)"
          />
          <Stack.Screen name="(auth)"
          />
      </Stack>
      {/* {redirectPath ?? <Redirect href={redirectPath}/>} */}
    </GestureHandlerRootView>
  );
}
