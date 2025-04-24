import { Stack } from "expo-router";
import "./global.css";
import { setupAxios } from "@/api/api";
import useAuthStore from "@/zustand/authStore";

export default function RootLayout() {
  const authState = useAuthStore((state) => state.authState);
  setupAxios(authState);

  return (
        <Stack>
          <Stack.Screen 
            name="(tabs)"
            options={{ headerShown: false }}
          />
        </Stack>
  );
}
