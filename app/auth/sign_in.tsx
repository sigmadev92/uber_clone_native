import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onSignInHandler = () => {};
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View>
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="ml-2 font-bold text-2xl">Welcome</Text>
        </View>
      </View>
      <View className="p-5">
        <InputField
          label="Email"
          placeholder="Enter your Email"
          value={form.email}
          icon={icons.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <InputField
          label="Password"
          icon={icons.lock}
          placeholder="Enter your Password"
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />
        <CustomButton
          title="Sign In"
          onPress={onSignInHandler}
          className="mt-3 shadow-black"
        />
      </View>
      {/* OAuth */}
      <OAuth />
      <View className="items-center mb-10">
        <Text className="text-lg">
          {"Don't"} Have an Account?{" "}
          <Link href={"/auth/sign_up"} className="text-[red]">
            Register
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignIn;
