import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import RenderMarkdown from '../../components/RenderMarkdown/RenderMarkdown';
import css from './DetailPage.module.scss';
import vlevoSvg from '../../assets/icons/Vlevosvg.svg';
import Loading from '../../components/Loading/Loading';

function DetailPage() {
  const [issue, setIssue] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const userName = useSelector((state) => state.pagination.user);
  const issues = useSelector((state) => state.pagination.issues);

  const { id } = useParams();

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/issues/${userName}/${issues}/${id}`
        );
        console.log(response);
        setIssue(response.data.issue);
      } catch (error) {
        console.error('Error fetching issue:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssue();
  }, [userName, issues, id]);

  const extractDate = (inputString) => {
    const digitsOnly = inputString.replace(/\D/g, '');
    const firstEightDigits = digitsOnly.slice(0, 8);
    return firstEightDigits;
  };

  function formattedDate(date) {
    return format(
      parseISO(date),
      `do MMMM ${extractDate(date) < '20230101' ? 'yyyy' : ''}`
    );
  }

  return (
    <div className={css.detailPage}>
      <div className="container">
        <Link to="/">
          <img className={css.vlevo} src={vlevoSvg} alt="back" />
        </Link>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={css.box}>
            <div className={css.head}>
              <img
                className={css.avatar}
                src={issue?.user?.avatar}
                alt="avatar"
              />
              <span className={css.issueNumber}>
                commented{' '}
                {issue.created_at ? formattedDate(issue.created_at) : ''}
              </span>
            </div>
            <div className={css.body}>
              <RenderMarkdown body={issue.body} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailPage;
