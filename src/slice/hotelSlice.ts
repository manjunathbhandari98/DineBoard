import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: "hotel",
  initialState: [],
  reducers: {
    addHotel: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { addHotel } = hotelSlice.actions;

export default hotelSlice.reducer;
