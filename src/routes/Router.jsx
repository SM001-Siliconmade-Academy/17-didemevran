import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoriesScreen from "./CategoriesRouter";
import QRCodeScreen from "../screens/QRKodum/QRCodeScreen";
import MyWalletScreen from "./MyWalletRouter";
import MyAccountScreen from "../screens/Hesabim/MyAccountScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/colors";
import HomeRouter from "./HomeRouter";
import { Octicons } from "@expo/vector-icons";
import i18n from "../lang/_i18n";

const Tab = createBottomTabNavigator();

const Router = () => {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: Colors.active,
          tabBarInactiveTintColor: Colors.inactive,
        }}
      >
        <Tab.Screen
          name={i18n.t('tab.home')}
          component={HomeRouter}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name="home-sharp"
                  size={24}
                  color={focused ? "black" : "#ababab"}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={i18n.t('tab.category')}
          component={CategoriesScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <MaterialIcons
                  name="category"
                  size={24}
                  color={focused ? "black" : "#ababab"}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={i18n.t('tab.qr')}
          component={QRCodeScreen}
          options={{
            headerTitle: () => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Octicons name="question" size={24} color="black" />
                <Text
                  style={{ marginLeft: 15, fontWeight: "600", fontSize: 18 }}
                >
                  {i18n.t('tab.myqr')}
                </Text>
              </View>
            ),
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name="qr-code-sharp"
                  size={24}
                  color={focused ? "black" : "#ababab"}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={i18n.t('tab.wallet')}
          component={MyWalletScreen}
          options={{
            headerTitle: () => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Octicons name="question" size={24} color="black" />
                <Text
                  style={{ marginLeft: 15, fontWeight: "600", fontSize: 18 }}
                >
                  {i18n.t('tab.mywallet')}
                </Text>
              </View>
            ),
            headerRight: () => (
              <Text style={{ marginRight: 15 }}>{i18n.t('tab.mywallet2')}</Text>
            ),
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name="wallet-sharp"
                  size={24}
                  color={focused ? "black" : "#ababab"}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={i18n.t('tab.account')}
          component={MyAccountScreen}
          options={{
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <Ionicons name="settings-sharp" size={24} color="black" />
              </View>
            ),
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{display: "flex", flexDirection: "row"}}>
                  <Ionicons
                    name="md-person-sharp"
                    size={24}
                    color={focused ? "black" : "#ababab"}
                  />
                  <View style={{ backgroundColor: "#EC0E0B", width: 13, height: 13, borderRadius: 7, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{color: "white", fontSize: 10}}>7</Text>
                  </View>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
