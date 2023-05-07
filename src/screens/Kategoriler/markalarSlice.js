import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";

const initialState = {
  brandLists: [],
};

export const getBrandListsAsync = createAsyncThunk(
  "markalarscreen/getBrandListsAsync",
  async () => {
    const dataRef = collection(db, "brandLists");
    const q = query(dataRef, orderBy("id"));
    return getDocs(q)
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.data().id,
            brandName: doc.data().brandName,
            location: doc.data().location,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            address: doc.data().address,
            phone: doc.data().phone,
            openingHours: doc.data().openingHours,
          });
        });
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

const markalarSlice = createSlice({
  name: "markalarscreen",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getBrandListsAsync.fulfilled, (state, action) => {
      state.brandLists = state.brandLists.concat(action.payload);
    });
  },
});

export const selectBrandLists = (state) => state.markalarscreen.brandLists;

export default markalarSlice.reducer;
