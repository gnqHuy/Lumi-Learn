import { View, Text } from "react-native";
import React from "react";
import { Redirect, Tabs } from "expo-router";
import useAuthStore from "@/zustand/authStore";
import { Ionicons } from "@expo/vector-icons";

const AppLayout = () => {
    const authState = useAuthStore((state) => state.authState);

    if (!authState?.user) {
        return (
            <Redirect href="/(auth)/login"/>
        );
    }

  return (
    <Tabs
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#155e75',
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'courses':
            iconName = focused ? 'book' : 'book-outline';
            break;
          case 'notification':
            iconName = focused ? 'notifications' : 'notifications-outline';
            break;
          case 'profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'ellipse';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "My Courses",
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
