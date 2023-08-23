import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    user: '',
    issues: '',
    pageSize: 10,
    currentPage: 1,
    results: [],
    totalPage: 0,
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    setIssues: (state, action) => ({
      ...state,
      issues: action.payload,
    }),
    setPageSize: (state, action) => ({
      ...state,
      pageSize: action.payload,
    }),
    setCurrentPage: (state, action) => ({
      ...state,
      currentPage: action.payload,
    }),
    setResults: (state, action) => ({
      ...state,
      results: action.payload,
    }),
    setTotalPage: (state, action) => ({
      ...state,
      totalPage: action.payload,
    }),
    setIsLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
  },
});

export const {
  setPageSize,
  setCurrentPage,
  setUser,
  setIssues,
  setResults,
  setTotalPage,
  setIsLoading,
} = paginationSlice.actions;
export default paginationSlice.reducer;
