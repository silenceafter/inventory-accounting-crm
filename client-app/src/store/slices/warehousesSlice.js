import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
    error: null,
  };

export const warehousesFetchData = createAsyncThunk(
    'warehouses/fetchData', 
    async (credentials) => {
        const response = await fetch('https://localhost:7289/warehouses', {
            method: 'GET',
            credentials: 'include'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка');
        }
        const data = await response.json();
        return data;
});

const warehousesSlice = createSlice({
    name: 'warehouses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(warehousesFetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(warehousesFetchData.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(warehousesFetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });            
    },
});

//селекторы
export const selectItems = (state) => state.warehouses.items;
export const selectLoading = (state) => state.warehouses.loading;
export const selectError = (state) => state.warehouses.error;

export default warehousesSlice.reducer;