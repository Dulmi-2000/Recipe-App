import React from 'react';

function CustomButton({ size, width, children, ...rest }) {
  const buttonStyles = {
    fontSize: '17px', 
    backgroundColor: 'rgb(243, 112, 134)', 
    color: '#ffffff', 
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  };

  return (
    <button style={buttonStyles} {...rest}>
      {children}
    </button>
  );
}

export default CustomButton;
