import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    item: '',    
    error: null,
  };

const leftMenuSlice = createSlice({
    name: 'leftMenu',
    initialState,
    reducers: {
        setLeftMenuItem: (state, action) => {
            state.item = action.payload;
        },
    },
    extraReducers: (builder) => {},
});

//селекторы
export const selectItem = (state) => state.leftMenu.item;
export const { setLeftMenuItem } = leftMenuSlice.actions;

export default leftMenuSlice.reducer;