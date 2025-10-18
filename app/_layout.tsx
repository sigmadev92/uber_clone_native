import { Stack } from "expo-router";
import "react-native-gesture-handler";
import "../global.css";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@/lib/auth";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error(
    "The Clerk Publishable Key is missing. Please add the Env variable EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY"
  );
}
export default function RootLayout() {
  return (
    <>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ClerkLoaded>
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
        </ClerkLoaded>
      </ClerkProvider>
    </>
  );
}
export const unstable_settings = {
  anchor: "(tabs)",
};
