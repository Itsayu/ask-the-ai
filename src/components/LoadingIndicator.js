import React from 'react';

const LoadingIndicator = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '6px',
        marginBottom: '10px' 
      }}>
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#4285f4',
              animation: `bounce 1.4s infinite ease-in-out both`,
              animationDelay: `${i * 0.16}s`
            }}
          />
        ))}
      </div>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>AI is thinking...</p>
      
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}</style>
    </div>
  );
};

export default LoadingIndicator;