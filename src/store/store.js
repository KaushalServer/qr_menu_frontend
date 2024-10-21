// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from './user/userSlice.js';

// const appStore = configureStore({
//     reducer:{
//         user: userReducer,
//         // more reducers
//     }
// });

// export default appStore;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine your reducers
const rootReducer = combineReducers({ user: userReducer });

// Configure persistence
const persistConfig = {
  key: 'menu_root',
  version: 1,
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor
export const persistor = persistStore(store);