import React from 'react';

const User = ({ id, onClick }) => {
  return (
    <div
      style={{
        color: 'blue',
        width: '200px',
        height: '50px',
        border: '2px solid black',
        marginBottom: '5px',
      }}
      onClick={ () => onClick(id)}
    >
      {id}
    </div>
  );
};

export default User;
