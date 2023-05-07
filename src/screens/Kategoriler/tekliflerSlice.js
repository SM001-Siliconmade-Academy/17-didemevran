import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";

const initialState = {
  categoryImages: [],
};

export const getCategoryImagesAsync = createAsyncThunk(
  "tekliflerscreen/getCategoryImagesAsync",
  async () => {
    const imagesRef = collection(db, "categoryImages");
    const q = query(imagesRef, orderBy("id"));
    return getDocs(q)
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, doc.data().image);
          data.push({ id: doc.id, image: doc.data().image });
        });
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

const tekliflerSlice = createSlice({
  name: "tekliflerscreen",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCategoryImagesAsync.fulfilled, (state, action) => {
      state.categoryImages = state.categoryImages.concat(action.payload);
    });
  },
});

export const selectCategoryImages = (state) => state.tekliflerscreen.categoryImages;

export default tekliflerSlice.reducer;
