import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    roles: null,
    loading: false,
    error: null,
  };

export const loginUser = createAsyncThunk(
    'auth/login', 
    async (credentials) => {
        const response = await fetch('https://localhost:7289/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(credentials)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Invalid login attempt.');
        }
        const data = await response.json();
        return data;
});

export const registerUser = createAsyncThunk(
    'auth/register', 
    async (userData) => {
    const response = await fetch('https://localhost:7289/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        const message = getErrorMessages(errorData);
        throw new Error(message/*errorData.errors ? errorData.errors.join(', ') : errorData.join(', ')*/);
    }
    const data = await response.json();
    return data;
});
  
function getErrorMessages(errorData) {    
    if (!errorData.hasOwnProperty('errors')) return '';
    let message = '';
    //
    for(const errorItem in errorData.errors) {
        if (errorData.errors.hasOwnProperty(errorItem)) {
            const property = errorData.errors[errorItem];
            message = property.join(', ');
        }
    }
    return message;    
}

export const logoutUser = createAsyncThunk(
    'auth/logout', 
    async () => {
    const response = await fetch('https://localhost:7289/logout', {
        method: 'POST',
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        const message = getErrorMessages(errorData);
        throw new Error(message);
    }
    const data = await response.json();
    return data;
});

export const checkAuthStatus = createAsyncThunk(
    'auth/checkAuthStatus', 
    async () => {
    const response = await fetch('https://localhost:7289/check-auth-status', {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to check authentication status.');
    }
    const data = await response.json();
    return data;
});

export const rolesUser = createAsyncThunk(
    'auth/roles', 
    async () => {
    const response = await fetch('https://localhost:7289/roles', {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Ошибка');
    }
    const data = await response.json();
    return data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.roles = null;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload;
            })
            .addCase(checkAuthStatus.rejected, (state) => {
                state.isAuthenticated = false;
            })
            .addCase(rolesUser.fulfilled, (state, action) => {
                state.roles = action.payload;
            })
            .addCase(rolesUser.rejected, (state) => {
                state.roles = null;
            });            
    },
});

//селекторы
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectRoles = (state) => state.auth.roles;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;