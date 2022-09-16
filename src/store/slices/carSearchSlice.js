import { createSlice } from '@reduxjs/toolkit';
const initialState = {
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
    updateTerm(state, action) {
      return { ...state, term: action.payload };
    },
    updateFilters(state, action) {
      const update = { ...state.filters, ...action.payload };
      return { ...state, filters: update };
    },
  },
});

export const { updateTerm, updateFilters } = carSearchSlice.actions;
export default carSearchSlice.reducer;
