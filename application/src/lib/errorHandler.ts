import axios from 'axios';

interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  additionalInfo?: Record<string, unknown>;
}

const WEBHOOK_URL = process.env.ERROR_WEBHOOK_URL || '';

export async function handleError(
  error: Error,
  componentStack?: string,
  additionalInfo?: Record<string, unknown>,
) {
  const errorInfo: ErrorInfo = {
    message: error.message,
    stack: error.stack,
    componentStack,
    url: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    timestamp: new Date().toISOString(),
    additionalInfo,
  };

  console.error('Error occurred:', errorInfo);

  try {
    if (WEBHOOK_URL) {
      await axios.post(WEBHOOK_URL, errorInfo);
      console.log('Error sent to webhook');
    } else {
      console.warn('Webhook URL not configured. Error not sent.');
    }
  } catch (webhookError) {
    console.error('Failed to send error to webhook:', webhookError);
  }
}

export function tryCatch<T>(
  fn: (...args: any[]) => Promise<T>,
  additionalInfo?: ErrorInfo['additionalInfo'],
) {
  return async (...args: Parameters<typeof fn>): Promise<T> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error as Error, fn.name, additionalInfo);
      throw error; // Re-throw the error after handling
    }
  };
}
