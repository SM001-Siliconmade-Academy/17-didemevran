import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { favouriteImages } from "../../data/hopiImages";
// @ts-ignore
import React, { useEffect } from "react";
import { Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getBannersAsync,
  getClickWinItemsAsync,
  getHopiImagesAsync,
  getLoveMarksAsync,
  getMyOffersAsync,
  selectBanners,
  selectClickWinItems,
  selectHopiImages,
  selectLoveMarks,
  selectMyOffers,
  selectImageNumber,
  handleChangeImageNumber,
  selectAnketImage,
  getAnketImageAsync
} from "./hopiscreenSlice";
import { selectUser } from "../Login/loginSlice";
import i18n from "../../lang/_i18n";

const HopiScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  const hopiImages = useSelector(selectHopiImages);
  const banners = useSelector(selectBanners);
  const myOffers = useSelector(selectMyOffers);
  const clickwinItems = useSelector(selectClickWinItems);
  const lovemarks = useSelector(selectLoveMarks);
  const imageNumber = useSelector(selectImageNumber);
  const anketImage = useSelector(selectAnketImage);

  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getHopiImagesAsync());
    // @ts-ignore
    dispatch(getBannersAsync());
    // @ts-ignore
    dispatch(getMyOffersAsync());
    // @ts-ignore
    dispatch(getClickWinItemsAsync());
    // @ts-ignore
    dispatch(getLoveMarksAsync());
    // @ts-ignore
    dispatch(getAnketImageAsync());
  }, []);

  const handlePress = () => {
    navigation.navigate("Kategoriler");
  };

  const goToUrunlerMarkalar = () => {
    navigation.navigate("UrunlerMarkalar");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {/* Search */}
        <TouchableOpacity
          onPress={goToUrunlerMarkalar}
          style={styles.searchMainContainer}
        >
          <View style={styles.searchContainer}>
            <Feather name="search" size={24} color="#62819D" />
            <Text style={{ color: "#C8C8C9" }}>{i18n.t('hopi.search')}</Text>
          </View>
          <FontAwesome name="camera" size={20} color="#00ACEF" />
        </TouchableOpacity>

        {/* Top */}
        <View style={styles.top}>
          <View style={styles.account}>
            <Text>🙋‍♀️</Text>
            <Text style={styles.accountTitle}>{i18n.t('hopi.hello')}</Text>
            <Text style={styles.accountTitle}>{user.name}</Text>
          </View>
          <View style={styles.topRight}>
            <Text style={styles.topRightText1}>
              {user.money} {i18n.t('hopi.money')}
            </Text>
            <Text style={styles.topRightText2}>
            {i18n.t('hopi.moneyValue')}
            </Text>
            <Text style={styles.topRightText3}>{i18n.t('hopi.goToMoney')}</Text>
          </View>
        </View>

        <View style={styles.middle}>
          <View style={styles.middleTop}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#474747" }}>
            {i18n.t('hopi.reviewOffer')}
            </Text>
            <View>
              <Text
                style={{
                  color: "#474747",
                  fontSize: 10,
                  backgroundColor: "#E0E0E0",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 15,
                }}
              >
                {imageNumber}/15
              </Text>
            </View>
          </View>

          {/*Hopi Images */}
          <FlatList
            data={hopiImages}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onMomentumScrollEnd={(event) => {
              const index = Math.floor(event.nativeEvent.contentOffset.x);
              let rest = (index / 320 + 1).toFixed();

              return dispatch(handleChangeImageNumber(rest));
            }}
            renderItem={({ item }) => (
              <View>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
            )}
          />

          {/*Anket Image */}
          <TouchableOpacity>
            {anketImage && (
              <Image
                source={{ uri: anketImage[0] }}
                style={{
                  resizeMode: "contain",
                  width: "100%",
                  height: 100,
                  borderRadius: 10,
                  marginVertical: 10,
                }}
              />
            )}
          </TouchableOpacity>

          {/*Section Images */}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://fonzip.com/tkdf/kampanya/mor-yerleske");
            }}
          >
            <Image
              source={{ uri: banners[0]?.imageUrl }}
              style={{
                resizeMode: "contain",
                width: "100%",
                height: 100,
                borderRadius: 10,
                marginVertical: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(banners[1]?.visitUrl);
            }}
          >
            <Image
              source={{ uri: banners[1]?.imageUrl }}
              style={{
                resizeMode: "contain",
                width: "100%",
                height: 100,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(banners[2]?.visitUrl);
            }}
          >
            <Image
              source={{ uri: banners[2]?.imageUrl }}
              style={{
                resizeMode: "contain",
                width: "100%",
                height: 100,
                borderRadius: 10,
                marginVertical: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(banners[3]?.visitUrl);
            }}
          >
            <Image
              source={{ uri: banners[3]?.imageUrl }}
              style={{
                resizeMode: "contain",
                width: "100%",
                height: 100,
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
          </TouchableOpacity>

          {/* Tekliflerim */}
          <View style={styles.myofferContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "700", color: "#474747" }}
              >
                {i18n.t('hopi.myOffers')}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#848587" }}>{i18n.t('hopi.seeAll')}</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color="#848587"
                />
              </View>
            </View>

            <FlatList
              data={myOffers}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <View style={{ width: 150 }}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.offerImage}
                  />
                  <Text
                    style={{
                      color: "#474747",
                      fontWeight: "700",
                      marginBottom: 5,
                    }}
                  >
                    {item.brandName}
                  </Text>
                  <Text style={{ color: "#848587", fontSize: 12 }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: "#13C3F2", fontWeight: "700" }}>
                    {item.description}
                  </Text>
                </View>
              )}
            />
          </View>

          {/* Tikla Kazan */}
          <View style={styles.clickwinContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "700", color: "#474747" }}
              >
                {i18n.t('hopi.clickWin')}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#848587" }}>{i18n.t('hopi.seeAll')}</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color="#848587"
                />
              </View>
            </View>

            <FlatList
              data={clickwinItems}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 25 }} />}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: 250,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.clickWinImage}
                  />
                  <View
                    style={{
                      paddingBottom: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: "#F1F1F1",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flex: 1,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: "#474747",
                          fontWeight: "700",
                        }}
                      >
                        {item.brandName}
                      </Text>
                      <Text style={{ color: "#848587", fontSize: 12 }}>
                        {item.description}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12,
                          fontWeight: "400",
                        }}
                      >
                        {i18n.t('hopi.win')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>

          {/*  Sevebilecegin Markalar */}
          <View style={styles.clickwinContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "700", color: "#474747" }}
              >
                {i18n.t('hopi.loveMarks')}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#848587" }}>{i18n.t('hopi.seeAll')}</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color="#848587"
                />
              </View>
            </View>

            <FlatList
              data={lovemarks}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginVertical: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.lovemarksImage}
                  />
                  <Text
                    style={{
                      color: "#474747",
                      fontWeight: "700",
                      marginBottom: 5,
                      marginTop: 10,
                    }}
                  >
                    {item.brandName}
                  </Text>
                </View>
              )}
            />
          </View>

          {/* Sevecegin Kategoriler */}
          <TouchableOpacity onPress={handlePress}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#474747",
                backgroundColor: "white",
                paddingTop: 10,
                paddingHorizontal: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              {i18n.t('hopi.loveCategories')}
            </Text>
            <Image
              source={favouriteImages[0].image}
              style={{
                resizeMode: "contain",
                width: "100%",
                height: 200,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                marginBottom: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HopiScreen;

const styles = StyleSheet.create({
  searchMainContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F6F8",
    borderWidth: 1,
    borderColor: "#F1F1F1",
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    gap: 7,
    flex: 1,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  account: {
    backgroundColor: "white",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: "30%",
  },
  accountTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#474747",
  },
  topRight: {
    backgroundColor: "white",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: "63%",
    color: "#474747",
  },
  topRightText1: {
    color: "#E7C85C",
    fontWeight: "800",
  },
  topRightText2: {
    fontSize: 10,
    marginVertical: 10,
  },
  topRightText3: {
    fontSize: 12,
    textDecorationLine: "underline",
  },
  middle: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  middleTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 320,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  separator: {
    width: 12,
  },
  sectionImage: {
    width: 320,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  myofferContainer: {
    backgroundColor: "white",
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 4,
    borderColor: "#81D6FE",
  },
  offerImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
  clickwinContainer: {
    backgroundColor: "white",
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  clickWinImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    marginRight: 10,
  },
  button: {
    backgroundColor: "#13C3F2",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  lovemarksImage: {
    width: 170,
    height: 100,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#F1F1F1",
  },
});
