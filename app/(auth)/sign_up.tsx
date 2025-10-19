import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";
const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShow] = useState(false);
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const onSignUpHandler = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };
  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
          ...verification,
          error: "verification failed",
          state: "failed",
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: unknown) {
      setVerification({
        ...verification,
        error: "system error",
        state: "failed",
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white mb-20">
        <View>
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="ml-2 font-bold">Create your Account</Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            className="font-bold"
            placeholder="Enter your name"
            value={form.name}
            icon={icons.person}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
            title="Sign Up"
            onPress={onSignUpHandler}
            className="mt-3 shadow-black"
          />
        </View>
        {/* OAuth */}
        <OAuth />
        <View className="items-center mb-10">
          <Text className="text-lg">
            Already Have an Account?{" "}
            <Link href={"/(auth)/sign_in"} className="text-[red]">
              Log In
            </Link>
          </Text>
        </View>
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShow(true);
            }
          }}
        >
          <View className="bg-white gap-2 px-7 py-9 rounded-2xl">
            <Text className="text-2xl text-green-600 font-bold ">
              Verification
            </Text>
            <Text>We have sent a verification code to {form.email}</Text>
            <InputField
              label="Code"
              icon={icons.lock}
              labelStyle="font-bold"
              placeholder="12345"
              placeholderClassName=""
              value={verification.code}
              onChangeText={(value) =>
                setVerification({ ...verification, code: value })
              }
              keyboardType="numeric"
            />
            {verification.error && (
              <Text className="text-red-500 font-bold">
                {verification.error}
              </Text>
            )}

            <CustomButton
              title="Verify Email"
              className="bg-green-400 w-[90%]"
              onPress={onVerifyPress}
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="items-center gap-2 justify-center rounded-[3rem] min-h-[300px] bg-white">
            <Image source={images.check} className="w-[110px] h-[110px]" />
            <Text className="text-2xl font-extrabold color-green-500">
              Verified
            </Text>
            <Text className="text-md">You have verified successfully</Text>
            <CustomButton
              title="Browse Home"
              className="w-[85%]"
              onPress={() => router.replace("/(root)/(tabs)/home")}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
