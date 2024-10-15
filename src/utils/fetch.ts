export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

type BodyType = Record<string, any> | null;

const controlledStatusCodes = [401];

/**
 * Fetch request with error handling.
 * @param url - The URL to fetch.
 * @param method - The HTTP method to use.
 * @param body - The body to send.
 */
export const fetchRequest = async <T>(
  url: string,
  method: HttpMethod = HttpMethod.GET,
  body?: BodyType
): Promise<T> => {
  const token = localStorage.getItem('accessToken');
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (body && method !== HttpMethod.GET) {
    options.body = JSON.stringify(body);
  }

  try {
    const response: Response = await fetch(url, options);
    const responseJSON = await response.json() as { message: string; data: T };
    if (responseJSON.message === 'Unauthorized') {
      localStorage.removeItem('custom-auth-token');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.reload();
    }

    if (!response.ok && !controlledStatusCodes.includes(401)) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return responseJSON.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
