import React from 'react';

const Alert = ({ alertMsg, classMark }) => {
  return (
    <div className='content-alert'>
      <p className={classMark}>{alertMsg}</p>
    </div>
  );
};
export default Alert;
