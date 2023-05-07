import { configureStore } from "@reduxjs/toolkit";
import hopiscreenReducer from "../screens/Anasayfa/hopiscreenSlice";
import tekliflerReducer from "../screens/Kategoriler/tekliflerSlice";
import urunlerReducer from "../screens/Anasayfa/Search/urunlerSlice";
import qrcodeReducer from "../screens/QRKodum/qrcodeSlice";
import loginReducer from "../screens/Login/loginSlice";
import welcomeReducer from "../screens/Welcome/welcomeSlice";
import homerouterSlice from "../routes/homerouterSlice";
import markalarSlice from "../screens/Kategoriler/markalarSlice";

export const store = configureStore({
    reducer: {
        hopiscreen: hopiscreenReducer,
        tekliflerscreen: tekliflerReducer,
        urunler: urunlerReducer,
        qrcode: qrcodeReducer,
        login: loginReducer,
        welcome: welcomeReducer,
        homerouter: homerouterSlice,
        markalarscreen: markalarSlice
    },
})