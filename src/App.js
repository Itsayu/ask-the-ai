import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import WebcamView from './components/WebcamView';
import MicrophoneButton from './components/MicrophoneButton';
import Transcription from './components/Transcription';
import AIResponse from './components/AIResponse';
import RecordingControls from './components/RecordingControls';
import useSpeechRecognition from './hooks/useSpeechRecognition';
import useMediaRecorder from './hooks/useMediaRecorder';
import { askAI } from './services/mockAIService';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  
  const { 
    transcript, 
    listening, 
    startListening, 
    stopListening, 
    resetTranscript 
  } = useSpeechRecognition();
  
  const {
    stream,
    mediaRecorder,
    recordingStatus,
    recordedChunks,
    startRecording,
    stopRecording,
    downloadRecording,
    error: mediaError
  } = useMediaRecorder();

  useEffect(() => {
    setQuestion(transcript);
  }, [transcript]);

  const handleStartSession = async () => {
    try {
      setSessionActive(true); // First set session active
      await startRecording();  // Then start recording
      resetTranscript();
      setResponse('');
    } catch (error) {
      console.error('Failed to start session:', error);
      setSessionActive(false); // Reset if there's an error
    }
  };

  const handleEndSession = () => {
    stopRecording();
    stopListening();
    setSessionActive(false);
  };

  const handleSubmit = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    
    try {
      const aiResponse = await askAI(question);
      setResponse(aiResponse);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setResponse('Sorry, I encountered an error processing your request.');
    } finally {
      setLoading(false);
      resetTranscript();
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      {!sessionActive && (
        <div className="start-session" style={{ textAlign: 'center', margin: '40px 0' }}>
          <button 
            onClick={handleStartSession} 
            className="submit-button"
            style={{ padding: '15px 30px', fontSize: '1.1rem' }}
          >
            Start Session
          </button>
          {mediaError && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{mediaError}</p>}
        </div>
      )}
      
      {(sessionActive || recordingStatus) && (
        <div className="app-main">
          <div className="left-panel">
            <WebcamView 
              stream={stream} 
              recording={recordingStatus === 'recording'} 
            />
            
            <RecordingControls 
              recordingStatus={recordingStatus}
              onStopRecording={handleEndSession}
              onDownload={downloadRecording}
              hasRecording={recordedChunks.length > 0}
            />
          </div>
          
          <div className="right-panel">
            <div className="interaction-container">
              <div>
                <h3 className="section-title">Your Question</h3>
                <Transcription text={question || transcript} />
                
                <div className="controls">
                  <MicrophoneButton 
                    listening={listening}
                    onStart={startListening}
                    onStop={stopListening}
                    disabled={!sessionActive}
                  />
                  
                  <button 
                    className="submit-button" 
                    onClick={handleSubmit}
                    disabled={loading || !question.trim() || !sessionActive}
                  >
                    {loading ? 'Processing...' : 'Ask AI'}
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="section-title">AI Response</h3>
                <AIResponse text={response} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;