import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false, // hides all headers
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
export const unstable_settings = {
  anchor: "(tabs)",
};
