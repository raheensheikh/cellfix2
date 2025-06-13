import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    rerender: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            // const product = action.payload;
            // const existingItem = state.items.find(item => item.id === product.id);

            // const quantityToAdd = product.quantity || 1;
            // const price = Number(product.price) || 0;

            // if (existingItem) {
            //     existingItem.quantity += quantityToAdd;
            // } else {
            //     state.items.push({ ...product, quantity: quantityToAdd });
            // }

            // state.totalQuantity += quantityToAdd;
            // state.totalPrice += price * quantityToAdd;
        },

        removeFromCart(state, action) {
            const productId = action.payload;
            const index = state.items.findIndex(item => item.id === productId);

            if (index !== -1) {
                const item = state.items[index];
                const price = Number(item.price) || 0;
                state.totalQuantity -= item.quantity;
                state.totalPrice -= price * item.quantity;
                state.items.splice(index, 1);
            }
        },

        incrementQuantity(state, action) {
            // const productId = action.payload;
            // const item = state.items.find(item => item.id === productId);
            // if (item) {
            //     const price = Number(item.price) || 0;
            //     item.quantity++;
            //     state.totalQuantity++;
            //     state.totalPrice += price;
            // }
            state.rerender = state.rerender + 1
        },

        decrementQuantity(state, action) {
            // const productId = action.payload;
            // const item = state.items.find(item => item.id === productId);
            // if (item) {
            //     const price = Number(item.price) || 0;
            //     if (item.quantity > 1) {
            //         item.quantity--;
            //         state.totalQuantity--;
            //         state.totalPrice -= price;
            //     } else if (item.quantity === 1) {
            //         state.totalQuantity--;
            //         state.totalPrice -= price;
            //         state.items = state.items.filter(item => item.id !== productId);
            //     }
            // }
            state.rerender = state.rerender - 1
        },

        setTotalCount(state,action) {
            state.totalQuantity = action.payload
        },

        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            state.rerender = 0
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    setTotalCount,
    clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
