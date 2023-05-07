import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import MapView from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");
import { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const item = route.params.item;
  const map = useRef(null);
  const [marker, setMarker] = useState({
    latitude: item.latitude,
    longitude: item.longitude,
  });
  const LATITUDE_DELTA = 0.008;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

  return (
    <View style={styles.container}>
      <MapView
        zoomControlEnabled={true}
        style={styles.map}
        ref={map}
        region={{
          latitude: Number(marker.latitude),
          longitude: Number(marker.longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        <Marker coordinate={{
          latitude: Number(marker.latitude),
          longitude: Number(marker.longitude),
        }} />
        </MapView>

      <View style={styles.overlay}>
        <View >
          <View style={styles.overlay_container}>
            <Text style={styles.location}>{item.location}</Text>

            <View style={styles.icon_text_container}>
              <Entypo name="location-pin" size={22} color="white" />
              <Text style={styles.text}>{item.address}</Text>
            </View>

            <View style={styles.icon_text_container}>
              <FontAwesome name="phone" size={22} color="white" />
              <Text style={styles.text}>{item.phone}</Text>
            </View>

            <View style={styles.icon_text_container}>
              <AntDesign name="clockcircleo" size={20} color="white" />
              <Text style={styles.text}>{item.openingHours}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    alignSelf: "stretch"
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: width,
  },
  overlay_container: {
    backgroundColor: "#3FBFF5",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  icon_text_container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    gap: 10,
  },
  location: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 5
  },
  text: {
    fontSize: 14,
    color: "white",
  },
});
