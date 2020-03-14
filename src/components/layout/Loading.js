import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import override from './Loading-css';
const Spinner = () => {
  return (
    <div className='content-spinner'>
      <FadeLoader css={override} size={20} color={'grey'} loading={true} />
    </div>
  );
};
export default Spinner;
