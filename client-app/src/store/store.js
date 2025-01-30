import { configureStore } from '@reduxjs/toolkit';

/*import getRequestReducer from './reducers/getRequestReducer';
import headerReducer from './slices/headerSlice';
import operationsReducer from './slices/operationsSlice';
import professionsReducer from './slices/professionsSlice';
import measuringToolsReducer from './slices/measuringToolsSlice';
import toolingReducer from './slices/toolingSlice';
import componentsReducer from './slices/componentsSlice';
import materialsReducer from './slices/materialsSlice';
import unsavedChangesReducer from './slices/unsavedChangesSlice';
import drawingsAllTreeReducer from './slices/drawingsAllTreeSlice';
import drawingsReducer from './slices/drawingsSlice';
import drawingsTreeReducer from './slices/drawingsTreeSlice';*/
import authReducer from './slices/authSlice';
import warehousesReducer from './slices/warehousesSlice';
import leftMenuReducer from './slices/leftMenuSlice';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Middleware для асинхронных действий

//корневой редьюсер
const rootReducer = combineReducers({
  auth: authReducer,
  warehouses: warehousesReducer,
  leftMenu: leftMenuReducer,
});

//хранилище redux
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(thunk),
});

export default store;