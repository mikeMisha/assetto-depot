import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  term: '',
  filters: {
    category: '',
    type: '',
  },
};

const trackSearchSlice = createSlice({
  name: 'trackSearch',
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

export const { updateTerm, updateFilters } = trackSearchSlice.actions;
export default trackSearchSlice.reducer;
