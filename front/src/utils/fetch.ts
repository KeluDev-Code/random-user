const requestInit = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

async function http<T>(path: string, config: RequestInit): Promise<T> {
  const response = await fetch(path, config);
  /* if (!response.ok) {
    const error = new Error(response.statusText);
    error.name = response.status.toString();

    throw error;
  } */

  // may error if there is no body, return empty array
  return response.json().catch(() => ({}));
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: 'get', ...config };
  return http<T>(path, init);
}

export async function post<T, U>(path: string, body: T, config: RequestInit = requestInit): Promise<U> {
  const init = { method: 'post', body: JSON.stringify(body), ...config };
  return http<U>(path, init);
}

export async function put<T, U>(path: string, body: T, config: RequestInit = requestInit): Promise<U> {
  const init = { method: 'put', body: JSON.stringify(body), ...config };
  return http<U>(path, init);
}

export async function remove<T, U>(path: string, body: T, config: RequestInit = requestInit): Promise<U> {
  const init = { method: 'delete', body: JSON.stringify(body), ...config };
  return http<U>(path, init);
}
