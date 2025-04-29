import React from 'react';

const RecordingControls = ({ 
  recordingStatus, 
  onStopRecording,
  onDownload,
  hasRecording
}) => {
  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <h3 className="section-title">Session Recording</h3>
        <div className="status-text">
          {recordingStatus === 'recording' ? (
            <span style={{ color: '#ff4b4b' }}>● Recording</span>
          ) : recordingStatus === 'inactive' && hasRecording ? (
            <span style={{ color: '#0f9d58' }}>✓ Recording saved</span>
          ) : (
            <span>Not recording</span>
          )}
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        {recordingStatus === 'recording' && (
          <button 
            className="stop-button" 
            onClick={onStopRecording}
            style={{ flex: 1 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="12" height="12" fill="white"/>
            </svg>
            End Session
          </button>
        )}
        
        {hasRecording && recordingStatus !== 'recording' && (
          <button 
            className="download-button"
            onClick={onDownload}
            style={{ flex: 1 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="white"/>
            </svg>
            Download Recording
          </button>
        )}
      </div>
    </div>
  );
};

export default RecordingControls;