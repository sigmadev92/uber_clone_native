import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" />
        <Stack.Screen name="sign_in" />
        <Stack.Screen name="sign_up" />
      </Stack>
    </>
  );
}
export const unstable_settings = {
  anchor: "(tabs)",
};
