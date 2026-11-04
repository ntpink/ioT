const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const getHeaders = (customHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleUnauthorized = (response, endpoint) => {
  if (response.status === 401 && !endpoint.startsWith('/auth/')) {
    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/login';
    }
  }
};

export const apiClient = {
  baseURL: BASE_URL,

  /**
   * Phương thức GET (kèm Authorization: Bearer <token>)
   */
  async get(endpoint, params = {}, customHeaders = {}) {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    const base = BASE_URL.startsWith('http') ? BASE_URL : `${origin}${BASE_URL}`;
    const url = new URL(`${base}${endpoint}`);
    
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        url.searchParams.append(key, params[key]);
      }
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: getHeaders(customHeaders),
    });

    if (!response.ok) {
      handleUnauthorized(response, endpoint);
      let errorMsg = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errJson = await response.json();
        if (errJson && errJson.message) errorMsg = errJson.message;
      } catch {}
      throw new Error(errorMsg);
    }

    return response.json();
  },

  /**
   * Phương thức POST (kèm Authorization: Bearer <token>)
   */
  async post(endpoint, body = {}, customHeaders = {}) {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    const base = BASE_URL.startsWith('http') ? BASE_URL : `${origin}${BASE_URL}`;
    const response = await fetch(`${base}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(customHeaders),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      handleUnauthorized(response, endpoint);
      let errorMsg = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errJson = await response.json();
        if (errJson && errJson.message) errorMsg = errJson.message;
      } catch {}
      throw new Error(errorMsg);
    }

    return response.json();
  },

  /**
   * Phương thức PUT (kèm Authorization: Bearer <token>)
   */
  async put(endpoint, body = {}, customHeaders = {}) {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    const base = BASE_URL.startsWith('http') ? BASE_URL : `${origin}${BASE_URL}`;
    const response = await fetch(`${base}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(customHeaders),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      handleUnauthorized(response, endpoint);
      let errorMsg = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errJson = await response.json();
        if (errJson && errJson.message) errorMsg = errJson.message;
      } catch {}
      throw new Error(errorMsg);
    }

    return response.json();
  },

  /**
   * Phương thức DELETE (kèm Authorization: Bearer <token>)
   */
  async delete(endpoint, customHeaders = {}) {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    const base = BASE_URL.startsWith('http') ? BASE_URL : `${origin}${BASE_URL}`;
    const response = await fetch(`${base}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(customHeaders),
    });

    if (!response.ok) {
      handleUnauthorized(response, endpoint);
      let errorMsg = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errJson = await response.json();
        if (errJson && errJson.message) errorMsg = errJson.message;
      } catch {}
      throw new Error(errorMsg);
    }

    return response.json();
  },
};

export default apiClient;
