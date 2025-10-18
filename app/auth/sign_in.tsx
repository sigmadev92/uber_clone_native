import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  return (
    <SafeAreaView className="p-3">
      <Text>Sign In </Text>
      <Link href={"/auth/welcome"}>Back</Link>
    </SafeAreaView>
  );
};

export default SignIn;
