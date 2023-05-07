import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../services/firebase";

const initialState = {
  products: [],
  copyProducts: [],
  sortOrder: "asc",
  search: "",
};

export const getProductssAsync = createAsyncThunk(
  "urunler/getProductssAsync",
  async () => {
    const imagesRef = collection(db, "products");
    const q = query(imagesRef, orderBy("id"));
    return getDocs(q)
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, doc.data());
          data.push({
            id: doc.id,
            image: doc.data().imageUrl,
            productName: doc.data().productName,
            brandName: doc.data().brandName,
            category: doc.data().category,
            price: doc.data().price,
          });
        });
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

const sortProducts = (products, sortOrder) => {
  return [...products].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
};

const urunlerSlice = createSlice({
  name: "urunler",
  initialState,
  reducers: {
    handleSortPrice: (state) => {
      state.products = sortProducts(state.products, state.sortOrder);
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    },
    handleChangeText: (state, action) => {
      if (action.payload) {
        const filteredProducts = state.products.filter((product) => {
          return product.productName
            .toLocaleLowerCase()
            .includes(action.payload.toLocaleLowerCase());
        });
        state.search = action.payload;
        state.products = filteredProducts;
      } else {
        state.search = action.payload;
        state.products = state.copyProducts;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getProductssAsync.fulfilled, (state, action) => {
      state.products = state.products.concat(action.payload);
      state.copyProducts = state.copyProducts.concat(action.payload);
    });
  },
});

export const { handleSortPrice, handleChangeText } = urunlerSlice.actions;

export const selectProducts = (state) => state.urunler.products;
export const selectCopyProducts = (state) => state.urunler.copyProducts;
export const selectSearch = (state) => state.urunler.search;

export default urunlerSlice.reducer;
