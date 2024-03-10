import { createSlice } from '@reduxjs/toolkit';

const nightMode =
    localStorage.getItem('nightMode') !== null
        ? JSON.parse(localStorage.getItem('nightMode'))
        : false;

const initialState = {
    nightMode: nightMode,
};

export const nightModeSlice = createSlice({
    name: 'nightMode',
    initialState,
    reducers: {
        changeState: (state, action) => {
            let newState = Boolean(action.payload);
            state.nightMode = newState;
            localStorage.setItem('nightMode', Boolean(state.nightMode));
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeState } = nightModeSlice.actions;

export default nightModeSlice.reducer;
