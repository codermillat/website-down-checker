export interface CheckResponse {
  status: 'UP' | 'DOWN';
  code: number;
  error?: string;
  responseTime?: number;
}

export interface StatusState {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: CheckResponse | null;
  errorMessage?: string;
}