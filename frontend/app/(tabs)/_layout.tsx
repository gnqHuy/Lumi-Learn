import { View, Text } from "react-native";
import React from "react";
import { Redirect, Tabs } from "expo-router";
import useAuthStore from "@/zustand/authStore";
import { Ionicons } from "@expo/vector-icons";
import useNotificationStore from "@/zustand/notificationStore";

const AppLayout = () => {
  const authState = useAuthStore((state) => state.authState);
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  console.log("layout" + unreadCount)

  if (!authState?.user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#155e75",
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "courses":
              iconName = focused ? "book" : "book-outline";
              break;
            case "notification":
              iconName = focused ? "notifications" : "notifications-outline";
              break;
            case "profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "ellipse";
          }

          if (route.name === "notification") {
            return (
              <View style={{ position: "relative" }}>
                <Ionicons name={iconName} size={size} color={color} />
                {unreadCount > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      right: -5,
                      top: -3,
                      backgroundColor: "red",
                      borderRadius: 8,
                      paddingHorizontal: 4,
                      minWidth: 16,
                      height: 16,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </Text>
                  </View>
                )}
              </View>
            );
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
