import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSingleCol: false,
  pageSize: 15,
  currentPage: 1,
  sortValue: 'top rated',
  sortedData: [],
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setIsSingleCol(state, action) {
      return { ...state, isSingleCol: action.payload };
    },
    setPageSize(state, action) {
      return { ...state, pageSize: action.payload };
    },
    setCurrentPage(state, action) {
      return { ...state, currentPage: action.payload };
    },
    setSortValue(state, action) {
      return { ...state, sortValue: action.payload };
    },
    setSortedData(state, action) {
      return { ...state, sortedData: action.payload };
    },
  },
});

export const {
  setIsSingleCol,
  setCurrentPage,
  setPageSize,
  setSortedData,
  setSortValue,
} = paginationSlice.actions;
export default paginationSlice.reducer;
