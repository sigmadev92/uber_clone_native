import React, { useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MyLocationProps } from "@/types/types";

export default function CustomMap({
  myLocation,
  destLocation,
}: {
  myLocation: MyLocationProps;
  destLocation: MyLocationProps | null;
}) {
  const mapRef = useRef<MapView>(null);

  const focusBtn = () => {
    if (destLocation)
      mapRef.current?.animateCamera(
        { center: destLocation, zoom: 10 },
        { duration: 2000 }
      );
  };

  return (
    <View className="w-full">
      <TouchableOpacity>
        <Text onPress={focusBtn}>Focus</Text>
      </TouchableOpacity>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={myLocation}
        showsUserLocation
        showsMyLocationButton
        ref={mapRef}
      >
        <Marker
          coordinate={{
            latitude: destLocation?.latitude!,
            longitude: destLocation?.longitude!,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
