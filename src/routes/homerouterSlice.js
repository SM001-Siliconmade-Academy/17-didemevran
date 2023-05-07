import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebase";

const initialState = {
  topBarImages: [],
};

export const getTopBarImagesAsync = createAsyncThunk(
  "homerouter/getTopBarImagesAsync",
  async () => {
    const imagesRef = collection(db, "topBarImages");
    const q = query(imagesRef, orderBy("id"));
    return getDocs(q)
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, doc.data());
          data.push({
            id: doc.id,
            image: doc.data().image,
          });
        });
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

const homerouterSlice = createSlice({
    name: "homerouter",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getTopBarImagesAsync.fulfilled, (state, action) => {
          state.topBarImages = state.topBarImages.concat(action.payload);
        });
    },
});

export const selectTopbarImages = (state) => state.homerouter.topBarImages;

export default homerouterSlice.reducer;

