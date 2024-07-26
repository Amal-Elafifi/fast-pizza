import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    cart: []

}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action){
            // newpizza = action.payload
            state.cart.push(action.payload);
        },
        deleteItem(state, action){
            // pizzaId = action.payload
            state.cart = state.cart.filter(item=> item.pizzaId !== action.payload);
        },
        increaseItemQuantity(state, action){
            // pizzaId = action.payload
            const item =state.cart.find(item => item.pizzaId === action.payload);
            item.quantity++;
            item.totalPrice = item.unitPrice * item.quantity;
        },
        decreaseItemQuantity(state, action){
            // pizzaId = action.payload
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity--;
            item.totalPrice = item.unitPrice * item.quantity;
            if(item.quantity === 0)cartSlice.caseReducers.deleteItem(state, action)
        },
        clearCart(state){
            state.cart = []
        },

    }
})

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state)=> state.cart.cart;

export const getTotalQuantity = (state) => state.cart.cart.reduce((sum, item)=> sum + +item.quantity, 0);

export const getTotalPrice = (state) => state.cart.cart.reduce((sum, item)=> sum + +item.totalPrice, 0);

export const getCurrentQuantityById = (id) => state => state.cart.cart.find(item => item.pizzaId === id)?.quantity?? 0;