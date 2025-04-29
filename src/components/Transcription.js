import React from 'react';

const Transcription = ({ text }) => {
  return (
    <div className="transcription-container">
      {text ? (
        <p>{text}</p>
      ) : (
        <p style={{ color: '#999', fontStyle: 'italic' }}>
          Your voice input will appear here...
        </p>
      )}
    </div>
  );
};

export default Transcription;