import { StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HopiScreen from "../screens/Anasayfa/HopiScreen";
import HopiShopScreen from "../screens/Anasayfa/HopiShopScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getTopBarImagesAsync, selectTopbarImages } from "./homerouterSlice";

const Tab = createMaterialTopTabNavigator();

const HomeRouter = () => {
  const insets = useSafeAreaInsets();

  const topBarImages = useSelector(selectTopbarImages); 
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
     dispatch(getTopBarImagesAsync());
   }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { paddingVertical: 5 },
        tabBarIndicatorStyle: {borderBottomColor: "#A94C79", borderBottomWidth: 2},
        
      }}
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Tab.Screen
        name="Hopi"
        component={HopiScreen}
        options={{
          tabBarIcon: () => {
            return (
              <Image style={styles.image} source={{ uri: topBarImages[0]?.image }} />
            );
          },
        }}
      />
      <Tab.Screen
        name="HopiShop"
        component={HopiShopScreen}
        options={{
          tabBarIcon: () => {
            return (
              <Image style={styles.image} source={{ uri: topBarImages[1]?.image }} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeRouter;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },
});
