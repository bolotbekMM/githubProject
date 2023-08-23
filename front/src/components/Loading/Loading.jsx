import React from 'react';
import loadingSvg from '../../assets/icons/Loading.gif';
import css from './Loading.module.scss';

function Loading() {
  return (
    <div className={css.loadingIcoonn}>
      <img className={css.loadinIcoonnSvg2} src={loadingSvg} alt="loading" />
    </div>
  );
}

export default Loading;
