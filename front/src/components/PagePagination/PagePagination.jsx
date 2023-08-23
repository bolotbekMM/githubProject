import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentPage,
  setResults,
  setIsLoading,
} from '../../store/Slices/paginationSlice';
import css from './PagePagination.module.scss';

function PagePagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const totalPage = useSelector((state) => state.pagination.totalPage);
  const userName = useSelector((state) => state.pagination.user);
  const issues = useSelector((state) => state.pagination.issues);
  const pageSize = useSelector((state) => state.pagination.pageSize);
  const [isFetching, setIsFetching] = useState(false);

  const totalPages = totalPage;
  const visiblePages = 10;

  async function fetchIssues() {
    if (isFetching) {
      return;
    }

    try {
      setIsFetching(true);
      dispatch(setIsLoading(true));
      const response = await axios.get(
        `https://api.github.com/repos/${userName}/${issues}/issues`,
        {
          params: {
            per_page: pageSize,
            page: currentPage,
          },
        }
      );
      dispatch(setResults(response.data));
      console.log(response);
    } catch (error) {
      console.error('Error fetching issues:', error);
      dispatch(setResults([]));
    } finally {
      setIsFetching(false);
      dispatch(setIsLoading(false));
    }
  }

  const handlePageClick = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  useEffect(() => {
    fetchIssues();
  }, [currentPage, pageSize, userName, issues]);

  function renderPageNumbers() {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));

    for (
      let i = startPage;
      i <= Math.min(totalPages, startPage + visiblePages - 1);
      i += 1
    ) {
      pageNumbers.push(
        <button
          type="button"
          key={i}
          className={`${css['pagination-option']} ${
            currentPage === i ? css.active : ''
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  }

  return (
    <div className={css.pagination}>
      <button
        type="button"
        className={`${css['pagination-option']} ${
          currentPage === 1 ? css.disabled : ''
        }`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        type="button"
        className={`${css['pagination-option']} ${
          currentPage === totalPages ? css.disabled : ''
        }`}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}

export default PagePagination;
