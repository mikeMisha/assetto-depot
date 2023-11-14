import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TrackSearchState {
  term: string;
  filters: {
    category: string;
    trackType: string;
  };
}

const initialState = {
  term: '',
  filters: {
    category: '',
    trackType: '',
  },
};

const trackSearchSlice = createSlice({
  name: 'trackSearch',
  initialState,
  reducers: {
    updateTerm(state: TrackSearchState, action: PayloadAction<string>) {
      return { ...state, term: action.payload };
    },
    updateFilters(
      state: TrackSearchState,
      action: PayloadAction<TrackSearchState['filters']>
    ) {
      console.log('action.payload', action.payload);
      const update = { ...state.filters, ...action.payload };
      return { ...state, filters: update };
    },
  },
});

export const { updateTerm, updateFilters } = trackSearchSlice.actions;
export default trackSearchSlice.reducer;
