import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { SignOutButton } from '@/app/components/SignOutButton'

export default function Page() {
  const { user } = useUser();

  return (
    <SafeAreaView className="p-3">
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        {/* <SignOutButton /> */}
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign_in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign_in">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </SafeAreaView>
  );
}
