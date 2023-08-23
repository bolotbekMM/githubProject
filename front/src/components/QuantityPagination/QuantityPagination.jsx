import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageSize } from '../../store/Slices/paginationSlice';
import css from './QuantityPagination.module.scss';

function QuantityPagination() {
  const dispatch = useDispatch();
  const [activeOption, setActiveOption] = useState(10);

  const handleOptionClick = (option) => {
    setActiveOption(option);
    dispatch(setPageSize(option));
  };

  return (
    <div className={css.pagination}>
      <button
        type="button"
        className={`${css['pagination-option']} ${
          activeOption === 10 ? css.active : ''
        }`}
        onClick={() => handleOptionClick(10)}
      >
        10
      </button>
      <button
        type="button"
        className={`${css['pagination-option']} ${
          activeOption === 30 ? css.active : ''
        }`}
        onClick={() => handleOptionClick(30)}
      >
        30
      </button>
      <button
        type="button"
        className={`${css['pagination-option']} ${
          activeOption === 50 ? css.active : ''
        }`}
        onClick={() => handleOptionClick(50)}
      >
        50
      </button>
    </div>
  );
}

export default QuantityPagination;
