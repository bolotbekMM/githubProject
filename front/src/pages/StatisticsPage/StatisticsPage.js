import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import axios from 'axios';
import vlevoSvg from '../../assets/icons/Vlevosvg.svg';
import css from './StatisticsPage.module.scss';

const itemsPerPage = 10;

function StatisticsPage() {
  const [fetchingData, setFetchingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/logs`);
        console.log(response.data);
        setFetchingData(response.data.logs);
      } catch (error) {
        console.error('Error fetching issue:', error);
      }
    };

    fetchIssue();
  }, []);

  function formattedDate(date) {
    return format(parseISO(date), 'HH:mm dd/MM/yyyy');
  }

  const totalPages = Math.ceil(fetchingData.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={css.issuesList}>
      <Link to="/">
        <img className={css.vlevo} src={vlevoSvg} alt="back" />
      </Link>
      {fetchingData.length === 0 ? (
        <p className={css.noIssues}>Ничего не найдено</p>
      ) : (
        <>
          <div className={css.issue}>
            <div className={css.firsBox}>
              <span className={css.isTitle}>№</span>
            </div>
            <div className={css.secondBox}>
              <span className={css.isTitle}>IP пользователя</span>
            </div>
            <div className={css.secondBox}>
              <span className={css.isTitle}>Время</span>
            </div>
            <div className={css.secondBox}>
              <span className={css.isTitle}>Тип</span>
            </div>
          </div>
          {fetchingData
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item, index) => (
              <div key={item.date} className={css.issue}>
                <div className={css.firsBox}>
                  <span className={css.issueTitle}>
                    {index + 1 + itemsPerPage * (currentPage - 1)}
                  </span>
                </div>
                <div className={css.secondBox}>
                  <span className={css.issueTitle}>{item.ip}</span>
                </div>
                <div className={css.secondBox}>
                  <span className={css.issueNumber}>
                    {formattedDate(item.date)}
                  </span>
                </div>
                <div className={css.secondBox}>
                  <span className={css.issueNumber}>{item.type}</span>
                </div>
              </div>
            ))}
          <div className={css.pagination}>
            {pageNumbers.map((number) => (
              <button
                type="button"
                className={
                  number === currentPage ? css.pagButtonActive : css.pagButton
                }
                key={number}
                onClick={() => handlePageChange(number)}
              >
                <span>{number}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default StatisticsPage;
