import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TekliflerScreen from '../screens/Kategoriler/TekliflerScreen';
import MarkalarScreen from '../screens/Kategoriler/MarkalarScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import i18n from "../lang/_i18n";

const Tab = createMaterialTopTabNavigator();

const CategoriesScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { borderBottomColor: "#383838", borderBottomWidth: 2 },
      }}
    >
      <Tab.Screen
        name={i18n.t('tabCategory.offers')}
        component={TekliflerScreen}
        options={{tabBarLabelStyle:{textTransform:'none'}}}
      />
      <Tab.Screen
        name={i18n.t('tabCategory.brands')}
        component={MarkalarScreen}
        options={{tabBarLabelStyle:{textTransform:'none'}}}
      />
    </Tab.Navigator>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({})