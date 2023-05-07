import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ParacikBakiyeScreen from '../screens/Cüzdanim/ParacikBakiyeScreen';
import TLBakiyeScreen from '../screens/Cüzdanim/TLBakiyeScreen';
import KartlarimScreen from '../screens/Cüzdanim/KartlarimScreen';
import i18n from "../lang/_i18n";

const Tab = createMaterialTopTabNavigator();

const MyWalletScreen = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarIndicatorStyle: { borderBottomColor: "black", borderBottomWidth: 2 }     
    }}
  >
    <Tab.Screen
      name={i18n.t('tabWallet.money')}
      component={ParacikBakiyeScreen}
      options={{tabBarLabelStyle:{textTransform:'none'}}}
    />
    <Tab.Screen
      name={i18n.t('tabWallet.currency')}
      component={TLBakiyeScreen}
      options={{tabBarLabelStyle:{textTransform:'none'}}}
      />
      <Tab.Screen
      name={i18n.t('tabWallet.cards')}
      component={KartlarimScreen}
      options={{tabBarLabelStyle:{textTransform:'none'}}}
    />
  </Tab.Navigator>
  )
}

export default MyWalletScreen

const styles = StyleSheet.create({})