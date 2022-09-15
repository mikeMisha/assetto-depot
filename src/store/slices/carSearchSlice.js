import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  category: '',
  brand: '',
};
const carSearchSlice = createSlice({
  name: 'carSearch',
  initialState,
  reducers: {
    updateCarSearch(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateCarSearch } = carSearchSlice.actions;
export default carSearchSlice.reducer;

/** 
// Extract the action creators object and the reducer
const { actions, reducer } = carSearchSlice;
// Extract and export each action creator by name
export const { updateCarSearch } = actions;
// Export the reducer, either as a default or named export
export default reducer;
*/
