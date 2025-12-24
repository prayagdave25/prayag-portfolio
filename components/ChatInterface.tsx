'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, fadeInUp } from '@/lib/animations';

// Message interface as specified in design
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Error types for different error scenarios
export interface ChatError {
  type: 'connection' | 'timeout' | 'invalid_response' | 'network';
  message: string;
  retryable: boolean;
}

export interface ChatInterfaceProps {
  placeholderText: string;
  sampleQuestions?: string[];
  onSendMessage?: (message: string) => Promise<Message>;
}

/**
 * ChatInterface component - Interactive chat UI for exploring resume
 * Includes comprehensive error handling for API failures
 * 
 * Error handling covers:
 * - API connection errors
 * - Timeout errors (>30 seconds)
 * - Invalid response format
 * - Network errors
 */
export function ChatInterface({
  placeholderText,
  sampleQuestions = [],
  onSendMessage,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome! I'm here to answer questions about Prayag's experience. Feel free to ask about his work with CSD Ghana, VectorLoom, or any of his technical expertise.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending messages with comprehensive error handling
  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    // Clear any previous errors
    setError(null);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // If no backend handler provided, show placeholder response
    if (!onSendMessage) {
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "This is a demo interface. Connect to VectorLoom API to get real responses about Prayag's experience.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    // Call backend with error handling
    try {
      // Set up timeout (30 seconds)
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error('TIMEOUT'));
        }, 30000);
      });

      // Race between API call and timeout
      const response = await Promise.race([
        onSendMessage(messageText),
        timeoutPromise,
      ]);

      // Validate response format
      if (!response || typeof response !== 'object') {
        throw new Error('INVALID_RESPONSE');
      }

      if (!response.id || !response.role || !response.content) {
        throw new Error('INVALID_RESPONSE');
      }

      // Add assistant response
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);

      // Handle different error types
      let chatError: ChatError;

      if (err.message === 'TIMEOUT') {
        chatError = {
          type: 'timeout',
          message: 'The request took too long to respond. Please try again.',
          retryable: true,
        };
      } else if (err.message === 'INVALID_RESPONSE') {
        chatError = {
          type: 'invalid_response',
          message: 'Received an unexpected response format. Please try again.',
          retryable: true,
        };
      } else if (err.message === 'Failed to fetch' || err.name === 'NetworkError') {
        chatError = {
          type: 'network',
          message: 'Network error. Please check your connection and try again.',
          retryable: true,
        };
      } else if (err.message?.includes('ECONNREFUSED') || err.code === 'ECONNREFUSED') {
        chatError = {
          type: 'connection',
          message: 'Unable to connect to the server. Please try again later.',
          retryable: true,
        };
      } else {
        chatError = {
          type: 'connection',
          message: err.message || 'An unexpected error occurred. Please try again.',
          retryable: true,
        };
      }

      setError(chatError);

      // Log error for debugging
      console.error('Chat error:', {
        type: chatError.type,
        message: chatError.message,
        originalError: err,
      });
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  // Handle sample question click
  const handleSampleQuestionClick = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  // Retry after error
  const handleRetry = () => {
    setError(null);
    // Retry the last user message
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMessage) {
      handleSendMessage(lastUserMessage.content);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        className="bg-background-secondary border border-border rounded-lg shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-background-tertiary border-b border-border px-6 py-4">
          <h2 className="text-xl font-semibold text-text-primary">
            Chat with my Resume
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Ask me anything about Prayag's experience
          </p>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-start gap-3 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-accent-primary'
                        : 'bg-background-tertiary border border-border'
                    }`}
                    aria-hidden="true"
                  >
                    {message.role === 'user' ? (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-accent-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`rounded-lg px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-accent-primary text-white'
                        : 'bg-background-tertiary text-text-primary border border-border'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === 'user'
                          ? 'text-white/70'
                          : 'text-text-muted'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background-tertiary border border-border flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-accent-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div className="bg-background-tertiary border border-border rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-accent-primary rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <span
                    className="w-2 h-2 bg-accent-primary rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/20 border border-red-500/50 rounded-lg p-4"
              role="alert"
              aria-live="assertive"
            >
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-300">
                    {error.type === 'connection' && 'Connection Error'}
                    {error.type === 'timeout' && 'Request Timeout'}
                    {error.type === 'invalid_response' && 'Invalid Response'}
                    {error.type === 'network' && 'Network Error'}
                  </p>
                  <p className="text-sm text-red-200 mt-1">{error.message}</p>
                  {error.retryable && (
                    <button
                      onClick={handleRetry}
                      className="mt-2 text-sm text-red-300 hover:text-red-200 underline focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-background-secondary rounded"
                    >
                      Try again
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sample Questions */}
        {sampleQuestions.length > 0 && (
          <div className="px-6 py-3 border-t border-border bg-background-primary">
            <p className="text-xs text-text-muted mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSampleQuestionClick(question)}
                  className="text-xs px-3 py-1.5 bg-background-tertiary text-text-secondary border border-border rounded-full hover:bg-accent-primary/10 hover:text-accent-primary hover:border-accent-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary"
                  aria-label={`Ask: ${question}`}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="px-6 py-4 border-t border-border bg-background-primary">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholderText}
              disabled={isLoading}
              className="flex-1 bg-background-secondary text-text-primary placeholder-text-muted px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Message input"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="px-6 py-3 bg-accent-primary text-white rounded-lg hover:bg-accent-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
              aria-label="Send message"
            >
              {isLoading ? (
                <svg
                  className="w-5 h-5 animate-spin mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
