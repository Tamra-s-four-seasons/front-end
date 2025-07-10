import { ApiResponse, ApiResponseError } from "@/types/common";
import { AT_NAME } from "@/constants";
import { cookies } from "next/headers";

// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL;

const API_BASE_URL = "http://localhost:3000";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRequestInit extends Omit<RequestInit, "body" | "method"> {
  baseUrl?: string;
  data?: unknown;
}

async function createRequest<TResponse>(
  method: HttpMethod,
  path: string,
  { data, ...config }: ApiRequestInit = {}
): Promise<ApiResponse<TResponse>> {
  // eslint-disable-next-line prefer-const
  let { baseUrl, ...restConfig } = config;
  baseUrl = baseUrl ?? API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined");
  }

  let headers: HeadersInit = {
    "Content-Type": "application/json",
    ...restConfig.headers,
  };

  // Handle different content types
  if (data instanceof FormData) {
    // Don't set any Content-Type for FormData
    // Let the browser set it automatically with the correct boundary
    headers = { ...headers };
    delete (headers as Record<string, string>)["Content-Type"];
  } else {
    (headers as Record<string, string>)["Content-Type"] = "application/json";
  }

  const cookieStore = await cookies();
  // Handle cookies differently based on environment
  if (cookieStore) {
    // Server-side: manually handle cookies
    const originalCookies = await cookieStore
      .getAll()
      .filter((cookie) => cookie.name !== AT_NAME)
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const accessToken = cookieStore.get(AT_NAME)?.value;

    headers = {
      ...headers,
      Cookie: originalCookies,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    };
  } else {
    restConfig.credentials = "include";
  }
  try {
    console.log("fetching: ", `${method}: ${baseUrl}${path}`);
    const response = await fetch(`${baseUrl}${path}`, {
      ...restConfig,
      method,
      credentials: "include",
      headers, // Use our headers object
      body:
        data instanceof FormData
          ? data
          : data
          ? JSON.stringify(data)
          : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiResponseError(
        errorData.message || `HTTP Error ${response.status}`,
        errorData.code || response.status.toString(),
        errorData.fieldErrors || null
      );
    }

    return response;
  } catch (error) {
    if (error instanceof ApiResponseError) throw error;

    throw new ApiResponseError(
      error instanceof Error ? error.message : "Network error occurred",
      "500",
      null
    );
  }
}

export const api = {
  get: <TResponse>(path: string, config?: Omit<ApiRequestInit, "data">) =>
    createRequest<TResponse>("GET", path, config),

  post: <TResponse, TData = unknown>(
    path: string,
    data?: TData,
    config?: Omit<ApiRequestInit, "data">
  ) => createRequest<TResponse>("POST", path, { ...config, data }),

  put: <TResponse, TData = unknown>(
    path: string,
    data?: TData,
    config?: Omit<ApiRequestInit, "data">
  ) => createRequest<TResponse>("PUT", path, { ...config, data }),

  patch: <TResponse, TData = unknown>(
    path: string,
    data?: TData,
    config?: Omit<ApiRequestInit, "data">
  ) => createRequest<TResponse>("PATCH", path, { ...config, data }),

  delete: <TResponse>(path: string, config?: Omit<ApiRequestInit, "data">) =>
    createRequest<TResponse>("DELETE", path, config),
} as const;
