import React from 'react';

const User = ({ id, onUserClick }) => {
  return (
    <div
      style={{
        color: 'blue',
        width: '150px',
        height: '70px',
        border: '2px solid black',
        borderRadius: '50%',
        marginBottom: '5px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      onClick={() => onUserClick(id)}
    >
      {id}
    </div>
  );
};

export default User;
