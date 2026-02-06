import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products", async () => {
  const resp = await fetch("https://dummyjson.com/products");
  const json = await resp.json();
  console.log("Fetched products:", json);
  return json.products;
});

const initialState = {
  items: [],
  status: undefined,
  error: undefined,
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ((state.status = "succeeded"), (state.items = action.payload));
    });
  },
});

export default productSlice.reducer;
