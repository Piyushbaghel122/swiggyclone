import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
       cart: {},
       isloading: false,
       error: null,
    },
    reducers: {
          cart:(state , action ) => {
            state.cart = action.payload;

          }, 
          isloading: (state , action) => {
            state.isloading = action.payload;
          },
          error: (state , action) =>{
           state.error = action.payload;
          }
          
    }
})

export const { cart, isloading, error } = cartSlice.actions;
export default cartSlice.reducer;

export const cartItem  = async () => {
     const res = await fetch("api/cart", {
        method: "POST",
        headers: {
           "content-type": "application/json"
        }, 
        body: JSON.stringify({
            
        })
     })
}