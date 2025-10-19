import { Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons } from "@/constants";

import { useUser } from "@clerk/clerk-expo";
import mockRides from "@/constants/mockRIdes";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useLocationStore } from "@/zustand_store";
const Home = () => {
  const { user } = useUser();
  const { setUserLocation } = useLocationStore();

  //taking location permission - initially false

  const [hasPermission, setPermission] = useState(false);

  const handleSignOut = () => {};
  // const handleDestinationPress = () => {};

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermission(false);
        return;
      }
      setPermission(true);
      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };
    if (!hasPermission) requestLocation();
  }, []);

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={mockRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        // ListEmptyComponent={() => (
        //   <View className="flex flex-col items-center justify-center">
        //     {!loading ? (
        //       <>
        //         <Image
        //           source={images.noResult}
        //           className="w-40 h-40"
        //           alt="No recent rides found"
        //           resizeMode="contain"
        //         />
        //         <Text className="text-sm">No recent rides found</Text>
        //       </>
        //     ) : (
        //       <ActivityIndicator size="small" color="#000" />
        //     )}
        //   </View>
        // )}
        ListHeaderComponent={
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl font-JakartaExtraBold">
                Welcome {user?.emailAddresses[0].emailAddress.split("@")[0]}👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            {/* <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            /> */}

            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your current location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Home;
