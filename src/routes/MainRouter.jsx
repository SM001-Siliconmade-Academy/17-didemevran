import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/Login/LoginScreen";
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";
import Router from "./Router";
import UrunlerMarkalar from "./UrunlerMarkalarRouter";
import { useSelector } from "react-redux";
import { selectUser } from "../screens/Login/loginSlice";
import MapScreen from "../screens/Kategoriler/MapScreen";

const Stack = createNativeStackNavigator();

const MainRouter = () => {
  const user = useSelector(selectUser);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        {Object.keys(user).length === 0 && (
          <Stack.Screen name="Login" component={LoginScreen}/>
        )}
        {Object.keys(user).length !== 0 && (
          <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        )}
        <Stack.Screen name="Router" component={Router} />
        <Stack.Screen name="UrunlerMarkalar" component={UrunlerMarkalar}/>
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={({ route }) => ({
            headerShown: true,
            headerTitle: route.params?.item.brandName ?? "Marka Adi",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouter;

const styles = StyleSheet.create({});
