import { createSlice } from "@reduxjs/toolkit";

interface IItems {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  brand: string;
  rating: number;
  totalPrice?: number;
  quantity?: number;
}

interface IInitialState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: IItems[];
}
const initialState: IInitialState = {
  items: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const addToCart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state: IInitialState, action: { payload: any }) => {
      state.items.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItem: (state: IInitialState, action: { payload: any }) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearItem: (state: IInitialState) => {
      state.items = [];
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateItemPrice: (state: IInitialState, action: { payload: any }) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (!item) return;
      if (quantity < 0) return;
      item.quantity = quantity;
      item.totalPrice = item.price * quantity;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    createOrder: (state: IInitialState) => {
      state.items = [];
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    }
  },
});

export const { addItem, clearItem, removeItem, updateItemPrice, createOrder } =
  addToCart.actions;
export default addToCart.reducer;
