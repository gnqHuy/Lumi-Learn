import { View, Text } from "react-native";
import React from "react";
import { Redirect, Tabs } from "expo-router";
import useAuthStore from "@/zustand/authStore";

const AppLayout = () => {
    const authState = useAuthStore((state) => state.authState);

    if (!authState?.user) {
        return (
            <Redirect href="/(auth)/login"/>
        );
    }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
