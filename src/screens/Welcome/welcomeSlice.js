import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";

const initialState = {
  welcomeContentImages: [],
};

export const getWelcomeContentImagesAsync = createAsyncThunk(
  "welcome/getWelcomeContentImagessAsync",
  async () => {
    const imagesRef = collection(db, "welcomeContent");
    const q = query(imagesRef, orderBy("id"));
    return getDocs(q)
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, doc.data());
          data.push({
            id: doc.id,
            icon: doc.data().icon,
            text: doc.data().text,
            screenshot: doc.data().screenshot,
          });
        });
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

const welcomeSlice = createSlice({
    name: "welcome",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getWelcomeContentImagesAsync.fulfilled, (state, action) => {
          state.welcomeContentImages = state.welcomeContentImages.concat(action.payload);
        });
    },
});

export const selectContentImages = (state) => state.welcome.welcomeContentImages;

export default welcomeSlice.reducer;
