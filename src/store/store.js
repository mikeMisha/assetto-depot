import { configureStore, combineReducers } from '@reduxjs/toolkit';

import trackSearch from './slices/trackSearchSlice';
import carSearch from './slices/carSearchSlice';
import { createWrapper } from 'next-redux-wrapper';
import pagination from './slices/paginationSlice';
const combinedReducer = combineReducers({
  trackSearch,
  carSearch,
  pagination,
});

const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
    devTools: true,
  });

export const wrapper = createWrapper(makeStore, { debug: true });
