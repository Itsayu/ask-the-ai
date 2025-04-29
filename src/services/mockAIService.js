// Mock AI Service with predefined responses and fallbacks

// Collection of AI responses for different types of questions
const responseTemplates = {
    greeting: [
      "Hello! How can I assist you today?",
      "Hi there! I'm your AI assistant. What can I help you with?",
      "Greetings! I'm ready to answer your questions."
    ],
    
    personal: [
      "I'm an AI assistant designed to help answer your questions and assist with tasks.",
      "I was created to provide information and assistance on a wide range of topics.",
      "I'm a virtual assistant here to help you with information and tasks."
    ],
    
    weather: [
      "I don't have access to real-time weather data, but I can help you find a reliable weather service if you'd like.",
      "While I can't check the current weather for you, I can discuss weather patterns or climate information in general."
    ],
    
    factual: [
      "Based on my knowledge, {query}. Would you like me to elaborate on this topic?",
      "According to the information I have, {query}. Is there anything specific about this you'd like to know?",
      "I understand that {query}. Would you like more details about this?"
    ],
    
    opinion: [
      "There are various perspectives on this matter. Some might say {query}, while others might disagree. What are your thoughts?",
      "This is a topic with multiple viewpoints. Many consider that {query}. Does that align with what you're looking for?",
      "That's an interesting question. While I don't have personal opinions, I can tell you that many people believe {query}."
    ],
    
    technical: [
      "From a technical perspective, {query}. Would you like me to explain any part of this in more detail?",
      "The technical answer involves {query}. Is there a specific aspect you'd like me to focus on?",
      "Technically speaking, {query}. Let me know if you need clarification on any part of this explanation."
    ],
    
    fallback: [
      "I understand you're asking about {query}. Could you provide more details so I can give you a better answer?",
      "That's an interesting question about {query}. I'd like to help you more specifically if you could elaborate.",
      "I'd be happy to help with your question about {query}. Could you share a bit more about what you're looking for?"
    ]
  };
  
  // Simple patterns to categorize questions
  const patternMatchers = [
    { type: 'greeting', patterns: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'] },
    { type: 'personal', patterns: ['who are you', 'what are you', 'tell me about yourself', 'your name', 'are you real', 'are you human'] },
    { type: 'weather', patterns: ['weather', 'temperature', 'forecast', 'raining', 'sunny', 'cloudy', 'storm'] },
    { type: 'technical', patterns: ['how does', 'explain', 'technolog', 'code', 'program', 'develop', 'computer', 'algorithm', 'function'] }
  ];
  
  // Cache to avoid repetitive responses
  const responseCache = new Map();
  
  // Predefined responses for common queries
  const commonResponses = {
    "what time is it": "I don't have access to your local time. Could you check your device's clock?",
    "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
    "how are you": "I'm functioning well, thank you for asking! How can I assist you today?",
    "thank you": "You're welcome! Is there anything else I can help you with?"
  };
  
  // Get a random item from an array
  const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };
  
  // Categorize a question based on patterns
  const categorizeQuestion = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Check common responses first
    for (const [key, response] of Object.entries(commonResponses)) {
      if (lowerQuestion.includes(key)) {
        return { type: 'common', response };
      }
    }
    
    // Then check pattern matchers
    for (const matcher of patternMatchers) {
      if (matcher.patterns.some(pattern => lowerQuestion.includes(pattern))) {
        return { type: matcher.type };
      }
    }
    
    // Default categorization based on question length
    if (question.length < 15) {
      return { type: 'factual' };
    } else if (question.includes('?')) {
      return { type: 'opinion' };
    } else {
      return { type: 'fallback' };
    }
  };
  
  // Format the response with the query
  const formatResponse = (template, query) => {
    return template.replace('{query}', query);
  };
  
  // Main function to get AI response
  export const askAI = async (question) => {
    // Check cache first
    if (responseCache.has(question)) {
      return responseCache.get(question);
    }
    
    // Simulate network delay (at least 2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    // Categorize the question
    const category = categorizeQuestion(question);
    
    let response;
    
    if (category.type === 'common') {
      response = category.response;
    } else {
      const templates = responseTemplates[category.type] || responseTemplates.fallback;
      const template = getRandomItem(templates);
      response = formatResponse(template, question);
    }
    
    // Add some AI-like phrasing at the beginning or end occasionally
    const aiPhrases = [
      "Processing your query... ",
      "Analyzing your question... ",
      "Let me think about that. ",
      " Is this information helpful?",
      " I hope that answers your question.",
      " Based on my available information."
    ];
    
    if (Math.random() > 0.7) {
      const phrase = getRandomItem(aiPhrases);
      response = phrase.startsWith(" ") ? response + phrase : phrase + response;
    }
    
    // Cache the response
    responseCache.set(question, response);
    
    return response;
  };