import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import LoginReducer from './UserSlice';
import AdminReducer from './Admin'

const persistConfig = {
  key: 'logindata',
  version: 1,
  storage
};

const rootReducer = combineReducers({
  userlogin: LoginReducer,
  adminLogin:AdminReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['FLUSH', 'REHYDRATE', 'PAUSE', 'PERSIST', 'PURGE', 'REGISTER'],
      },
    }),
});

export const persistor = persistStore(store);
