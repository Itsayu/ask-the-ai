import React from 'react';
import LoadingIndicator from './LoadingIndicator';

const AIResponse = ({ text, loading }) => {
  return (
    <div className="response-container">
      {loading ? (
        <LoadingIndicator />
      ) : text ? (
        <p>{text}</p>
      ) : (
        <p style={{ color: '#999', fontStyle: 'italic' }}>
          The AI response will appear here after you ask a question...
        </p>
      )}
    </div>
  );
};

export default AIResponse;