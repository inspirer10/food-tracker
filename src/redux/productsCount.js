import { createSlice } from '@reduxjs/toolkit';

const allProductsCount =
    localStorage.getItem('allProductsCount') !== null
        ? JSON.parse(localStorage.getItem('allProductsCount'))
        : 0;

const initialState = {
    allProductsCount: allProductsCount,
};

export const nightModeSlice = createSlice({
    name: 'allProductsCount',
    initialState,
    reducers: {
        increaseProductsCount: (state) => {
            state.allProductsCount += 1;
            localStorage.setItem(
                'allProductsCount',
                JSON.stringify(state.allProductsCount)
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const { increaseProductsCount } = nightModeSlice.actions;

export default nightModeSlice.reducer;
