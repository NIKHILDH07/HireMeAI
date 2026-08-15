import { ChatRequest, ChatResponse } from '../types/chat';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/+$/, '');

const REQUEST_TIMEOUT_MS = 45000; // 45 seconds for LLM document parsing + inference

export class ApiClientError extends Error {
  statusCode?: number;
  isNetworkError: boolean;

  constructor(message: string, statusCode?: number, isNetworkError: boolean = false) {
    super(message);
    this.name = 'ApiClientError';
    this.statusCode = statusCode;
    this.isNetworkError = isNetworkError;
  }
}

/**
 * Sends a candidate interview question to the FastAPI /chat endpoint.
 */
export async function sendChatMessage(question: string): Promise<ChatResponse> {
  const trimmed = question.trim();
  if (!trimmed) {
    throw new ApiClientError('Question cannot be empty.', 400);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const payload: ChatRequest = { question: trimmed };

    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `Server error (${response.status})`;
      try {
        const errorData = await response.json();
        if (response.status === 422) {
          errorMessage = 'Invalid request format. Please provide a valid question.';
        } else if (response.status === 500) {
          errorMessage = 'The AI service encountered an internal error. Please try again.';
        } else if (errorData?.detail) {
          errorMessage = typeof errorData.detail === 'string' 
            ? errorData.detail 
            : JSON.stringify(errorData.detail);
        }
      } catch {
        // Fallback to generic status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new ApiClientError(errorMessage, response.status);
    }

    const data = await response.json();

    if (!data || typeof data !== 'object') {
      throw new ApiClientError('Received invalid data format from server.');
    }

    if (typeof data.answer !== 'string') {
      throw new ApiClientError('Server returned an unexpected response structure.');
    }

    if (!data.answer.trim()) {
      throw new ApiClientError('AI returned an empty response. Please try rephrasing your question.');
    }

    return { answer: data.answer };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof ApiClientError) {
      throw err;
    }

    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiClientError('Request timed out. The server took too long to respond.', 408);
    }

    if (err instanceof TypeError && err.message.includes('fetch')) {
      throw new ApiClientError(
        'Unable to connect to the backend server. Please verify the backend is running at ' + API_BASE_URL,
        undefined,
        true
      );
    }

    const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
    throw new ApiClientError(message);
  }
}

/**
 * Health check endpoint verifying backend connectivity.
 */
export async function checkBackendHealth(): Promise<{ status: boolean; message: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(`${API_BASE_URL}/`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (response.ok) {
      const data = await response.json();
      return { status: true, message: data.message || 'Connected' };
    }
    return { status: false, message: `Status: ${response.status}` };
  } catch (err) {
    return {
      status: false,
      message: err instanceof Error ? err.message : 'Backend unreachable',
    };
  }
}
