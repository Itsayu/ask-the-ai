import { useState, useEffect, useRef } from 'react';

const useMediaRecorder = () => {
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [error, setError] = useState(null);
  
  const chunksRef = useRef([]);

  useEffect(() => {
    // Clean up function to stop all tracks when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });
      
      setStream(mediaStream);
      chunksRef.current = [];
      
      const recorder = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm;codecs=vp9,opus'
      });
      
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
          setRecordedChunks([...chunksRef.current]);
        }
      };
      
      recorder.onstop = () => {
        setRecordingStatus('inactive');
      };
      
      setMediaRecorder(recorder);
      
      // Start recording immediately
      recorder.start(1000); // Collect data every second
      setRecordingStatus('recording');
      setError(null);
      
      return mediaStream;
    } catch (err) {
      console.error('Error accessing media devices:', err);
      setError(`Couldn't access camera or microphone: ${err.message}`);
      throw err;
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recordingStatus === 'recording') {
      mediaRecorder.stop();
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const downloadRecording = () => {
    if (recordedChunks.length === 0) return;
    
    try {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = `ask-ai-session-${new Date().toISOString()}.webm`;
      a.click();
      
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error creating download:', err);
      setError(`Couldn't create download: ${err.message}`);
    }
  };

  return {
    stream,
    mediaRecorder,
    recordingStatus,
    recordedChunks,
    startRecording,
    stopRecording,
    downloadRecording,
    error
  };
};

export default useMediaRecorder;