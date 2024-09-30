// src/features/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Create the cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
    },
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);

            if (existingItem) {
                // Update the quantity of the existing item
                existingItem.quantity += item.quantity;
            } else {
                // Add new item to the cart
                state.items.push(item);
            }
            // Update total quantity and price
            state.totalQuantity += item.quantity;
            state.totalPrice += item.price * item.quantity;
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                // Update total quantity and price
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.price * existingItem.quantity;
                // Remove item from cart
                state.items = state.items.filter((item) => item.id !== id);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                // Update total quantity and price
                const oldQuantity = existingItem.quantity;
                existingItem.quantity = quantity;
                state.totalQuantity += quantity - oldQuantity;
                state.totalPrice += existingItem.price * (quantity - oldQuantity);
            }
        },
    },
});

// Export actions and reducer
export const { addItem, removeItem, clearCart, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
