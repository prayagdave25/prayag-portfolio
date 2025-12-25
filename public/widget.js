/**
 * Resume Chatbot Widget
 * Powered by VectorLoom
 */

(function() {
  'use strict';

  // Get configuration from window.RESUME_CHAT_CONFIG
  // This should be set in your HTML before loading this script
  const config = window.RESUME_CHAT_CONFIG || {};
  const BACKEND_URL = config.backendUrl || 'http://localhost:8000';
  
  // Credentials for connecting to Qdrant
  const CREDENTIALS = config.credentials || {
    deployment: 'Custom',
    url: '',
    key: '',
    db_type: 'qdrant'
  };
  
  // Default RAG Configuration (fallback only)
  // The widget will fetch the actual RAG config from the backend on initialization
  // This ensures it uses the same embedder/generator settings as your VectorLoom instance
  
  // Ensure components field exists (required by backend)
  const ensureComponents = (ragConfig) => {
    if (!ragConfig) return null;
    const result = {};
    for (const key in ragConfig) {
      result[key] = {
        selected: ragConfig[key].selected,
        components: ragConfig[key].components || {}
      };
    }
    return result;
  };
  
  const RAG_CONFIG = ensureComponents(config.ragConfig) || {
    Embedder: { selected: 'SentenceTransformers', components: {} },
    Generator: { selected: 'Groq', components: {} },
    Retriever: { selected: 'HybridRetriever', components: {} }
  };
  
  const THEME = config.theme || {};

  // Set CSS variables for theming
  if (THEME.primaryColor) {
    document.documentElement.style.setProperty('--primary-color', THEME.primaryColor);
  }

  class ResumeChatWidget {
    constructor() {
      this.messages = [];
      this.isOpen = false;
      this.isLoading = false;
      this.ragConfig = null; // Will be fetched from backend
      this.init();
    }

    async init() {
      this.createWidget();
      this.attachEventListeners();
      // Fetch RAG config from backend (like frontend does)
      await this.fetchRAGConfig();
      this.addWelcomeMessage();
    }

    async fetchRAGConfig() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/get_rag_config`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(CREDENTIALS)
        });

        if (response.ok) {
          const data = await response.json();
          this.ragConfig = data.rag_config;
          console.log('✅ RAG config loaded from backend');
        } else {
          console.warn('⚠️ Could not fetch RAG config, using default');
          this.ragConfig = RAG_CONFIG;
        }
      } catch (error) {
        console.error('Error fetching RAG config:', error);
        this.ragConfig = RAG_CONFIG;
      }
    }

    createWidget() {
      const container = document.getElementById('resume-chat-widget');
      if (!container) {
        console.error('Resume chat widget container not found');
        return;
      }

      container.innerHTML = `
        <style>
          /* Portfolio-matched theme variables */
          :root {
            --chat-bg-primary: #0A192F;
            --chat-bg-secondary: #1E293B;
            --chat-bg-tertiary: #334155;
            --chat-accent: #00D9FF;
            --chat-accent-hover: #33E0FF;
            --chat-text-primary: #F1F5F9;
            --chat-text-secondary: #CBD5E1;
            --chat-text-muted: #94A3B8;
            --chat-border: #334155;
          }

          .chat-widget-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          }

          .chat-toggle-button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat-accent), #00B8D4);
            border: 2px solid var(--chat-accent);
            color: white;
            font-size: 28px;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0, 217, 255, 0.3);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .chat-toggle-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 30px rgba(0, 217, 255, 0.5);
          }

          .chat-widget {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 400px;
            max-width: calc(100vw - 40px);
            height: 600px;
            max-height: calc(100vh - 120px);
            background: var(--chat-bg-secondary);
            border: 1px solid var(--chat-border);
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: column;
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            pointer-events: none;
            transition: all 0.3s ease;
          }

          .chat-widget.open {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: all;
          }

          .chat-header {
            background: var(--chat-bg-tertiary);
            border-bottom: 1px solid var(--chat-border);
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 12px 12px 0 0;
          }

          .chat-header-content {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .chat-header-title {
            color: var(--chat-text-primary);
            font-weight: 600;
            font-size: 16px;
          }

          .powered-by {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 11px;
            color: var(--chat-text-muted);
          }

          .powered-by-link {
            color: var(--chat-accent);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.2s ease;
          }

          .powered-by-link:hover {
            color: var(--chat-accent-hover);
            text-shadow: 0 0 8px rgba(0, 217, 255, 0.5);
          }

          .vectorloom-icon {
            width: 14px;
            height: 14px;
            display: inline-block;
          }

          .chat-close {
            background: transparent;
            border: none;
            color: var(--chat-text-secondary);
            font-size: 28px;
            cursor: pointer;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            transition: all 0.2s ease;
          }

          .chat-close:hover {
            background: var(--chat-bg-primary);
            color: var(--chat-accent);
          }

          .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat-bg-primary);
            background-image: 
              linear-gradient(rgba(0, 217, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px);
            background-size: 50px 50px;
          }

          .chat-messages::-webkit-scrollbar {
            width: 8px;
          }

          .chat-messages::-webkit-scrollbar-track {
            background: var(--chat-bg-secondary);
          }

          .chat-messages::-webkit-scrollbar-thumb {
            background: var(--chat-bg-tertiary);
            border-radius: 4px;
          }

          .chat-messages::-webkit-scrollbar-thumb:hover {
            background: var(--chat-accent);
          }

          .message {
            margin-bottom: 16px;
            animation: fadeIn 0.3s ease;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .message-content {
            padding: 12px 16px;
            border-radius: 8px;
            max-width: 85%;
            word-wrap: break-word;
            line-height: 1.5;
          }

          .user-message .message-content {
            background: linear-gradient(135deg, var(--chat-accent), #00B8D4);
            color: white;
            margin-left: auto;
            border-bottom-right-radius: 4px;
          }

          .bot-message .message-content {
            background: var(--chat-bg-tertiary);
            color: var(--chat-text-primary);
            border: 1px solid var(--chat-border);
            border-bottom-left-radius: 4px;
          }

          .suggested-questions {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 8px;
          }

          .suggested-question {
            background: var(--chat-bg-tertiary);
            color: var(--chat-text-secondary);
            border: 1px solid var(--chat-border);
            padding: 10px 14px;
            border-radius: 8px;
            cursor: pointer;
            text-align: left;
            font-size: 14px;
            transition: all 0.2s ease;
          }

          .suggested-question:hover {
            background: rgba(0, 217, 255, 0.1);
            border-color: var(--chat-accent);
            color: var(--chat-accent);
            transform: translateX(4px);
          }

          .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 12px 16px;
            background: var(--chat-bg-tertiary);
            border: 1px solid var(--chat-border);
            border-radius: 8px;
            width: fit-content;
          }

          .typing-dot {
            width: 8px;
            height: 8px;
            background: var(--chat-accent);
            border-radius: 50%;
            animation: typingBounce 1.4s infinite ease-in-out;
          }

          .typing-dot:nth-child(1) {
            animation-delay: -0.32s;
          }

          .typing-dot:nth-child(2) {
            animation-delay: -0.16s;
          }

          @keyframes typingBounce {
            0%, 80%, 100% {
              transform: scale(0);
              opacity: 0.5;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }

          .error-message {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #FCA5A5;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            font-size: 14px;
          }

          .chat-input-container {
            padding: 16px 20px;
            background: var(--chat-bg-secondary);
            border-top: 1px solid var(--chat-border);
            border-radius: 0 0 12px 12px;
          }

          .chat-input {
            display: flex;
            gap: 8px;
          }

          .chat-input input {
            flex: 1;
            background: var(--chat-bg-primary);
            border: 1px solid var(--chat-border);
            color: var(--chat-text-primary);
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            outline: none;
            transition: all 0.2s ease;
          }

          .chat-input input::placeholder {
            color: var(--chat-text-muted);
          }

          .chat-input input:focus {
            border-color: var(--chat-accent);
            box-shadow: 0 0 0 3px rgba(0, 217, 255, 0.1);
          }

          .chat-input button {
            background: linear-gradient(135deg, var(--chat-accent), #00B8D4);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 14px;
          }

          .chat-input button:hover:not(:disabled) {
            background: linear-gradient(135deg, var(--chat-accent-hover), var(--chat-accent));
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 217, 255, 0.3);
          }

          .chat-input button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          @media (max-width: 480px) {
            .chat-widget {
              width: calc(100vw - 40px);
              height: calc(100vh - 120px);
            }
          }
        </style>
        <div class="chat-widget-container">
          <button class="chat-toggle-button" id="chat-toggle" aria-label="Toggle chat">
            💬
          </button>
          
          <div class="chat-widget" id="chat-widget">
            <div class="chat-header">
              <div class="chat-header-content">
                <span class="chat-header-title">${THEME.headerText || 'Ask about my Resume'}</span>
                <div class="powered-by">
                  <span>Powered by</span>
                  <a href="https://github.com/Prayag2003/VectorLoom" target="_blank" rel="noopener noreferrer" class="powered-by-link">
                    <svg class="vectorloom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                    VectorLoom
                  </a>
                </div>
              </div>
              <button class="chat-close" id="chat-close" aria-label="Close chat">×</button>
            </div>
            
            <div class="chat-messages" id="chat-messages"></div>
            
            <div class="chat-input-container">
              <div class="chat-input">
                <input 
                  type="text" 
                  id="chat-input" 
                  placeholder="${THEME.placeholder || 'Ask a question...'}"
                  autocomplete="off"
                />
                <button id="chat-send">Send</button>
              </div>
            </div>
          </div>
        </div>
      `;

      this.elements = {
        toggle: document.getElementById('chat-toggle'),
        close: document.getElementById('chat-close'),
        widget: document.getElementById('chat-widget'),
        messages: document.getElementById('chat-messages'),
        input: document.getElementById('chat-input'),
        send: document.getElementById('chat-send')
      };
    }

    attachEventListeners() {
      this.elements.toggle.addEventListener('click', () => this.toggleWidget());
      this.elements.close.addEventListener('click', () => this.closeWidget());
      this.elements.send.addEventListener('click', () => this.sendMessage());
      this.elements.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !this.isLoading) {
          this.sendMessage();
        }
      });
    }

    toggleWidget() {
      this.isOpen = !this.isOpen;
      this.elements.widget.classList.toggle('open', this.isOpen);
      if (this.isOpen) {
        this.elements.input.focus();
      }
    }

    closeWidget() {
      this.isOpen = false;
      this.elements.widget.classList.remove('open');
    }

    addWelcomeMessage() {
      const welcomeText = THEME.welcomeMessage || 
        'Hi! Ask me anything about my experience, skills, or projects.';
      
      this.addMessage(welcomeText, false);

      // Add suggested questions if configured
      if (THEME.suggestedQuestions && THEME.suggestedQuestions.length > 0) {
        this.addSuggestedQuestions(THEME.suggestedQuestions);
      }
    }

    addMessage(text, isUser) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
      
      const contentDiv = document.createElement('div');
      contentDiv.className = 'message-content';
      contentDiv.textContent = text;
      
      messageDiv.appendChild(contentDiv);
      this.elements.messages.appendChild(messageDiv);
      this.scrollToBottom();
      
      return contentDiv;
    }

    addSuggestedQuestions(questions) {
      const container = document.createElement('div');
      container.className = 'message bot-message';
      
      const questionsDiv = document.createElement('div');
      questionsDiv.className = 'suggested-questions';
      
      questions.forEach(question => {
        const btn = document.createElement('button');
        btn.className = 'suggested-question';
        btn.textContent = question;
        btn.addEventListener('click', () => {
          this.elements.input.value = question;
          this.sendMessage();
          container.remove(); // Remove suggestions after use
        });
        questionsDiv.appendChild(btn);
      });
      
      container.appendChild(questionsDiv);
      this.elements.messages.appendChild(container);
      this.scrollToBottom();
    }

    showTypingIndicator() {
      const indicator = document.createElement('div');
      indicator.className = 'message bot-message';
      indicator.id = 'typing-indicator';
      indicator.innerHTML = `
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;
      this.elements.messages.appendChild(indicator);
      this.scrollToBottom();
    }

    hideTypingIndicator() {
      const indicator = document.getElementById('typing-indicator');
      if (indicator) {
        indicator.remove();
      }
    }

    showError(message) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      this.elements.messages.appendChild(errorDiv);
      this.scrollToBottom();
    }

    scrollToBottom() {
      this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    }

    setLoading(loading) {
      this.isLoading = loading;
      this.elements.input.disabled = loading;
      this.elements.send.disabled = loading;
      this.elements.send.textContent = loading ? 'Sending...' : 'Send';
    }

    async sendMessage() {
      const query = this.elements.input.value.trim();
      if (!query || this.isLoading) return;

      // Ensure RAG config is loaded
      if (!this.ragConfig) {
        this.showError('Configuration not loaded yet. Please wait...');
        return;
      }

      // Add user message
      this.addMessage(query, true);
      this.elements.input.value = '';
      this.setLoading(true);
      this.showTypingIndicator();

      try {
        // Step 1: Query for context (using full RAG config from backend)
        const queryResponse = await fetch(`${BACKEND_URL}/api/query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: query,
            credentials: CREDENTIALS,
            RAG: this.ragConfig, // Use fetched RAG config
            labels: [],
            documentFilter: []
          })
        });

        if (!queryResponse.ok) {
          throw new Error('Failed to query documents');
        }

        const { context, error } = await queryResponse.json();
        
        if (error) {
          throw new Error(error);
        }

        this.hideTypingIndicator();

        // Step 2: Stream answer via WebSocket
        await this.streamAnswer(query, context);

      } catch (error) {
        console.error('Chat error:', error);
        this.hideTypingIndicator();
        this.showError('Sorry, something went wrong. Please try again.');
      } finally {
        this.setLoading(false);
      }
    }

    async streamAnswer(query, context) {
      return new Promise((resolve, reject) => {
        const wsUrl = BACKEND_URL.replace('https://', 'wss://').replace('http://', 'ws://');
        const ws = new WebSocket(`${wsUrl}/ws/generate_stream`);
        
        let answer = '';
        let messageDiv = null;

        ws.onopen = () => {
          ws.send(JSON.stringify({
            query: query,
            context: context,
            conversation: [],
            rag_config: this.ragConfig // Use fetched RAG config
          }));
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            if (!messageDiv) {
              messageDiv = this.addMessage('', false);
            }
            
            answer += data.message;
            messageDiv.textContent = answer;
            this.scrollToBottom();
            
            if (data.finish_reason === 'stop') {
              ws.close();
              resolve();
            }
          } catch (error) {
            console.error('WebSocket message error:', error);
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          ws.close();
          reject(error);
        };

        ws.onclose = () => {
          if (!answer) {
            reject(new Error('Connection closed without response'));
          }
        };

        // Timeout after 30 seconds
        setTimeout(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.close();
            reject(new Error('Request timeout'));
          }
        }, 30000);
      });
    }
  }

  // Initialize widget when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new ResumeChatWidget();
    });
  } else {
    new ResumeChatWidget();
  }

})();
