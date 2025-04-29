/**
 * Format a timestamp in seconds to mm:ss format
 * @param {number} seconds - The time in seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  /**
   * Check if the browser supports required APIs
   * @returns {Object} Object containing support status for each API
   */
  export const checkBrowserSupport = () => {
    return {
      mediaDevices: !!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia,
      mediaRecorder: typeof MediaRecorder !== 'undefined',
      speechRecognition: !!(window.SpeechRecognition || window.webkitSpeechRecognition)
    };
  };
  
  /**
   * Truncate text to a specified length
   * @param {string} text - The text to truncate
   * @param {number} maxLength - Maximum length before truncation
   * @returns {string} Truncated text
   */
  export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  /**
   * Detect if the device is mobile
   * @returns {boolean} True if the device is mobile
   */
  export const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  
  /**
   * Handle permission errors with user-friendly messages
   * @param {Error} error - The error object
   * @returns {string} User-friendly error message
   */
  export const getPermissionErrorMessage = (error) => {
    if (!error) return null;
    
    const errorName = error.name || '';
    
    switch (errorName) {
      case 'NotAllowedError':
      case 'PermissionDeniedError':
        return 'Permission to access camera and microphone was denied. Please allow access to use this feature.';
      case 'NotFoundError':
      case 'DevicesNotFoundError':
        return 'No camera or microphone was found on your device.';
      case 'NotReadableError':
      case 'TrackStartError':
        return 'Your camera or microphone is already in use by another application.';
      case 'OverconstrainedError':
        return 'No suitable camera or microphone was found on your device.';
      case 'TypeError':
        return 'The browser cannot access your camera or microphone. Try using a different browser.';
      default:
        return `An error occurred: ${error.message || 'Unknown error'}`;
    }
  };