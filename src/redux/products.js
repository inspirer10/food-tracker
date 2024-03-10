import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            return { products: [...action.payload] };
        },
        addProduct: (state, action) => {
            return { products: [action.payload, ...state.products] };
        },
        removeProduct: (state, action) => {
            const productIdToRemove = action.payload._id;
            state.products = state.products.filter(
                (product) => product._id !== productIdToRemove
            );
        },
    },
});

/*const productsInitialState = {
    products: [],
};

const products =
    localStorage.getItem('products') !== null
        ? JSON.parse(localStorage.getItem('products'))
        : [];

export const productsSlice = createSlice({
    name: 'products',
    products, //productsInitialState
    reducers: {
        setProducts: (state, action) => {
            state.products.push({
                productName: action.payload.name,
                id: action.payload.id,
                expirationDate: action.payload.expirationDate,
                cathegory: action.payload.cathegory,
            });
            //return { products: action.payload };
        },
        addProduct: (state, action) => {
            state.products.push({
                productName: action.payload.name,
                id: action.payload.id,
                expirationDate: action.payload.expirationDate,
                cathegory: action.payload.cathegory,
            });
            //return { products: [action.payload, ...state.products] };
        },
    },
}); */

export const { setProducts, addProduct, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;
