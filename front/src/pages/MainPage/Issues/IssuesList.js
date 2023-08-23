import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { format, parseISO } from 'date-fns';
import css from './IssuesList.module.scss';

function IssuesList() {
  const result = useSelector((state) => state.pagination.results);

  function extractDate(inputString) {
    const digitsOnly = inputString.replace(/\D/g, '');
    const firstEightDigits = digitsOnly.slice(0, 8);
    return firstEightDigits;
  }

  function formattedDate(date) {
    return format(
      parseISO(date),
      `do MMMM ${extractDate(date) < '20230101' ? 'yyyy' : ''}`
    );
  }

  return (
    <div className={css.issuesList}>
      {result.length === 0 ? (
        <p className={css.noIssues}>Ничего не найдено</p>
      ) : (
        result.map((issue) => (
          <Link to={`/detailPage/${issue.number}`} key={issue.id}>
            <div className={css.issue}>
              <div className={css.firsBox}>
                <img src={issue.user.avatar_url} alt="Avatar" />
                <span className={css.issueTitle}>{issue.title}</span>
              </div>
              <div className={css.secondBox}>
                <span className={css.issueNumber}>#{issue.number}</span>
                <span className={css.issueNumber}>
                  opened on {formattedDate(issue.created_at)}
                </span>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default IssuesList;
