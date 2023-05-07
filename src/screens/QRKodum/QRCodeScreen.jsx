import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { qrCodeImage } from "../../data/hopiImages";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { handleTime, selectTime } from "./qrcodeSlice";
import i18n from "../../lang/_i18n";

const QRCodeScreen = () => {
  const time = useSelector(selectTime);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setInterval(() => {
      dispatch(handleTime());
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{time} {i18n.t('qr.seconds')}</Text>
      <Text>{i18n.t('qr.text')}</Text>
      <View>
        <Image
          source={qrCodeImage[0].image}
          style={{
            width: 200,
            height: 200,
            marginVertical: 30,
            alignSelf: "center",
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <Text style={styles.code}>4507 7627 27</Text>
          <FontAwesome5 name="copy" size={20} color="black" />
        </View>
        <Text style={{ textAlign: "center" }}>
        {i18n.t('qr.subtitle1')}
          <Text style={{ fontWeight: "500" }}> {i18n.t('qr.subtitle2')}</Text> {i18n.t('qr.subtitle3')}{" "}
          {"\n"} {i18n.t('qr.subtitle4')}
          <Text style={{ fontWeight: "500" }}>
            {" "}
            {i18n.t('qr.subtitle5')} {"\n"} {i18n.t('qr.subtitle6')}{" "}
          </Text>
          {i18n.t('qr.subtitle7')}
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <AntDesign name="camerao" size={24} color="white" />
        <Text style={{color:"white"}}>{i18n.t('qr.button')}</Text>
        <MaterialIcons name="keyboard-arrow-up" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default QRCodeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    color: "#CE716C",
    fontWeight: "700",
  },
  code: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    marginRight: 15,
  },
  button: {
    backgroundColor: "#00ADEF",
    marginTop: 30,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "65%"
  },
});
