import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryImagesAsync, selectCategoryImages } from "./tekliflerSlice";
import i18n from "../../lang/_i18n";

const TekliflerScreen = () => {
  const categoryImages = useSelector(selectCategoryImages);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getCategoryImagesAsync());
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1, paddingTop: 20 }}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Feather name="tag" size={24} color="black" />
          <Text>{i18n.t('offers.allOffers')}</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </View>
      <View style={{ flex: 1 }}>
        {/*Category Images */}
        <FlatList
          data={categoryImages}
          keyExtractor={(item) => item.id.toString()}
          style={{ margin: 10 }}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} style={styles.gridbox}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default TekliflerScreen;

const styles = StyleSheet.create({
  top: {
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
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  separator: {
    width: 12,
  },
  image: {
    width: 163,
    height: "100%",
    resizeMode: "contain",
  },
  gridbox: {
    flex: 1,
    height: 125,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
});
