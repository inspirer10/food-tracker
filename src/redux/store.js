import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products';
import nightModeReducer from './nightMode';
import productsCountReducer from './productsCount';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        nightMode: nightModeReducer,
        productsCount: productsCountReducer,
    },
});

console.log(store.getState());
