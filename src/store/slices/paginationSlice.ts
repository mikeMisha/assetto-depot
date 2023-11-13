import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track, Car, SortValue } from '../../types/global';
// Define a type for the slice state
export interface PaginationState {
  isSingleCol: boolean;
  pageSize: number;
  currentPage: number;
  sortValue: SortValue;
  sortedData: Track[] | Car[] | []; // Replace 'any' with the type of your sorted data items
}

// Define the initial state using the `PaginationState` type
const initialState: PaginationState = {
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
    setIsSingleCol(state, action: PayloadAction<boolean>) {
      state.isSingleCol = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSortValue(state, action: PayloadAction<PaginationState['sortValue']>) {
      state.sortValue = action.payload;
    },
    // Replace 'any' with the type of your sorted data items
    setSortedData(state, action: PayloadAction<any[]>) {
      state.sortedData = action.payload;
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
