import React from 'react';
import { useSelector } from 'react-redux';
import css from './MainPage.module.scss';
import Search from '../../components/Search/Search';
import IssuesList from './Issues/IssuesList';
import QuantityPagination from '../../components/QuantityPagination/QuantityPagination';
import PagePagination from '../../components/PagePagination/PagePagination';
import Loading from '../../components/Loading/Loading';

function MainPage() {
  const totalPage = useSelector((state) => state.pagination.totalPage);
  const isLoading = useSelector((state) => state.pagination.isLoading);

  return (
    <div className={css.mainPage}>
      <div className="container">
        <div className={css.box}>
          <Search />
          <QuantityPagination />
          {isLoading ? <Loading /> : <IssuesList />}
          {totalPage > 1 && <PagePagination />}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
