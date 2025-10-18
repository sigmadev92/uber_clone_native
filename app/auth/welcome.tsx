import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
const OnBoarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [index, setActiveIndex] = useState(1);
  return (
    <SafeAreaView className="p-3 h-full">
      <TouchableOpacity
        onPress={() => router.replace("/auth/sign_up")}
        className="items-end"
      >
        <Text className="py-2 text-md font-bold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        onIndexChanged={(index) => setActiveIndex(index)}
        ref={swiperRef}
        loop={false}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center">
            <Image source={item.image} className="w-full h-[300px]" />

            <View className="flex flex-row justify-center items-center w-full mt-10">
              <Text className="text-4xl font-bold w-[80%] text-center py-2">
                {item.title}
              </Text>
            </View>
            <Text className="text-center px-10 text-lg text-[#98a1a1] mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default OnBoarding;
