import { createSlice } from '@reduxjs/toolkit';

const getCartKey = (userId) => `shipping_${userId}`
const saveCartToLocalStorage = (userId, cart) => {
localStorage.setItem(getCartKey(userId), JSON.stringify(cart));

};
const loadCartFromLocalStorage = (userId) => {
const storedCart = localStorage.getItem(getCartKey(userId));
return storedCart ? JSON.parse(storedCart) : { info: {} };
}

const shippingSlice = createSlice({
  name: 'shipping',
  initialState: {
    info: {}, // Initial state with an empty object for shipping info
  },
  reducers: {
    addInfo: (state, action) => {
      state.info = action.payload; // Updates the shipping info with the payload
      // localStorage.setItem('shippingInfo',JSON.stringify(state))
      saveCartToLocalStorage(state.userId, state);
    },
    initializeShippigInfo: (state, action) => {
      const userId = action.payload;
      const cartData = loadCartFromLocalStorage(userId);
      return { ...cartData, userId };
  },
  },
});



// Export the action so it can be dispatched from the component
export const { addInfo, initializeShippigInfo } = shippingSlice.actions;

// Export the reducer to be included in the store
export default shippingSlice.reducer


