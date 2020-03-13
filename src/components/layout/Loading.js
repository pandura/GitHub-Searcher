import React from 'react';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
const Spinner = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return (
    <div className='content-spinner'>
      <FadeLoader css={override} size={20} color={'grey'} loading={true} />
    </div>
  );
};
export default Spinner;
