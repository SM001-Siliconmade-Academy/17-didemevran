import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getWelcomeContentImagesAsync, selectContentImages } from "./welcomeSlice";
import { selectUser } from "../Login/loginSlice";
import i18n from "../../lang/_i18n";

const WelcomeScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  const welcomeContentImages = useSelector(selectContentImages); 
  const dispatch = useDispatch();

  useEffect(() => {
   // @ts-ignore
    dispatch(getWelcomeContentImagesAsync());
  }, []);

  const goToRouter = () => {
    navigation.navigate("Router");
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.title}>{i18n.t('welcome.title')} {user.name}</Text>
      <Text style={styles.subtitle}>{i18n.t('welcome.subtitle')}</Text>
      <FlatList
        data={welcomeContentImages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={goToRouter}>
            <View style={styles.container}>
              <View style={{ width: "55%", paddingVertical: 10 }}>
                <Image source={{ uri: item.icon }} style={styles.icon} />
                <Text style={styles.text}>{item.text}</Text>
              </View>
              <Image
                source={{ uri: item.screenshot }}
                style={styles.screenshot}
              />
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="#D0D0D0"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#061F35",
    marginBottom: 10,
  },
  subtitle: {
      color: "#061F35",
      marginBottom: 30
  },

  container: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 20,
  },
  icon: {
    width: 70,
    height: 50,
    resizeMode: "contain",
    marginVertical: 10,
  },
  screenshot: {
    width: 95,
    height: 130,
    resizeMode: "contain",
  },
  text: {
    color: "#989898",
    fontSize: 12,
  },
});
