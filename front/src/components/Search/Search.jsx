import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  setIssues,
  setUser,
  setResults,
  setTotalPage,
  setCurrentPage,
  setIsLoading,
} from '../../store/Slices/paginationSlice';
import css from './Search.module.scss';
import searchIcon from '../../assets/icons/searchIcon.svg';

function Search() {
  const pageSize = useSelector((state) => state.pagination.pageSize);
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const user = useSelector((state) => state.pagination.user);
  const issues = useSelector((state) => state.pagination.issues);

  const dispatch = useDispatch();
  const [userName, setUserName] = useState(user);
  const [repository, setRepository] = useState(issues);
  const [isFetching, setIsFetching] = useState(false);

  const onChangeUserName = (e) => setUserName(e.target.value);
  const onChangeRepository = (e) => setRepository(e.target.value);

  async function onClickHandler() {
    if (isFetching) {
      return;
    }

    try {
      setIsFetching(true);
      dispatch(setIsLoading(true));

      const params = {
        per_page: pageSize,
        page: currentPage,
      };

      const response = await axios.get(
        `https://api.github.com/repos/${userName}/${repository}/issues`,
        { params }
      );
      const linkHeader = response.headers.link;
      const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
      const totalPages = lastPageMatch ? parseInt(lastPageMatch[1], 10) : 0;
      console.log(response);
      dispatch(setTotalPage(totalPages));
      dispatch(setResults(response.data));
      dispatch(setUser(userName));
      dispatch(setIssues(repository));
      dispatch(setCurrentPage(1));
    } catch (error) {
      console.error('Error fetching issues:', error);
      dispatch(setResults([]));
      dispatch(setTotalPage(0));
      dispatch(setCurrentPage(1));
    } finally {
      setIsFetching(false);
      dispatch(setIsLoading(false));
    }
  }

  return (
    <div className={css.search}>
      <div className={css.serchBox}>
        <input
          type="text"
          name="userName"
          placeholder="Введите имя пользователя"
          className={css.repoInput}
          value={userName}
          onChange={onChangeUserName}
        />
        <div className={css.divider}> </div>
        <input
          type="text"
          name="repositoriy"
          placeholder="Введите репозиторий"
          className={css.issueInput}
          value={repository}
          onChange={onChangeRepository}
        />
        <div className={css.divider}> </div>
        <button
          onClick={onClickHandler}
          type="button"
          className={css.serchButton}
        >
          <img className={css.searchIcon} src={searchIcon} alt="search-icon" />
        </button>
      </div>
    </div>
  );
}

export default Search;
