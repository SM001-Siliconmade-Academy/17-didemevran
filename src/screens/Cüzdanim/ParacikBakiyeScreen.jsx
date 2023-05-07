import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import i18n from "../../lang/_i18n";

const ParacikBakiyeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#ABABAB" }}>{i18n.t('wallet.total')}</Text>
      <Text
        style={{
          color: "#F59324",
          fontSize: 34,
          fontWeight: "700",
          marginBottom: 15,
        }}
      >
        201,50
      </Text>

      <View style={styles.boxes}>
        <View style={styles.box}>
          <Text style={styles.amount}>1,50</Text>
          <Text style={styles.title}>{i18n.t('wallet.money')}</Text>
          <MaterialIcons name="arrow-drop-down" size={28} color="black" />
        </View>

        <View style={styles.box}>
          <Text style={{ ...styles.amount, color: "#ABABAB" }}>200,00</Text>
          <Text style={{ ...styles.title, color: "#ABABAB" }}>
          {i18n.t('wallet.gift')}
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={{ ...styles.amount, color: "#ABABAB" }}>0,00</Text>
          <Text style={{ ...styles.title, color: "#ABABAB" }}>
          {i18n.t('wallet.fuel')}
          </Text>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 12, marginVertical: 15, textAlign: "center" }}>
        {i18n.t('wallet.text')}
        </Text>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
          <Text style={{ color: "white" }}>{i18n.t('wallet.send')}</Text>
          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={15}
              color="white"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ParacikBakiyeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  amount: {
    fontSize: 18,
    fontWeight: "700",
  },
  title: {
    fontSize: 10,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    width: "100%",
    textAlign: "center",
    paddingVertical: 3,
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 3,
  },
  boxes: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  button: {
    backgroundColor: "#F59324",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "75%",
    alignSelf: "center",
  },
});
