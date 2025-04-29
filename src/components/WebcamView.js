import React, { useRef, useEffect } from 'react';

const WebcamView = ({ stream, recording }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="webcam-container">
      <video 
        ref={videoRef}
        className="webcam-video" 
        autoPlay 
        muted 
        playsInline
      />
      {recording && <div className="recording-indicator" />}
    </div>
  );
};

export default WebcamView;