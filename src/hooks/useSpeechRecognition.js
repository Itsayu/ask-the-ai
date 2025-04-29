import { useState, useEffect, useCallback } from 'react';

// Speech recognition setup with browser compatibility
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported by your browser.');
      return;
    }

    // Initialize recognition
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(prev => prev + finalTranscript + interimTranscript);
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setError(`Speech recognition error: ${event.error}`);
      setListening(false);
    };

    recognitionInstance.onend = () => {
      setListening(false);
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognition) return;

    try {
      recognition.start();
      setListening(true);
      setError(null);
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setError(`Couldn't start speech recognition: ${err.message}`);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (!recognition) return;

    try {
      recognition.stop();
      setListening(false);
    } catch (err) {
      console.error('Error stopping speech recognition:', err);
    }
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    error
  };
};

export default useSpeechRecognition;