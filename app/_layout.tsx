import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import "../global.css";
export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false, // hides all headers
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="+not-found"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
export const unstable_settings = {
  anchor: "(tabs)",
};
