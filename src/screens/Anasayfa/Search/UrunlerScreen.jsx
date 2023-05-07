import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProductssAsync, handleChangeText, handleSortPrice, selectProducts, selectSearch } from "./urunlerSlice";
import i18n from "../../../lang/_i18n";

const UrunlerScreen = () => {
  const products = useSelector(selectProducts); 
  const search = useSelector(selectSearch); 

  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getProductssAsync());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="#8B8B8C" />
        <TextInput
          placeholder={i18n.t('products.search')}
          onChangeText={(text) => dispatch(handleChangeText(text))}
          value={search}
        />
      </View>
      <View style={styles.topSection}>
        <Text style={{ fontWeight: "800" }}>{products.length} {i18n.t('products.product')}</Text>
        <View style={styles.box}>
          <Text>{i18n.t('products.sort')}</Text>
          <Octicons
            name="sort-desc"
            size={24}
            color="black"
            onPress={() => dispatch(handleSortPrice())}
          />
        </View>
        <View style={styles.box}>
          <Text>{i18n.t('products.filter')}</Text>
          <Octicons name="filter" size={24} color="black" />
        </View>
      </View>

      {/* Ürünler Listesi */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          style={{ margin: 10 }}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} style={styles.gridbox}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text
                style={{
                  color: "#474747",
                  fontWeight: "700",
                  marginBottom: 5,
                }}
              >
                {item.productName}
              </Text>
              <Text style={{ color: "#848587", fontSize: 12 }}>
                {item.category}
              </Text>
              <Text
                style={{
                  color: "#474747",
                  fontWeight: "700",
                  marginBottom: 5,
                }}
              >
                {item.brandName}
              </Text>
              <Text style={{ color: "#13C3F2", fontWeight: "700" }}>
                {item.price}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default UrunlerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingHorizontal: 10 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F6F8",
    borderWidth: 1,
    borderColor: "#8B8B8C",
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    gap: 7,
  },
  topSection: {
    flexDirection: "row",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  image: {
    width: 100,
    height: "60%",
    resizeMode: "contain",
  },
  gridbox: {
    flex: 1,
    height: 225,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8B8B8C",
  },
});
