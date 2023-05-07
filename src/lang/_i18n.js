import { I18nManager } from "react-native";
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import tr from "./tr.json";
import en from "./en.json";

const i18n = new I18n({
  en: en,
  tr: tr,
});

i18n.locale = getLocales()[0].languageCode;
i18n.enableFallback = true;

export default i18n;
