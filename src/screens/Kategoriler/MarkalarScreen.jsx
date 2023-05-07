import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrandListsAsync, selectBrandLists } from './markalarSlice';
import { MaterialIcons } from "@expo/vector-icons";

const MarkalarScreen = ({navigation}) => {
  const brandLists = useSelector(selectBrandLists);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getBrandListsAsync());
  }, []);

  const handleOpenMap = (item) => {
    navigation.navigate("MapScreen", {item})
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1, paddingTop: 20 }}>
      {/* brand lists */}
      <FlatList
          data={brandLists}
          keyExtractor={(item) => item.id.toString()}
          style={{ margin: 10 }}
        renderItem={({ item }) => (
          <View style={styles.container}>
          <View style={styles.topLeft}>
              <Text>{item.brandName}</Text>
              <Text>{item.location}</Text>
          </View>
          <TouchableOpacity key={item.id} style={styles.gridbox} onPress={() => handleOpenMap(item)}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
        </View>       
          )}
        />
    </View>
  )
}

export default MarkalarScreen

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderTopColor: "#ECECEC",
    borderTopWidth: 1,
    borderBottomColor: "#ECECEC",
    borderBottomWidth: 1,
  },
  topLeft: {
    flex: 1
  },
  gridbox: {
    flex: 1,
    margin: 2,
    justifyContent: "center",
    alignItems: "flex-end",
  },
})