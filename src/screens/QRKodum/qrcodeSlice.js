import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 60,
};

const uqrCodeSlice = createSlice({
  name: "qrcode",
  initialState,
  reducers: {
    handleTime: (state, action) => {
      if (state.time > 0) {
        state.time = state.time - 1;
      } else if (state.time === 0) {
        state.time = 60;
      }
    },
  },
});

export const { handleTime } = uqrCodeSlice.actions;

export const selectTime = (state) => state.qrcode.time;

export default uqrCodeSlice.reducer;
