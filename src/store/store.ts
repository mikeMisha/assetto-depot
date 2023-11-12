import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { Action, AnyAction, Store } from 'redux';

import trackSearchReducer from './slices/trackSearchSlice';
import carSearchReducer from './slices/carSearchSlice';
import paginationReducer from './slices/paginationSlice';

// Define the root state based on the reducers in the store
export type RootState = ReturnType<typeof combinedReducer>;

const combinedReducer = combineReducers({
  trackSearch: trackSearchReducer,
  carSearch: carSearchReducer,
  pagination: paginationReducer,
});

// Define the store's type
export type StoreType = Store<RootState, AnyAction>;

// Create the makeStore function with the correct type
const makeStore: MakeStore<StoreType> = () =>
  configureStore({
    reducer: combinedReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

// Create a wrapper with the correctly typed makeStore function
export const wrapper = createWrapper<StoreType>(makeStore);
