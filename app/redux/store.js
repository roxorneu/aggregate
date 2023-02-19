// Store is used to persist user interest in trips across app instances
// Stores key (vieweID) to value (trips interested in) mapping for multiple users

import { configureStore } from "@reduxjs/toolkit";

import interestListReducer from "./interestSlice";

import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

let rootReducer = combineReducers({
  tripsList: interestListReducer,
  timeout: null,
});

let persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

let persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
