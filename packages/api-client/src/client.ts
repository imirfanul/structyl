import axios from 'axios';
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { ApiClientConfig, ApiError } from './types';

// Extend InternalAxiosRequestConfig to include our retry sentinel
interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retried?: boolean;
}

export class ApiClient {
  readonly instance: AxiosInstance;
  readonly config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = config;
    this.instance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers,
      timeout: config.timeout ?? 10_000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(async (requestConfig) => {
      if (this.config.getAuthToken) {
        const token = await this.config.getAuthToken();
        if (token) {
          requestConfig.headers.Authorization = `Bearer ${token}`;
        }
      }
      return requestConfig;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const retriableConfig = error.config as RetriableRequestConfig | undefined;

        if (
          error.response?.status === 401 &&
          this.config.refreshToken &&
          retriableConfig &&
          !retriableConfig._retried
        ) {
          retriableConfig._retried = true;
          try {
            const newToken = await this.config.refreshToken();
            retriableConfig.headers['Authorization'] = `Bearer ${newToken}`;
            return await this.instance.request(retriableConfig);
          } catch (refreshErr) {
            this.config.onRefreshError?.(refreshErr);
          }
        }

        return Promise.reject(normalizeError(error));
      },
    );
  }
}

function normalizeError(error: AxiosError): ApiError {
  if (error.response) {
    const responseData = error.response.data as Record<string, unknown> | undefined;
    return {
      status: error.response.status,
      message:
        (typeof responseData?.['message'] === 'string' ? responseData['message'] : null) ??
        error.message,
      data: error.response.data,
    };
  }
  // No response received — covers both "no request object" (mock network errors,
  // request setup failures) and "request sent but no response" (real network errors).
  // Treat all as status 0 (network-level failure) for a consistent error shape.
  return { status: 0, message: 'No response received from server' };
}

export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}
