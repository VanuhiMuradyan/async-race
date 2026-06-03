import { BASE_URL } from "./constants";

const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T; headers: Headers }> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data = (await res.json()) as T;

  return {
    data,
    headers: res.headers,   
  };
};

export const httpGet = async <T>(
    endpoint: string
) : Promise <{data: T; headers: Headers}> => 
    request<T>(endpoint)


export const httpPost = async <T>(
    endpoint: string,
    body: unknown
) : Promise <{data: T; headers: Headers}> => 
    request<T>(endpoint, {
        method: "POST",
        body: JSON.stringify(body)
    })

export const httpPut = async <T>(
    endpoint: string,
    body: unknown
) : Promise <{data: T; headers: Headers}> => 
    request<T>(endpoint, {
        method: "PUT",
        body: JSON.stringify(body)
    })
    
export const httpPatch = async <T>(
    endpoint: string,
) : Promise <{data: T; headers: Headers}> => 
    request<T>(endpoint, { method: "POST"})

export const httpDelete = async <T>(
    endpoint: string,
) : Promise <{data: T; headers: Headers}> => 
    request<T>(endpoint, { method: "DELETE"})
