export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  isNetworkError?: boolean;
}
