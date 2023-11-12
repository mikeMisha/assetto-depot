import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CarSearchState {
  term: string;
  filters: {
    category: string;
    brand: string;
  };
}
const initialState: CarSearchState = {
  term: '',
  filters: {
    category: '',
    brand: '',
  },
};

const carSearchSlice = createSlice({
  name: 'carSearch',
  initialState,
  reducers: {
    updateTerm(state, action: PayloadAction<string>) {
      return { ...state, term: action.payload };
    },
    updateFilters(state, action: PayloadAction<CarSearchState['filters']>) {
      const update = { ...state.filters, ...action.payload };
      return { ...state, filters: update };
    },
  },
});

export const { updateTerm, updateFilters } = carSearchSlice.actions;
export default carSearchSlice.reducer;
