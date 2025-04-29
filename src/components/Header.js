import React from 'react';

const Header = () => {
  return (
    <header>
      <h1 style={{
        fontSize: '2.5rem',
        color: '#333',
        textAlign: 'center',
        marginBottom: '20px',
        fontWeight: '700'
      }}>
        Ask the AI
      </h1>
      <p style={{
        textAlign: 'center',
        color: '#666',
        marginBottom: '30px'
      }}>
        Speak to the AI with your voice and get instant responses
      </p>
    </header>
  );
};

export default Header;