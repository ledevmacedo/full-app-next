// API types
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  error: string;
  code?: string;
  details?: Record<string, string[]>;
}
