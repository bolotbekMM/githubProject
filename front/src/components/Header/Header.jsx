import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './Header.module.scss';
import gitHubIcon from '../../assets/icons/iconGitHub.svg';

function Header() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <header className={css.header}>
      <div className={css.mainPart}>
        <Link to="/">
          <img src={gitHubIcon} alt="gitHubIcon" />
        </Link>
        <h1>GitHub Issue Tracker</h1>
        {location.pathname !== '/statistics' && (
          <div className={css.stat}>
            <Link to="/statistics">Статистика</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
